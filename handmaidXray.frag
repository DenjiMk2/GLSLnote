// https://qiita.com/kaneta1992/items/21149c78159bd27e0860
// https://wgld.org/d/glsl/g012.html
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 trans(vec3 p){
	return mod(p,4.0)-2.0;
}

float distanceFunction(vec3 pos){
	float d = length(trans(pos)) - 0.5;
	return d;
}

vec3 normal(vec3 pos){
	float v = 0.001;
	return normalize(
		vec3(
			distanceFunction(pos) - distanceFunction(vec3(pos.x - v,pos.y,pos.z)),
			distanceFunction(pos) - distanceFunction(vec3(pos.x,pos.y - v,pos.z)),
			distanceFunction(pos) - distanceFunction(vec3(pos.x,pos.y,pos.z - v))
		)
	);
}

void main() {
	vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

	float time = u_time;

	// if( mod(time+1.0,4.0) < 1.0 ){
	// 	time = time * 50.0;
	// }
	
	// heart beat pos move
	float cameraPosZ = -5.0;
	cameraPosZ = cameraPosZ - smoothstep(0.0,0.05,mod(time,1.0)) + smoothstep(0.05,0.1,mod(time,1.0));

	vec3 cameraPos = vec3(time,sin(time),cameraPosZ);
	float screenZ = 2.5;
	vec3 lightDirection = normalize(vec3(0.0,0.0,-1.0));
	vec3 rayDirection = normalize(vec3(p,screenZ));

	float depth = 0.0;

	vec3 col = vec3(0.0);

	for (int i = 0; i < 99; i++) {
		vec3 rayPos = cameraPos + rayDirection * depth;
		float dist = distanceFunction(rayPos);
		dist += max(abs(dist),0.02);
		col += exp(-dist*3.0) * 0.01;

		depth += dist*0.5;
	}

	// reflect color
	if( mod(time+1.0,4.0) < 1.0 ){
		col = col * vec3(-1.0) + vec3(1.0);
	}
	gl_FragColor = vec4(col,1.0);
}
