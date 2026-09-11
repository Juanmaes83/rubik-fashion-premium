import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const pack=path.join(root,'assets/campaigns/blonde-v1');
const out=path.join(root,'output/blonde-qa');fs.mkdirSync(out,{recursive:true});
const run=(bin,args)=>execFileSync(bin,args,{stdio:['ignore','pipe','pipe'],maxBuffer:16*1024*1024});
const metadata=[];
for(let n=1;n<=4;n++){
  const raw=path.join(root,`output/blonde-masters/video-${n}.mp4`);
  const forward=path.join(pack,`video-${n}.mp4`),reverse=path.join(pack,`video-${n}-reverse.mp4`);
  const info=JSON.parse(run('ffprobe',['-v','error','-show_streams','-show_format','-of','json',raw]).toString());
  const v=info.streams.find(x=>x.codec_type==='video');
  if(!v||Math.abs(v.width/v.height-16/9)>.025)throw Error('Unexpected video geometry '+n);
  run('ffmpeg',['-y','-v','error','-i',raw,'-map','0:v:0','-an','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-g','24','-movflags','+faststart',forward]);
  run('ffmpeg',['-y','-v','error','-i',forward,'-vf','reverse','-an','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-g','24','-movflags','+faststart',reverse]);
  run('ffmpeg',['-y','-v','error','-i',forward,'-vf','fps=2,scale=480:-1,tile=4x3','-frames:v','1',path.join(out,`video-${n}-sheet.jpg`)]);
  run('ffmpeg',['-y','-v','error','-i',forward,'-frames:v','1',path.join(out,`video-${n}-first.png`)]);
  run('ffmpeg',['-y','-v','error','-sseof','-0.05','-i',forward,'-frames:v','1',path.join(out,`video-${n}-last.png`)]);
  metadata.push({n,width:v.width,height:v.height,fps:v.avg_frame_rate,duration:Number(info.format.duration),forwardBytes:fs.statSync(forward).size,reverseBytes:fs.statSync(reverse).size});
  console.log(`Prepared ${n}: ${v.width}x${v.height}, ${info.format.duration}s`);
}
fs.writeFileSync(path.join(out,'media-metadata.json'),JSON.stringify(metadata,null,2));
