
// varying vec2 vUv;
uniform float time;
uniform vec2 resolution;
uniform float uTimeScale;

// const float uOrbit = 1.0769230769230769;
// const float uNoiseRadius = 20.0 * 1.0769230769230769;
// const float uRadius = 162.0 * 1.0769230769230769;
// const float PI = 3.1415926;

// vec2 translate(float _time){
//     float uNum = resolution.x;
//     float _r = sin(_time + uNum * PI * 2.0 / 3.0) * uOrbit;
//     float _x = cos(_time * uTimeScale) * _r;
//     float _y = sin(_time * uTimeScale) * _r;
//     return vec2(_x, _y);
// }


// vec2 noise(vec2 p, float _time){
//     float offsetTime = _time * 0.4;
//      float _noiseX = sin((p.x + offsetTime) * 2.0) + cos((p.x + offsetTime) * 3.0) * (abs(uOrbit - uNoiseRadius * 1.5) + uNoiseRadius);
//      float _noiseY = sin((p.y + offsetTime) * 2.0) + cos((p.y + offsetTime) * 3.0) * (abs(uOrbit - uNoiseRadius * 1.5) + uNoiseRadius);
//      return vec2(_noiseX, _noiseY);
// }

void main() {

  // vec2 _offset = translate(time);
  // vec3 _position = uRadius * position * 0.3;
  // vec2 st = (_position.xy * 5.0) / vec2(resolution.x);
  // vec2 _noise = noise(vec2(-st.x, st.y), time);
  // _offset += _noise;
  // _position.xy += _offset;


  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}