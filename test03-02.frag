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
	gl_FragColor = vec4(1.0,1.0,1.0,1.0);
	if(st.x > 1.0 - bit && st.x < 1.0 + bit && st.y > 0.0 - bit && st.y < 0.0 + bit ){
		gl_FragColor = vec4(1.0,0.0,0.0,1.0);
	}
	if(st.x > 0.0 - bit && st.x < 0.0 + bit && st.y > 1.0 - bit && st.y < 1.0 + bit ){
		gl_FragColor = vec4(0.0,1.0,0.0,1.0);
	}
	if(st.x > 0.5 - bit && st.x < 0.5 + bit && st.y > 0.5 - bit && st.y < 0.5 + bit ){
		gl_FragColor = vec4(0.0,0.0,1.0,1.0);
	}
	if(st.x > 1.0 - bit && st.x < 1.0 + bit && st.y > 1.0 - bit && st.y < 1.0 + bit ){
		gl_FragColor = vec4(0.0,0.0,0.0,1.0);
	}
}
