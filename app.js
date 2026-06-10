(() => {
'use strict';

const VERSION = "webgl-wasm-v10.7-2026-06-10";
const TAP_MOVE_PX = 18;
const DOUBLE_TAP_MS = 320;
const DOUBLE_TAP_PX = 42;
const SWIPE_MIN_PX = 80;
const SWIPE_RATIO = 1.5;
const DRIVE_MIN = 0.0;
const DRIVE_MAX = 6.0;
const DRIVE_KEY_STEP = 0.28;
const DRIVE_HOLD_UNITS_PER_SEC = 1.75;
const RECIPE_SIZE = 24;
const RECIPE_SCHEMA = 2;
const RECORDING_FPS = 60;
const RECORDING_VIDEO_BPS = 16000000;
const MP4_RECORDING_TYPES_WITH_AUDIO = [
  'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
  'video/mp4;codecs=avc1.4D401E,mp4a.40.2',
  'video/mp4;codecs=h264,aac',
  'video/mp4'
];
const MP4_RECORDING_TYPES = [
  'video/mp4;codecs=avc1.42E01E',
  'video/mp4;codecs=avc1.4D401E',
  'video/mp4;codecs=h264',
  'video/mp4'
];
const BASE_EFFECT_NAMES = [
  "Prismatic Depth Underlay",
  "Feedback Cathedral Underlay",
  "Chromatic Undertow Underlay",
  "Spectral Glass Underlay",
  "Bass Gravity Underlay",
  "Flux Origami Underlay",
  "Camera Melt Underlay",
  "Entropy Loom Underlay",
  "Harmonic Parallax Underlay",
  "Rhythm Aperture Underlay",
  "Subsurface Neon Underlay",
  "Treble Filament Underlay",
  "Tonality Rift Underlay",
  "Motion Bloom Underlay",
  "Pixel Weather Underlay",
  "Phase Garden Underlay",
  "Luma Vortex Underlay",
  "Onset Prism Underlay",
  "Vector Mirage Underlay",
  "Signal Alchemy Underlay",
  "Prismatic Depth Overlay",
  "Feedback Cathedral Overlay",
  "Chromatic Undertow Overlay",
  "Spectral Glass Overlay",
  "Bass Gravity Overlay",
  "Flux Origami Overlay",
  "Camera Melt Overlay",
  "Entropy Loom Overlay",
  "Harmonic Parallax Overlay",
  "Rhythm Aperture Overlay",
  "Subsurface Neon Overlay",
  "Treble Filament Overlay",
  "Tonality Rift Overlay",
  "Motion Bloom Overlay",
  "Pixel Weather Overlay",
  "Phase Garden Overlay",
  "Luma Vortex Overlay",
  "Onset Prism Overlay",
  "Vector Mirage Overlay",
  "Signal Alchemy Overlay",
  "Prismatic Depth Warpfield",
  "Feedback Cathedral Warpfield",
  "Chromatic Undertow Warpfield",
  "Spectral Glass Warpfield",
  "Bass Gravity Warpfield",
  "Flux Origami Warpfield",
  "Camera Melt Warpfield",
  "Entropy Loom Warpfield",
  "Harmonic Parallax Warpfield",
  "Rhythm Aperture Warpfield",
  "Subsurface Neon Warpfield",
  "Treble Filament Warpfield",
  "Tonality Rift Warpfield",
  "Motion Bloom Warpfield",
  "Pixel Weather Warpfield",
  "Phase Garden Warpfield",
  "Luma Vortex Warpfield",
  "Onset Prism Warpfield",
  "Vector Mirage Warpfield",
  "Signal Alchemy Warpfield",
  "Prismatic Depth Reactor",
  "Feedback Cathedral Reactor",
  "Chromatic Undertow Reactor",
  "Spectral Glass Reactor",
  "Bass Gravity Reactor",
  "Flux Origami Reactor",
  "Camera Melt Reactor",
  "Entropy Loom Reactor",
  "Harmonic Parallax Reactor",
  "Rhythm Aperture Reactor",
  "Subsurface Neon Reactor",
  "Treble Filament Reactor",
  "Tonality Rift Reactor",
  "Motion Bloom Reactor",
  "Pixel Weather Reactor",
  "Phase Garden Reactor",
  "Luma Vortex Reactor",
  "Onset Prism Reactor",
  "Vector Mirage Reactor",
  "Signal Alchemy Reactor",
  "Prismatic Depth Displacer",
  "Feedback Cathedral Displacer",
  "Chromatic Undertow Displacer",
  "Spectral Glass Displacer",
  "Bass Gravity Displacer",
  "Flux Origami Displacer",
  "Camera Melt Displacer",
  "Entropy Loom Displacer",
  "Harmonic Parallax Displacer",
  "Rhythm Aperture Displacer",
  "Subsurface Neon Displacer",
  "Treble Filament Displacer",
  "Tonality Rift Displacer",
  "Motion Bloom Displacer",
  "Pixel Weather Displacer",
  "Phase Garden Displacer",
  "Luma Vortex Displacer",
  "Onset Prism Displacer",
  "Vector Mirage Displacer",
  "Signal Alchemy Displacer",
  "Prismatic Depth Mask Engine",
  "Feedback Cathedral Mask Engine",
  "Chromatic Undertow Mask Engine",
  "Spectral Glass Mask Engine",
  "Bass Gravity Mask Engine",
  "Flux Origami Mask Engine",
  "Camera Melt Mask Engine",
  "Entropy Loom Mask Engine",
  "Harmonic Parallax Mask Engine",
  "Rhythm Aperture Mask Engine",
  "Subsurface Neon Mask Engine",
  "Treble Filament Mask Engine",
  "Tonality Rift Mask Engine",
  "Motion Bloom Mask Engine",
  "Pixel Weather Mask Engine",
  "Phase Garden Mask Engine",
  "Luma Vortex Mask Engine",
  "Onset Prism Mask Engine",
  "Vector Mirage Mask Engine",
  "Signal Alchemy Mask Engine",
  "Prismatic Depth Depth Choir",
  "Feedback Cathedral Depth Choir",
  "Chromatic Undertow Depth Choir",
  "Spectral Glass Depth Choir",
  "Bass Gravity Depth Choir",
  "Flux Origami Depth Choir",
  "Camera Melt Depth Choir",
  "Entropy Loom Depth Choir",
  "Harmonic Parallax Depth Choir",
  "Rhythm Aperture Depth Choir",
  "Subsurface Neon Depth Choir",
  "Treble Filament Depth Choir",
  "Tonality Rift Depth Choir",
  "Motion Bloom Depth Choir",
  "Pixel Weather Depth Choir",
  "Phase Garden Depth Choir",
  "Luma Vortex Depth Choir",
  "Onset Prism Depth Choir",
  "Vector Mirage Depth Choir",
  "Signal Alchemy Depth Choir",
  "Prismatic Depth Mirror Well",
  "Feedback Cathedral Mirror Well",
  "Chromatic Undertow Mirror Well",
  "Spectral Glass Mirror Well",
  "Bass Gravity Mirror Well",
  "Flux Origami Mirror Well",
  "Camera Melt Mirror Well",
  "Entropy Loom Mirror Well",
  "Harmonic Parallax Mirror Well",
  "Rhythm Aperture Mirror Well",
  "Subsurface Neon Mirror Well",
  "Treble Filament Mirror Well",
  "Tonality Rift Mirror Well",
  "Motion Bloom Mirror Well",
  "Pixel Weather Mirror Well",
  "Phase Garden Mirror Well",
  "Luma Vortex Mirror Well",
  "Onset Prism Mirror Well",
  "Vector Mirage Mirror Well",
  "Signal Alchemy Mirror Well",
  "Prismatic Depth Plasma Lens",
  "Feedback Cathedral Plasma Lens",
  "Chromatic Undertow Plasma Lens",
  "Spectral Glass Plasma Lens",
  "Bass Gravity Plasma Lens",
  "Flux Origami Plasma Lens",
  "Camera Melt Plasma Lens",
  "Entropy Loom Plasma Lens",
  "Harmonic Parallax Plasma Lens",
  "Rhythm Aperture Plasma Lens",
  "Subsurface Neon Plasma Lens",
  "Treble Filament Plasma Lens",
  "Tonality Rift Plasma Lens",
  "Motion Bloom Plasma Lens",
  "Pixel Weather Plasma Lens",
  "Phase Garden Plasma Lens",
  "Luma Vortex Plasma Lens",
  "Onset Prism Plasma Lens",
  "Vector Mirage Plasma Lens",
  "Signal Alchemy Plasma Lens",
  "Prismatic Depth Feedback Bloom",
  "Feedback Cathedral Feedback Bloom",
  "Chromatic Undertow Feedback Bloom",
  "Spectral Glass Feedback Bloom",
  "Bass Gravity Feedback Bloom",
  "Flux Origami Feedback Bloom",
  "Camera Melt Feedback Bloom",
  "Entropy Loom Feedback Bloom",
  "Harmonic Parallax Feedback Bloom",
  "Rhythm Aperture Feedback Bloom",
  "Subsurface Neon Feedback Bloom",
  "Treble Filament Feedback Bloom",
  "Tonality Rift Feedback Bloom",
  "Motion Bloom Feedback Bloom",
  "Pixel Weather Feedback Bloom",
  "Phase Garden Feedback Bloom",
  "Luma Vortex Feedback Bloom",
  "Onset Prism Feedback Bloom",
  "Vector Mirage Feedback Bloom",
  "Signal Alchemy Feedback Bloom"
];
const BASE_COUNT = BASE_EFFECT_NAMES.length;
const BANK_SIZE = 10;
const STORE_KEY = 'neon_recursion_touchstone_v107_presets';

const ADJECTIVES = ['parallax','cathedral','spectral','subsurface','chromatic','molten','prismatic','feedback','vector','luminous','orbital','granular','recursive','tonal','electric','phase','signal','kinetic','holographic','rifted','diffuse','pressure','glass','nocturne','solarized','ribboned','dimensional','volatile','crystalline','magnetic','afterimage','resonant','filament','datamosh','aurora','strobing','liquid','stencil','radial','tectonic'];
const NOUNS = ['underlay','overlay','warpfield','reactor','displacer','mask','lens','corridor','engine','bloom','raster','vortex','scanner','lattice','aperture','mixer','cascade','matrix','prism','well','plane','veil','stratum','circuit','topology','glyph','halo','tunnel','ribbon','horizon','furnace','garden','loom','fresco','shifter','archive','mirage','constellation','transducer','reservoir'];
const TRAILERS = ['engine','bloom','machine','lens','field','apparatus','cathedral','orbit','array','furnace','reactor','well','corridor','storm','analyzer','rift','choir','terrain','portal','weather'];

const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 aPos;
out vec2 vUV;
void main(){
  vUV = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos,0.0,1.0);
}`;

const FRAG_SRC = `#version 300 es
precision highp float;
in vec2 vUV;
out vec4 outColor;
uniform sampler2D uPrev;
uniform sampler2D uCam;
uniform vec2 uRes;
uniform float uTime;
uniform int uEffect;
uniform vec4 uRecipe0;
uniform vec4 uRecipe1;
uniform vec4 uRecipe2;
uniform vec4 uRecipe3;
uniform vec4 uRecipe4;
uniform vec4 uRecipe5;
uniform vec4 uAudio0; // sub,bass,lowMid,mid
uniform vec4 uAudio1; // highMid,treble,air,specCentroid
uniform vec4 uAudio2; // domPeak,flux,onset,rhythm
uniform vec4 uAudio3; // tonal,zcr,energy,entropy
uniform float uFeedback;
uniform float uCameraBlend;
uniform float uIntensity;
uniform float uBankFlash;
uniform float uFlipAxisX; // reflect over screen/camera X axis: vertical flip
uniform float uFlipAxisY; // reflect over screen/camera Y axis: mirror left/right
uniform float uFlipAxisZ; // 180-degree Z-axis half-turn
uniform int uCamReady;

float sat(float x){return clamp(x,0.0,1.0);}
vec2 sat2(vec2 x){return clamp(x,vec2(0.0),vec2(1.0));}
vec3 sat3(vec3 x){return clamp(x,vec3(0.0),vec3(1.0));}
float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);float a=hash21(i),b=hash21(i+vec2(1,0)),c=hash21(i+vec2(0,1)),d=hash21(i+vec2(1,1));return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
float fbm(vec2 p){float v=0.0,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+17.1;a*=.52;}return v;}
vec3 cyc(float t, float s){return 0.52+0.48*cos(6.2831853*(vec3(0.0,.31,.67)+t+vec3(s,s*.37,s*.71)));}
vec3 modpal(vec3 x,float k){return fract(x*(.72+.24*k)+vec3(.03,.17,.29)*k);}
vec3 camAt(vec2 uv){
  uv=sat2(uv);
  if(uCamReady==1){
    vec2 cuv=uv;
    // Axis semantics: Y-axis reflection is mirror mode (left/right flip).
    // X-axis reflection is vertical flip. Z-axis is a 180-degree half-turn.
    float fx=step(0.5,uFlipAxisX);
    float fy=step(0.5,uFlipAxisY);
    float fz=step(0.5,uFlipAxisZ);
    cuv.x=mix(cuv.x,1.0-cuv.x,fy);
    cuv.y=mix(cuv.y,1.0-cuv.y,fx);
    cuv=mix(cuv,1.0-cuv,fz);
    return texture(uCam,sat2(cuv)).rgb;
  }
  float n=fbm(uv*vec2(6.0,4.0)+vec2(uTime*.09,uTime*.06));
  float bars=.5+.5*sin((uv.x*9.0+uv.y*3.0+n*2.4+uTime*.7)*6.283);
  return mix(cyc(n+uTime*.035,.2),cyc(bars+uv.y,.8),.45);
}
float luma(vec3 c){return dot(c,vec3(.299,.587,.114));}
float edgeCam(vec2 uv){vec2 px=1.0/uRes;float c=luma(camAt(uv));float gx=luma(camAt(uv+vec2(px.x,0.0)))-luma(camAt(uv-vec2(px.x,0.0)));float gy=luma(camAt(uv+vec2(0.0,px.y)))-luma(camAt(uv-vec2(0.0,px.y)));return sat(length(vec2(gx,gy))*5.8);}
float grid(vec2 uv,float scale){vec2 g=abs(fract(uv*scale)-.5);return 1.0-sat(min(g.x,g.y)*scale*2.0);}
float stripes(float x,float f,float w){return smoothstep(1.0-w,1.0, .5+.5*sin(x*f*6.2831853));}
float cells(vec2 uv,float scale){vec2 gv=fract(uv*scale)-.5;vec2 id=floor(uv*scale);float m=10.0;for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 o=vec2(float(x),float(y));vec2 r=o+vec2(hash21(id+o),hash21(id+o+9.2))-.5-gv;m=min(m,dot(r,r));}return sat(1.0-sqrt(m)*1.8);}
vec3 poster(vec3 c,float levels){return floor(c*levels)/max(1.0,levels-1.0);}
mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec3 prevAt(vec2 uv){return texture(uPrev,sat2(uv)).rgb;}
vec2 gradPrev(vec2 uv){vec2 px=1.5/uRes;float c=luma(prevAt(uv));return vec2(luma(prevAt(uv+vec2(px.x,0.0)))-c,luma(prevAt(uv+vec2(0.0,px.y)))-c);}
vec2 gradCam(vec2 uv){vec2 px=1.5/uRes;float c=luma(camAt(uv));return vec2(luma(camAt(uv+vec2(px.x,0.0)))-c,luma(camAt(uv+vec2(0.0,px.y)))-c);}
vec3 palette(float t,float seed,float spread){
  vec3 a=cyc(t+seed*.37,spread);
  vec3 b=cyc(t*.53+spread*.71+seed*.19,seed+.43);
  vec3 c=modpal(mix(a,b,.25+.55*noise(vec2(seed*9.1,spread*7.7))),seed+spread);
  c=mix(c,c*c*(2.15+.75*spread),.38+.35*sin(6.2831853*(t+seed)));
  float y=luma(c);
  c=mix(vec3(y),c,1.72+.35*spread);
  c=smoothstep(vec3(.055),vec3(.88),sat3(c));
  return sat3(pow(c,vec3(.66))*.96+.018);
}
float vignette(vec2 p){return smoothstep(1.35,.18,dot(p,p));}
vec3 chromaCam(vec2 uv, vec2 dir, float amount){vec2 d=dir*amount;return vec3(camAt(uv+d).r,camAt(uv).g,camAt(uv-d).b);}
float ringField(vec2 p,float scale,float phase){return .5+.5*sin((length(p)*scale+phase)*6.2831853);}
float blockHash(vec2 uv,vec2 scale,float t){return hash21(floor(uv*scale)+vec2(floor(t)));}

