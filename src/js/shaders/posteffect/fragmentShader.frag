#ifdef GL_ES
precision highp float;
#endif
 
uniform float time;
uniform vec2 resolution;
 
#define XAmplitude 0.40
#define YAmplitude 0.30
#define XSpeed 1.50
#define YSpeed 1.45
#define MinSize 1.7
#define MaxSize 1.75
#define speed 0.01
#define changeSpeed 0.70
#define Count 1.0
#define color1 vec3(10.0, 0.0, 0.0)
#define color2 vec3(0.0, 10.0, 0.0)
#define color3 vec3(0.0, 0.0, 10.0)

void main( void ) 
{
    //座標を正規化
    vec2 pos = ( gl_FragCoord.xy / resolution.xy ) * 2.0 - 1.0;
    //横長にならないように縦横比を調整
    pos.x *= (resolution.x / resolution.y);
    
    vec3 c = vec3( 0, 0, 0 );

    for( float i = 1.0; i < Count+1.0; ++i )
    {   
        //X軸の移動
        float px = cos( time * XSpeed * (i/Count) ) * sin(time);

        //Y軸の移動　
        float py = sin( time * YSpeed   * (i/Count) ) * sin(time );


        //circleの座標
        vec2 circlePos = vec2( px , py );

        //サイズ変更用の値　0.5 ~ 1.0の間の範囲をとる
        //float t = sin( time * speed * i ) * 0.5 + 0.5;
        float t = 0.5;

        //MinSizeとMaxSizeをtの値で線形補間　なので比較的MaxSizeに近い値になる
        float circleSize = mix( MinSize, MaxSize, t );


        //clamp = min(max(x, a), b)  ・・・　引数として与えられた数値を一定の範囲に収めてくれる


        //0.0 ~ circleSizeの範囲になる
        float d = clamp( sin( length( pos - circlePos )  + circleSize ), 0.0, circleSize);
        c = vec3(d);

        // //色を変更
        // float s = sin( time * changeSpeed * i ) * 0.5 + 0.5;
        // //色をミックス
        // vec3 color = mix( color1, color2, s );

        // c += color * pow( d, 70.0 );
    }
 
    gl_FragColor = vec4(c, 1.0 );
 
}