#ifdef GL_ES
precision highp float;
#endif
 
uniform float time;
uniform vec2 resolution;
 
#define XAmplitude 0.40
#define YAmplitude 0.40
#define XSpeed 1.50
#define YSpeed 1.50
#define size 0.15
#define speed 0.01
#define changeSpeed 0.70
#define Count 10.0
const float PI = 3.1415926535897932384626433832795;


void main( void ) 
{
    //座標を正規化
    vec2 pos =(gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);;
    
    float c = 0.0;
    float rad = (PI*2.0) /Count;


    for( float i = 1.0; i < Count+1.0; ++i )
    {   
        //X軸の移動
        //float px = cos( time * XSpeed * (i/Count) ) * sin(time ) * XAmplitude;
        float px = cos( time * XSpeed + (i * rad)) ;


        //Y軸の移動　
        // float py = sin( time * YSpeed   * (i/Count) ) * sin(time )* YAmplitude;
        float py = sin( time * YSpeed + (i* rad));


        //circleの座標
        vec2 circlePos = vec2( px , py );

        //サイズ変更用の値　0.5 ~ 1.0の間の範囲をとる
        //float t = sin( time * speed * i ) * 0.5 + 0.5;
        float t = 0.5;

        //MinSizeとMaxSizeをtの値で線形補間　なので比較的MaxSizeに近い値になる
        //float circleSize = mix( MinSize, MaxSize, t );


        //clamp = min(max(x, a), b)  ・・・　引数として与えられた数値を一定の範囲に収めてくれる


        //0.0 ~ circleSizeの範囲になる
        // float d = clamp( sin( length( pos - circlePos )  + circleSize ), 0.0, circleSize);
        // c = vec3(d);

        // //色を変更
        // float s = sin( time * changeSpeed * i ) * 0.5 + 0.5;
        // //色をミックス
        // vec3 color = mix( color1, color2, s );

        // c += color * pow( d, 70.0 );

        float d = size / length(pos - circlePos);
        c += pow( d, 5.0 );
    }
 
    gl_FragColor = vec4(vec3(c), 1.0 );
 
}