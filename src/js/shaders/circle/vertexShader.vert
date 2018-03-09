
#pragma glslify: cnoise = require(glsl-noise/classic/3d)
#pragma glslify: pnoise = require(glsl-noise/periodic/3d)

varying vec2 vUv;
varying float noise;
varying vec3 pos;
uniform float time;
uniform vec2 resolution;

//グネグネの振り幅
const float amplitude1 = 0.8;
//グネグネのスピード
const float speed = 0.25;


float turbulence( vec3 p ) {
    
    float t = 0.0;
    for (float i = 1.0 ; i <=1.0 ; i++ ){
        float power = pow( 1.1, i);
        t += abs( cnoise( vec3( power * p ) ) / 0.5 );
    }
    return t;
}

void main() {
    pos = position;
    vUv = uv;
    noise = cnoise( vec3(normal * amplitude1 + time * speed));

    vec3 p = position + normal * noise * 0.2;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );
}