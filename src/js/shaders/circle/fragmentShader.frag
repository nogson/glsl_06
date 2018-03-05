#ifdef GL_ES
precision highp float;
#endif

uniform float time;
varying vec2 vUv;

void main(){
	 gl_FragColor = vec4(vUv, sin(time), 1.0);
	
}