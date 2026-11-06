export const ferroVertex = `
precision highp float;
attribute vec2 aSurface;
uniform float uTime;
uniform float uAspect;
uniform float uZoom;
uniform float uProgress;
uniform vec3 uMagnet;
uniform vec3 uPulse;
varying vec3 vPosition;
varying vec2 vSurface;
float field(vec2 q){
 float r=length(q);
 float phase=uTime*.18+uProgress*12.;
 vec2 drift=q; // Stable peak centers allow extra fine samples directly at every needle tip.
 float lattice=(cos(drift.x*22.4)+2.*cos(drift.x*11.2)*cos(drift.y*19.398969))/3.;
 // A cusp profile gives needle tips; a Gaussian power alone produces rounded caps.
 float cell=clamp((lattice+.5)/1.5,0.,1.);
 float needle=1.-sqrt(max(0.,1.-cell));
 float peaks=pow(needle,1.65);
 float distanceToMagnet=length(q-uMagnet.xy);
 float magnet=exp(-distanceToMagnet*distanceToMagnet*1.25)*uMagnet.z;
 float age=uTime-uPulse.z;
 float d=length(q-uPulse.xy);
 float wave=sin(d*8.-age*5.)*exp(-pow(d-age*1.6,2.)*3.)*exp(-age*1.1)*step(0.,age);
 float edge=1.-smoothstep(4.0,4.9,r);
 float dome=.56-.027*r*r;
 return dome+edge*(peaks*(.23+.075*sin(phase+q.x*3.7+q.y*2.9)+magnet*.2)+magnet*.32+wave*.1);
}

void main(){
 vec2 q=aSurface;
 float h=field(q);
 vec3 p=vec3(q.x,h,q.y);
 float angle=uTime*.025+uProgress*.62;
 mat2 rotation=mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
 p.xz=rotation*p.xz;
 float pitch=.85+uProgress*.13;
 float cp=cos(pitch),sp=sin(pitch);
 vec3 v=vec3(p.x,p.y*cp-p.z*sp,p.y*sp+p.z*cp);
 v.xy=mat2(.91308894,.40776045,-.40776045,.91308894)*v.xy;
 float depth=8.9-v.z-uProgress*.3;
 vPosition=vec3(v.xy,-depth);
 vSurface=q;
 gl_Position=vec4(v.x*uZoom/uAspect,v.y*uZoom+depth*.06,depth*.98-1.,depth);
}`;

