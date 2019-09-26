//https://thebookofshaders.com/03/?lan=jp
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.0);

	vec3 pct = vec3(abs(sin(u_time)));

	vec3 colorSun = vec3(0.863,0.503,0.0);
	vec3 colorSee = vec3(0.0,0.363,0.953);

	color = mix(colorSee,colorSun,pct);

	gl_FragColor = vec4(color,1.0);
}
