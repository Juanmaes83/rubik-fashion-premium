import {
  StrictMode,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const branches = [
  { label: "Escena", scene: "environment", file: 2 },
  { label: "Luz", scene: "light", file: 3 },
  { label: "Ropa", scene: "colorway", file: 1 },
  { label: "Salto", scene: "fullLook", file: 4 },
] as const;
type Branch = (typeof branches)[number];
type Phase = "loading" | "ready" | "starting" | "playing" | "error";
type Direction = "forward" | "reverse";
const defaultClips = branches.flatMap((b) =>
  (["forward", "reverse"] as const).map((direction) => ({
    id: `${b.scene}-${direction}`,
    src: `/retake/video-${b.file}${direction === "reverse" ? "-reverse" : ""}.mp4`,
    guard: b.file === 2 && direction === "reverse" ? 0.18 : 0.08,
  })),
);

const defaults = {
  brand: 'RUBIK SOTA', phone: '629554870', logo: '', secondaryLogo: '',
  title: 'Moda en movimiento', description: 'Una colección. Cuatro formas de verla. Explora la escena, la luz, el color y el casting.',
  base: '/retake/state-base.png', clips: defaultClips,
};
type HeroSettings = typeof defaults;

function App({ settings }: { settings: HeroSettings }) {
  const clips = settings.clips;
  const videos = useRef<Record<string, HTMLVideoElement>>({});
  const visible = useRef<string | null>(null);
  const lock = useRef(false);
  const token = useRef(0);
  const cancel = useRef<() => void>(() => {});
  const pending = useRef<{ branch: Branch; direction: Direction } | null>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const [scene, setScene] = useState<string>("base");
  const [branch, setBranch] = useState<Branch | null>(null);
  const [direction, setDirection] = useState<Direction>("forward");
  const [hiddenTitle, setHiddenTitle] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const keyboardIndex = useRef(0);
  const [loaded, setLoaded] = useState(0);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [error, setError] = useState("");
  const reset = useRef<HTMLButtonElement>(null);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const focusAfter = useRef<number | "reset" | null>(null);
  const running = phase === "starting" || phase === "playing";
  const collapsed = branch !== null && direction === "forward";

  useEffect(() => {
    let disposed = false;
    const check = () => {
      if (disposed) return;
      const count = clips.filter(
        (c) => videos.current[c.id]?.readyState >= 2,
      ).length;
      setLoaded(count);
      if (count === clips.length) {
        clearTimeout(deadline);
        setPhase("ready");
        setError("");
      }
    };
    const fail = () => {
      if (!disposed) {
        setPhase("error");
        setError(
          "Some scene videos could not load. Check your connection and retry.",
        );
      }
    };
    const deadline = window.setTimeout(fail, 20000);
    const elements = Object.values(videos.current);
    elements.forEach((v) => {
      v.addEventListener("loadeddata", check);
      v.addEventListener("error", fail);
      if (loadAttempt && v.readyState < 2) v.load();
    });
    check();
    return () => {
      disposed = true;
      clearTimeout(deadline);
      elements.forEach((v) => {
        v.removeEventListener("loadeddata", check);
        v.removeEventListener("error", fail);
      });
    };
  }, [loadAttempt]);

  useEffect(
    () => () => {
      token.current++;
      cancel.current();
      Object.values(videos.current).forEach((v) => v.pause());
    },
    [],
  );
  useEffect(() => {
    if (phase !== "ready" || focusAfter.current === null) return;
    const target =
      focusAfter.current === "reset"
        ? reset.current
        : options.current[focusAfter.current];
    target?.focus({ preventScroll: true });
    focusAfter.current = null;
  }, [phase, scene]);

  function play(selected: Branch, way: Direction, retry = false) {
    if (lock.current || (!retry && phase !== "ready")) return;
    lock.current = true;
    const request = ++token.current;
    cancel.current();
    pending.current = { branch: selected, direction: way };
    setBranch(selected);
    setDirection(way);
    setPhase("starting");
    setError("");
    setHighlight(way === "forward" ? branches.indexOf(selected) + 1 : 0);
    const clip = clips.find((c) => c.id === `${selected.scene}-${way}`)!;
    const video = videos.current[clip.id];
    let frame = 0,
      raf = 0,
      revealRaf = 0,
      timeout = 0,
      completed = false,
      revealed = false;
    let lastTime = -1,
      lastProgress = performance.now();
    const cleanups: (() => void)[] = [];
    const current = () => request === token.current && !completed;
    const cleanup = () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(revealRaf);
      if (frame) video.cancelVideoFrameCallback?.(frame);
      cleanups.forEach((fn) => fn());
    };
    cancel.current = cleanup;
    const fail = () => {
      if (!current()) return;
      completed = true;
      video.pause();
      cleanup();
      lock.current = false;
      setPhase("error");
      setError(
        "Playback was interrupted. Retry to continue from the last visible frame.",
      );
    };
    const finish = () => {
      if (!current() || !revealed) return;
      completed = true;
      video.pause();
      cleanup();
      lock.current = false;
      pending.current = null;
      setScene(way === "forward" ? selected.scene : "base");
      setPhase("ready");
      focusAfter.current =
        way === "forward" ? "reset" : branches.indexOf(selected);
      if (way === "reverse") {
        setBranch(null);
        setHiddenTitle(false);
      } else setHiddenTitle(true);
    };
    const reveal = () => {
      if (!current() || revealed) return;
      Object.values(videos.current).forEach((v) => {
        v.style.visibility = v === video ? "visible" : "hidden";
      });
      visible.current = clip.id;
      revealed = true;
      setPhase("playing");
      clearTimeout(timeout);
    };
    const monitor = () => {
      if (!current()) return;
      if (video.currentTime !== lastTime) {
        lastTime = video.currentTime;
        lastProgress = performance.now();
      }
      if (performance.now() - lastProgress > 12000) {
        fail();
        return;
      }
      if (
        way === "forward" &&
        video.currentTime >= Math.min(video.duration * 0.12, 0.25)
      )
        setHiddenTitle(true);
      if (revealed && video.currentTime >= video.duration - clip.guard) {
        finish();
        return;
      }
      raf = requestAnimationFrame(monitor);
    };
    video.addEventListener("error", fail);
    video.addEventListener("ended", finish);
    cleanups.push(() => {
      video.removeEventListener("error", fail);
      video.removeEventListener("ended", finish);
    });
    timeout = window.setTimeout(fail, 15000);
    Object.values(videos.current).forEach((v) => v.pause());
    const start = () => {
      if (!current()) return;
      const resumeVisible = visible.current === clip.id;
      if (typeof video.requestVideoFrameCallback === "function") {
        const onFrame: VideoFrameRequestCallback = (_, metadata) => {
          if (!current()) return;
          if (
            resumeVisible ||
            metadata.mediaTime < Math.min(0.5, video.duration / 2)
          )
            reveal();
          else frame = video.requestVideoFrameCallback(onFrame);
        };
        frame = video.requestVideoFrameCallback(onFrame);
      } else {
        const onPlaying = () => {
          revealRaf = requestAnimationFrame(() => {
            if (current() && video.readyState >= 2 && !video.seeking) reveal();
          });
        };
        video.addEventListener("playing", onPlaying, { once: true });
        cleanups.push(() => video.removeEventListener("playing", onPlaying));
      }
      video
        .play()
        .then(() => {
          if (current()) raf = requestAnimationFrame(monitor);
        })
        .catch(fail);
    };
    // A failed visible clip resumes in place; never rewind the visible surface.
    if (visible.current === clip.id) {
      start();
      return;
    }
    if (video.readyState < 2) {
      fail();
      return;
    }
    if (video.currentTime > 0.001) {
      video.addEventListener("seeked", start, { once: true });
      cleanups.push(() => video.removeEventListener("seeked", start));
      video.currentTime = 0;
    } else start();
  }

  const status =
    phase === "loading"
      ? `Loading scenes · ${loaded}/8`
      : phase === "error"
        ? error
        : running
          ? `${direction === "reverse" ? "Returning from" : "Playing"} ${branch?.label}`
          : scene === "base"
            ? "Choose a scene state."
            : `${branch?.label} selected. Reset to explore another state.`;
  return (
    <main
      className="experience relative isolate"
      data-phase={phase}
      data-scene={scene}
    >
      <div className="media" aria-hidden="true">
        <img src={settings.base} alt="" fetchPriority="high" />
        {clips.map((c) => (
          <video
            key={c.id}
            ref={(v) => {
              if (v) videos.current[c.id] = v;
            }}
            data-clip={c.id}
            src={c.src}
            muted
            playsInline
            preload="auto"
          />
        ))}
      </div>
      <header className="header absolute z-30">
        <a href="/" aria-label={`${settings.brand} · Inicio`} className="rubik-brand">
          {settings.logo ? <img src={settings.logo} alt={settings.brand} /> : settings.brand}
        </a>
        <div className="metadata">
          <a href={`tel:${settings.phone.replace(/[^+0-9]/g, '')}`}>{settings.phone}</a>
          {settings.secondaryLogo && <img src={settings.secondaryLogo} alt="Marca colaboradora" />}
        </div>
        <a
          className="try-now"
          href={`tel:${settings.phone.replace(/[^+0-9]/g, '')}`}
        >
          Contactar
        </a>
      </header>
      <h1
        className={`hero ${hiddenTitle ? "concealed" : ""}`}
        aria-label={settings.title}
      >
        {settings.title.split(' ').map((word, i, words) => (
          <span
            key={`${word}-${i}`}
            aria-hidden="true"
            style={{ "--word": i } as CSSProperties}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>
      <div
        className={`controller ${collapsed ? "collapsed" : ""} ${scene !== "base" && !running ? "selected" : ""}`}
        role="group"
        aria-label="Scene controls"
        aria-busy={running}
        data-highlight={highlight}
        onMouseLeave={() => {
          if (!collapsed) setHighlight(keyboardIndex.current);
        }}
      >
        <div className="glass rear" aria-hidden="true" />
        <div
          className="glass capsule"
          aria-hidden="true"
          style={{ "--position": highlight } as CSSProperties}
        />
        <div className="choices">
          <span className={`initial ${highlight ? "dimmed" : ""}`}>
            Explora →
          </span>
          {branches.map((b, i) => (
            <button
              key={b.scene}
              ref={(el) => {
                options.current[i] = el;
              }}
              className={branch === b && collapsed ? "chosen" : ""}
              disabled={phase !== "ready" || scene !== "base"}
              tabIndex={collapsed ? -1 : undefined}
              onMouseEnter={() => {
                if (!collapsed) setHighlight(i + 1);
              }}
              onFocus={(e) => {
                if (e.currentTarget.matches(":focus-visible")) {
                  keyboardIndex.current = i + 1;
                  if (!collapsed) setHighlight(i + 1);
                }
              }}
              onBlur={() => {
                keyboardIndex.current = 0;
              }}
              onClick={() => play(b, "forward")}
            >
              {b.label}
            </button>
          ))}
        </div>
        <button
          ref={reset}
          className={`reset ${collapsed && scene !== "base" && phase === "ready" ? "shown" : ""}`}
          disabled={!collapsed || scene === "base" || phase !== "ready"}
          tabIndex={collapsed && scene !== "base" && phase === "ready" ? 0 : -1}
          onClick={() => branch && play(branch, "reverse")}
        >
          Volver
        </button>
      </div>
      <p className="description">
        {settings.description}
      </p>
      <div
        className={
          phase === "loading" || phase === "error" ? "feedback" : "sr-only"
        }
        role="status"
        aria-live="polite"
      >
        {status}
        {phase === "error" && (
          <button
            onClick={() => {
              if (pending.current)
                play(pending.current.branch, pending.current.direction, true);
              else {
                setPhase("loading");
                setError("");
                setLoadAttempt((n) => n + 1);
              }
            }}
          >
            Retry
          </button>
        )}
      </div>
    </main>
  );
}
function Root() {
  const [settings, setSettings] = useState(defaults);
  const embedded = window.parent !== window;
  useEffect(() => {
    document.documentElement.dataset.embedded = String(embedded);
    const receive = (event: MessageEvent) => {
      if (!embedded || event.origin !== location.origin || event.source !== window.parent || event.data?.type !== 'rubik-hero-config') return;
      const incoming = event.data.settings;
      if (!incoming || !Array.isArray(incoming.clips) || incoming.clips.length !== 8) return;
      setSettings({ ...defaults, ...incoming });
    };
    window.addEventListener('message', receive);
    if (embedded) window.parent.postMessage({ type: 'rubik-hero-ready' }, location.origin);
    return () => window.removeEventListener('message', receive);
  }, [embedded]);
  useEffect(() => { document.title = `${settings.brand} — ${settings.title}`; }, [settings.brand, settings.title]);
  // Recreate only when a complete, reviewed media pack is applied, never during clip handoffs.
  return <App key={JSON.stringify([settings.base, settings.clips])} settings={settings} />;
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
