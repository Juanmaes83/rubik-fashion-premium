# RUBIK SOTA — Prompts para el hero de moda

Pack concreto listo para copiar: [mujer rubia, nuevo vestuario y ningún texto ni marca](PROMPTS-MODA-RUBIA-SIN-MARCAS.md). Incluye cinco prompts de imagen y cuatro de vídeo sin campos pendientes.

Adaptación de `video-states-website/prompts/images` y `prompts/video`. Mantiene los cuatro efectos: giro con cambio de color, apertura de paredes, cambio de iluminación y salto con corte de casting. No son prompts originales recuperados ni garantizan resultados idénticos: requieren selección y revisión de los vídeos generados.

## Antes de generar

1. Elige un modelo adulto ficticio y un look. Si usas fotos de tu catálogo, adjúntalas como referencias de prenda.
2. Genera y aprueba UNA imagen base. Crea los cuatro destinos editando esa misma imagen; no los generes por separado.
3. Para cada vídeo adjunta su imagen inicial y final si la herramienta admite ambos fotogramas. El texto del prompt por sí solo no fuerza un último fotograma.
4. Usa 16:9 y, cuando la herramienta lo permita, 1920×1080 y audio desactivado. Los tiempos de abajo son una dirección creativa: adapta la duración a las opciones del generador. No interpoles FPS para igualar clips.
5. Produce cuatro vídeos de ida. La vuelta se obtiene invirtiendo cada vídeo aprobado, no generando otra escena al azar. Revisa también la vuelta.

Sustituye los campos entre corchetes. Usa la misma descripción de persona y prendas en todos los prompts. Para probar puedes elegir: look A = chaqueta rosa con manchas verdes y pantalón amarillo/verde; look B = misma chaqueta azul cobalto/naranja y mismo pantalón violeta/burdeos; casting B = modelo adulta con anorak y shorts rojos.

## 00 — Imagen base

```text
Create a photorealistic premium fashion campaign hero image, horizontal 16:9. One fictional adult [MODEL A: appearance, hair, accessories] stands full-body, front-facing, perfectly centered, arms relaxed, feet firmly planted on the same floor plane. They wear [LOOK A: precise garments, silhouette, textile texture, colors, footwear]. Use the attached garment references faithfully, without inventing new seams or changing garment construction.

Two tall pale-blue mineral-plaster architectural walls frame a narrow opening onto a clear daylight sky. Smooth pale floor, coherent natural daylight and contact shadows. A completely locked camera, restrained low-angle editorial perspective, straight architectural edges. Full body, shoes, inner wall edges and a meaningful sky opening must fit inside the central vertical 9:16 safe crop, without drawing crop guides. Keep generous quiet architectural space for website overlays.

Premium realistic photography, plausible anatomy, detailed fabric, smooth stable walls with very subtle mineral texture. No walking, no raised feet, no motion blur, no extra people. No typography, lettering, logo, watermark, interface, border or graphic overlay. Brand text will be added as editable HTML by the website.
```

Guarda como `state-base.png`.

## 01 — Imagen destino Clothing

Adjunta la base. Este efecto cambia COLOR, no la construcción de la prenda.

```text
Edit only the textile colorway of the attached approved base image. Change [LOOK A COLORS] to [LOOK B COLORS]. Preserve exactly the same adult person, face, hair, accessories, pose, silhouette, garment cut, stitching, zipper, folds, pattern boundaries, textile texture, shoes and foot positions. Preserve the camera, framing, architectural walls, sky, floor, daylight, exposure and shadows. Only textile dye changes; do not redesign the outfit or relight the scene. No text, logo, watermark, glow or particles.
```

Guarda como `state-colorway.png`.

## 02 — Imagen destino Scene

Adjunta la base. Elige un fondo concreto, por ejemplo una azotea de Manhattan al mediodía.

```text
Edit the approved base image. Keep the same model, original outfit, pose, face, accessories, shoes, floor contact, body scale, camera position, lens and perspective unchanged. Move only the two existing rigid architectural walls outward: the left wall toward screen left and the right wall toward screen right. Reveal [DESTINATION BACKGROUND, e.g. a realistic Manhattan skyline seen from a terrace] already located behind the walls. Keep coherent daylight, spatial depth and floor geometry. No replacement panels, folded walls, curtains, fantasy architecture, subject movement, lighting change, text, logo or watermark.
```

Guarda como `state-environment.png`.

## 03 — Imagen destino Lighting

Adjunta la base.

