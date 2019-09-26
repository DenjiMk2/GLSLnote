//https://thebookofshaders.com/03/?lan=jp
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.0);

	vec3 pct = vec3(st.x);

	vec3 red = vec3(1.0,0.0,0.0);
	vec3 blue = vec3(0.0,0.0,1.0);

	color = mix(blue,red,pct);

	// Plot transition lines for each channel
	color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
	color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
	color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

	gl_FragColor = vec4(color,1.0);
}
