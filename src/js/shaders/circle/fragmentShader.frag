#ifdef GL_ES
precision highp float;
#endif

#pragma glslify: pnoise = require(glsl-noise/periodic/3d)

uniform sampler2D textuer;
uniform float time;
varying vec2 vUv;
varying vec3 pos;

void main(){
	 //gl_FragColor = vec4(vUv, sin(time), 1.0);
	//gl_FragColor = vec4(0.8,1.0,0.0,1.0); 
	gl_FragColor = texture2D(textuer, vUv); 
}