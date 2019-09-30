// https://qiita.com/kaneta1992/items/21149c78159bd27e0860
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float distanceFunction(vec3 pos){
	float d = length(pos) - 0.5;
	return d;
}

void main() {
	vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

	vec3 cameraPos = vec3(0.,0.,-5.);
	float screenZ = 2.5;
	vec3 rayDirection = normalize(vec3(p,screenZ));
	
	float depth = 0.0;
	
	vec3 col = vec3(0.0);
	
	for (int i = 0; i < 99; i++) {
		vec3 rayPos = cameraPos + rayDirection * depth;
		float dist = distanceFunction(rayPos);
		if( dist < 0.0001) {
			col = vec3(1.);
			break;
		}
		depth += dist;
	}
	
	gl_FragColor = vec4(col,1.0);
}
