#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse, u_resolution;


#define iTime u_time
#define iResolution u_resolution
#define vUV gl_FragCoord.xy / max(u_resolution.x, u_resolution.y) * 1.0

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	float s = 0.0, v = 0.0;
	vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.;
    float time = (iTime-2.0)*58.0;
	vec3 col = vec3(0);
    vec3 init = vec3(sin(time * .0032)*.3, .35 - cos(time * .005)*.3, time * 0.002);
	for (int r = 0; r < 100; r++) 
	{
		vec3 p = init + s * vec3(uv, 0.05);
		p.z = fract(p.z);
        // Thanks to Kali's little chaotic loop...
		for (int i=0; i < 10; i++)	p = abs(p * 2.04) / dot(p, p) - .9;
		v += pow(dot(p, p), .7) * .06;
		col +=  vec3(v * 0.2+.4, 12.-s*2., .1 + v * 1.) * v * 0.00003;
		s += .025;
	}
	fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}

void main( void ) {
   mainImage(gl_FragColor, vUV * iResolution.xy);
}