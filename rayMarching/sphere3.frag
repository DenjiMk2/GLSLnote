// https://qiita.com/kaneta1992/items/21149c78159bd27e0860
// https://wgld.org/d/glsl/g012.html
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float pi = 3.1415;
const float pi2 = pi * 2.0;

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

	vec3 cameraPos = vec3(0.,0.,-5.);
	float screenZ = 2.5;
	vec3 lightDirection = normalize(vec3(0.0,0.0,-1.0));
	vec3 rayDirection = normalize(vec3(p,screenZ));
	
	float depth = 0.0;
	
	vec3 col = vec3(0.0);
	
	for (int i = 0; i < 99; i++) {
		vec3 rayPos = cameraPos + rayDirection * depth;
		float dist = distanceFunction(rayPos);
		if( dist < 0.0001) {
			vec3 normal = normal(rayPos);
			float differ = clamp(dot(normal, lightDirection),0.1,1.0);
			col = vec3(differ);
			break;
		}
		depth += dist;
	}
	
	// 色をレインボーに
	col = vec3(col.x * sin(u_time),col.y * sin(u_time+pi2/3.0),col.z * sin(u_time+pi2*2.0/3.0));
	gl_FragColor = vec4(col,1.0);
}