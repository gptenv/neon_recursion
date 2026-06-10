(() => {
'use strict';

const VERSION = "webgl-wasm-v10.5-fullscreen-hud-hotfix-2026-06-10";
const TAP_MOVE_PX = 18;
const DOUBLE_TAP_MS = 320;
const DOUBLE_TAP_PX = 42;
const SWIPE_MIN_PX = 80;
const SWIPE_RATIO = 1.5;
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
  "Bass Edge Seismograph",
  "Vocal Formant Loom",
  "Treble Dust Mycelium",
  "Spectral Prism Splitter",
  "Rhythm Tile Mutator",
  "Dominant Tone Ridge Map",
  "Noise/Tone Metamaterial",
  "Midband Shadow Puppetry",
  "Flux Datamosh Cartographer",
  "Timbre Circuit Organism",
  "Subwoofer Fault Curtain",
  "Airband Fireflies",
  "Harmonic Barcode Garden",
  "Flux Paper Tear",
  "Centroid Heat Mirage",
  "Tonal Clay Relief",
  "Rhythm Stutter Loom",
  "Treble Wireframe Moss",
  "Bass Shadow Stamp",
  "Noise Granite Scanner",
  "Formant Glass Teeth",
  "Kickdrum Pixel Landslide",
  "Cymbal Lace Hive",
  "Drone Ink Reservoir",
  "Onset Circuit Rain",
  "Pitch Compass Cells",
  "Sibilant Frost Bloom",
  "Low-Mid Mud Puppets",
  "Brightness Ribbon Saw",
  "Spectral Conveyor Fossils",
  "Bass-Cut Origami",
  "Harmonic Smoke Stamps",
  "Transient Chalk Shards",
  "Air Glitter Topology",
  "Midrange X-Ray Cloth",
  "Tonal Prism Lattice",
  "Noisy Ghost Debris",
  "Rhythm Mosaic Elevator",
  "Dominant Pitch Rail Yard",
  "Flux River Delta",
  "Subharmonic Door Scanner",
  "Treble Needle Embroidery",
  "Formant Rubber Sheet",
  "Beat Bloom Cartons",
  "Noise Pearl Crusher",
  "Centroid Wind Tunnel",
  "Bassline Insect Trails",
  "Airband Snow Static",
  "Tonal Marble Quarry",
  "Midband Neon Cartilage",
  "Kick-Snare Shape Sorter",
  "Whisper Spectrogram Veins",
  "Harmonic Fishbone Map",
  "Flux Confetti Gate",
  "Low-End Gravity Press",
  "High-Mid Teeth Grinder",
  "Rhythm Switchboard Colony",
  "Pitch-Stitched Curtains",
  "Noise/Tone Weather Radar",
  "Spectral Fossil Printer",
  "Spectral Stencil Swarm Aperture",
  "Bass Cloth Crease Aperture",
  "Treble Pollen Vector Aperture",
  "Formant Mouth Mask Aperture",
  "Rhythm Checker Elevator Aperture",
  "Centroid Horizon Scanner Aperture",
  "Dominant Pitch Glass Comb Aperture",
  "Tone Noise Alchemy Salt Aperture",
  "Flux Melt Cartographer Aperture",
  "Midband Silhouette Origami Aperture",
  "Air Wire Lichen Aperture",
  "Sub Lava Fault Plate Aperture",
  "Zero-Cross Static Calligraphy Aperture",
  "Full-Spectrum Bio-Circuit Loom Aperture",
  "Spectral Stencil Swarm Lantern",
  "Bass Cloth Crease Lantern",
  "Treble Pollen Vector Lantern",
  "Formant Mouth Mask Lantern",
  "Rhythm Checker Elevator Lantern",
  "Centroid Horizon Scanner Lantern",
  "Dominant Pitch Glass Comb Lantern",
  "Tone Noise Alchemy Salt Lantern",
  "Flux Melt Cartographer Lantern",
  "Midband Silhouette Origami Lantern",
  "Air Wire Lichen Lantern",
  "Sub Lava Fault Plate Lantern",
  "Zero-Cross Static Calligraphy Lantern",
  "Full-Spectrum Bio-Circuit Loom Lantern",
  "Spectral Stencil Swarm Comet",
  "Bass Cloth Crease Comet",
  "Treble Pollen Vector Comet",
  "Formant Mouth Mask Comet",
  "Rhythm Checker Elevator Comet",
  "Centroid Horizon Scanner Comet",
  "Dominant Pitch Glass Comb Comet",
  "Tone Noise Alchemy Salt Comet",
  "Flux Melt Cartographer Comet",
  "Midband Silhouette Origami Comet",
  "Air Wire Lichen Comet",
  "Sub Lava Fault Plate Comet",
  "Zero-Cross Static Calligraphy Comet",
  "Full-Spectrum Bio-Circuit Loom Comet",
  "Spectral Stencil Swarm Quarry",
  "Bass Cloth Crease Quarry",
  "Treble Pollen Vector Quarry",
  "Formant Mouth Mask Quarry",
  "Rhythm Checker Elevator Quarry",
  "Centroid Horizon Scanner Quarry",
  "Dominant Pitch Glass Comb Quarry",
  "Tone Noise Alchemy Salt Quarry",
  "Flux Melt Cartographer Quarry",
  "Midband Silhouette Origami Quarry",
  "Air Wire Lichen Quarry",
  "Sub Lava Fault Plate Quarry",
  "Zero-Cross Static Calligraphy Quarry",
  "Full-Spectrum Bio-Circuit Loom Quarry",
  "Spectral Stencil Swarm Velvet",
  "Bass Cloth Crease Velvet",
  "Treble Pollen Vector Velvet",
  "Formant Mouth Mask Velvet",
  "Rhythm Checker Elevator Velvet",
  "Centroid Horizon Scanner Velvet",
  "Dominant Pitch Glass Comb Velvet",
  "Tone Noise Alchemy Salt Velvet",
  "Flux Melt Cartographer Velvet",
  "Midband Silhouette Origami Velvet",
  "Air Wire Lichen Velvet",
  "Sub Lava Fault Plate Velvet",
  "Zero-Cross Static Calligraphy Velvet",
  "Full-Spectrum Bio-Circuit Loom Velvet",
  "Spectral Stencil Swarm Meteor",
  "Bass Cloth Crease Meteor",
  "Treble Pollen Vector Meteor",
  "Formant Mouth Mask Meteor",
  "Rhythm Checker Elevator Meteor",
  "Centroid Horizon Scanner Meteor",
  "Dominant Pitch Glass Comb Meteor",
  "Tone Noise Alchemy Salt Meteor",
  "Flux Melt Cartographer Meteor",
  "Midband Silhouette Origami Meteor",
  "Air Wire Lichen Meteor",
  "Sub Lava Fault Plate Meteor",
  "Zero-Cross Static Calligraphy Meteor",
  "Full-Spectrum Bio-Circuit Loom Meteor",
  "Spectral Stencil Swarm Cathedral",
  "Bass Cloth Crease Cathedral",
  "Treble Pollen Vector Cathedral",
  "Formant Mouth Mask Cathedral",
  "Rhythm Checker Elevator Cathedral",
  "Centroid Horizon Scanner Cathedral",
  "Dominant Pitch Glass Comb Cathedral",
  "Tone Noise Alchemy Salt Cathedral",
  "Flux Melt Cartographer Cathedral",
  "Midband Silhouette Origami Cathedral",
  "Air Wire Lichen Cathedral",
  "Sub Lava Fault Plate Cathedral",
  "Zero-Cross Static Calligraphy Cathedral",
  "Full-Spectrum Bio-Circuit Loom Cathedral",
  "Spectral Stencil Swarm Jungle",
  "Bass Cloth Crease Jungle",
  "Treble Pollen Vector Jungle",
  "Formant Mouth Mask Jungle",
  "Rhythm Checker Elevator Jungle",
  "Centroid Horizon Scanner Jungle",
  "Dominant Pitch Glass Comb Jungle",
  "Tone Noise Alchemy Salt Jungle",
  "Flux Melt Cartographer Jungle",
  "Midband Silhouette Origami Jungle",
  "Air Wire Lichen Jungle",
  "Sub Lava Fault Plate Jungle",
  "Zero-Cross Static Calligraphy Jungle",
  "Full-Spectrum Bio-Circuit Loom Jungle",
  "Spectral Stencil Swarm Machine",
  "Bass Cloth Crease Machine",
  "Treble Pollen Vector Machine",
  "Formant Mouth Mask Machine",
  "Rhythm Checker Elevator Machine",
  "Centroid Horizon Scanner Machine",
  "Dominant Pitch Glass Comb Machine",
  "Tone Noise Alchemy Salt Machine",
  "Flux Melt Cartographer Machine",
  "Midband Silhouette Origami Machine",
  "Air Wire Lichen Machine",
  "Sub Lava Fault Plate Machine",
  "Zero-Cross Static Calligraphy Machine",
  "Full-Spectrum Bio-Circuit Loom Machine",
  "Spectral Stencil Swarm Monsoon",
  "Bass Cloth Crease Monsoon",
  "Treble Pollen Vector Monsoon",
  "Formant Mouth Mask Monsoon",
  "Rhythm Checker Elevator Monsoon",
  "Centroid Horizon Scanner Monsoon",
  "Dominant Pitch Glass Comb Monsoon",
  "Tone Noise Alchemy Salt Monsoon",
  "Flux Melt Cartographer Monsoon",
  "Midband Silhouette Origami Monsoon",
  "Air Wire Lichen Monsoon",
  "Sub Lava Fault Plate Monsoon",
  "Zero-Cross Static Calligraphy Monsoon",
  "Full-Spectrum Bio-Circuit Loom Monsoon"
];
const BASE_COUNT = BASE_EFFECT_NAMES.length;
const BANK_SIZE = 10;
const STORE_KEY = 'neon_recursion_touchstone_v10_presets'; // keep v10 storage compatibility

const ADJECTIVES = ['wiggly','feral','plucky','soggy','turbo','velvet','haunted','quantum','mango','crunchy','baffled','lunar','neon','goblin','wobbly','cosmic','sneaky','glitter','noodle','zesty','thunder','banana','polite','rancid','radiant','pickle','boingo','squishy','nocturnal','electric','spicy','rubber','singing','itchy','wizard','salty','fractal','mystic','jolly','unhinged'];
const NOUNS = ['badger','lantern','moth','waffle','kraken','turnip','satellite','walrus','cactus','accordion','ferret','mushroom','teacup','iguana','monolith','cabbage','megalodon','toaster','parrot','squid','zeppelin','dumpling','narwhal','cassette','goblet','raccoon','marmot','bagel','chimera','banjo','yak','pudding','cauldron','slug','obelisk','noodle','pebble','amoeba','trombone','sparkplug'];
const TRAILERS = ['wiggler','cascade','machine','nebula','theatre','factory','cartographer','organism','storm','loom','garden','portal','committee','disco','engine','situation','apparatus','pickle','mystery','cathedral'];

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
uniform int uUserGenerated;
uniform vec4 uRecipe0;
uniform vec4 uRecipe1;
uniform vec4 uRecipe2;
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

void main(){
  vec2 uv=vUV;
  vec2 asp=vec2(uRes.x/uRes.y,1.0);
  vec2 p=(uv-.5)*asp;
  float sub=uAudio0.x,bass=uAudio0.y,lowMid=uAudio0.z,mid=uAudio0.w;
  float highMid=uAudio1.x,treble=uAudio1.y,air=uAudio1.z,specCentroid=uAudio1.w;
  float domPeak=uAudio2.x,flux=uAudio2.y,onset=uAudio2.z,rhythm=uAudio2.w;
  float tonal=uAudio3.x,zcr=uAudio3.y,energy=uAudio3.z,aEntropy=uAudio3.w;
  float e=float(uEffect);
  float family=mod(e,20.0);
  float variant=floor(e/20.0);
  float seed=fract((e+1.0)*0.61803398875);
  if(uUserGenerated==1){ family=floor(uRecipe0.x*20.0); variant=1.0+floor(uRecipe0.y*14.0); seed=fract(uRecipe1.x+uRecipe2.z); }
  float ent=sat(aEntropy*.75 + uRecipe1.y*.25);
  float bright=sat(specCentroid*.75+air*.25);
  float pulse=sat(onset*.65+rhythm*.55+flux*.45);
  float tone=sat(tonal*.8+domPeak*.25);
  float edge=edgeCam(uv);
  vec3 cam=camAt(uv);
  float lum=luma(cam);
  float t=uTime*(.08+.28*rhythm+.12*uRecipe0.z);
  float localNoise=fbm(uv*(2.0+variant*.43)+vec2(t,seed*9.0));
  vec2 warp=vec2(0.0);
  warp += (vec2(noise(uv*8.0+t),noise(uv*8.0-t+4.0))-.5)*(0.004+0.026*pulse+0.012*ent);
  warp += vec2(edge*(bass-.3), lum*(treble-.25))*0.006*uIntensity;
  vec3 prev=texture(uPrev,sat2(uv+warp)).rgb;
  vec3 fx=vec3(0.0);
  float m=0.0;

  if(family < .5){
    m=edge*stripes(uv.y+lowMid*.2, 18.0+variant*2.0+bass*28.0, .2+.2*pulse);
    fx=cyc(m+domPeak*.7+seed,seed)*(.25+.75*m);
  } else if(family < 1.5){
    float loom=stripes(uv.x+sin(uv.y*8.0+mid*4.0)*.05, 7.0+mid*32.0, .18);
    m=loom*smoothstep(.18,.82,lum+lowMid*.25);
    fx=modpal(cyc(m+specCentroid+seed,.22),seed+mid);
  } else if(family < 2.5){
    float dust=step(.72+.18*(1.0-treble), noise(uv*(48.0+variant*11.0)+air*8.0));
    m=dust*(.2+.8*edge)+air*.35;
    fx=cyc(m+localNoise*.7+air, .7+seed);
  } else if(family < 3.5){
    vec2 q=uv+vec2(edge, -edge)*(.015+.05*flux);
    vec3 ca=camAt(q+vec2(.006*treble,0)), cb=camAt(q), cc=camAt(q-vec2(.006*bass,0));
    fx=vec3(ca.r,cb.g,cc.b); fx=modpal(fx+cyc(specCentroid+seed,.4)*.35,seed);
  } else if(family < 4.5){
    m=grid(uv+vec2(0.0,rhythm*.03*sin(uTime*4.0)), 5.0+variant*2.0+rhythm*18.0);
    fx=mix(poster(cam,3.0+floor(air*6.0)),cyc(m+seed+onset,.9),.55+.35*m);
  } else if(family < 5.5){
    float rid=abs(fract((lum+edge*.8+uv.y*.7+domPeak*.6+seed)*8.0+variant*.13)-.5);
    m=smoothstep(.32,.0,rid);
    fx=mix(cyc(lum+seed,.6),cyc(m+domPeak,.1),m);
  } else if(family < 6.5){
    float c=cells(uv+vec2(lowMid*.04, highMid*.02), 5.0+variant+zcr*14.0);
    m=mix(c,1.0-c,tonal)*(.35+.65*edge);
    fx=modpal(cyc(c+tone+seed,.3)+cam*.35,seed+zcr);
  } else if(family < 7.5){
    float sh=smoothstep(.25+.2*sin(seed*6.0),.75,lum+mid*.12);
    vec2 off=(vec2(noise(uv*3.0+t),noise(uv*3.0-t))-.5)*(.03+.05*mid);
    fx=mix(texture(uPrev,sat2(uv-off)).rgb,cyc(sh+mid+seed,.5),.25+.6*sh);
  } else if(family < 8.5){
    float tear=step(.5,fract((uv.y+fbm(vec2(uv.y*3.0,t))*0.2)*26.0+flux*12.0));
    vec2 q=uv+vec2((tear-.5)*(.02+.08*flux),0.0);
    fx=modpal(camAt(q)+cyc(tear+seed+flux,.8)*.45,seed);
  } else if(family < 9.5){
    float wires=grid(uv+vec2(sin(uv.y*19.0+uTime)*.01,cos(uv.x*17.0)*.01), 12.0+variant*3.0+highMid*20.0);
    m=max(wires,edge*(.7+treble));
    fx=cyc(m+highMid+seed,.05)*m + cam*.22;
  } else if(family < 10.5){
    float stencil=step(.48+.18*sin(variant), lum+edge*.7+sub*.16);
    float hatch=stripes(uv.x+uv.y*.35, 24.0+bass*40.0, .12);
    m=stencil*hatch;
    fx=mix(cyc(seed+lum,.2),cyc(m+bass,.75),.7*m);
  } else if(family < 11.5){
    float cloth=sin((uv.x+fbm(vec2(uv.y*2.0,t))*0.2)*30.0+lowMid*8.0)*sin((uv.y+edge*.06)*22.0);
    m=smoothstep(.2,.95,abs(cloth)+bass*.3);
    fx=modpal(cyc(cloth*.3+seed,.33)+cam*.28,lowMid+seed);
  } else if(family < 12.5){
    float pollen=pow(noise(uv*(70.0+air*80.0)+t*20.0), 8.0-5.0*air);
    m=sat(pollen*3.0+edge*.35);
    fx=cyc(pollen+air+seed,.68)*(.15+.85*m);
  } else if(family < 13.5){
    float mouth=abs(sin((uv.y+sin(uv.x*6.0+mid*4.0)*.05)*24.0+mid*8.0));
    m=smoothstep(.75-.25*mid,1.0,mouth)*(smoothstep(.2,.85,lum));
    fx=mix(cam*.25,cyc(m+mid+seed,.47),.45+.55*m);
  } else if(family < 14.5){
    float horizon=smoothstep(.0,.03,abs(uv.y-.5-.18*sin(uv.x*6.0+specCentroid*5.0+seed)));
    m=(1.0-horizon)*(0.4+specCentroid)+edge*.4;
    fx=modpal(cyc(uv.y+specCentroid+seed,.17)+vec3(m*.4),seed);
  } else if(family < 15.5){
    float lava=fbm(uv*(3.0+variant*.4)+vec2(0,t*4.0+bass*2.0));
    m=smoothstep(.45-.25*sub,.75,lava+edge*.3);
    fx=cyc(lava+sub+seed,.02)*(.2+.8*m);
  } else if(family < 16.5){
    float ink=abs(fract((uv.x*.7+uv.y*.9+fbm(uv*5.0+t))*16.0+zcr*5.0)-.5);
    m=smoothstep(.22,.0,ink)*(0.2+0.8*zcr);
    fx=mix(cyc(seed+ink,.9),vec3(m)*cyc(zcr+seed,.4),.75);
  } else if(family < 17.5){
    float organ=cells(uv+vec2(sin(t),cos(t))*.02, 3.0+variant*.7+energy*10.0);
    float vein=grid(uv+organ*.03, 16.0+tone*20.0);
    m=max(organ*.6,vein*.8)*(0.5+0.5*energy);
    fx=modpal(cyc(organ+tone+seed,.12)+vec3(vein*.2),seed+energy);
  } else if(family < 18.5){
    float bars=step(.5,fract((uv.x+domPeak*.2)*floor(18.0+variant*3.0)));
    m=mix(bars,1.0-bars,step(.5,noise(vec2(floor(uv.y*20.0),variant))))*(.35+.65*tone);
    fx=cyc(m+domPeak+seed,.58)*(.2+.8*m)+cam*.18;
  } else {
    vec2 block=floor(uv*(vec2(8.0,5.0)+variant));
    float quilt=hash21(block+floor(uTime*(1.0+rhythm*6.0))*.07);
    m=smoothstep(.28,.9,quilt+edge*.35+pulse*.2);
    fx=mix(poster(cam,2.0+floor(treble*8.0)),cyc(quilt+seed+pulse,.77),.65*m);
  }

  float shimmer=(noise(uv*uRes*.37+uTime*.73)-.5)*(0.006+0.012*ent); // small entropy, no harsh flicker
  fx=modpal(fx+shimmer,seed+ent);
  float camMix=uCameraBlend*(.22+.55*edge+.25*lum);
  vec3 base=mix(fx, cam, camMix);
  vec3 rec=mix(base, prev*(uFeedback + .035*bass) + base*(.25+.35*pulse), .46+.28*uFeedback);
  rec=fract(rec*(.92+.10*bright)+cyc(seed+localNoise*.17,.2)*(.018+.03*ent));
  rec=mix(rec, base, .18+.28*onset);
  rec=pow(sat3(rec), vec3(.82+.16*tonal));
  outColor=vec4(rec,1.0);
}`;

const SCREEN_FRAG_SRC = `#version 300 es
precision highp float;
in vec2 vUV;
out vec4 outColor;
uniform sampler2D uTex;
uniform float uTime;
uniform float uBankFlash;
float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
vec3 cyc(float t){return 0.52+0.48*cos(6.2831853*(vec3(0.0,.31,.67)+t));}
void main(){
  vec3 c=texture(uTex,vUV).rgb;
  float f=clamp(uBankFlash,0.0,1.0);
  vec2 p=vUV-.5;
  float ring=smoothstep(.42,.0,abs(length(p)-(.18+.18*f)));
  float scan=smoothstep(.96,1.0,sin((vUV.y*34.0+uTime*14.0)*6.2831853));
  vec3 flash=cyc(length(p)*1.7+uTime*.9+hash21(floor(vUV*12.0))*.08);
  c=mix(c, fract(c*.75+flash*.55), f*(.25+.45*ring+.20*scan));
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
    this.intensity = 1.0;
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
  currentName() { return this.effect < BASE_COUNT ? BASE_EFFECT_NAMES[this.effect] : this.userPresets[this.effect - BASE_COUNT]?.name || 'generated-neon-goblin'; }
  isGeneratedEffect() { return this.effect >= BASE_COUNT; }

  loadGenerated() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.filter(p => p && typeof p.name === 'string' && Array.isArray(p.recipe)) : [];
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
  randomSeed() { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] >>> 0; }
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
    const seed = this.randomSeed();
    const recipe = [];
    for (let i=0;i<12;i++) recipe.push(this.wordFloat(seed, serial, i));
    const name = this.generatedName(seed, serial);
    const p = { name, seed, serial, recipe, createdAt: new Date().toISOString(), version: VERSION };
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
    const blob = new Blob([JSON.stringify({ version: VERSION, presets: this.userPresets }, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'neon_recursion_touchstone_presets.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async importGenerated(file) {
    const text = await file.text();
    const data = JSON.parse(text);
    const arr = Array.isArray(data) ? data : data.presets;
    if (!Array.isArray(arr)) throw new Error('No presets array found');
    const byName = new Map(this.userPresets.map(p => [p.name, p]));
    for (const p of arr) if (p && typeof p.name === 'string' && Array.isArray(p.recipe)) byName.set(p.name, p);
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
    this.fxLoc = this.locs(this.fxProg, ['uPrev','uCam','uRes','uTime','uEffect','uUserGenerated','uRecipe0','uRecipe1','uRecipe2','uAudio0','uAudio1','uAudio2','uAudio3','uFeedback','uCameraBlend','uIntensity','uBankFlash','uFlipAxisX','uFlipAxisY','uFlipAxisZ','uCamReady']);
    this.screenLoc = this.locs(this.screenProg, ['uTex','uTime','uBankFlash']);
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
    if (k==='ArrowUp') { this.intensity=Math.min(3,this.intensity+.08); return; }
    if (k==='ArrowDown') { this.intensity=Math.max(.1,this.intensity-.08); return; }
    if (k==='[') { ev.preventDefault(); this.shiftBank(-1); return; }
    if (k===']') { ev.preventDefault(); this.shiftBank(1); return; }
    if (k===',' || k==='<') { this.feedback=Math.max(.72,this.feedback-.01); return; }
    if (k==='.' || k==='>') { this.feedback=Math.min(.987,this.feedback+.01); return; }
    if (k==='-' || k==='_') { this.cameraBlend=Math.max(0,this.cameraBlend-.03); return; }
    if (k==='=' || k==='+') { this.cameraBlend=Math.min(1,this.cameraBlend+.03); return; }
    if (k==='x' || k==='X') { ev.preventDefault(); this.flipAxisX=1-this.flipAxisX; this.bankFlash=1; return; }
    if (k==='y' || k==='Y') { ev.preventDefault(); this.flipAxisY=1-this.flipAxisY; this.bankFlash=1; return; }
    if (k==='z' || k==='Z') { ev.preventDefault(); this.flipAxisZ=1-this.flipAxisZ; this.bankFlash=1; return; }
    if (k==='r' || k==='R') { this.clearFeedback(); return; }
    if (/^[0-9]$/.test(k)) { ev.preventDefault(); const n = k==='0' ? 9 : Number(k)-1; this.selectBankSlot(n); return; }
  }
  onPointerDown(ev) {
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    this.pointerDown = { id:ev.pointerId, x:ev.clientX, y:ev.clientY, t:performance.now() };
    try { this.canvas.setPointerCapture(ev.pointerId); } catch {}
    ev.preventDefault();
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
    if (horizontalSwipe) {
      if (now-this.lastSwipe>180) { dx<0 ? this.nextEffect() : this.prevEffect(); this.lastSwipe=now; }
      return;
    }
    if (verticalSwipe || move > TAP_MOVE_PX) return;

    this.onTap(ev.clientX, ev.clientY, now);
  }
  onPointerCancel(ev) {
    if (this.pointerDown?.id === ev.pointerId) this.pointerDown = null;
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
  updateTitle() { document.title = `Neon V10 ${this.effect+1}/${this.totalEffects()} — ${this.currentName()}`; }

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
  userRecipeVectors() {
    if (!this.isGeneratedEffect()) return [0,0,0,0, 0,0,0,0, 0,0,0,0];
    const r = this.userPresets[this.effect-BASE_COUNT]?.recipe || [];
    const out = new Array(12).fill(0);
    for(let i=0;i<12;i++) out[i] = +r[i] || 0;
    return out;
  }

  frame(t) {
    this.resize(); this.updateAudio(t); this.uploadCamera();
    const gl=this.gl, w=this.canvas.width, h=this.canvas.height;
    this.bankFlash *= 0.88;
    const rec=this.userRecipeVectors();
    gl.bindVertexArray(this.vao);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbos[this.write]);
    gl.viewport(0,0,w,h);
    gl.useProgram(this.fxProg);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.fbTex[this.read]); gl.uniform1i(this.fxLoc.uPrev,0);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.camTex); gl.uniform1i(this.fxLoc.uCam,1);
    gl.uniform2f(this.fxLoc.uRes,w,h); gl.uniform1f(this.fxLoc.uTime,t*.001); gl.uniform1i(this.fxLoc.uEffect,this.effect);
    gl.uniform1i(this.fxLoc.uUserGenerated,this.isGeneratedEffect()?1:0);
    gl.uniform4f(this.fxLoc.uRecipe0,rec[0],rec[1],rec[2],rec[3]); gl.uniform4f(this.fxLoc.uRecipe1,rec[4],rec[5],rec[6],rec[7]); gl.uniform4f(this.fxLoc.uRecipe2,rec[8],rec[9],rec[10],rec[11]);
    const a=this.audioSmooth;
    gl.uniform4f(this.fxLoc.uAudio0,a[0],a[1],a[2],a[3]); gl.uniform4f(this.fxLoc.uAudio1,a[4],a[5],a[6],a[7]); gl.uniform4f(this.fxLoc.uAudio2,a[8],a[9],a[10],a[11]); gl.uniform4f(this.fxLoc.uAudio3,a[12],a[13],a[14],a[15]);
    gl.uniform1f(this.fxLoc.uFeedback,this.feedback); gl.uniform1f(this.fxLoc.uCameraBlend,this.cameraBlend); gl.uniform1f(this.fxLoc.uIntensity,this.intensity); gl.uniform1f(this.fxLoc.uBankFlash,this.bankFlash); gl.uniform1f(this.fxLoc.uFlipAxisX,this.flipAxisX); gl.uniform1f(this.fxLoc.uFlipAxisY,this.flipAxisY); gl.uniform1f(this.fxLoc.uFlipAxisZ,this.flipAxisZ); gl.uniform1i(this.fxLoc.uCamReady,this.cameraReady?1:0);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);

    gl.bindFramebuffer(gl.FRAMEBUFFER,null);
    gl.viewport(0,0,w,h);
    gl.useProgram(this.screenProg);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.fbTex[this.write]); gl.uniform1i(this.screenLoc.uTex,0); gl.uniform1f(this.screenLoc.uTime,t*.001); gl.uniform1f(this.screenLoc.uBankFlash,this.bankFlash);
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
    this.hud.innerHTML = `<b>${VERSION}</b><br>${this.effect+1}/${this.totalEffects()}: ${this.currentName()}<br><span class="dim">Number keys:</span> ${b0}..${b1} &nbsp; <span class="dim">generated:</span> ${this.userPresets.length}${rec}<br><span class="dim">audio ${this.audioInputLabel()}:</span> bass ${this.audioSmooth[1].toFixed(2)} mid ${this.audioSmooth[3].toFixed(2)} treble ${this.audioSmooth[5].toFixed(2)} flux ${this.audioSmooth[9].toFixed(2)} rhythm ${this.audioSmooth[11].toFixed(2)}<br><span class="dim">Click/tap or C forge, double/Space MP4 rec, Ctrl+N nuke, [/] banks, F fullscreen, X/Y/Z flips, H HUD</span>`;
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
