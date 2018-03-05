
#pragma glslify: cnoise = require(glsl-noise/classic/3d)
#pragma glslify: pnoise = require(glsl-noise/periodic/3d)

varying vec2 vUv;
varying float noise;
uniform float time;
uniform vec2 resolution;

//グネグネの振り幅
const float amplitude1 = -10.;
//結果にあまり影響がでない
const float amplitude2 = 0.0;
//拡大量
const float maxScale = 2.0;



float turbulence( vec3 p ) {
    float t = 0.0;
    for (float i = 1.0 ; i <= 5.0 ; i++ ){
        float power = pow( 1.1, i);
        t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
    }
    return t;
}

void main() {

    vUv = uv;

    noise = amplitude1  * turbulence( normal * .5 + time * 0.25 );
    float b = maxScale * pnoise( 0.05 * position + vec3(time*0.25), vec3(amplitude2));
    float displacement = - noise + b;
    
    vec3 newPosition = position + normal * displacement * 0.01;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}