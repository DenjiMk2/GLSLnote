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
	gl_FragColor = vec4(1.0,1.0,1.0,1.0);
	
	float s = sin(u_time);
	float c = cos(u_time);
	mat2 m = mat2(c,s,-s,c);
	st *= m;
	if(st.x > mouse.x - bit && st.x < mouse.x + bit && st.y > mouse.y - bit && st.y < mouse.y + bit ){
		gl_FragColor = vec4(1.0,0.0,0.0,1.0);
	}
}
