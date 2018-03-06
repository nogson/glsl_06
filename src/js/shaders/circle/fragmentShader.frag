#ifdef GL_ES
precision highp float;
#endif

#pragma glslify: pnoise = require(glsl-noise/periodic/3d)

uniform float time;
varying vec2 vUv;
varying vec3 pos;

void main(){
	 gl_FragColor = vec4(vUv, sin(time), 1.0);
	
}