```text
Change only the time of day and its physically linked illumination in the attached approved base image: bright midday becomes late blue hour. Preserve the exact same adult model, original outfit and textile dye colors, pose, accessories, shoes, camera, crop, wall edges and floor geometry. The sky becomes deep cobalt/slate with natural clouds. Both walls, floor, skin, clothing and shadows cool and dim together. Add a restrained diffuse amber afterglow very low at the horizon, with subtle natural bounce. The subject may become silhouetted while the composition remains readable. No isolated light stripe, beam, spotlight, projected shape, new lamp, neon, stars, artificial vignette, text, logo or watermark.
```

Guarda como `keyframe-light-shift-v2.png`.

## 04 — Imagen destino Cast

Adjunta la base y, si tienes, referencias del segundo look.

```text
Replace only the person in the attached approved base with a fictional adult [MODEL B: appearance, hair, accessories], wearing [SECOND LOOK: exact garments, colors, materials, footwear]. They stand front-facing and still, arms relaxed, at the same optical center and floor plane as model A. Match the full-body framing, overall head-to-shoe extent and foot positions for an editorial match cut. Keep anatomy plausible; do not stretch the body to force alignment. Preserve camera, lens, crop, walls, sky, clouds, daylight, exposure and perspective. Adapt only the contact shadow where physically required by the changed silhouette. This is the settled final pose, not an airborne image. No transition blur, text, logo or watermark.
```

Guarda como `keyframe-full-look-v3.png`.

## Vídeo 1 — Clothing: giro de 360° y cambio de color

Inicial: base. Final: colorway. Duración orientativa: 3 segundos.

```text
One completely locked-off, full-body premium fashion editorial shot. Use the supplied first and last images as visual anchors. The same adult model performs one controlled 360-degree clockwise pivot in place and returns to the exact original front-facing stance. No walking forward or backward. Feet stay centered on their original floor marks with only minimal heel-and-toe movement required for turning. Arms remain relaxed.

Hold the first pose for the opening 12% of the clip. Turn smoothly during the middle 76%. Change only the textile dye from the first-image colorway to the last-image colorway while the model's back faces the camera and hides the front of the outfit. Complete the turn, then hold the exact final pose for the last 12%. Garments do not dissolve, grow or change construction.

Preserve identity, face, accessories, body proportions, garment silhouette, fibers, folds, pattern boundaries, shoes and final framing. Camera, crop, walls, sky, clouds, floor, light, exposure and shadows remain fixed. No zoom, pan, tilt, shake, reframing, body scaling, foot sliding, morphing, extra limbs, particles, flash, moving patterns, wall shimmer, text, logo or watermark. The motion must also read convincingly in literal reverse.
```

Salida aprobada: `video-1.mp4`. Vuelta: `video-1-reverse.mp4`.

## Vídeo 2 — Scene: apertura simétrica de paredes

Inicial: base. Final: environment. Duración orientativa: 3–4 segundos.

```text
One locked-off premium fashion editorial shot. Use the supplied first and last frames as visual anchors. The adult model stays perfectly centered, front-facing and stationary on the same floor marks. Preserve identity, pose, original outfit, accessories, shoes, silhouette and scale. Camera, crop, perspective, lens and floor never change.

Only the two existing rigid architectural walls move. The left wall translates toward screen left and the right wall translates toward screen right. One smooth symmetrical movement: short still anticipation, decisive middle, soft settle, then a still terminal hold. Reveal the destination background shown in the final reference, already existing behind the walls at a fixed distance and scale. The background itself remains stationary.

Exactly two existing walls, no new panels. No bending, folding, fluttering, rotation, stacking, curtain effect, rising buildings, second reveal, dissolve or graphic wipe. Keep natural daylight and coherent depth. No model movement, wardrobe change, camera motion, zoom, focus breathing, subject scaling, flash, smoke, particles, heavy blur, text, logo or watermark. Literal reverse must show the same walls closing over the stationary background.
```

Salida: `video-2.mp4`. Vuelta: `video-2-reverse.mp4`.

## Vídeo 3 — Lighting: mediodía a hora azul

Inicial: base. Final: light-shift. Duración orientativa: 6 segundos.

