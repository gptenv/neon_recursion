(() => {
'use strict';

const VERSION = "webgl-wasm-v10.8-2026-06-stripefix-reactive";
const TAP_MOVE_PX = 18;
const DOUBLE_TAP_MS = 320;
const DOUBLE_TAP_PX = 42;
const SWIPE_MIN_PX = 80;
const SWIPE_RATIO = 1.5;
const DRIVE_MIN = 0.0;
const DRIVE_MAX = 6.0;
const DRIVE_KEY_STEP = 0.28;
const SEED_HOLD_UNITS_PER_SEC = 2.5;
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
const BASE_NAME_SUBJECTS = [
  'Luma Circuit','Beat Fresnel','Spectral Ink','Bass Mosaic','Phase Aperture',
  'Signal Glass','Flux Needle','Tonal Bloom','Edge Cathedral','Rhythm Scanner',
  'Chromatic Loom','Vector Mask','Entropy Prism','Subsurface Echo','Onset Lattice',
  'Granular Rift','Treble Ribbon','Motion Halo','Feedback Topology','Solarized Well'
];
const BASE_NAME_BEHAVIORS = [
  'Camera Recolor','Edge Mask','Poster Pulse','Contour Bloom','Beat Cutout',
  'Feedback Echo','Block Reactor','Radial Lens','Channel Mutation','Warp Surge'
];
const BASE_EFFECT_NAMES = Array.from({ length: 200 }, (_, i) => {
  const pair = Math.imul(i, 37) % 200;
  const subject = BASE_NAME_SUBJECTS[pair % BASE_NAME_SUBJECTS.length];
  const behavior = BASE_NAME_BEHAVIORS[Math.floor(pair / BASE_NAME_SUBJECTS.length)];
  return `${subject} ${behavior}`;
});
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
vec3 hueShift(vec3 c,float a){vec3 k=vec3(.57735027);float ca=cos(a),sa=sin(a);return c*ca+cross(k,c)*sa+k*dot(k,c)*(1.0-ca);}
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

// Audio-driven color channel mutation, inspired by classic conditional
// band-threshold channel remapping + mod chaos (not just amplitude/brightness).
// mutateAmt (0..1 from recipe/WASM) controls how strong/sensitive the mutations are
// for this preset. Low mutate = subtle, high mutate = full crazy filter mode.
// This (plus WASM recipe_mutate) makes the set of 200+ effects way more awesome.
vec3 audioMutate(vec3 c, float lo, float md, float hi, float bt, float gr, float mutateAmt) {
  float r = c.r;
  float g = c.g;
  float b = c.b;
  float n = 0.68 + (1.0 - mutateAmt) * 0.12;  // much higher threshold to reduce sensitivity
  float str = 0.25 + mutateAmt * 0.5;  // much gentler overall strength

  // Low/body + beat group: conditional channel surgery (much softer, less jumpy)
  if (lo > n || bt > n) {
    if (g < n) r = (r + b) / max(0.25, lo + 0.25);
    if (r < n) b = b / max(0.25, r) + hi * (0.2 * str);
    if (b < n) g = g + (md / max(0.25, lo + 0.3));
  }

  // Mid + high group: cross-multiplies and mods (very gentle)
  if (md > n || hi > n) {
    r = mod(r * g * (1.0 + 0.04*str), 1.002);
    g = mod(g * b * (1.0 + 0.02*str), 1.002);
    b = mod(b * r * (0.98 - 0.02*str), 1.002);
  }

  // Beat/groove transient group: conditional mods (reduced)
  if (bt > n || gr > n) {
    if (g > n) r = mod(r * b, max(0.25, gr));
    if (b > n) g = mod(g - r * (0.25 * str), max(0.25, md));
    if (r > n) b = mod(b * ((g + r) * 0.5), max(0.25, hi + 0.1));
  }

  // Extra division style (less extreme)
  if (lo > n) {
    r = mod(r, 1.001) / max(0.15, mod(b * lo, 0.88) + 0.1);
  }
  if (hi > n) {
    g = mod(g, 1.001) / max(0.15, mod(r * hi, 0.85) + 0.1);
  }
  if (bt > n) {
    b = mod(b, 1.001) / max(0.15, mod(g * bt, 0.8) + 0.1);
  }

  return vec3(clamp(r, 0.0, 1.0), clamp(g, 0.0, 1.0), clamp(b, 0.0, 1.0));
}

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
  float stripeLane=floor(sat(uRecipe4.y)*7.0);
  float composeLane=floor(sat(uRecipe1.w)*8.0);
  float colorLane=floor(sat(uRecipe3.x)*8.0);
  float maskLane=floor(sat(uRecipe4.x)*8.0);
  float warpLane=floor(sat(uRecipe5.z)*8.0);
  float mutateAmt = 0.35 + uRecipe4.w * 0.9;  // from WASM recipe_mutate bias - controls how wild audio channel mutations are for this preset

  // Richer, punchier audio-reactive signals for more interesting reactivity
  float body   = sat(sub*.58 + bass*1.08 + lowMid*.52);
  float midb   = sat(lowMid*.38 + mid*1.02 + highMid*.52);
  float airDrive = sat(highMid*.32 + treble*.94 + air*.82);  // derived high-freq drive (do not shadow raw 'air' uniform)
  float beat   = sat(onset*1.42 + flux*.78 + rhythm*.62 + pulse*.35);
  float groove = sat(rhythm*.98 + energy*.58 + domPeak*.38 + beat*.22);
  float detail = sat(zcr*.72 + aEntropy*.55 + airDrive*.42);
  float lowReact  = body;
  float highReact = airDrive;
  float reaction=sat((body*(.48+uRecipe2.x*.72)+midb*(.30+uRecipe2.y*.58)+airDrive*(.26+uRecipe2.z*.68)+flux*(.36+uRecipe2.w*.55)+groove*.38+energy*.28)*(.52+drive*.18));
  float reactLane=floor(sat(uRecipe2.x)*8.0);
  float motionLane=floor(sat(uRecipe3.y)*8.0);
  float feedbackLane=floor(sat(uRecipe4.z)*8.0);
  float shapeLane=floor(sat(uRecipe5.y)*8.0);
  float audioA=body;
  if(reactLane < .5) audioA=body;
  else if(reactLane < 1.5) audioA=midb;
  else if(reactLane < 2.5) audioA=airDrive;
  else if(reactLane < 3.5) audioA=flux;
  else if(reactLane < 4.5) audioA=beat;
  else if(reactLane < 5.5) audioA=groove;
  else if(reactLane < 6.5) audioA=detail;
  else audioA=ent;
  float audioB=airDrive;
  if(reactLane < .5) audioB=flux+beat*.35;
  else if(reactLane < 1.5) audioB=body;
  else if(reactLane < 2.5) audioB=groove;
  else if(reactLane < 3.5) audioB=treble*.82+detail*.6;
  else if(reactLane < 4.5) audioB=midb;
  else if(reactLane < 5.5) audioB=energy+flux*.3;
  else if(reactLane < 6.5) audioB=zcr*1.15+onset*.25;
  else audioB=beat+flux*.45;
  float wild=sat(audioA*(.52+uRecipe3.x*.82)+audioB*(.30+uRecipe3.z*.66)+beat*(.30+.68*uRecipe5.w)+reaction*.42+groove*.24);
  float slam=pow(sat(beat*(.68+uRecipe4.w*.58)+audioA*(.24+.72*uRecipe5.x)+flux*.32+onset*.42),.48+uRecipe5.x*.62);
  float snap=step(.54+.30*uRecipe4.x,fract(uTime*(1.42+mode*.36+uRecipe1.z*4.9)+audioA*1.85+beat*2.1+seed));
  float t=uTime*(.055+uRecipe1.z*.33+rhythm*.20+groove*.09+drive*.026);
  t += slam*(.17+uRecipe1.w*.48)+snap*audioB*(.09+.24*uRecipe5.z)+beat*.065;

  // Global audio presence that considers not just volume (body/airDrive) but also
  // rhythm/tempo/cadence (beat, groove, rhythm, onset), pitch/energy (detail, flux, specCentroid via air),
  // and overall activity. This is the modern equivalent of the old shader's per-band > n checks.
  // When low, we force plain unaltered camera feed (no warp, no effects, no feedback).
  // Compute base presence (volume + rhythm + pitch features) for reference.
  float audioPresence = sat(
    (body + midb + airDrive) * 0.35 +
    (beat + groove) * 0.65 +
    (onset + rhythm) * 0.45 +
    detail * 0.35 +
    flux * 0.40 +
    energy * 0.25
  );

  // Unique per-effect triggers from recipe (breaking change ok, no backwards compat needed).
  // Each level has its own ramp (smoothstep base controlled by recipe values [6,10,14,20]).
  // volLevel: low frequencies / overall energy (body/midb)
  // rhythmLevel: tempo, cadence, rhythm, onset, groove, beat
  // pitchLevel: high frequencies, tone, spectral detail, flux (pitch/timbre)
  // Different presets will have e.g. underlay appear on bass, color twists on treble, motion on rhythm.
  // At low audio (all levels near 0), effectLevel=0 -> only plain camera feed.
  float volLevel = smoothstep(uRecipe1.z, uRecipe1.z + 0.18, (body + midb + energy) * 0.85);
  float rhythmLevel = smoothstep(0.12, 0.12 + uRecipe2.z * 0.40, beat + groove + onset + rhythm * 0.6);
  float pitchLevel = smoothstep(0.14, 0.14 + uRecipe3.z * 0.35, airDrive + detail + flux * 0.7);

  // overall for layers/warp/feedback/final cutoff: max of the unique triggers.
  // This provides gradient ramp-up based on pitch/tone/rhythm/volume, not just amplitude.
  float effectLevel = max(volLevel, max(rhythmLevel, pitchLevel));

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
  if(motionLane < .5) laneVec=normalize(p+vec2(.001,-.002))*(body*1.1+beat*.4);
  else if(motionLane < 1.5) laneVec=vec2(-p.y,p.x)*(audioB*1.15+groove*.35);
  else if(motionLane < 2.5) laneVec=vec2(sin((uv.y+t)*(22.0+audioA*18.0)),cos((uv.x-t)*(19.0+audioB*14.0)))*(.6+wild*.5);
  else if(motionLane < 3.5) laneVec=vec2(sign(noiseFlow.x),sign(noiseFlow.y))*slam*(1.1+beat*.6);
  else if(motionLane < 4.5) laneVec=prevGrad*(1.8+audioA*4.2+slam*1.6);
  else if(motionLane < 5.5) laneVec=camGrad0*(1.9+audioB*4.0+beat*1.4);
  else if(motionLane < 6.5) {
    // scan/stripe motion: only strong when stripe personality is selected (rare)
    float sf = (stripeLane > 4.3) ? 1.0 : .22;
    laneVec=vec2(stripes(uv.y+t,16.0+audioA*52.0,.10)-.5,stripes(uv.x-t,13.0+audioB*44.0,.10)-.5) * sf;
  }
  else laneVec=vec2(noise(vec2(uv.x+t,uv.y)*8.5+beat),noise(vec2(uv.y-t,uv.x)*8.5-beat))-.5;
  vec2 flow=prevGrad*(.40+uRecipe3.x*1.82)+camGrad0*(.42+uRecipe3.y*1.85)+swirl*(.09+uRecipe3.z*.72)+noiseFlow*(.17+ent*.58)+laneVec*(.07+wild*.65+slam*.38);
  flow=flow/(1.0+length(flow)*3.6)+vec2(.0003,-.0002);
  float depth=fbm((uv+flow*.03)*(1.4+uRecipe4.z*8.0)+vec2(seed*9.0,t*.7));
  depth=sat(depth*.54+prevEdge*.18+camEdge*.22+reaction*.3+wild*.24+slam*.14);
  float warpPersonality=0.0;
  if(warpLane < .5) warpPersonality=0.0;           // pure camera/color/mask presets: no camera wobble
  else if(warpLane < 1.5) warpPersonality=.045;    // edge-reactive, visually active but almost no UV motion
  else if(warpLane < 2.5) warpPersonality=.12;     // block/poster lanes: tiny displacement only
  else if(warpLane < 3.5) warpPersonality=.28;     // feedback echo lanes
  else if(warpLane < 4.5) warpPersonality=.46;     // mild parallax
  else if(warpLane < 5.5) warpPersonality=.72;     // radial/lens motion
  else if(warpLane < 6.5) warpPersonality=.95;     // strong motion
  else warpPersonality=1.22;                       // deliberate warp surge
  warpPersonality*=effectLevel;
  float warpAmt=(.003+reaction*.038+pulse*.02+wild*.028+slam*.018+drive01*.035)*(0.55+uRecipe4.w*.85) * (volLevel * 0.62 + rhythmLevel * 0.28 + pitchLevel * .10) * warpPersonality;
  vec2 radial=normalize(p+flow*.08+vec2(.0007,-.0004));
  vec2 parallax=(flow*(depth-.5)*1.25+radial*depth*(.22+.34*uRecipe5.x))*warpAmt;
  vec2 camUv=sat2(uv + parallax + noiseFlow*warpAmt*(.85+.5*uRecipe4.x));
  camUv=sat2(.5+(camUv-.5)*(1.0+(uRecipe5.x-.5)*.34*drive01));
  vec2 prevUv=sat2(uv - parallax*(.8+uRecipe5.y) + prevGrad*(.018+drive01*.065+warpPersonality*.07));
  vec3 prev=prevAt(prevUv);
  vec3 cam=chromaCam(camUv,flow,.0018+uRecipe1.w*.011+highReact*.012*drive01);
  float camLum=luma(cam);
  float localNoise=fbm((uv+parallax)*(2.0+mode*.55+uRecipe2.w*7.0)+vec2(t,seed*13.0));

  vec2 q=p+parallax*asp*2.0;
  float shapeDrive=sat(warpPersonality*1.25);
  float qAngle=((uRecipe3.w-.5)*3.14159+reaction*.6+wild*(uRecipe4.x-.5)*1.8)*(.18+.82*shapeDrive);
  if(warpLane < .5){
    q=p;
  } else if(warpLane < 1.5){
    q=p + (camGrad0*(.018+.09*audioA)+prevGrad*(.012+.055*beat))*effectLevel;
  } else if(warpLane < 2.5){
    float blockScale=3.8+mode*.72+floor(audioA*5.0+beat*3.0);
    q=floor((p+.5)*blockScale)/blockScale-.5;
    q+=camGrad0*(.018+.07*pitchLevel)*effectLevel;
  } else if(shapeLane < .5){
    q=rot(qAngle)*q*(1.0+wild*.42*shapeDrive);
  } else if(shapeLane < 1.5){
    q=rot(qAngle+length(q)*(2.0+audioA*5.2*shapeDrive))*q;
  } else if(shapeLane < 2.5){
    q+=vec2(sin(q.y*(7.5+mode)+t*4.2),cos(q.x*(6.5+mode)-t*3.2))*(.012+wild*.11*shapeDrive);
    q=rot(qAngle)*q;
  } else if(shapeLane < 3.5){
    q=rot(qAngle)*vec2(q.x*(1.0+audioA*.72*shapeDrive),q.y*(1.0-audioB*.42*shapeDrive));
  } else if(shapeLane < 4.5){
    q=abs(fract((q+0.5)*(1.5+uRecipe5.x*3.2))-.5)*2.0-.5;
    q=rot(qAngle)*q;
  } else if(shapeLane < 5.5){
    float r=length(q)+.001;
    q=vec2(atan(q.y,q.x)/3.14159,r-.36)*(.92+wild*.82*shapeDrive);
  } else if(shapeLane < 6.5){
    q=rot(qAngle)*q;
    q+=(prevGrad*(.22+audioA*2.2)+camGrad0*(.16+audioB*1.8)+vec2(beat*.06))*shapeDrive;
  } else {
    float snapGrid=5.2+mode+wild*8.5*shapeDrive;
    q=rot(qAngle+snap*audioA*2.6*shapeDrive)*floor(q*snapGrid)/snapGrid;
  }

  // === FAMILIES: 20 distinct structure generators ===
  // Stripe/diagonal usage is now gated by stripeLane (intentional only, rare by default in baked 200)
  float field=0.0;
  float stripeIntent = (stripeLane > 4.2) ? (0.72 + 0.28 * fract(stripeLane * 1.9)) : (stripeLane > 2.8 ? 0.22 : 0.07);
  if(family < .5){
    // Concentric audio ripples + radial spokes — now with more old-school mod/conditional twist
    float r=length(q)+.0007;
    float rings=sin((r*(7.0+mode*2.8+body*11.0)+t*1.6)*6.2831853);
    float spokes=abs(sin(atan(q.y,q.x)* (5.0+mode) + t*1.2));
    field = mod( .5 + .5*rings*.7 + spokes*.45 + camEdge*.3 + beat*.25 , 1.05);
    if (body > 0.55) field = mod(field * (1.0 + airDrive*0.6), 1.0);
  } else if(family < 1.5){
    // Rotating angular sectors + interference
    float ang=atan(q.y,q.x)+t*(.6+groove*.4);
    float sec=abs(fract(ang* (3.5+mode*1.2) / 6.2831853 )-.5);
    field=sat( (1.0-smoothstep(.12,.48,sec))*.85 + fbm(q*1.6+t*.7)*.35 + air*.28 + prevEdge*.22 );
    field = mod(field + midb * 0.4, 1.02);
  } else if(family < 2.5){
    // Wave lattice / ripple grid (light diagonal only on high stripe intent)
    float w1=sin((q.x*9.0 + q.y*5.5 + t*2.4 + fbm(q*1.8+t)*.6)*6.283);
    float w2=sin((q.y*8.5 - q.x*4.8 - t*1.9)*6.283);
    float lat=sat(.5+.5*(w1*w2*1.3 + w1*.4));
    float diagStrip = (stripeLane > 4.2) ? stripes(q.x+q.y, 11.0+flux*22.0, .09) : 0.0;
    field=sat( lat*.72 + diagStrip*stripeIntent*1.1 + camEdge*.32 + beat*.08 );
    field = mod( field * (1.0 + groove*0.3) , 1.03);
  } else if(family < 3.5){
    // Radial bloom + orbiting dots (diagonal moire only with stripe personality)
    float r=length(q)+.001;
    float rad=sin((r*(6.0+mode*2.2+body*9.0)-t*1.4)*6.283);
    float dots=cells(q* (1.6+mode*.6) + vec2(cos(t*.7),sin(t*.9))*1.2 , 4.5+air*3.0);
    float diag = (stripeLane > 4.5) ? stripes(q.x+q.y + r*1.5, 14.0+highReact*18.0, .07) : 0.0;
    field=sat( .42 + .58*rad + dots*.55 + diag*stripeIntent + prevEdge*.28 + pulse*.12 );
  } else if(family < 4.5){
    // Inverted depth tunnel + soft rings
    float r=length(q)+.0008;
    float tun=1.0-smoothstep(.15,1.05,r*(1.0+uRecipe4.z*.6));
    float rf=ringField(q,12.0+bass*22.0+tone*7.0,t*1.1+seed);
    field=sat( tun*.6 + rf*.55 + lowReact*.28 + camEdge*.25 );
  } else if(family < 5.5){
    // Triangle / tri-grid warp field
    vec2 tri=abs(fract((q+flow*.06)*(4.2+mode*1.1+beat*1.8))-0.5);
    float tr=(tri.x+tri.y)*1.35 + sin((tri.x-tri.y)*18.0+t)*.18;
    field=sat( tr + prevEdge*.42 + groove*.32 );
  } else if(family < 6.5){
    // Noise + edge difference field (good for masks too)
    field=smoothstep(.12,.88,localNoise+camLum*.32+flux*.22+beat*.15)-smoothstep(.78,1.0,prevLum*.9);
  } else if(family < 7.5){
    // Sparse binary noise blocks that flip on rhythm
    float thr=.44 + uRecipe5.z*.3 + groove*.08;
    field=step(thr,noise(q*(11.0+mode*3.2)+t*2.8+beat*1.5))*(.38+.62*ent)+prevEdge*.38;
  } else if(family < 8.5){
    // Voronoi cells + orbiting rings
    float cel=cells(q+flow*.07+vec2(sin(t*.6),cos(t*.8))*.04, 3.2+mode*1.1+energy*6.5);
    float rf=ringField(q,5.8+mode*1.4,t+depth*.6);
    field=max(cel*.72, rf*.58) + camEdge*.22;
  } else if(family < 9.5){
    // Audio-reactive checker / dither with drift — now more chaotic like old filter
    float cx=floor((uv.x+reaction*.05+flow.x*.03)*(7.5+mode*1.8+groove*4.0));
    float cy=floor((uv.y+rhythm*.04+flow.y*.02)*(6.2+mode*1.6));
    float checker=step(.5,fract(cx+cy*1.7+sin(t*.9)*.3));
    field = mix(checker,1.0-checker, .4+.6*noise(vec2(mode*.3+seed, t*.05)) ) * (.42+.58*pulse+beat*.2);
    field = mod( field + airDrive * 0.35 , 1.04);
  } else if(family < 10.5){
    // Organic fbm terrain + camera edges — audio-modded for more character
    float fb=fbm(q*(2.7+mode*.45)-flow*.18+t*1.05 + beat*.2);
    field=smoothstep(.22,.92,fb + camEdge*.42 + body*.22);
    field = mod(field * (1.0 + detail*0.4), 1.03);
  } else if(family < 11.5){
    // High-freq treble filament (diagonal component only on stripe intent)
    float fil=stripes(q.x + sin(q.y*7.5 + t*1.6)*.09, 19.0 + air*48.0, .05 + detail*.09);
    float fil2=stripes(q.y - cos(q.x*6.8 - t*1.3)*.07, 17.0 + treble*42.0, .045);
    float base=sat( max(fil,fil2)*.82 + prevEdge*.55 );
    field = (stripeLane > 4.2) ? mix(base*0.55, base, stripeIntent*0.95) : base*0.62 + camEdge*.32;
  } else if(family < 12.5){
    // Rift / crack + tonal highlights
    float rift=abs(q.y + .18*sin(q.x*(4.8+mode)+tone*4.6+t) - .1*cos(q.x*2.8+seed*5.5));
    field=smoothstep(.26,.02,rift)*1.05 + camEdge*.32 + tone*.25 + beat*.12;
  } else if(family < 13.5){
    // Edge driven structural depth
    field=sat( prevEdge*(1.25 + drive01*2.1) + smoothstep(.52,.92,depth + beat*.32) );
  } else if(family < 14.5){
    // Blocky hash dither + rhythmic reveal
    float bh=blockHash(uv+flow*.04, vec2(6.8+mode*1.9,4.8+mode), uTime*(.36 + rhythm*5.8 + beat*1.8) );
    field=sat( bh*(.35+.65*energy) + camEdge*.32 + groove*.2 );
  } else if(family < 15.5){
    // Cells + occasional diagonal (rare purposeful stripes)
    float cel=cells(q + vec2(sin(t*1.1),cos(t*.9))*.07, 4.8+mode*.7 + detail*2.5);
    float ds = (stripeLane > 4.6) ? stripes(q.x+q.y, 9.0 + zcr*22.0, .14) : 0.0;
    field=max(cel, ds*stripeIntent*1.15) + prevEdge*.18;
  } else if(family < 16.5){
    // Expanding rings + zcr shimmer
    field=ringField(q+flow*.15, 8.2+mode*1.9 + zcr*12.0, t+prevLum*.6) + camEdge*.48 + air*.15;
  } else if(family < 17.5){
    // Ortho stripes (x and y) - diagonal avoided; strong only with stripeLane
    float sx=stripes(q.x,10.5+highReact*32.0,.09);
    float sy=stripes(q.y,11.0+body*28.0,.085);
    float ortho=sat(sx*.6 + sy*.55);
    float orthoGate = (stripeLane > 2.5) ? 0.85 : 0.32;
    float diag = (stripeLane > 4.7) ? stripes(q.x+q.y,13.0+flux*18.0,.06)*0.55 : 0.0;
    field=sat( ortho*orthoGate + diag*stripeIntent + beat*.35 );
  } else if(family < 18.5){
    // Flow-aligned fbm ridges + directional emphasis
    float fb=fbm(q*(3.8+mode*.85)+prevGrad*2.6 + t*1.1);
    float dir=abs(dot(normalize(flow+vec2(.0008)), normalize(q+vec2(.001))))*.7;
    field=sat( fb*.62 + dir*.52 + flux*.22 + camEdge*.18 );
  } else {
    // Mixed organic: noise + cells + subtle grid — final family gets extra audio chaos
    field=sat( localNoise*.42 + cells(uv+parallax*.65,3.8+mode*.65)*.42 + grid(q,9.0+mode*1.7)*.32 + tone*.18 + beat*.12 );
    field = mod( field + (groove + airDrive)*0.25 , 1.05 );
  }
  float reactiveMask=0.0;
  if(reactLane < .5){
    reactiveMask=ringField(q,5.8+audioA*28.0+beat*3.0,t+slam*.8);
    field=sat(field*(.68+.58*audioA)+reactiveMask*(.22+.48*slam));
  } else if(reactLane < 1.5){
    reactiveMask=grid(q+flow*(.05+wild*.2),7.5+audioA*32.0+groove*5.0);
    field=max(field,reactiveMask*(.28+.72*wild+beat*.08));
  } else if(reactLane < 2.5){
    // Diagonal stripe reactor: ONLY when stripe personality selected (rare); otherwise beat-synced radial pulse
    if(stripeLane > 4.3){
      reactiveMask=stripes(q.x+q.y+prevLum*.28,16.0+audioA*58.0,.045+.14*uRecipe5.z);
      field=mix(field,1.0-field,reactiveMask*slam*.62);
    } else {
      float radp = smoothstep(.08,.0, abs(length(q)-(.22 + audioA*.38 + .09*sin(t*7.2 + beat*2.0))) );
      reactiveMask = radp * (0.6 + 0.4*beat);
      field = sat( field*0.7 + reactiveMask*1.1 + beat*0.12 );
    }
  } else if(reactLane < 3.5){
    reactiveMask=step(.48+.24*(uRecipe4.w-.5),noise((uv+flow*.18)*(9.5+audioA*36.0)+t*3.8+beat));
    field=sat(field*.48+reactiveMask*(.28+.72*flux)+prevEdge*.28+beat*.06);
  } else if(reactLane < 4.5){
    reactiveMask=smoothstep(.16,.0,abs(length(q)-(.16+.46*audioA+.1*sin(t*6.5+beat*1.8))));
    field=sat(max(field,reactiveMask)+slam*.38 + beat*.10);
  } else if(reactLane < 5.5){
    reactiveMask=cells(q+vec2(sin(t*1.3+beat),cos(t*.95))*(.07+audioA*.2),3.8+audioB*17.0);
    field=mix(field,reactiveMask,sat(.26+audioA*.72+beat*.1));
  } else if(reactLane < 6.5){
    reactiveMask=smoothstep(.13,.84,abs(dot(normalize(q+vec2(.0015)),normalize(flow+vec2(.0025)+laneVec*.2))));
    field=sat(field*.55+reactiveMask*(.24+.55*tone)+prevLum*.16+groove*.10);
  } else {
    reactiveMask=fbm(q*(2.8+audioA*9.5)+prevGrad*7.5+t*1.9+beat*.4);
    field=sat(abs(field-reactiveMask)*1.28 + camEdge*(.18+.42*audioB) + beat*.08);
  }
  float modeBias=fract(mode*.173+seed);
  if(mode < 1.5){
    field=smoothstep(.18,.86,field);
  } else if(mode < 2.5){
    field=1.0-smoothstep(.18,.93,field);
  } else if(mode < 3.5){
    field=sat(field*.58+camEdge*.42+beat*.06);
  } else if(mode < 4.5){
    field=smoothstep(.32,.66,field);
  } else if(mode < 5.5){
    field=sat(abs(field-.5)*1.95 + beat*.05);
  } else if(mode < 6.5){
    field=sat(field*.42+depth*.38+prevLum*.18+groove*.06);
  } else if(mode < 7.5){
    field=sat(field*.72*(.42+.58*pulse+beat*.12)+camLum*.22);
  } else if(mode < 8.5){
    field=step(.48+.2*(modeBias-.5),field);
  } else {
    field=sat(field*.52+localNoise*.34+tone*.16+air*.1);
  }
  field=sat(field);

  float gate=smoothstep(.26,.86,field);
  float spark=smoothstep(.80,.92,noise((uv+flow*.12)*uRes*.026+t*4.8+seed*18.0+beat*1.2))*(.10+.40*camEdge+beat*.08);  // smoothstep + much less beat to kill flicker/white pops
  vec3 palA=palette(field+seed+reaction*.38,uRecipe1.x,uRecipe1.y);
  vec3 palB=palette(depth+uRecipe2.z+bright*.52,uRecipe3.z,uRecipe4.w);
  vec3 palC=palette(localNoise+prevLum*.48+seed*.29+beat*.15,uRecipe4.x,uRecipe3.z);
  // Effects now primarily modify the camera feed layer itself rather than bright separate overlays/underlays.
  // Generated "under" is now a subtle modulator/tint on the camera, not a covering layer.
  vec3 under=mix(palA,palB,.24+.46*uRecipe2.y);
  under=modpal(under*(.28+1.55*gate+.52*drive01)+palC*(.05+.22*ent+.16*reaction)+spark*palB*.28,seed+tone+beat*.1);
  // less pure "brighter on audio", more cross-channel + mod character (reduced audio coeffs)
  under = vec3(
    mod(under.r * (0.7 + 0.3*body), 1.02),
    mod(under.g * (0.8 + 0.25*midb), 1.02),
    mod(under.b * (0.9 + 0.2*airDrive), 1.02)
  );
  under*=.12+0.6*gate+.12*vignette(p)+.08*reaction+beat*.02;  // significantly dimmed so it doesn't cover camera
  under = audioMutate(under, body, midb, airDrive, beat, groove, mutateAmt * pitchLevel * 0.6);  // color mutations ramp with pitch/tone activity (subtler)

  float posterLevels=2.0+floor(uRecipe5.z*8.0+drive01*3.0);
  vec3 camWarped=mix(cam,poster(cam,posterLevels),uRecipe3.w*(.14+.18*reaction));  // reduced reaction
  camWarped=mix(camWarped,1.0-camWarped.bgr,smoothstep(.8,.995,uRecipe5.w)*(.12+.22*reaction));
  camWarped=modpal(mix(camWarped,camWarped*mix(vec3(1.06),palB*1.45,.55),.18+.34*uRecipe4.x+.12*drive01),seed+camLum);
  camWarped = audioMutate(camWarped, body*0.7+midb*0.3, midb, airDrive, beat*0.8, detail, mutateAmt * pitchLevel);
  float colorAmt=sat(.14+.46*effectLevel+.20*pitchLevel+.16*beat+.12*drive01);
  vec3 edgeTint=mix(palA,palB,sat(camEdge*.75+field*.25));
  if(colorLane < .5){
    camWarped=hueShift(camWarped,(audioA-audioB)*1.55*colorAmt+(seed-.5)*1.8);
  } else if(colorLane < 1.5){
    float lev=2.0+floor(mode*.42+beat*5.0+audioA*3.0);
    camWarped=mix(camWarped,poster(camWarped,lev),colorAmt*.78);
  } else if(colorLane < 2.5){
    vec3 swapped=vec3(camWarped.g,camWarped.b,camWarped.r);
    camWarped=mix(camWarped,swapped,smoothstep(.34,.86,beat+pitchLevel*.35)*(.42+.38*uRecipe5.w));
  } else if(colorLane < 3.5){
    camWarped=mix(camWarped,camWarped*(.72+edgeTint*1.25)+edgeTint*camEdge*.45,sat(camEdge*1.8+pitchLevel*.35)*colorAmt);
  } else if(colorLane < 4.5){
    float cut=step(.42+.22*(uRecipe4.x-.5),field+beat*.18);
    camWarped=mix(camWarped,1.0-camWarped.bgr,cut*colorAmt*.65);
  } else if(colorLane < 5.5){
    float solar=smoothstep(.18,.82,abs(camLum-.5)*2.0+field*.35);
    camWarped=mix(camWarped,abs(1.0-2.0*camWarped),solar*colorAmt*.72);
  } else if(colorLane < 6.5){
    float blockScale=5.0+floor(mode*1.2+audioA*8.0+beat*4.0);
    vec2 blockUv=(floor(camUv*blockScale)+.5)/blockScale;
    vec3 blockCam=camAt(blockUv);
    camWarped=mix(camWarped,mix(blockCam,poster(blockCam,3.0+floor(audioB*5.0)),.55),colorAmt*(.34+.5*groove));
  } else {
    vec3 thresh=mix(palC,prev.bgr,.22+.58*feedbackLane/7.0);
    float cMask=smoothstep(.24+.32*uRecipe4.x,.92,field+camEdge*.35+beat*.18);
    camWarped=mix(camWarped,thresh,cMask*colorAmt*.82);
  }
  float camAlpha=sat(.34+uCameraBlend*(.22+.24*uRecipe3.z)+camEdge*(.16+.28*uRecipe3.x)+lum*.18-depth*.05-drive01*.08-wild*(.03+.1*uRecipe2.w)+slam*.04) * effectLevel;  // under/overlay visibility ramps with overall audio activity (volume+pitch+rhythm)

  // Veil / overlay pattern: diagonal stripes only rarely + purposefully via stripeLane
  float veil;
  float veilSel = fract(uRecipe5.x * 7.3 + seed * 1.9 + stripeLane * .11);
  if(veilSel < .14 && stripeLane > 4.4){
    // purposeful diagonal only for stripe personalities, and only ~2% base probability
    veil=stripes((uv.x+uv.y)*(0.78+uRecipe5.x*.6)+field*.2,14.0+mode*2.6+air*26.0,.065+.14*uRecipe5.y);
  } else if(veilSel < .42){
    // horizontal-ish bars (less annoying, audio reactive)
    veil=stripes(uv.y*(9.0+mode*1.8+audioA*12.0)+t*1.3+field*.15,1.0,.07+.11*uRecipe5.y);
  } else if(veilSel < .66){
    // soft radial rings
    veil=ringField(q*(.9+uRecipe5.x*.4), 5.5+mode*1.3+highReact*4.0, t*1.1+prevLum*.4)*.85 + .15;
  } else {
    // noise / organic grain veil
    veil=sat( fbm((uv+flow*.04)*(2.8+mode*.7)+vec2(t*.6,seed*3.1))*1.1 + detail*.25 );
  }
  float alphaA=sat(gate*(.32+.62*uRecipe2.w)+prevEdge*(.12+.48*uRecipe3.y)+pulse*.24+beat*.10);
  float alphaB=sat(veil*(.26+.54*bright)+camEdge*.26+reaction*.24+spark*.26+beat*.08);
  float overlayAlpha=sat(mix(alphaA,alphaB,uRecipe5.y)*(.36+.54*drive01)+wild*(.07+.24*uRecipe4.w)+snap*slam*.2+beat*.06) * effectLevel;  // no overlay when no audio
  if(mode < 1.5) overlayAlpha*=.68;
  else if(mode < 2.5) overlayAlpha*=1.06;
  else if(mode < 3.5) overlayAlpha*=1.42;
  else if(mode < 4.5) overlayAlpha*=.72+.44*pulse+beat*.12;
  else if(mode < 5.5) overlayAlpha*=1.22*smoothstep(.2,.8,field);
  else if(mode < 6.5) overlayAlpha*=.62+.44*prevEdge;
  else if(mode < 7.5) overlayAlpha*=.44+.72*camEdge;
  else if(mode < 8.5) overlayAlpha*=1.1;
  else overlayAlpha*=.8+.34*tone;
  overlayAlpha=sat(overlayAlpha);
  vec3 overlay=palette(veil+prevLum+seed*.68+beat*.12,uRecipe2.x,uRecipe5.w);
  overlay=modpal(mix(overlay,prev.bgr*(.92+bright*.84)+palA*.5,uRecipe4.z),seed+bright+air*.1);
  overlay*=.4 + .3*gate + .1*reaction;  // dim overlay so it doesn't cover camera feed
  overlay = audioMutate(overlay, midb, airDrive, groove, beat, detail, mutateAmt * pitchLevel * 0.5);

  // Composition lanes make presets differ by layer logic, not just by stronger/weaker warp.
  vec3 layered = camWarped;
  float edgeMask=sat(camEdge*1.65+prevEdge*.58);
  float beatMask=smoothstep(.22,.9,reactiveMask+beat*.24+slam*.18);
  float contourMask=smoothstep(.18,.82,abs(field-.5)*2.0+edgeMask*.28);
  float blockMask=step(.5,blockHash(uv+flow*.02,vec2(6.0+mode*1.8,4.5+mode*1.35),uTime*(.28+beat*4.8+groove*1.4)));
  float radialMask=smoothstep(.5,.03,abs(length(p)-(.16+.36*audioA+.08*sin(t*5.3+seed*6.0))));
  float chosenMask=gate;
  if(maskLane < .5) chosenMask=gate;
  else if(maskLane < 1.5) chosenMask=edgeMask;
  else if(maskLane < 2.5) chosenMask=beatMask;
  else if(maskLane < 3.5) chosenMask=contourMask;
  else if(maskLane < 4.5) chosenMask=blockMask;
  else if(maskLane < 5.5) chosenMask=radialMask;
  else if(maskLane < 6.5) chosenMask=sat(gate*.45+edgeMask*.55);
  else chosenMask=sat(abs(field-reactiveMask)*1.35+beat*.14);
  if(composeLane < .5){
    layered=mix(camWarped,camWarped*(.76+under*.72)+palA*.08,chosenMask*camAlpha*.48);
    layered=mix(layered,rawCam,.14+.10*(1.0-effectLevel));
  } else if(composeLane < 1.5){
    layered=mix(camWarped,overlay*(.62+.38*edgeTint)+camWarped*.28,edgeMask*overlayAlpha*.62);
    layered=mix(layered,rawCam,.08);
  } else if(composeLane < 2.5){
    vec3 posterCam=poster(camWarped,2.0+floor(mode*.5+audioA*6.0+beat*4.0));
    layered=mix(camWarped,posterCam*(.75+palB*.45),chosenMask*(.28+.5*beat)*effectLevel);
  } else if(composeLane < 3.5){
    vec3 contour=mix(palA,palC,contourMask);
    layered=camWarped+contour*contourMask*(.12+.52*overlayAlpha);
    layered=mix(layered,camWarped,1.0-effectLevel*.72);
  } else if(composeLane < 4.5){
    vec3 cut=mix(rawCam,overlay,beatMask);
    layered=mix(camWarped,cut,beatMask*(.25+.62*slam+.2*rhythmLevel));
  } else if(composeLane < 5.5){
    vec3 echo=mix(prev,prev.bgr,.35+.45*pitchLevel);
    layered=mix(camWarped,echo*(.58+.32*feedbackLane/7.0)+under*.18,sat((.18+.56*chosenMask)*effectLevel));
  } else if(composeLane < 6.5){
    vec3 blocks=mix(palC,poster(camWarped,3.0+floor(audioB*5.0)),.52+.28*blockMask);
    layered=mix(camWarped,blocks,blockMask*(.2+.6*effectLevel));
  } else {
    vec3 lens=mix(camWarped*(.74+under*.42),overlay*(.5+.38*radialMask)+palA*.18,radialMask);
    layered=mix(camWarped,lens,sat((radialMask*.6+gate*.22)*effectLevel));
  }
  layered=mix(layered,rawCam*(.62+.34*lum)+palA*.14,.035+.07*(1.0-overlayAlpha));
  float feedbackPersonality=.72;
  if(feedbackLane < .5) feedbackPersonality=.32+.72*body;
  else if(feedbackLane < 1.5) feedbackPersonality=.38+1.25*airDrive;
  else if(feedbackLane < 2.5) feedbackPersonality=.22+1.65*flux;
  else if(feedbackLane < 3.5) feedbackPersonality=.12+1.85*slam;
  else if(feedbackLane < 4.5) feedbackPersonality=.52+1.15*groove;
  else if(feedbackLane < 5.5) feedbackPersonality=.28+1.45*prevEdge;
  else if(feedbackLane < 6.5) feedbackPersonality=.28+1.35*camEdge;
  else feedbackPersonality=.18+1.55*wild;
  float feedbackMotion=warpPersonality;
  if(composeLane > 4.5 && composeLane < 5.5) feedbackMotion=max(feedbackMotion,.34*effectLevel);
  float feedbackWarp=(.0035+.014*uRecipe1.w+.026*drive01)*(.26+.7*reaction+.44*wild)*feedbackPersonality * volLevel * (.12+.88*feedbackMotion);
  vec3 displacedPrev=prevAt(sat2(uv+flow*feedbackWarp+prevGrad*(.032+.13*uRecipe5.x)+laneVec*(.0035+.02*wild)+beat*flow*.015));
  float fb=sat(uFeedback*(.42+.2*feedbackPersonality)+.1*uRecipe5.w+.035*body+.09*wild-.035*onset+beat*.06) * volLevel;  // feedback fades with volume presence
  vec3 rec=mix(layered,displacedPrev*(.62+.26*fb)+layered*(.44+.22*reaction),(.18+.3*fb) * effectLevel);  // fade feedback contribution when low audio
  rec=mix(rec,layered,.22+.34*onset+.09*drive01+beat*.04);
  vec3 folded=fract(rec*(1.06+.24*bright+.16*drive01)+palette(seed+localNoise*.22+beat*.1,uRecipe3.x,uRecipe3.y)*(.03+.055*ent+.03*drive01));
  rec=mix(rec,folded,.42+.24*drive01+.14*ent+beat*.03);
  rec=mix(rec,layered,.07+.09*(1.0-overlayAlpha)+.14*onset+beat*.03);
  rec=mix(rec,rawCam,.03+.065*uCameraBlend*(1.0-gate));
  rec*=.56+.32*vignette(p)+.28*camEdge+.22*drive01+beat*.02;  // minimal beat to kill white-out blinks
  rec = audioMutate(rec, body, airDrive, groove, beat, detail, mutateAmt * pitchLevel);  // heavy non-brightness mutation here, ramps with pitch/tone per recipe
  float y=luma(rec);
  rec=mix(vec3(y),rec,1.20+.25*drive01+.15*bright+beat*.02);  // much less desat swing on loud audio
  rec=clamp((rec-.5)*(1.25+.30*drive01+.12*reaction)+.5,0.0,1.0);  // significantly tamer contrast, no beat
  rec=smoothstep(vec3(.085),vec3(.92),rec);
  rec=pow(sat3(rec),vec3(.88+.09*tone-.08*drive01));

  // Final cutoff: when audioPresence below threshold (effectLevel ~0), force completely unaltered plain camera feed.
  // This matches the spirit of the old shader where effects only applied if uAudioFreq groups > n; otherwise pass-through.
  // Warping is already un-applied via effectLevel scaling on warpAmt/parallax, feedback gated, layers gated.
  rec = mix(rawCam, rec, effectLevel);  // at silence cutoff (effectLevel==0), ONLY plain unaltered camera feed; ramps up based on pitch/rhythm/volume per recipe-tuned levels

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
    this.seedHold = null;
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
  mutateFloat(seed, serial) {
    seed >>>= 0; serial >>>= 0;
    if (this.wasm && this.wasm.recipe_mutate) {
      return (this.wasm.recipe_mutate(seed, serial) >>> 0) / 4294967295;
    }
    return this.wordFloat(seed, serial, 47);
  }
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
    const stripeLane = this.recipeWord(seed, serial, 107) % 7;
    const composeLane = this.recipeWord(seed, serial, 112) % 8;
    const colorLane = this.recipeWord(seed, serial, 113) % 8;
    const maskLane = this.recipeWord(seed, serial, 114) % 8;
    const warpLane = this.recipeWord(seed, serial, 115) % 8;
    recipe[0] = (family + .18 + recipe[0] * .64) / 20;
    recipe[1] = (mode + .16 + recipe[1] * .68) / 10;
    recipe[2] = Math.pow(recipe[2], .62);
    recipe[3] = Math.pow(recipe[3], .42);
    recipe[4] = Math.pow(recipe[4], .72);
    recipe[5] = .08 + recipe[5] * .92;
    recipe[7] = (composeLane + .12 + recipe[7] * .76) / 8;
    recipe[8] = (reactionLane + .12 + recipe[8] * .76) / 8;
    recipe[10] = recipe[10] < .33 ? recipe[10] * .42 : (recipe[10] < .66 ? .38 + recipe[10] * .22 : .72 + recipe[10] * .22);
    recipe[12] = (colorLane + .12 + recipe[12] * .76) / 8;
    recipe[13] = (motionLane + .1 + recipe[13] * .78) / 8;
    recipe[15] = Math.pow(recipe[15], .65);
    recipe[16] = (maskLane + .12 + recipe[16] * .76) / 8;
    recipe[17] = (stripeLane * .73 + .07 + recipe[17] * .33) / 7;
    recipe[18] = (feedbackLane + .1 + recipe[18] * .78) / 8;
    // bias a personality slot with the new WASM mutate word so different presets
    // get very different amounts of the wild audio channel mutations (awesomer variety)
    const mut = this.mutateFloat(seed, serial);
    recipe[19] = (mut * 0.82 + recipe[19] * 0.18);

    // Audio response parameters (recipe API for unique per-effect triggers).
    // These control smoothstep bases for vol/rhythm/pitch levels in shader.
    // Different presets will have effects (warp, field, color mutate, feedback, layers)
    // activating at different audio conditions (volume, rhythm/tempo, pitch/tone).
    // Breaking change to recipe schema ok per user.
    const volBase = this.wordFloat(seed, serial, 108);
    const rhythmBase = this.wordFloat(seed, serial, 109);
    const pitchBase = this.wordFloat(seed, serial, 110);
    recipe[6] = 0.25 + volBase * 0.32;   // volThresh (uRecipe1.z) - higher base for fan tolerance
    recipe[10] = rhythmBase;             // rhythmSens (uRecipe2.z)
    recipe[14] = pitchBase;              // pitchSens (uRecipe3.z)
    recipe[20] = 0.12 + this.wordFloat(seed, serial, 111) * 0.55; // extra tone/overall bias (uRecipe5.x)
    recipe[20] = Math.pow(recipe[20], .78);
    recipe[21] = (shapeLane + .1 + recipe[21] * .78) / 8;
    recipe[22] = (warpLane + .12 + recipe[22] * .76) / 8;
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
      engine: p.engine || 'layered-reactive-v10.8'
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
    const pair = wrap(Math.imul(index, 37) + Math.imul(seedOffset, 53), 200);
    const family = pair % 20;
    const mode = Math.floor(pair / 20);
    const composeByMode = [0,1,2,3,4,5,6,7,0,7];
    const colorByMode = [0,3,1,4,5,6,2,7,6,3];
    const warpByMode = [0,0,1,1,2,3,2,5,1,7];
    const reactionLane = wrap(family + Math.imul(mode, 3) + Math.floor(index / 5) + Math.imul(seedOffset, 5), 8);
    const motionLane = wrap(Math.imul(family, 2) + mode + Math.floor(index / 4) + Math.imul(seedOffset, 7), 8);
    const shapeLane = wrap(Math.imul(family, 5) + Math.imul(mode, 2) + Math.floor(index / 3) + Math.imul(seedOffset, 11), 8);
    const feedbackLane = wrap(Math.imul(family, 7) + mode + Math.floor(index / 8) + Math.imul(seedOffset, 6), 8);
    const composeLane = wrap(composeByMode[mode] + Math.floor(family / 7) + Math.imul(seedOffset, 3), 8);
    const colorLane = wrap(colorByMode[mode] + family + Math.floor(index / 13) + Math.imul(seedOffset, 7), 8);
    const maskLane = wrap(Math.imul(family, 3) + Math.imul(mode, 5) + Math.floor(index / 11) + Math.imul(seedOffset, 9), 8);
    const warpLane = wrap(warpByMode[mode] + (family % 9 === 0 ? 1 : 0) + Math.imul(seedOffset, 5), 8);
    const stripeLane = wrap(Math.imul(family, 5) + Math.imul(mode, 2) + Math.floor(index / 17) + Math.imul(seedOffset, 19), 7);
    recipe[0] = (family + .37 + recipe[2] * .2) / 20;
    recipe[1] = (mode + .29 + recipe[3] * .25) / 10;
    recipe[7] = (composeLane + .18 + recipe[7] * .64) / 8;
    recipe[8] = (reactionLane + .18 + recipe[9] * .64) / 8;
    recipe[12] = (colorLane + .16 + recipe[12] * .68) / 8;
    recipe[13] = (motionLane + .16 + recipe[14] * .68) / 8;
    recipe[16] = (maskLane + .16 + recipe[16] * .68) / 8;
    recipe[17] = (stripeLane * .73 + .07 + recipe[17] * .33) / 7;
    recipe[18] = (feedbackLane + .16 + recipe[19] * .68) / 8;
    // bias with mutate for preset-to-preset audio reactivity personality
    const mut = this.mutateFloat(seed, serial);
    recipe[19] = (mut * 0.78 + recipe[19] * 0.22);

    // Audio response params for baked presets - unique triggers per effect via index-based variation + words.
    // vol/rhythm/pitch levels will cause different effects to ramp up on different audio characteristics.
    const volBase = this.wordFloat(seed, serial, 108);
    const rhythmBase = this.wordFloat(seed, serial, 109);
    const pitchBase = this.wordFloat(seed, serial, 110);
    recipe[6] = 0.22 + ((index % 7) / 12.0) + volBase * 0.35;  // volThresh, varied by index for baked diversity
    recipe[10] = 0.05 + rhythmBase * 0.85;
    recipe[14] = 0.08 + pitchBase * 0.75;
    recipe[20] = 0.10 + ((Math.floor(index / 3) % 5) / 9.0) + this.wordFloat(seed, serial, 111) * 0.5;
    recipe[21] = (shapeLane + .18 + recipe[22] * .64) / 8;
    recipe[22] = (warpLane + .16 + recipe[23] * .68) / 8;
    recipe[6] = (recipe[6] + ((index % 5) / 4)) * .5;
    const finalized = recipe.map(v => Math.max(0, Math.min(.999999, +v || 0)));
    this.baseRecipeCache.set(cacheKey, finalized);
    return finalized;
  }
  reseedRecipe(recipe, seed, serial) {
    const offset = this.randomizerSeedOffset | 0;
    if (!offset) return recipe;
    const remixSeed = this.mix32((seed >>> 0) ^ Math.imul(offset, 0x9e3779b9) ^ Math.imul(serial >>> 0, 0x85ebca6b));
    const remix = this.makeRecipe(remixSeed, ((serial >>> 0) + Math.imul(offset, 0xc2b2ae35)) >>> 0);
    const out = recipe.slice();
    for (let i=0;i<RECIPE_SIZE;i++) {
      const lanePush = (i === 0 || i === 1 || i === 7 || i === 8 || i === 12 || i === 13 || i === 16 || i === 18 || i === 21 || i === 22) ? .82 : (.28 + .5 * remix[(i + 7) % RECIPE_SIZE]);
      out[i] = out[i] * (1 - lanePush) + remix[i] * lanePush;
    }
    return out.map(v => Math.max(0, Math.min(.999999, +v || 0)));
  }
  recipeLanes(recipe) {
    const r = recipe || [];
    return [
      Math.floor(Math.max(0, Math.min(.999999, +r[0] || 0)) * 20),
      Math.floor(Math.max(0, Math.min(.999999, +r[1] || 0)) * 10),
      Math.floor(Math.max(0, Math.min(.999999, +r[7] || 0)) * 8),
      Math.floor(Math.max(0, Math.min(.999999, +r[8] || 0)) * 8),
      Math.floor(Math.max(0, Math.min(.999999, +r[12] || 0)) * 8),
      Math.floor(Math.max(0, Math.min(.999999, +r[13] || 0)) * 8),
      Math.floor(Math.max(0, Math.min(.999999, +r[16] || 0)) * 8),
      Math.floor(Math.max(0, Math.min(.999999, +r[18] || 0)) * 8),
      Math.floor(Math.max(0, Math.min(.999999, +r[21] || 0)) * 8),
      Math.floor(Math.max(0, Math.min(.999999, +r[22] || 0)) * 8),
      Math.floor(Math.max(0, Math.min(.999999, +r[17] || 0)) * 7)
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
    for (let attempt=0; attempt<32; attempt++) {
      const candidateSeed = this.mix32(this.randomSeed() ^ Math.imul(serial + attempt + 1, 0x9e3779b9) ^ Math.imul(this.randomizerSeedOffset | 0, 0xc2b2ae35));
      const candidateSerial = (serial + Math.imul(attempt + 1, 4099) + (this.randomSeed() & 0xffff)) >>> 0;
      const candidateRecipe = this.makeRecipe(candidateSeed, candidateSerial);
      const score = this.recipeNoveltyScore(candidateRecipe) + this.wordFloat(candidateSeed, candidateSerial, 191) * .01;
      if (score > bestScore) { seed = candidateSeed; recipe = candidateRecipe; bestScore = score; }
    }
    const name = this.generatedName(seed, serial);
    const p = { name, seed, serial, recipe, createdAt: new Date().toISOString(), version: VERSION, schema: RECIPE_SCHEMA, engine: 'layered-reactive-v10.8' };
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
    const blob = new Blob([JSON.stringify({ version: VERSION, schema: RECIPE_SCHEMA, engine: 'layered-reactive-v10.8', presets: this.userPresets }, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'neon_recursion_v10_8_presets.json'; a.click();
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
    if (k==='ArrowUp') { ev.preventDefault(); this.adjustRandomizerSeed((ev.shiftKey ? 2 : 1)); return; }
    if (k==='ArrowDown') { ev.preventDefault(); this.adjustRandomizerSeed((ev.shiftKey ? -2 : -1)); return; }
    if (k==='[') { ev.preventDefault(); this.shiftBank(-1); return; }
    if (k===']') { ev.preventDefault(); this.shiftBank(1); return; }
    if (k===',' || k==='<') { this.feedback=Math.max(.72,this.feedback-.01); return; }
    if (k==='.' || k==='>') { this.feedback=Math.min(.987,this.feedback+.01); return; }
    if (k==='-' || k==='_') { ev.preventDefault(); this.adjustVisualDrive((ev.shiftKey ? -2 : -1) * DRIVE_KEY_STEP); return; }
    if (k==='=' || k==='+') { ev.preventDefault(); this.adjustVisualDrive((ev.shiftKey ? 2 : 1) * DRIVE_KEY_STEP); return; }
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
      down.gesture = 'verticalSeed';
      this.clearPendingTap();
      this.lastTap = null;
      this.startRandomizerSeedHold(dy < 0 ? 1 : -1);
    }
    if (down.gesture === 'verticalSeed') {
      const dir = dy < 0 ? 1 : -1;
      if (this.seedHold) this.seedHold.direction = dir;
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
    if (down.gesture === 'verticalSeed' || verticalSwipe) {
      this.stopRandomizerSeedHold();
      if (!down.gesture) this.adjustRandomizerSeed(dy < 0 ? 1 : -1);
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
      this.stopRandomizerSeedHold();
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
    if (!delta) return;
    this.randomizerSeedOffset = (this.randomizerSeedOffset + delta) | 0;
    this.baseRecipeCache.clear();
    this.bankFlash = 1;
    this.clearFeedback();
    this.updateTitle();
  }
  startRandomizerSeedHold(direction) {
    if (this.seedHold) {
      this.seedHold.direction = direction;
      return;
    }
    this.seedHold = { direction, last:performance.now(), raf:0, carry:0, changed:false };
    const tick = (now) => {
      if (!this.seedHold) return;
      const dt = Math.min(.08, Math.max(0, (now - this.seedHold.last) / 1000));
      this.seedHold.last = now;
      this.seedHold.carry += this.seedHold.direction * SEED_HOLD_UNITS_PER_SEC * dt;
      const whole = this.seedHold.carry > 0 ? Math.floor(this.seedHold.carry) : Math.ceil(this.seedHold.carry);
      if (whole) {
        this.seedHold.carry -= whole;
        this.adjustRandomizerSeed(whole);
        this.bankFlash = Math.max(this.bankFlash, .35);
        this.seedHold.changed = true;
      }
      this.seedHold.raf = requestAnimationFrame(tick);
    };
    this.seedHold.raf = requestAnimationFrame(tick);
  }
  stopRandomizerSeedHold() {
    if (!this.seedHold) return;
    const hold = this.seedHold;
    cancelAnimationFrame(hold.raf);
    this.seedHold = null;
    if (!hold.changed) this.adjustRandomizerSeed(hold.direction);
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
  updateTitle() { document.title = `Neon V10.8 ${this.effect+1}/${this.totalEffects()} — ${this.currentName()}`; }

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
      a[9]=Math.min(1, Math.pow(flux*1.6, .55));  // less spiky
      a[10]=Math.min(1, Math.pow(Math.max(0, a[9]-.12)*1.8, .6));
      const energy=(a[0]+a[1]+a[2]+a[3]+a[4]+a[5]+a[6])/7;
      const now=performance.now();
      this._beatPhase = this._beatPhase || 0;
      this._lastBeat = this._lastBeat || 0;
      if (a[10]>.42 && now-this._lastBeat>140) { this._beatPhase=1; this._lastBeat=now; }  // higher threshold, less trigger happy
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
    for(let i=0;i<16;i++) this.audioSmooth[i] = this.audioSmooth[i]*0.95 + a[i]*0.05;  // even slower to reduce sensitivity and jitter
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
    this.hud.innerHTML = `<b>${VERSION}</b><br>${this.effect+1}/${this.totalEffects()}: ${this.currentName()}<br><span class="dim">Number keys:</span> ${b0}..${b1} &nbsp; <span class="dim">generated:</span> ${this.userPresets.length} &nbsp; <span class="dim">drive:</span> ${this.intensity.toFixed(2)} &nbsp; <span class="dim">seed:</span> ${this.randomizerSeedOffset}${rec}<br><span class="dim">audio ${this.audioInputLabel()}:</span> bass ${this.audioSmooth[1].toFixed(2)} mid ${this.audioSmooth[3].toFixed(2)} treble ${this.audioSmooth[5].toFixed(2)} flux ${this.audioSmooth[9].toFixed(2)} rhythm ${this.audioSmooth[11].toFixed(2)}<br><span class="dim">Up/down or vertical swipe-hold reseed (seed offset), -/= drive, click/tap/C forge, double/Space MP4 rec, [/] banks, F fullscreen, X/Y/Z flips, H HUD</span>`;
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