void main(){
  vec2 uv=vUV;
  vec2 asp=vec2(uRes.x/uRes.y,1.0);
  vec2 p=(uv-.5)*asp;
  float sub=uAudio0.x,bass=uAudio0.y,lowMid=uAudio0.z,mid=uAudio0.w;
  float highMid=uAudio1.x,treble=uAudio1.y,air=uAudio1.z,specCentroid=uAudio1.w;
  float domPeak=uAudio2.x,flux=uAudio2.y,onset=uAudio2.z,rhythm=uAudio2.w;
  float tonal=uAudio3.x,zcr=uAudio3.y,energy=uAudio3.z,aEntropy=uAudio3.w;
  float family=floor(sat(uRecipe0.x)*20.0);
  float mode=floor(sat(uRecipe0.y)*10.0);
  float seed=fract(uRecipe0.z*7.13+uRecipe1.x*11.71+float(uEffect)*0.017);
  float drive=clamp(uIntensity,0.0,6.0);
  float drive01=sat(drive/6.0);
  float ent=sat(aEntropy*.72 + uRecipe1.y*.52);
  float bright=sat(specCentroid*.8+air*.45+uRecipe2.y*.25);
  float pulse=sat(onset*.95+rhythm*.68+flux*.62);
  float tone=sat(tonal*.76+domPeak*.48+uRecipe3.z*.18);
  float lowReact=sat(sub*.52+bass*.88+lowMid*.28);
  float highReact=sat(highMid*.38+treble*.86+air*.58);
  float reaction=sat((lowReact*(.44+uRecipe2.x*.76)+mid*(.26+uRecipe2.y*.62)+highReact*(.24+uRecipe2.z*.72)+flux*(.34+uRecipe2.w*.58)+energy*.36)*(.48+drive*.22));
  float reactLane=floor(sat(uRecipe2.x)*8.0);
  float motionLane=floor(sat(uRecipe3.y)*8.0);
  float feedbackLane=floor(sat(uRecipe4.z)*8.0);
  float shapeLane=floor(sat(uRecipe5.y)*8.0);
  float audioA=lowReact;
  if(reactLane < .5) audioA=lowReact;
  else if(reactLane < 1.5) audioA=mid;
  else if(reactLane < 2.5) audioA=highReact;
  else if(reactLane < 3.5) audioA=flux;
  else if(reactLane < 4.5) audioA=onset;
  else if(reactLane < 5.5) audioA=rhythm;
  else if(reactLane < 6.5) audioA=tone;
  else audioA=ent;
  float audioB=highReact;
  if(reactLane < .5) audioB=flux;
  else if(reactLane < 1.5) audioB=lowReact;
  else if(reactLane < 2.5) audioB=rhythm;
  else if(reactLane < 3.5) audioB=treble;
  else if(reactLane < 4.5) audioB=domPeak;
  else if(reactLane < 5.5) audioB=energy;
  else if(reactLane < 6.5) audioB=zcr;
  else audioB=aEntropy;
  float wild=sat(audioA*(.48+uRecipe3.x*.86)+audioB*(.32+uRecipe4.y*.7)+pulse*(.24+.72*uRecipe5.w)+reaction*.36);
  float slam=pow(sat(onset*.64+audioA*(.28+.76*uRecipe4.w)+flux*.3),.55+uRecipe5.x*.75);
  float snap=step(.58+.28*uRecipe4.x,fract(uTime*(1.35+mode*.41+uRecipe1.z*5.2)+audioA*1.7+seed));
  float t=uTime*(.06+uRecipe1.z*.34+rhythm*.18+drive*.028);
  t += slam*(.16+uRecipe1.w*.5)+snap*audioB*(.08+.22*uRecipe5.z);

  vec2 prevGrad=gradPrev(uv);
  vec2 camGrad0=gradCam(uv);
  float prevEdge=sat(length(prevGrad)*9.0);
  float camEdge=sat(length(camGrad0)*8.0);
  vec3 rawCam=camAt(uv);
  float lum=luma(rawCam);
  float prevLum=luma(prevAt(uv));
  vec2 swirl=rot(seed*6.2831853+uTime*(.12+uRecipe4.x*.34))*vec2(-p.y,p.x);
  vec2 noiseFlow=vec2(noise(uv*(4.0+uRecipe1.w*15.0)+t),noise(uv*(5.0+uRecipe2.x*17.0)-t+4.7))-.5;
  vec2 laneVec=vec2(0.0);
  if(motionLane < .5) laneVec=normalize(p+vec2(.001,-.002))*audioA;
  else if(motionLane < 1.5) laneVec=vec2(-p.y,p.x)*audioB;
  else if(motionLane < 2.5) laneVec=vec2(sin((uv.y+t)*24.0),cos((uv.x-t)*21.0))*audioA;
  else if(motionLane < 3.5) laneVec=vec2(sign(noiseFlow.x),sign(noiseFlow.y))*slam;
  else if(motionLane < 4.5) laneVec=prevGrad*(2.0+audioA*3.5);
  else if(motionLane < 5.5) laneVec=camGrad0*(2.0+audioB*3.5);
  else if(motionLane < 6.5) laneVec=vec2(stripes(uv.y+t,18.0+audioA*60.0,.12)-.5,stripes(uv.x-t,14.0+audioB*50.0,.12)-.5);
  else laneVec=vec2(noise(vec2(uv.x+t,uv.y)*9.0),noise(vec2(uv.y-t,uv.x)*9.0))-.5;
  vec2 flow=prevGrad*(.42+uRecipe3.x*1.75)+camGrad0*(.44+uRecipe3.y*1.8)+swirl*(.1+uRecipe4.y*.7)+noiseFlow*(.18+ent*.62)+laneVec*(.08+wild*.62+slam*.35);
  flow=flow/(1.0+length(flow)*3.6)+vec2(.0003,-.0002);
  float depth=fbm((uv+flow*.03)*(1.4+uRecipe4.z*8.0)+vec2(seed*9.0,t*.7));
  depth=sat(depth*.54+prevEdge*.18+camEdge*.22+reaction*.3+wild*.24+slam*.14);
  float warpAmt=(.003+uRecipe1.w*.024+reaction*.038+pulse*.02+wild*.028+slam*.018+drive01*.04)*(0.6+uRecipe4.w*.9);
  vec2 radial=normalize(p+flow*.08+vec2(.0007,-.0004));
  vec2 parallax=(flow*(depth-.5)*1.25+radial*depth*(.22+.34*uRecipe5.x))*warpAmt;
  vec2 camUv=sat2(uv + parallax + noiseFlow*warpAmt*(.85+.5*uRecipe4.x));
  camUv=sat2(.5+(camUv-.5)*(1.0+(uRecipe5.x-.5)*.34*drive01));
  vec2 prevUv=sat2(uv - parallax*(.8+uRecipe5.y) + prevGrad*(.055+drive01*.12));
  vec3 prev=prevAt(prevUv);
  vec3 cam=chromaCam(camUv,flow,.0018+uRecipe1.w*.011+highReact*.012*drive01);
  float camLum=luma(cam);
  float localNoise=fbm((uv+parallax)*(2.0+mode*.55+uRecipe2.w*7.0)+vec2(t,seed*13.0));

  vec2 q=p+parallax*asp*2.0;
  float qAngle=(uRecipe3.w-.5)*3.14159+reaction*.6+wild*(uRecipe4.x-.5)*1.8;
  if(shapeLane < .5){
    q=rot(qAngle)*q*(1.0+wild*.42);
  } else if(shapeLane < 1.5){
    q=rot(qAngle+length(q)*(2.0+audioA*5.0))*q;
  } else if(shapeLane < 2.5){
    q+=vec2(sin(q.y*(7.0+mode)+t*4.0),cos(q.x*(6.0+mode)-t*3.0))*(.025+wild*.11);
    q=rot(qAngle)*q;
  } else if(shapeLane < 3.5){
    q=rot(qAngle)*vec2(q.x*(1.0+audioA*.65),q.y*(1.0-audioB*.38));
  } else if(shapeLane < 4.5){
    q=abs(fract((q+0.5)*(1.4+uRecipe5.x*3.0))-.5)*2.0-.5;
    q=rot(qAngle)*q;
  } else if(shapeLane < 5.5){
    float r=length(q)+.001;
    q=vec2(atan(q.y,q.x)/3.14159,r-.34)*(.9+wild*.8);
  } else if(shapeLane < 6.5){
    q=rot(qAngle)*q;
    q+=prevGrad*(.3+audioA*2.4)+camGrad0*(.2+audioB*2.0);
  } else {
    q=rot(qAngle+snap*audioA*2.4)*floor(q*(5.0+mode+wild*8.0))/(5.0+mode+wild*8.0);
  }
  float field=0.0;
  if(family < .5){
    field=ringField(q,4.0+mode*1.7+lowReact*8.0,t+seed)+grid(q+flow*.04,5.0+mode*2.0)*.35;
  } else if(family < 1.5){
    field=max(grid(q+vec2(sin(q.y*6.0+t),cos(q.x*5.0-t))*.05,7.0+mode*2.6+mid*16.0),ringField(q,10.0+tone*9.0,seed));
  } else if(family < 2.5){
    field=stripes(q.y+fbm(q*2.0+t)*.35,8.0+mode*3.0+flux*26.0,.14+reaction*.24);
  } else if(family < 3.5){
    field=sat(camEdge*.75+prevEdge*.55+stripes(q.x+q.y,18.0+highReact*30.0,.08));
  } else if(family < 4.5){
    field=sat(1.0-length(q)*(1.05+uRecipe4.z)+ringField(q,14.0+bass*18.0,t)*.55+lowReact*.35);
  } else if(family < 5.5){
    vec2 tri=abs(fract((q+flow*.08)*(4.0+mode))-0.5);
    field=sat((tri.x+tri.y)*1.2+prevEdge*.5+pulse*.45);
  } else if(family < 6.5){
    field=smoothstep(.15,.9,localNoise+camLum*.35+flux*.25)-smoothstep(.82,1.0,prevLum);
  } else if(family < 7.5){
    field=step(.46+uRecipe5.z*.28,noise(q*(12.0+mode*3.0)+t*3.0))*(.35+.65*ent)+prevEdge*.45;
  } else if(family < 8.5){
    field=max(cells(uv+flow*.1,3.0+mode+energy*9.0),ringField(q,6.0+mode*1.5,t+depth));
  } else if(family < 9.5){
    float checker=step(.5,fract(floor((uv.x+reaction*.06)*(8.0+mode*2.0))+floor((uv.y+rhythm*.05)*(6.0+mode*1.5))));
    field=mix(checker,1.0-checker,step(.5,noise(vec2(mode,seed))))*(.35+.65*pulse);
  } else if(family < 10.5){
    field=smoothstep(.25,.95,fbm(q*(2.5+mode*.4)-flow*.2+t)+camEdge*.4+lowReact*.25);
  } else if(family < 11.5){
    field=max(stripes(q.x+sin(q.y*9.0+t)*.08,22.0+treble*58.0,.055+air*.12),prevEdge*.65);
  } else if(family < 12.5){
    float rift=abs(q.y+.2*sin(q.x*(5.0+mode)+tone*5.0+t)-.12*cos(q.x*3.0+seed*6.0));
    field=smoothstep(.23,.0,rift)+camEdge*.35+tone*.2;
  } else if(family < 13.5){
    field=sat(prevEdge*(1.3+drive01*2.0)+smoothstep(.55,.95,depth+onset*.35));
  } else if(family < 14.5){
    field=blockHash(uv+flow*.05,vec2(7.0+mode*2.0,5.0+mode),uTime*(.4+rhythm*6.0))*(.3+.7*energy)+camEdge*.35;
  } else if(family < 15.5){
    field=max(cells(q+vec2(sin(t),cos(t))*.08,5.0+mode*.8),stripes(q.x+q.y,10.0+zcr*30.0,.18));
  } else if(family < 16.5){
    field=ringField(q+flow*.18,9.0+mode*2.0+zcr*16.0,t+prevLum)+camEdge*.55;
  } else if(family < 17.5){
    field=sat(stripes(q.x,12.0+highReact*40.0,.11)+stripes(q.y,12.0+lowReact*35.0,.11)+onset*.45);
  } else if(family < 18.5){
    field=sat(fbm(q*(4.0+mode*.9)+prevGrad*3.0+t)*.65+abs(dot(flow,normalize(q+vec2(0.001))))*.55+flux*.2);
  } else {
    field=sat(localNoise*.45+cells(uv+parallax*.7,4.0+mode*.7)*.45+grid(q,10.0+mode*2.0)*.38+tone*.22);
  }
  float reactiveMask=0.0;
  if(reactLane < .5){
    reactiveMask=ringField(q,6.0+audioA*26.0,t+slam);
    field=sat(field*(.72+.55*audioA)+reactiveMask*(.18+.42*slam));
  } else if(reactLane < 1.5){
    reactiveMask=grid(q+flow*(.06+wild*.18),8.0+audioA*30.0);
    field=max(field,reactiveMask*(.25+.75*wild));
  } else if(reactLane < 2.5){
    reactiveMask=stripes(q.x+q.y+prevLum*.3,18.0+audioA*70.0,.05+.16*uRecipe5.z);
    field=mix(field,1.0-field,reactiveMask*slam*.65);
  } else if(reactLane < 3.5){
    reactiveMask=step(.5+.22*(uRecipe4.w-.5),noise((uv+flow*.2)*(10.0+audioA*34.0)+t*4.0));
    field=sat(field*.52+reactiveMask*(.25+.75*flux)+prevEdge*.26);
  } else if(reactLane < 4.5){
    reactiveMask=smoothstep(.18,.0,abs(length(q)-(.18+.42*audioA+.12*sin(t*6.0))));
    field=sat(max(field,reactiveMask)+slam*.34);
  } else if(reactLane < 5.5){
    reactiveMask=cells(q+vec2(sin(t),cos(t))*(.08+audioA*.18),4.0+audioB*16.0);
    field=mix(field,reactiveMask,sat(.28+audioA*.68));
  } else if(reactLane < 6.5){
    reactiveMask=smoothstep(.15,.82,abs(dot(normalize(q+vec2(.002)),normalize(flow+vec2(.003)))));
    field=sat(field*.6+reactiveMask*(.22+.58*tone)+prevLum*.18);
  } else {
    reactiveMask=fbm(q*(3.0+audioA*9.0)+prevGrad*8.0+t*2.0);
    field=sat(abs(field-reactiveMask)*1.35+camEdge*(.15+.45*audioB));
  }
  float modeBias=fract(mode*.173+seed);
  if(mode < 1.5){
    field=smoothstep(.22,.88,field);
  } else if(mode < 2.5){
    field=1.0-smoothstep(.2,.95,field);
  } else if(mode < 3.5){
    field=sat(field*.62+camEdge*.38);
  } else if(mode < 4.5){
    field=smoothstep(.36,.64,field);
  } else if(mode < 5.5){
    field=sat(abs(field-.5)*1.8);
  } else if(mode < 6.5){
    field=sat(field*.45+depth*.35+prevLum*.2);
  } else if(mode < 7.5){
    field=sat(field*.75*(.45+.55*pulse)+camLum*.25);
  } else if(mode < 8.5){
    field=step(.5+.18*(modeBias-.5),field);
  } else {
    field=sat(field*.55+localNoise*.32+tone*.18);
  }
  field=sat(field);

  float gate=smoothstep(.28,.88,field);
  float spark=step(.88-.2*bright,noise((uv+flow*.13)*uRes*.028+t*5.0+seed*19.0))*(.1+.52*camEdge);
  vec3 palA=palette(field+seed+reaction*.42,uRecipe1.x,uRecipe1.y);
  vec3 palB=palette(depth+uRecipe2.z+bright*.55,uRecipe3.z,uRecipe4.w);
  vec3 palC=palette(localNoise+prevLum*.5+seed*.31,uRecipe4.x,uRecipe4.y);
  vec3 under=mix(palA,palB,.22+.48*uRecipe2.y);
  under=modpal(under*(.3+1.5*gate+.48*drive01)+palC*(.06+.2*ent+.14*reaction)+spark*palB*.26,seed+tone);
  under*=.28+1.16*gate+.24*vignette(p)+.14*reaction;

  float posterLevels=2.0+floor(uRecipe5.z*8.0+drive01*3.0);
  vec3 camWarped=mix(cam,poster(cam,posterLevels),uRecipe3.w*(.14+.28*reaction));
  camWarped=mix(camWarped,1.0-camWarped.bgr,smoothstep(.8,.995,uRecipe5.w)*(.12+.34*reaction));
  camWarped=modpal(mix(camWarped,camWarped*mix(vec3(1.06),palB*1.45,.55),.18+.34*uRecipe4.x+.12*drive01),seed+camLum);
  float camAlpha=sat(.34+uCameraBlend*(.22+.24*uRecipe4.y)+camEdge*(.16+.28*uRecipe3.x)+lum*.18-depth*.05-drive01*.08-wild*(.03+.1*uRecipe2.w)+slam*.04);

  float veil=stripes((uv.x+uv.y)*(.8+uRecipe5.x)+field*.22,16.0+mode*3.0+highReact*34.0,.08+.18*uRecipe5.y);
  float alphaA=sat(gate*(.34+.6*uRecipe2.w)+prevEdge*(.14+.46*uRecipe3.y)+pulse*.26);
  float alphaB=sat(veil*(.28+.52*bright)+camEdge*.28+reaction*.22+spark*.24);
  float overlayAlpha=sat(mix(alphaA,alphaB,uRecipe5.y)*(.34+.56*drive01)+wild*(.08+.22*uRecipe4.w)+snap*slam*.18);
  if(mode < 1.5) overlayAlpha*=.72;
  else if(mode < 2.5) overlayAlpha*=1.04;
  else if(mode < 3.5) overlayAlpha*=1.38;
  else if(mode < 4.5) overlayAlpha*=.74+.42*pulse;
  else if(mode < 5.5) overlayAlpha*=1.18*smoothstep(.22,.78,field);
  else if(mode < 6.5) overlayAlpha*=.66+.42*prevEdge;
  else if(mode < 7.5) overlayAlpha*=.46+.7*camEdge;
  else if(mode < 8.5) overlayAlpha*=1.08;
  else overlayAlpha*=.82+.32*tone;
  overlayAlpha=sat(overlayAlpha);
  vec3 overlay=palette(veil+prevLum+seed*.7,uRecipe2.x,uRecipe5.w);
  overlay=modpal(mix(overlay,prev.bgr*(.94+bright*.82)+palA*.48,uRecipe4.z),seed+bright);

  vec3 layered=mix(under,camWarped,camAlpha);
  layered=mix(layered,overlay,overlayAlpha);
  layered=mix(layered,rawCam*(.56+.42*lum)+palA*.22,.06+.1*(1.0-overlayAlpha));
  float feedbackPersonality=.75;
  if(feedbackLane < .5) feedbackPersonality=.35+.7*lowReact;
  else if(feedbackLane < 1.5) feedbackPersonality=.4+1.2*highReact;
  else if(feedbackLane < 2.5) feedbackPersonality=.25+1.6*flux;
  else if(feedbackLane < 3.5) feedbackPersonality=.15+1.8*slam;
  else if(feedbackLane < 4.5) feedbackPersonality=.55+1.1*rhythm;
  else if(feedbackLane < 5.5) feedbackPersonality=.3+1.4*prevEdge;
  else if(feedbackLane < 6.5) feedbackPersonality=.3+1.3*camEdge;
  else feedbackPersonality=.2+1.5*wild;
  float feedbackWarp=(.004+.021*uRecipe1.w+.028*drive01)*(.24+.68*reaction+.42*wild)*feedbackPersonality;
  vec3 displacedPrev=prevAt(sat2(uv+flow*feedbackWarp+prevGrad*(.035+.12*uRecipe5.x)+laneVec*(.004+.018*wild)));
  float fb=sat(uFeedback*(.45+.18*feedbackPersonality)+.1*uRecipe5.w+.04*lowReact+.08*wild-.04*onset);
  vec3 rec=mix(layered,displacedPrev*(.64+.24*fb)+layered*(.42+.24*reaction),.2+.28*fb);
  rec=mix(rec,layered,.24+.32*onset+.1*drive01);
  vec3 folded=fract(rec*(1.08+.22*bright+.14*drive01)+palette(seed+localNoise*.25,uRecipe3.x,uRecipe3.y)*(.032+.052*ent+.026*drive01));
  rec=mix(rec,folded,.44+.22*drive01+.12*ent);
  rec=mix(rec,layered,.08+.08*(1.0-overlayAlpha)+.12*onset);
  rec=mix(rec,rawCam,.035+.06*uCameraBlend*(1.0-gate));
  rec*=.58+.3*vignette(p)+.26*camEdge+.2*drive01;
  float y=luma(rec);
  rec=mix(vec3(y),rec,1.75+.45*drive01+.28*bright);
  rec=clamp((rec-.5)*(1.62+.58*drive01+.28*reaction)+.5,0.0,1.0);
  rec=smoothstep(vec3(.09),vec3(.9),rec);
  rec=pow(sat3(rec),vec3(.9+.08*tone-.07*drive01));
  outColor=vec4(sat3(rec),1.0);
}`;

const SCREEN_FRAG_SRC = `#version 300 es
precision highp float;
in vec2 vUV;
out vec4 outColor;
uniform sampler2D uTex;
uniform float uTime;
uniform float uBankFlash;
uniform float uIntensity;
float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
vec3 cyc(float t){return 0.52+0.48*cos(6.2831853*(vec3(0.0,.31,.67)+t));}
void main(){
  vec3 c=texture(uTex,vUV).rgb;
  float f=clamp(uBankFlash,0.0,1.0);
  float drive=clamp(uIntensity/6.0,0.0,1.0);
  vec2 p=vUV-.5;
  float ring=smoothstep(.42,.0,abs(length(p)-(.18+.18*f)));
  float scan=smoothstep(.96,1.0,sin((vUV.y*34.0+uTime*14.0)*6.2831853));
  vec3 flash=cyc(length(p)*1.7+uTime*.9+hash21(floor(vUV*12.0))*.08);
  c=mix(c, fract(c*.78+flash*.62), f*(.25+.45*ring+.2*scan));
  c=mix(c, clamp(c*(.96+.18*drive)+cyc(vUV.x+vUV.y+uTime*.04)*(.035+.085*drive),0.0,1.0), .06+.12*drive);
  float y=dot(c,vec3(.299,.587,.114));
  c=mix(vec3(y),c,1.34+.6*drive);
  c=clamp((c-.5)*(1.22+.46*drive)+.5,0.0,1.0);
  c=pow(clamp(c,0.0,1.0), vec3(.98-.1*drive));
  outColor=vec4(c,1.0);
}`;

class NeonApp {
  constructor() {
    this.canvas = document.getElementById('gl');
    this.video = document.getElementById('camera');
    this.hud = document.getElementById('hud');
    this.boot = document.getElementById('boot');
    this.bootStatus = document.getElementById('bootStatus');
    this.gl = null;
    this.started = false;
    this.useDevices = true;
    this.effect = 0;
    this.keyBank = 0;
    this.feedback = 0.942;
    this.cameraBlend = 0.46;
    this.intensity = 1.25;
    this.randomizerSeedOffset = 0;
    this.bankFlash = 0;
    this.flipAxisX = 1;
    this.flipAxisY = 1;
    this.flipAxisZ = 0;
    this.userPresets = this.loadGenerated();
    this.wasm = null;
    this.audioCtx = null;
    this.analyser = null;
    this.audioDest = null;
    this.audioSources = [];
    this.audioInputCount = 0;
    this.cameraStream = null;
    this.micStream = null;
    this.systemCaptureStream = null;
    this.systemAudioStream = null;
    this.systemAudioPromise = null;
    this.freq = null;
    this.timeData = null;
    this.prevFreq = null;
    this.audio = new Float32Array(16);
    this.audioSmooth = new Float32Array(16);
    this.sampleRate = 48000;
    this.cameraReady = false;
    this.hudVisible = true;
    this.pointerDown = null;
    this.driveHold = null;
    this.baseRecipeCache = new Map();
    this.lastTap = null;
    this.pendingTapTimer = 0;
    this.lastSwipe = 0;
    this.mediaRecorder = null;
    this.recordingStream = null;
    this.recordingCanvas = null;
    this.recordingCtx = null;
    this.recordingCanvasTrack = null;
    this.recordedChunks = [];
    this.recordingBusy = false;
    this.downloadUrls = new Set();
    this.frameSerial = 0;
    this.lastT = performance.now();
  }

  totalEffects() { return BASE_COUNT + this.userPresets.length; }
  bankCount() { return Math.max(1, Math.ceil(this.totalEffects() / BANK_SIZE)); }
  currentName() { return this.effect < BASE_COUNT ? BASE_EFFECT_NAMES[this.effect] : this.userPresets[this.effect - BASE_COUNT]?.name || 'generated-neon-preset'; }
  isGeneratedEffect() { return this.effect >= BASE_COUNT; }

  loadGenerated() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) return [];
      return arr.map((p, i) => this.normalizePreset(p, i)).filter(Boolean);
    } catch { return []; }
  }
  saveGenerated() { localStorage.setItem(STORE_KEY, JSON.stringify(this.userPresets)); }

  async loadWasm() {
    try {
      const res = await fetch('touchstone.wasm');
      let obj;
      try { obj = await WebAssembly.instantiateStreaming(res); }
      catch { obj = await WebAssembly.instantiate(await (await fetch('touchstone.wasm')).arrayBuffer()); }
      this.wasm = obj.instance.exports;
      return true;
    } catch (err) {
      console.warn('WASM forge unavailable, JS fallback will be used:', err);
      return false;
    }
  }

  recipeWord(seed, serial, slot) {
    seed >>>= 0; serial >>>= 0; slot >>>= 0;
    if (this.wasm && this.wasm.recipe_word) return this.wasm.recipe_word(seed, serial, slot) >>> 0;
    let x = (seed ^ 0x9e3779b9 ^ Math.imul(serial,0x85ebca6b) ^ Math.imul(slot+1,0xc2b2ae35)) >>> 0;
    x ^= x >>> 16; x = Math.imul(x,0x7feb352d) >>> 0; x ^= x >>> 15; x = Math.imul(x,0x846ca68b) >>> 0; x ^= x >>> 16;
    return x >>> 0;
  }
  wordFloat(seed, serial, slot) { return this.recipeWord(seed, serial, slot) / 4294967295; }
  mix32(x) {
    x >>>= 0;
    x ^= x >>> 16; x = Math.imul(x, 0x7feb352d) >>> 0;
    x ^= x >>> 15; x = Math.imul(x, 0x846ca68b) >>> 0;
    x ^= x >>> 16;
    return x >>> 0;
  }
  randomSeed() {
    const a = new Uint32Array(2);
    if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(a);
    const t = Math.floor(performance.now() * 1000) >>> 0;
    const r = Math.floor(Math.random() * 0xffffffff) >>> 0;
    return this.mix32(a[0] ^ Math.imul(a[1] || r, 0x9e3779b9) ^ t ^ Math.imul(this.randomizerSeedOffset | 0, 0x85ebca6b));
  }
  makeRecipe(seed, serial) {
    const recipe = [];
    for (let i=0;i<RECIPE_SIZE;i++) recipe.push(this.wordFloat(seed, serial, i));
    const family = this.recipeWord(seed, serial, 101) % 20;
    const mode = this.recipeWord(seed, serial, 102) % 10;
    const reactionLane = this.recipeWord(seed, serial, 103) % 8;
    const motionLane = this.recipeWord(seed, serial, 104) % 8;
    const shapeLane = this.recipeWord(seed, serial, 105) % 8;
    const feedbackLane = this.recipeWord(seed, serial, 106) % 8;
    recipe[0] = (family + .18 + recipe[0] * .64) / 20;
    recipe[1] = (mode + .16 + recipe[1] * .68) / 10;
    recipe[2] = Math.pow(recipe[2], .62);
    recipe[3] = Math.pow(recipe[3], .42);
    recipe[4] = Math.pow(recipe[4], .72);
    recipe[5] = .08 + recipe[5] * .92;
    recipe[7] = Math.pow(recipe[7], .5);
    recipe[8] = (reactionLane + .12 + recipe[8] * .76) / 8;
    recipe[10] = recipe[10] < .33 ? recipe[10] * .42 : (recipe[10] < .66 ? .38 + recipe[10] * .22 : .72 + recipe[10] * .22);
    recipe[12] = recipe[12] < .5 ? recipe[12] * .48 : .68 + recipe[12] * .28;
    recipe[13] = (motionLane + .1 + recipe[13] * .78) / 8;
    recipe[15] = Math.pow(recipe[15], .65);
    recipe[16] = recipe[16] < .5 ? recipe[16] * .5 : .65 + recipe[16] * .3;
    recipe[18] = (feedbackLane + .1 + recipe[18] * .78) / 8;
    recipe[20] = Math.pow(recipe[20], .78);
    recipe[21] = (shapeLane + .1 + recipe[21] * .78) / 8;
    recipe[23] = recipe[23] < .5 ? recipe[23] * .36 : .7 + recipe[23] * .24;
    return recipe.map(v => Math.max(0, Math.min(.999999, +v || 0)));
  }
  normalizeRecipe(recipe, seed, serial) {
    const fallback = this.makeRecipe(seed >>> 0, serial >>> 0);
    const out = new Array(RECIPE_SIZE);
    for (let i=0;i<RECIPE_SIZE;i++) {
      const v = Array.isArray(recipe) ? +recipe[i] : NaN;
      out[i] = Number.isFinite(v) ? Math.max(0, Math.min(.999999, v)) : fallback[i];
    }
    return out;
  }
  normalizePreset(p, index=0) {
    if (!p || typeof p.name !== 'string') return null;
    const serial = (+p.serial || index + 1) >>> 0;
    const seed = (+p.seed || this.recipeWord(0x71070000, serial, 90)) >>> 0;
    return {
      name: p.name,
      seed,
      serial,
      recipe: this.normalizeRecipe(p.recipe, seed, serial),
      createdAt: typeof p.createdAt === 'string' ? p.createdAt : new Date().toISOString(),
      version: p.version || VERSION,
      schema: +p.schema || RECIPE_SCHEMA,
      engine: p.engine || 'layered-reactive-v10.7'
    };
  }
  baseRecipe(index) {
    const cacheKey = `${index}:${this.randomizerSeedOffset}`;
    if (this.baseRecipeCache.has(cacheKey)) return this.baseRecipeCache.get(cacheKey);
    const seedOffset = this.randomizerSeedOffset | 0;
    const seed = this.mix32(Math.imul(index + 1, 0x9e3779b9) ^ Math.imul(seedOffset, 0x85ebca6b)) >>> 0;
    const serial = (0x71070000 + index + 1 + Math.imul(seedOffset, 0x45d9f3b)) >>> 0;
    const recipe = this.makeRecipe(seed, serial);
    const wrap = (value, size) => ((value % size) + size) % size;
    const family = wrap(Math.imul(index, 7) + Math.floor(index / 10) * 3 + Math.imul(seedOffset, 11), 20);
    const mode = wrap(Math.imul(index, 3) + Math.floor(index / 20) + Math.floor(index / 5) + Math.imul(seedOffset, 7), 10);
    const reactionLane = wrap(Math.imul(index, 5) + Math.floor(index / 4) + Math.imul(seedOffset, 3), 8);
    const motionLane = wrap(Math.imul(index, 3) + Math.floor(index / 3) + Math.imul(seedOffset, 5), 8);
    const shapeLane = wrap(Math.imul(index, 7) + Math.floor(index / 2) + Math.imul(seedOffset, 7), 8);
    const feedbackLane = wrap(Math.imul(index, 11) + Math.floor(index / 6) + Math.imul(seedOffset, 9), 8);
    recipe[0] = (family + .37 + recipe[2] * .2) / 20;
    recipe[1] = (mode + .29 + recipe[3] * .25) / 10;
    recipe[8] = (reactionLane + .18 + recipe[9] * .64) / 8;
    recipe[13] = (motionLane + .16 + recipe[14] * .68) / 8;
    recipe[18] = (feedbackLane + .16 + recipe[19] * .68) / 8;
    recipe[21] = (shapeLane + .18 + recipe[22] * .64) / 8;
    recipe[6] = (recipe[6] + ((index % 5) / 4)) * .5;
    recipe[12] = (recipe[12] + ((Math.floor(index / 10) % 4) / 3)) * .5;
    this.baseRecipeCache.set(cacheKey, recipe);
    return recipe;
  }
  reseedRecipe(recipe, seed, serial) {
    const offset = this.randomizerSeedOffset | 0;
    if (!offset) return recipe;
    const remixSeed = this.mix32((seed >>> 0) ^ Math.imul(offset, 0x9e3779b9) ^ Math.imul(serial >>> 0, 0x85ebca6b));
    const remix = this.makeRecipe(remixSeed, ((serial >>> 0) + Math.imul(offset, 0xc2b2ae35)) >>> 0);
    const out = recipe.slice();
    for (let i=0;i<RECIPE_SIZE;i++) {
      const lanePush = (i === 0 || i === 1 || i === 8 || i === 13 || i === 18 || i === 21) ? .82 : (.28 + .5 * remix[(i + 7) % RECIPE_SIZE]);
      out[i] = out[i] * (1 - lanePush) + remix[i] * lanePush;
    }
    return out.map(v => Math.max(0, Math.min(.999999, +v || 0)));
  }
  recipeLanes(recipe) {
    const r = recipe || [];
    return [
      Math.floor(Math.max(0, Math.min(.999999, +r[0] || 0)) * 20),
      Math.floor(Math.max(0, Math.min(.999999, +r[1] || 0)) * 10),
      Math.floor(Math.max(0, Math.min(.999999, +r[8] || 0)) * 8),
      Math.floor(Math.max(0, Math.min(.999999, +r[13] || 0)) * 8),
      Math.floor(Math.max(0, Math.min(.999999, +r[18] || 0)) * 8),
      Math.floor(Math.max(0, Math.min(.999999, +r[21] || 0)) * 8)
    ];
  }
  laneDistance(a, b) {
    let d = 0;
    for (let i=0;i<a.length;i++) d += a[i] === b[i] ? 0 : (i < 2 ? 2.2 : 1.0);
    return d;
  }
  recipeNoveltyScore(recipe) {
    const lanes = this.recipeLanes(recipe);
    let score = 99;
    for (let i=0;i<BASE_COUNT;i++) score = Math.min(score, this.laneDistance(lanes, this.recipeLanes(this.baseRecipe(i))));
    for (const preset of this.userPresets) score = Math.min(score, this.laneDistance(lanes, this.recipeLanes(preset.recipe)));
    return score;
  }
  generatedName(seed, serial) {
    for (let tries=0; tries<64; tries++) {
      const s = (seed + Math.imul(tries+1, 0x9e3779b9)) >>> 0;
      const a = ADJECTIVES[this.recipeWord(s, serial, 41) % ADJECTIVES.length];
      const n = NOUNS[this.recipeWord(s, serial, 42) % NOUNS.length];
      const tr = TRAILERS[this.recipeWord(s, serial, 43) % TRAILERS.length];
      const name = `${a}-${n}-${tr}`;
      if (!this.userPresets.some(p => p.name === name)) return name;
    }
    return `touchstone-${serial}-${(seed>>>0).toString(16)}`;
  }
  forgePreset() {
    const serial = this.userPresets.length + 1;
    let seed = 0, recipe = null, bestScore = -1;
    for (let attempt=0; attempt<18; attempt++) {
      const candidateSeed = this.mix32(this.randomSeed() ^ Math.imul(serial + attempt + 1, 0x9e3779b9) ^ Math.imul(this.randomizerSeedOffset | 0, 0xc2b2ae35));
      const candidateSerial = (serial + Math.imul(attempt + 1, 4099) + (this.randomSeed() & 0xffff)) >>> 0;
      const candidateRecipe = this.makeRecipe(candidateSeed, candidateSerial);
      const score = this.recipeNoveltyScore(candidateRecipe) + this.wordFloat(candidateSeed, candidateSerial, 191) * .01;
      if (score > bestScore) { seed = candidateSeed; recipe = candidateRecipe; bestScore = score; }
    }
    const name = this.generatedName(seed, serial);
    const p = { name, seed, serial, recipe, createdAt: new Date().toISOString(), version: VERSION, schema: RECIPE_SCHEMA, engine: 'layered-reactive-v10.7' };
    this.userPresets.push(p);
    this.saveGenerated();
    this.effect = BASE_COUNT + this.userPresets.length - 1;
    this.keyBank = Math.floor(this.effect / BANK_SIZE);
    this.bankFlash = 1.0;
    this.updateTitle();
  }
  nukeCurrent() {
    if (!this.isGeneratedEffect()) { this.bankFlash = 1; return; }
    const idx = this.effect - BASE_COUNT;
    this.userPresets.splice(idx, 1);
    this.saveGenerated();
    const total = this.totalEffects();
    this.effect = Math.min(BASE_COUNT + idx, total - 1);
    if (this.effect < BASE_COUNT) this.effect = Math.min(BASE_COUNT - 1, total - 1);
    this.keyBank = Math.min(Math.floor(this.effect / BANK_SIZE), this.bankCount() - 1);
    this.bankFlash = 1.0;
    this.updateTitle();
  }
  exportGenerated() {
    const blob = new Blob([JSON.stringify({ version: VERSION, schema: RECIPE_SCHEMA, engine: 'layered-reactive-v10.7', presets: this.userPresets }, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'neon_recursion_v10_7_presets.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async importGenerated(file) {
    const text = await file.text();
    const data = JSON.parse(text);
    const arr = Array.isArray(data) ? data : data.presets;
    if (!Array.isArray(arr)) throw new Error('No presets array found');
    const byName = new Map(this.userPresets.map(p => [p.name, p]));
    arr.forEach((p, i) => {
      const normalized = this.normalizePreset(p, i);
      if (normalized) byName.set(normalized.name, normalized);
    });
    this.userPresets = [...byName.values()];
    this.saveGenerated();
    this.bankFlash = 1;
  }

  async start(useDevices=true) {
    if (this.started) return;
    this.started = true; this.useDevices = useDevices;
    let systemAudioPromise = null;
    if (useDevices) {
      this.bootStatus.textContent = 'Choose a screen/tab and enable audio sharing for system audio...';
      systemAudioPromise = this.requestSystemAudioCapture();
    }
    this.bootStatus.textContent = 'Loading WASM + WebGL...';
    await this.loadWasm();
    this.initGL();
    if (useDevices) await this.initDevices(systemAudioPromise);
    else this.bootStatus.textContent = 'Running fallback synthetic camera/audio.';
    this.installEvents();
    this.resize();
    this.boot.style.display = 'none';
    this.updateTitle();
    requestAnimationFrame((t) => this.frame(t));
  }

  async initDevices(systemAudioPromise=null) {
    if (systemAudioPromise) {
      this.bootStatus.textContent = 'Waiting for shared system/tab audio selection...';
      await systemAudioPromise;
    }
    try {
      this.bootStatus.textContent = 'Requesting camera + microphone...';
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: { echoCancellation:false, noiseSuppression:false, autoGainControl:false } });
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length) {
        const vstream = new MediaStream(videoTracks);
        this.cameraStream = vstream;
        this.video.srcObject = vstream;
        await this.video.play();
        this.cameraReady = true;
      }
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length) {
        this.micStream = new MediaStream(audioTracks);
        this.watchAudioTracks(this.micStream);
      }
      this.connectAudioInputs();
    } catch (err) {
      console.warn('Device startup failed; using procedural fallback.', err);
      this.cameraReady = false;
      this.connectAudioInputs();
    }
  }

  liveAudioTracks(stream) {
    return stream ? stream.getAudioTracks().filter(track => track.readyState === 'live') : [];
  }
  hasLiveSystemAudio() { return this.liveAudioTracks(this.systemAudioStream).length > 0; }
  hasLiveMicAudio() { return this.liveAudioTracks(this.micStream).length > 0; }
  audioInputLabel() {
    const labels = [];
    if (this.hasLiveMicAudio()) labels.push('mic');
    if (this.hasLiveSystemAudio()) labels.push('system');
    return labels.length ? labels.join('+') : 'synthetic';
  }
  watchAudioTracks(stream) {
    for (const track of this.liveAudioTracks(stream)) {
      track.addEventListener('ended', () => this.connectAudioInputs(), { once:true });
    }
  }
  ensureAudioGraph() {
    if (this.audioCtx) return true;
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return false;
    this.audioCtx = new AudioCtor();
    this.sampleRate = this.audioCtx.sampleRate;
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.58;
    this.audioDest = this.audioCtx.createMediaStreamDestination();
    this.freq = new Float32Array(this.analyser.frequencyBinCount);
    this.prevFreq = new Float32Array(this.analyser.frequencyBinCount);
    this.timeData = new Float32Array(this.analyser.fftSize);
    return true;
  }
  connectAudioInputs() {
    const streams = [this.micStream, this.systemAudioStream].filter(stream => this.liveAudioTracks(stream).length);
    this.audioInputCount = streams.length;
    for (const src of this.audioSources) {
      try { src.disconnect(); } catch {}
    }
    this.audioSources = [];
    if (!streams.length || !this.ensureAudioGraph()) return;
    for (const stream of streams) {
      const src = this.audioCtx.createMediaStreamSource(stream);
      src.connect(this.analyser);
      src.connect(this.audioDest);
      this.audioSources.push(src);
    }
    if (this.audioCtx.state === 'suspended') void this.audioCtx.resume().catch(() => {});
  }
  async resumeAudioGraph() {
    if (!this.audioCtx || this.audioCtx.state !== 'suspended') return;
    try { await this.audioCtx.resume(); } catch (err) { console.warn('Audio resume failed:', err); }
  }
  requestSystemAudioCapture() {
    if (this.hasLiveSystemAudio()) return Promise.resolve(this.systemAudioStream);
    if (this.systemAudioPromise) return this.systemAudioPromise;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      console.warn('System/tab audio sharing is not available in this browser.');
      return Promise.resolve(null);
    }
    this.systemAudioPromise = navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: { suppressLocalAudioPlayback:false },
      preferCurrentTab: false,
      selfBrowserSurface: 'include',
      surfaceSwitching: 'include',
      monitorTypeSurfaces: 'include',
      systemAudio: 'include',
      windowAudio: 'system'
    }).then((stream) => {
      this.systemCaptureStream = stream;
      const audioTracks = stream.getAudioTracks();
      if (!audioTracks.length) {
        stream.getTracks().forEach(track => track.stop());
        this.systemCaptureStream = null;
        console.warn('Shared screen/tab stream did not include audio. Enable audio sharing in the browser prompt to include system audio.');
        return null;
      }
      this.systemAudioStream = new MediaStream(audioTracks);
      this.watchAudioTracks(this.systemAudioStream);
      this.connectAudioInputs();
      return this.systemAudioStream;
    }).catch((err) => {
      console.warn('System/tab audio sharing was not started:', err);
      return null;
    }).finally(() => {
      this.systemAudioPromise = null;
    });
    return this.systemAudioPromise;
  }

  compile(type, src) {
    const gl=this.gl, sh=gl.createShader(type); gl.shaderSource(sh, src); gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
    return sh;
  }
  program(vs, fs) {
    const gl=this.gl, p=gl.createProgram(); gl.attachShader(p, this.compile(gl.VERTEX_SHADER, vs)); gl.attachShader(p, this.compile(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    return p;
  }
  locs(p, names) { const gl=this.gl, out={}; for (const n of names) out[n]=gl.getUniformLocation(p,n); return out; }
  initGL() {
    const gl = this.canvas.getContext('webgl2', { alpha:false, antialias:false, depth:false, stencil:false, preserveDrawingBuffer:false });
    if (!gl) throw new Error('WebGL2 not available in this browser.');
    this.gl = gl;
    this.fxProg = this.program(VERT_SRC, FRAG_SRC);
    this.screenProg = this.program(VERT_SRC, SCREEN_FRAG_SRC);
    this.fxLoc = this.locs(this.fxProg, ['uPrev','uCam','uRes','uTime','uEffect','uRecipe0','uRecipe1','uRecipe2','uRecipe3','uRecipe4','uRecipe5','uAudio0','uAudio1','uAudio2','uAudio3','uFeedback','uCameraBlend','uIntensity','uBankFlash','uFlipAxisX','uFlipAxisY','uFlipAxisZ','uCamReady']);
    this.screenLoc = this.locs(this.screenProg, ['uTex','uTime','uBankFlash','uIntensity']);
    const vao = gl.createVertexArray(); gl.bindVertexArray(vao); this.vao=vao;
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
    this.camTex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, this.camTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,2,2,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,255,40,0,80,255,0,40,70,255,90,20,120,255]));
  }
  makeTex(w,h) {
    const gl=this.gl, t=gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,w,h,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
    return t;
  }
  makeFbo(tex) { const gl=this.gl, f=gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER,f); gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tex,0); return f; }
  resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = Math.max(2, Math.floor(innerWidth*dpr)), h = Math.max(2, Math.floor(innerHeight*dpr));
    if (this.canvas.width===w && this.canvas.height===h) return;
    this.canvas.width=w; this.canvas.height=h;
    const gl=this.gl;
    if (this.fbTex) { this.fbTex.forEach(t=>gl.deleteTexture(t)); this.fbos.forEach(f=>gl.deleteFramebuffer(f)); }
    this.fbTex=[this.makeTex(w,h), this.makeTex(w,h)];
    this.fbos=[this.makeFbo(this.fbTex[0]), this.makeFbo(this.fbTex[1])];
    this.read=0; this.write=1;
    gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  }

  installEvents() {
    addEventListener('resize', () => this.resize());
    addEventListener('fullscreenchange', () => this.resize());
    addEventListener('keydown', (ev) => this.onKey(ev));
    addEventListener('pagehide', () => this.revokeDownloadUrls());
    addEventListener('beforeunload', () => this.revokeDownloadUrls());
    this.canvas.addEventListener('pointerdown', (ev) => this.onPointerDown(ev));
    this.canvas.addEventListener('pointermove', (ev) => this.onPointerMove(ev));
    this.canvas.addEventListener('pointerup', (ev) => this.onPointerUp(ev));
    this.canvas.addEventListener('pointercancel', (ev) => this.onPointerCancel(ev));
  }
  onKey(ev) {
    const k=ev.key;
    if (k===' ' || ev.code==='Space') { ev.preventDefault(); if (!ev.repeat) void this.toggleRecordingGesture(); return; }
    if (k==='h' || k==='H') { ev.preventDefault(); this.setHUDVisible(!this.hudVisible); return; }
    if (k==='f' || k==='F') { ev.preventDefault(); void this.toggleFullscreen(); return; }
    if ((ev.ctrlKey || ev.metaKey) && (k==='n' || k==='N')) { ev.preventDefault(); this.nukeCurrent(); return; }
    if (k==='c' || k==='C') { ev.preventDefault(); this.forgePreset(); return; }
    if (k==='ArrowRight') { ev.preventDefault(); this.nextEffect(); return; }
    if (k==='ArrowLeft') { ev.preventDefault(); this.prevEffect(); return; }
    if (k==='ArrowUp') { ev.preventDefault(); this.adjustVisualDrive((ev.shiftKey ? 2 : 1) * DRIVE_KEY_STEP); return; }
    if (k==='ArrowDown') { ev.preventDefault(); this.adjustVisualDrive((ev.shiftKey ? -2 : -1) * DRIVE_KEY_STEP); return; }
    if (k==='[') { ev.preventDefault(); this.shiftBank(-1); return; }
    if (k===']') { ev.preventDefault(); this.shiftBank(1); return; }
    if (k===',' || k==='<') { this.feedback=Math.max(.72,this.feedback-.01); return; }
    if (k==='.' || k==='>') { this.feedback=Math.min(.987,this.feedback+.01); return; }
    if (k==='-' || k==='_') { ev.preventDefault(); this.adjustRandomizerSeed(-1); return; }
    if (k==='=' || k==='+') { ev.preventDefault(); this.adjustRandomizerSeed(1); return; }
    if (k==='x' || k==='X') { ev.preventDefault(); this.flipAxisX=1-this.flipAxisX; this.bankFlash=1; return; }
    if (k==='y' || k==='Y') { ev.preventDefault(); this.flipAxisY=1-this.flipAxisY; this.bankFlash=1; return; }
    if (k==='z' || k==='Z') { ev.preventDefault(); this.flipAxisZ=1-this.flipAxisZ; this.bankFlash=1; return; }
    if (k==='r' || k==='R') { this.clearFeedback(); return; }
    if (/^[0-9]$/.test(k)) { ev.preventDefault(); const n = k==='0' ? 9 : Number(k)-1; this.selectBankSlot(n); return; }
  }
  onPointerDown(ev) {
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    this.pointerDown = { id:ev.pointerId, x:ev.clientX, y:ev.clientY, t:performance.now(), gesture:null };
    try { this.canvas.setPointerCapture(ev.pointerId); } catch {}
    ev.preventDefault();
  }
  onPointerMove(ev) {
    const down = this.pointerDown;
    if (!down || down.id !== ev.pointerId) return;
    const dx=ev.clientX-down.x, dy=ev.clientY-down.y;
    const adx=Math.abs(dx), ady=Math.abs(dy);
    if (!down.gesture && ady > SWIPE_MIN_PX && ady > adx * SWIPE_RATIO) {
      down.gesture = 'verticalDrive';
      this.clearPendingTap();
      this.lastTap = null;
      this.startVisualDriveHold(dy < 0 ? 1 : -1);
    }
    if (down.gesture === 'verticalDrive') {
      const dir = dy < 0 ? 1 : -1;
      if (this.driveHold) this.driveHold.direction = dir;
      ev.preventDefault();
    }
  }
  onPointerUp(ev) {
    const down = this.pointerDown;
    if (!down || down.id !== ev.pointerId) return;
    const dx=ev.clientX-down.x, dy=ev.clientY-down.y, now=performance.now();
    const adx=Math.abs(dx), ady=Math.abs(dy), move=Math.hypot(dx,dy);
    this.pointerDown = null;
    try { this.canvas.releasePointerCapture(ev.pointerId); } catch {}
    ev.preventDefault();

    const horizontalSwipe = adx > SWIPE_MIN_PX && adx > ady * SWIPE_RATIO;
    const verticalSwipe = ady > SWIPE_MIN_PX && ady > adx * SWIPE_RATIO;
    if (down.gesture === 'verticalDrive' || verticalSwipe) {
      this.stopVisualDriveHold();
      if (!down.gesture) this.adjustVisualDrive(dy < 0 ? DRIVE_KEY_STEP * 2.5 : -DRIVE_KEY_STEP * 2.5);
      return;
    }
    if (horizontalSwipe) {
      if (now-this.lastSwipe>180) { dx<0 ? this.nextEffect() : this.prevEffect(); this.lastSwipe=now; }
      return;
    }
    if (move > TAP_MOVE_PX) return;

    this.onTap(ev.clientX, ev.clientY, now);
  }
  onPointerCancel(ev) {
    if (this.pointerDown?.id === ev.pointerId) {
      this.pointerDown = null;
      this.stopVisualDriveHold();
    }
  }
  clearPendingTap() {
    if (!this.pendingTapTimer) return;
    clearTimeout(this.pendingTapTimer);
    this.pendingTapTimer = 0;
  }
  onTap(x, y, now) {
    const last = this.lastTap;
    if (last && now-last.t <= DOUBLE_TAP_MS && Math.hypot(x-last.x, y-last.y) <= DOUBLE_TAP_PX) {
      this.clearPendingTap();
      this.lastTap = null;
      void this.toggleRecordingGesture();
      return;
    }
    this.lastTap = { x, y, t:now };
    this.clearPendingTap();
    this.pendingTapTimer = setTimeout(() => {
      this.pendingTapTimer = 0;
      this.lastTap = null;
      this.forgePreset();
    }, DOUBLE_TAP_MS);
  }
  adjustVisualDrive(delta, flash=true) {
    const next = Math.max(DRIVE_MIN, Math.min(DRIVE_MAX, this.intensity + delta));
    if (Math.abs(next - this.intensity) < 0.001) return;
    this.intensity = next;
    if (flash) this.bankFlash = Math.max(this.bankFlash, .35);
  }
  adjustRandomizerSeed(delta) {
    this.randomizerSeedOffset = (this.randomizerSeedOffset + delta) | 0;
    this.baseRecipeCache.clear();
    this.bankFlash = 1;
    this.clearFeedback();
    this.updateTitle();
  }
  startVisualDriveHold(direction) {
    if (this.driveHold) {
      this.driveHold.direction = direction;
      return;
    }
    this.driveHold = { direction, last:performance.now(), raf:0 };
    const tick = (now) => {
      if (!this.driveHold) return;
      const dt = Math.min(.08, Math.max(0, (now - this.driveHold.last) / 1000));
      this.driveHold.last = now;
      this.adjustVisualDrive(this.driveHold.direction * DRIVE_HOLD_UNITS_PER_SEC * dt, false);
      this.bankFlash = Math.max(this.bankFlash, .22);
      this.driveHold.raf = requestAnimationFrame(tick);
    };
    this.driveHold.raf = requestAnimationFrame(tick);
  }
  stopVisualDriveHold() {
    if (!this.driveHold) return;
    cancelAnimationFrame(this.driveHold.raf);
    this.driveHold = null;
  }
  selectBankSlot(n) { const e=this.keyBank*BANK_SIZE+n; if (e < this.totalEffects()) { this.effect=e; this.updateTitle(); } }
  setHUDVisible(visible) {
    this.hudVisible = !!visible;
    this.hud.classList.toggle('hidden', !this.hudVisible);
  }
  async requestFullscreenMode() {
    if (document.fullscreenElement) { this.resize(); return; }
    const target = document.documentElement;
    if (!target.requestFullscreen) return;
    try {
      await target.requestFullscreen({ navigationUI: 'hide' });
    } catch (_optionsErr) {
      await target.requestFullscreen();
    }
    this.resize();
  }
  async forceFullscreen() {
    this.setHUDVisible(false);
    try {
      await this.requestFullscreenMode();
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  }
  waitForRenderedFrames(count=2, timeoutMs=900) {
    const startFrame = this.frameSerial;
    const deadline = performance.now() + timeoutMs;
    return new Promise((resolve) => {
      const check = () => {
        if (this.frameSerial - startFrame >= count || performance.now() >= deadline) {
          resolve();
          return;
        }
        requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    });
  }
  async settleDisplayForRecording(wasFullscreen) {
    this.resize();
    await this.waitForRenderedFrames(wasFullscreen ? 1 : 3);
    this.resize();
    await this.waitForRenderedFrames(1);
  }
  async toggleFullscreen() {
    // F means: change fullscreen state and force the HUD off; never toggle HUD here.
    // H remains the independent HUD toggle, including while fullscreen is active.
    this.setHUDVisible(false);
    try {
      if (!document.fullscreenElement) {
        await this.requestFullscreenMode();
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen toggle failed:', err);
    }
    this.resize();
  }
  isRecording() { return this.mediaRecorder && this.mediaRecorder.state !== 'inactive'; }
  recordingMimeType(includeAudio=false) {
    if (!window.MediaRecorder) return '';
    const types = includeAudio ? MP4_RECORDING_TYPES_WITH_AUDIO : MP4_RECORDING_TYPES;
    return types.find(type => !MediaRecorder.isTypeSupported || MediaRecorder.isTypeSupported(type)) || '';
  }
  async toggleRecordingGesture() {
    if (this.recordingBusy) return;
    this.recordingBusy = true;
    const willStopRecording = this.isRecording();
    const wasFullscreen = !!document.fullscreenElement;
    const fullscreenPromise = this.forceFullscreen();
    const systemAudioPromise = !willStopRecording && this.useDevices && !this.hasLiveSystemAudio() ? this.requestSystemAudioCapture() : null;
    try {
      await fullscreenPromise;
      if (systemAudioPromise) await systemAudioPromise;
      await this.resumeAudioGraph();
      if (willStopRecording) await this.stopRecording();
      else {
        await this.settleDisplayForRecording(wasFullscreen);
        await this.startRecording();
      }
    } finally {
      this.recordingBusy = false;
    }
  }
  ensureRecordingCanvas() {
    if (this.recordingCanvas) return this.recordingCanvas;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:fixed;left:-10000px;top:-10000px;width:1px;height:1px;opacity:0;pointer-events:none;';
    document.body.appendChild(canvas);
    this.recordingCanvas = canvas;
    this.recordingCtx = canvas.getContext('2d', { alpha:false });
    return canvas;
  }
  syncRecordingCanvasSize() {
    const canvas = this.ensureRecordingCanvas();
    const even = (n) => Math.max(2, Math.floor(n / 2) * 2);
    const w = even(this.canvas.width);
    const h = even(this.canvas.height);
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
  }
  copyFrameToRecordingCanvas() {
    if (!this.recordingCanvas || !this.recordingCtx) return false;
    try {
      if (this.gl) this.gl.flush();
      this.recordingCtx.drawImage(this.canvas, 0, 0, this.recordingCanvas.width, this.recordingCanvas.height);
      return true;
    } catch (err) {
      console.warn('Unable to copy display canvas into recording canvas:', err);
      return false;
    }
  }
  captureCanvasRecordingStream() {
    this.syncRecordingCanvasSize();
    this.copyFrameToRecordingCanvas();
    let videoStream = this.recordingCanvas.captureStream(0);
    let videoTrack = videoStream.getVideoTracks()[0] || null;
    if (!videoTrack || typeof videoTrack.requestFrame !== 'function') {
      videoStream.getTracks().forEach(track => track.stop());
      videoStream = this.recordingCanvas.captureStream(RECORDING_FPS);
      videoTrack = videoStream.getVideoTracks()[0] || null;
      this.recordingCanvasTrack = null;
    } else {
      this.recordingCanvasTrack = videoTrack;
    }
    return { videoStream, videoTrack };
  }
  recordingAudioTracks() {
    this.connectAudioInputs();
    if (!this.audioDest || !this.audioInputCount) return [];
    return this.audioDest.stream.getAudioTracks()
      .filter(track => track.readyState === 'live')
      .map(track => track.clone());
  }
  requestRecordingFrame() {
    const track = this.recordingCanvasTrack;
    if (!track || track.readyState !== 'live' || typeof track.requestFrame !== 'function') return;
    try { track.requestFrame(); }
    catch (err) {
      console.warn('Manual canvas capture frame request failed:', err);
      this.recordingCanvasTrack = null;
    }
  }
  async startRecording() {
    if (this.isRecording()) return;
    if (!this.canvas.captureStream || !window.MediaRecorder) {
      console.warn('MP4 recording is not available in this browser.');
      return;
    }
    await this.resumeAudioGraph();
    const { videoStream, videoTrack } = this.captureCanvasRecordingStream();
    if (!videoTrack) {
      videoStream.getTracks().forEach(track => track.stop());
      console.warn('Canvas recording did not provide a video track.');
      return;
    }
    const audioTracks = this.recordingAudioTracks();
    const stream = new MediaStream([...videoStream.getVideoTracks(), ...audioTracks]);
    const mimeType = this.recordingMimeType(audioTracks.length > 0);
    if (!mimeType) {
      console.warn('This browser does not report MediaRecorder MP4/H.264 support.');
      stream.getTracks().forEach(track => track.stop());
      this.recordingCanvasTrack = null;
      return;
    }
    this.recordedChunks = [];
    let recorder;
    try {
      recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: RECORDING_VIDEO_BPS });
    } catch (err) {
      stream.getTracks().forEach(track => track.stop());
      this.recordingCanvasTrack = null;
      console.warn('Unable to start MP4/H.264 recording:', err);
      return;
    }
    this.recordingStream = stream;
    this.mediaRecorder = recorder;
    recorder.addEventListener('dataavailable', (ev) => {
      if (ev.data && ev.data.size) this.recordedChunks.push(ev.data);
    });
    recorder.addEventListener('stop', () => this.finishRecordingDownload(mimeType, stream), { once:true });
    recorder.addEventListener('error', (ev) => console.warn('Recording error:', ev.error || ev));
    recorder.start(1000);
    this.requestRecordingFrame();
    this.bankFlash = 1.0;
  }
  stopRecording() {
    const recorder = this.mediaRecorder;
    if (!recorder || recorder.state === 'inactive') return Promise.resolve();
    return new Promise((resolve) => {
      const done = () => resolve();
      recorder.addEventListener('stop', done, { once:true });
      try { recorder.requestData(); } catch {}
      try {
        recorder.stop();
      } catch (err) {
        recorder.removeEventListener('stop', done);
        console.warn('Unable to stop recording cleanly:', err);
        resolve();
      }
    });
  }
  finishRecordingDownload(mimeType, stream) {
    stream.getTracks().forEach(track => track.stop());
    this.recordingStream = null;
    this.recordingCanvasTrack = null;
    this.mediaRecorder = null;
    const chunks = this.recordedChunks;
    this.recordedChunks = [];
    if (!chunks.length) {
      console.warn('Recording stopped without producing video data.');
      return;
    }
    const blob = new Blob(chunks, { type:mimeType || 'video/mp4' });
    const url = URL.createObjectURL(blob);
    this.downloadUrls.add(url);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `neon-recursion-${stamp}.mp4`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => this.revokeDownloadUrl(url), 30000);
  }
  revokeDownloadUrl(url) {
    if (!this.downloadUrls.delete(url)) return;
    URL.revokeObjectURL(url);
  }
  revokeDownloadUrls() {
    for (const url of this.downloadUrls) URL.revokeObjectURL(url);
    this.downloadUrls.clear();
  }
  shiftBank(d) { this.keyBank = (this.keyBank + d + this.bankCount()) % this.bankCount(); this.bankFlash = 1.0; }
  nextEffect() { this.effect=(this.effect+1)%this.totalEffects(); this.keyBank=Math.floor(this.effect/BANK_SIZE); this.bankFlash=.45; this.updateTitle(); }
  prevEffect() { this.effect=(this.effect-1+this.totalEffects())%this.totalEffects(); this.keyBank=Math.floor(this.effect/BANK_SIZE); this.bankFlash=.45; this.updateTitle(); }
  clearFeedback() { if (!this.gl || !this.fbos) return; const gl=this.gl; for (const f of this.fbos) { gl.bindFramebuffer(gl.FRAMEBUFFER,f); gl.clearColor(0,0,0,1); gl.clear(gl.COLOR_BUFFER_BIT); } gl.bindFramebuffer(gl.FRAMEBUFFER,null); }
  updateTitle() { document.title = `Neon V10.7 ${this.effect+1}/${this.totalEffects()} — ${this.currentName()}`; }

  updateAudio(t) {
    const a = this.audio;
    if (!this.analyser || !this.audioInputCount) {
      const tt=t*.001;
      const vals=[.15+.15*Math.sin(tt*1.1), .2+.2*Math.sin(tt*1.7), .2+.15*Math.sin(tt*2.1), .22+.12*Math.sin(tt*2.7), .18+.15*Math.sin(tt*3.1), .14+.16*Math.sin(tt*4.3), .1+.1*Math.sin(tt*5.1), .5+.25*Math.sin(tt*.4), .5+.5*Math.sin(tt*.22), .2+.2*Math.max(0,Math.sin(tt*3.0)), .2+.7*Math.pow(Math.max(0,Math.sin(tt*1.6)),8), .5+.5*Math.sin(tt*1.6), .5, .25+.2*Math.sin(tt*2.2), .25, .4];
      for(let i=0;i<16;i++) a[i]=Math.max(0,Math.min(1,vals[i]));
    } else {
      this.analyser.getFloatFrequencyData(this.freq);
      this.analyser.getFloatTimeDomainData(this.timeData);
      const nyq=this.sampleRate/2, binHz=nyq/this.freq.length;
      const band=(lo,hi)=>{ let s=0,c=0; const i0=Math.max(0,Math.floor(lo/binHz)), i1=Math.min(this.freq.length-1,Math.ceil(hi/binHz)); for(let i=i0;i<=i1;i++){ const v=Math.pow(10, this.freq[i]/20); s+=v; c++; } return Math.min(1, Math.pow((s/Math.max(1,c))*6.0, .43)); };
      a[0]=band(20,60); a[1]=band(60,180); a[2]=band(180,500); a[3]=band(500,1600); a[4]=band(1600,4200); a[5]=band(4200,9000); a[6]=band(9000,nyq);
      let sum=0, weighted=0, peak=0, peakI=0, flux=0, entropy=0;
      for(let i=1;i<this.freq.length;i++){ const v=Math.max(0, Math.pow(10,this.freq[i]/20)); sum+=v; weighted+=v*i; if(v>peak){peak=v;peakI=i;} const d=v-Math.max(0,Math.pow(10,this.prevFreq[i]/20)); if(d>0) flux+=d; }
      const centroid=sum>1e-9 ? weighted/(sum*this.freq.length) : .0;
      a[7]=Math.min(1, Math.pow(centroid, .55));
      a[8]=Math.min(1, peakI/this.freq.length);
      a[9]=Math.min(1, Math.pow(flux*1.9, .47));
      a[10]=Math.min(1, Math.pow(Math.max(0, a[9]-.08)*2.4, .5));
      const energy=(a[0]+a[1]+a[2]+a[3]+a[4]+a[5]+a[6])/7;
      const now=performance.now();
      this._beatPhase = this._beatPhase || 0;
      this._lastBeat = this._lastBeat || 0;
      if (a[10]>.35 && now-this._lastBeat>130) { this._beatPhase=1; this._lastBeat=now; }
      this._beatPhase *= .92;
      a[11]=Math.min(1,this._beatPhase);
      a[12]=Math.min(1, peak/(sum/Math.max(1,this.freq.length)+1e-6)*.035);
      let zc=0; for(let i=1;i<this.timeData.length;i++) if ((this.timeData[i-1]<0)!=(this.timeData[i]<0)) zc++;
      a[13]=Math.min(1, zc/260);
      a[14]=Math.min(1, Math.pow(energy*1.4,.7));
      for(let i=1;i<this.freq.length;i++){ const v=Math.max(0, Math.pow(10,this.freq[i]/20))/(sum+1e-9); if(v>0) entropy += -v*Math.log(v); }
      a[15]=Math.min(1, entropy/Math.log(this.freq.length));
      this.prevFreq.set(this.freq);
    }
    for(let i=0;i<16;i++) this.audioSmooth[i] = this.audioSmooth[i]*0.78 + a[i]*0.22;
  }

  uploadCamera() {
    const gl=this.gl;
    if (this.cameraReady && this.video.readyState >= 2) {
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.camTex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      try { gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,this.video); } catch { this.cameraReady=false; }
    }
  }
  effectRecipeVectors() {
    if (!this.isGeneratedEffect()) return this.baseRecipe(this.effect);
    const preset = this.userPresets[this.effect-BASE_COUNT];
    if (!preset) return this.baseRecipe(this.effect % BASE_COUNT);
    preset.recipe = this.normalizeRecipe(preset.recipe, preset.seed, preset.serial);
    return this.reseedRecipe(preset.recipe, preset.seed, preset.serial);
  }

  frame(t) {
    this.resize(); this.updateAudio(t); this.uploadCamera();
    const gl=this.gl, w=this.canvas.width, h=this.canvas.height;
    this.bankFlash *= 0.88;
    const rec=this.effectRecipeVectors();
    gl.bindVertexArray(this.vao);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbos[this.write]);
    gl.viewport(0,0,w,h);
    gl.useProgram(this.fxProg);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.fbTex[this.read]); gl.uniform1i(this.fxLoc.uPrev,0);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.camTex); gl.uniform1i(this.fxLoc.uCam,1);
    gl.uniform2f(this.fxLoc.uRes,w,h); gl.uniform1f(this.fxLoc.uTime,t*.001); gl.uniform1i(this.fxLoc.uEffect,this.effect);
    gl.uniform4f(this.fxLoc.uRecipe0,rec[0],rec[1],rec[2],rec[3]); gl.uniform4f(this.fxLoc.uRecipe1,rec[4],rec[5],rec[6],rec[7]); gl.uniform4f(this.fxLoc.uRecipe2,rec[8],rec[9],rec[10],rec[11]);
    gl.uniform4f(this.fxLoc.uRecipe3,rec[12],rec[13],rec[14],rec[15]); gl.uniform4f(this.fxLoc.uRecipe4,rec[16],rec[17],rec[18],rec[19]); gl.uniform4f(this.fxLoc.uRecipe5,rec[20],rec[21],rec[22],rec[23]);
    const a=this.audioSmooth;
    gl.uniform4f(this.fxLoc.uAudio0,a[0],a[1],a[2],a[3]); gl.uniform4f(this.fxLoc.uAudio1,a[4],a[5],a[6],a[7]); gl.uniform4f(this.fxLoc.uAudio2,a[8],a[9],a[10],a[11]); gl.uniform4f(this.fxLoc.uAudio3,a[12],a[13],a[14],a[15]);
    gl.uniform1f(this.fxLoc.uFeedback,this.feedback); gl.uniform1f(this.fxLoc.uCameraBlend,this.cameraBlend); gl.uniform1f(this.fxLoc.uIntensity,this.intensity); gl.uniform1f(this.fxLoc.uBankFlash,this.bankFlash); gl.uniform1f(this.fxLoc.uFlipAxisX,this.flipAxisX); gl.uniform1f(this.fxLoc.uFlipAxisY,this.flipAxisY); gl.uniform1f(this.fxLoc.uFlipAxisZ,this.flipAxisZ); gl.uniform1i(this.fxLoc.uCamReady,this.cameraReady?1:0);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);

    gl.bindFramebuffer(gl.FRAMEBUFFER,null);
    gl.viewport(0,0,w,h);
    gl.useProgram(this.screenProg);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.fbTex[this.write]); gl.uniform1i(this.screenLoc.uTex,0); gl.uniform1f(this.screenLoc.uTime,t*.001); gl.uniform1f(this.screenLoc.uBankFlash,this.bankFlash); gl.uniform1f(this.screenLoc.uIntensity,this.intensity);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    if (this.recordingCanvasTrack) {
      this.copyFrameToRecordingCanvas();
      this.requestRecordingFrame();
    }
    this.frameSerial++;
    [this.read,this.write]=[this.write,this.read];
    this.updateHUD();
    requestAnimationFrame((tt) => this.frame(tt));
  }
  updateHUD() {
    if (!this.hudVisible) return;
    const b0=this.keyBank*BANK_SIZE+1, b1=Math.min(this.totalEffects(),b0+9);
    const rec = this.isRecording() ? ' &nbsp; <span class="dim">recording:</span> MP4' : '';
    this.hud.innerHTML = `<b>${VERSION}</b><br>${this.effect+1}/${this.totalEffects()}: ${this.currentName()}<br><span class="dim">Number keys:</span> ${b0}..${b1} &nbsp; <span class="dim">generated:</span> ${this.userPresets.length} &nbsp; <span class="dim">drive:</span> ${this.intensity.toFixed(2)} &nbsp; <span class="dim">seed:</span> ${this.randomizerSeedOffset}${rec}<br><span class="dim">audio ${this.audioInputLabel()}:</span> bass ${this.audioSmooth[1].toFixed(2)} mid ${this.audioSmooth[3].toFixed(2)} treble ${this.audioSmooth[5].toFixed(2)} flux ${this.audioSmooth[9].toFixed(2)} rhythm ${this.audioSmooth[11].toFixed(2)}<br><span class="dim">Up/down or vertical swipe-hold drive, -/= reseed randomizers, click/tap/C forge, double/Space MP4 rec, [/] banks, F fullscreen, X/Y/Z flips, H HUD</span>`;
  }
}

const app = new NeonApp();
window.neonRecursion = app;
document.getElementById('startBtn').addEventListener('click', () => app.start(true));
document.getElementById('fallbackBtn').addEventListener('click', () => app.start(false));
document.getElementById('exportBtn').addEventListener('click', () => app.exportGenerated());
document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importFile').click());
document.getElementById('importFile').addEventListener('change', async (ev) => { const f=ev.target.files[0]; if(f) await app.importGenerated(f); });

})();