export const ferroFragment = `
precision highp float;
uniform float uTime;
uniform float uProgress;
uniform vec3 uMagnet;
uniform vec3 uPulse;
vec3 fluidNormal(vec2 q){
 float phase=uTime*.18+uProgress*12.;
 float ax=q.x*22.4,az=q.y*19.398969;
 float lattice=(cos(ax)+2.*cos(ax*.5)*cos(az))/3.;
 float cell=clamp((lattice+.5)/1.5,0.,1.);
 float root=sqrt(max(.000001,1.-cell));
 float needle=1.-root;
 float peak=pow(needle,1.65);
 vec2 latticeGradient=vec2((-22.4*sin(ax)-22.4*sin(ax*.5)*cos(az))/3.,-38.797938*cos(ax*.5)*sin(az)/3.);
 vec2 peakGradient=latticeGradient*.55*pow(max(needle,.000001),.65)/root;
 vec2 dm=q-uMagnet.xy;
 float magnet=exp(-dot(dm,dm)*1.25)*uMagnet.z;
 vec2 magnetGradient=-2.5*dm*magnet;
 float a=phase+q.x*3.7+q.y*2.9;
 float amplitude=.23+.075*sin(a)+magnet*.2;
 vec2 amplitudeGradient=.075*cos(a)*vec2(3.7,2.9)+magnetGradient*.2;
 vec2 dp=q-uPulse.xy;
 float d=max(length(dp),.00001),age=uTime-uPulse.z;
 float delta=d-age*1.6;
 float envelope=exp(-delta*delta*3.)*exp(-age*1.1)*step(0.,age);
 float wave=sin(d*8.-age*5.)*envelope;
 vec2 waveGradient=(8.*cos(d*8.-age*5.)-6.*delta*sin(d*8.-age*5.))*envelope*dp/d;
 float radius=max(length(q),.00001);
 float t=clamp((radius-4.)/.9,0.,1.);
 float edge=1.-t*t*(3.-2.*t);
 vec2 edgeGradient=-6.*t*(1.-t)/.9*q/radius;
 vec2 gradient=-.054*q+edge*(peakGradient*amplitude+peak*amplitudeGradient+magnetGradient*.32+waveGradient*.1)+edgeGradient*(peak*amplitude+magnet*.32+wave*.1);
 vec3 n=normalize(vec3(-gradient.x,1.,-gradient.y));
 float angle=uTime*.025+uProgress*.62;
 n.xz=mat2(cos(angle),-sin(angle),sin(angle),cos(angle))*n.xz;
 float pitch=.85+uProgress*.13;
 n=vec3(n.x,n.y*cos(pitch)-n.z*sin(pitch),n.y*sin(pitch)+n.z*cos(pitch));
 n.xy=mat2(.91308894,.40776045,-.40776045,.91308894)*n.xy;
 return n;
}
varying vec3 vPosition;
varying vec2 vSurface;
float softbox(vec3 ray,vec3 direction,vec3 up,float width,float extent){
 direction=normalize(direction);
 up=normalize(up-direction*dot(up,direction));
 vec3 side=normalize(cross(direction,up));
 float across=abs(dot(ray,side));
 float along=abs(dot(ray,up));
 float facing=max(dot(ray,direction),0.);
 return (1.-smoothstep(width*.12,width*1.8,across))*(1.-smoothstep(extent*.8,extent,along))*pow(facing,1.5);
}
void main(){
 if(length(vSurface)>4.88)discard;
 vec3 n=normalize(fluidNormal(vSurface));
 vec3 eye=normalize(-vPosition);
 vec3 reflected=reflect(-eye,n);
 // Long area-light reflections, rather than points lit with vertex-color dots.
 float defocus=smoothstep(.6,4.,abs(-vPosition.z-6.6));
 float width=.16+defocus*.035;
 float cyan=softbox(reflected,vec3(.4,.25,-.85),vec3(.15,1.,.1),width,.88);
 float violet=softbox(reflected,vec3(-.5,.4,-.75),vec3(.3,1.,.1),width*1.4,.84);
 float white=softbox(reflected,vec3(.1,.75,-.65),vec3(1.,-.1,.1),width*.33,.8);
 float blue=softbox(reflected,vec3(.4,.35,-.8),vec3(.2,1.,-.2),.14,.95);
 float purple=softbox(reflected,vec3(-.55,.3,-.75),vec3(.1,1.,-.1),.16,.92);
 float fresnel=pow(1.-max(dot(n,eye),0.),5.);
 float bodyBlue=pow(max(dot(reflected,normalize(vec3(.55,.25,-.8))),0.),6.);
 float bodyViolet=pow(max(dot(reflected,normalize(vec3(-.6,.35,-.7))),0.),8.);
 vec3 base=vec3(.018,.019,.03)+vec3(.015,.12,.28)*bodyBlue+vec3(.075,.023,.13)*bodyViolet;
 vec3 light=vec3(.01,.72,1.0)*cyan*4.+vec3(.48,.13,1.)*violet*2.4+vec3(.89,.94,1.)*white*3.6;
 light+=vec3(.015,.15,.65)*blue*1.5+vec3(.2,.035,.42)*purple*.85;
 vec3 color=base+light*(.7+.3*fresnel)+vec3(.018,.035,.065)*fresnel;
 color=color/(1.+color*.65);
 color=pow(color,vec3(.80));
 gl_FragColor=vec4(color,1.);
}`;