```text
One locked-off single-take accelerated natural time-lapse in the approved outdoor fashion set. Use the supplied first and last frames as visual anchors. Bright midday advances continuously to late blue hour while the same adult model remains centered, front-facing and almost statue-still, with only subtle breathing. Preserve identity, original outfit construction and dye colors, accessories, hands, shoes, pose, silhouette, scale and exact floor contact.

The entire environment behaves as ONE physically coupled lighting system. Sky color, cloud movement, sunlight, exposure, color temperature, wall and floor illumination, skin and clothing illumination, shadow direction and length, and low horizon afterglow begin changing together and stay synchronized. A broad cloud front moves naturally through the sky opening, casting soft coherent shadows across both walls, floor and model together. Blue sky deepens toward cobalt and slate, the whole scene cools and dims, shadows lengthen and soften. A restrained diffuse amber afterglow develops very low on the horizon, affecting the set only as subtle natural bounce.

Use an S-curve: slow beginning, decisive acceleration through the middle, gentle settling, then a still final hold. This is continuous physical time-lapse photography, not an overlay, dissolve, wipe or sudden filter.

No diagonal stripe, beam, spotlight, projected shape, isolated bright patch, flash, black frame, exposure jump, new lamps, stars, moon, fog, neon, outfit change, body turn, walking, identity drift, camera motion, wall movement, geometry change, crawling texture, text, logo or watermark. Literal reverse returns coherently to daylight.
```

Salida: `video-3.mp4`. Vuelta: `video-3-reverse.mp4`.

## Vídeo 4 — Cast: salto pequeño y corte al aterrizar

Inicial: base. Final: full-look. Duración orientativa: 6 segundos.

```text
One locked-off premium fashion jump-cut shot. Use the supplied first and last images as visual anchors. Camera, lens, crop, perspective, architecture, floor, sky, daylight and exposure stay completely fixed throughout.

The original adult model A begins centered and front-facing. Hold still for the first 13% of the clip. During the next 10%, perform a compact anticipation crouch without horizontal foot movement. Make one clean vertical hop only 8–10 centimetres high, then descend to the identical floor marks. Model A's identity, face, body, original outfit and shoes remain 100% unchanged during anticipation, takeoff, flight and the entire descent.

At approximately 48% of the clip, ONLY on the first frame where both soles fully contact the floor, perform one instantaneous editorial hard cut. The frame before is entirely model A; the frame after is entirely model B from the supplied final image, already in the identical landing compression, optical center, scale and foot coordinates. No intermediate identity or partial outfit. Model B rises naturally from the shallow landing compression, settles into the exact final reference pose, then holds still for the last third of the clip.

Normal shutter clarity; do not hide the cut behind blur, flash, smoke, camera shake or occlusion. No mid-air identity change, gradual morph, dissolve, hybrid body, garment growth, horizontal foot drift, body rotation, high jump, extra limbs, floating, background motion, relighting, zoom, reframing, text, logo or watermark. Forward and literal reverse must both read as deliberate editorial match cuts.
```

Salida: `video-4.mp4`. Vuelta: `video-4-reverse.mp4`.

## Preparar las vueltas y sustituir el pack

El repositorio no incluye un prompt histórico de generación para la vuelta. Su método recomendado es invertir el clip de ida aprobado. Ejemplo de edición local, manteniendo resolución y FPS originales:

```sh
ffmpeg -i video-1.mp4 -vf reverse -an -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart video-1-reverse.mp4
```

Repite para 2, 3 y 4. Esta operación recodifica; conserva tus masters. La inversión puede necesitar memoria: úsala con clips cortos. La ida y la vuelta pueden tener duraciones diferentes si se recortan o ajustan después de revisar.

| Control | Ida | Vuelta | Imagen de referencia |
|---|---|---|---|
| Ropa | video-1.mp4 | video-1-reverse.mp4 | state-colorway.png |
| Escena | video-2.mp4 | video-2-reverse.mp4 | state-environment.png |
| Luz | video-3.mp4 | video-3-reverse.mp4 | keyframe-light-shift-v2.png |
| Casting | video-4.mp4 | video-4-reverse.mp4 | keyframe-full-look-v3.png |

En la plantilla original están en `public/retake/`. En el Studio de moda se asignan por función; puedes conservar los nombres de tus archivos. Si cambias el modelo o el look inicial, sustituye LA BASE Y LAS CUATRO PAREJAS como una familia coherente. Cambiar solo una pareja con otra base causa saltos al seleccionar otra rama.

Revisa: mismo encuadre en todos los vídeos; inicio de cada ida compatible con base; fin de ida compatible con inicio de vuelta; fin de vuelta compatible con base; pies y tamaño estables; sin fotogramas negros; los cuatro ciclos tres veces, también en móvil. Los tiempos de parada se configuran por clip: 0,08 s antes del final es solo una referencia inicial, y 0,18 s para Scene reverse es un ajuste del pack original, no una regla para tu material.

## Marca editable

No pongas `RUBIK SOTA 629554870` ni logos dentro del vídeo generado. El encabezado, teléfono, título, descripción y logos se gestionan desde el Studio y se superponen como elementos HTML. Así puedes cambiar la marca sin regenerar el vídeo.

Fuente original: https://github.com/Juanmaes83/video-states-website — textos de prompts bajo MIT. Ver atribución del pack para los recursos audiovisuales.
