//https://thebookofshaders.com/03/?lan=jp
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	const float bit = 0.01;
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec2 mouse = vec2(u_mouse.x , u_mouse.y );
	gl_FragColor = vec4(mouse.x,mouse.y,abs(sin(u_time * 4.0)),1.0);
}
