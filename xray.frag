// Original Phantom Mode by aiekick
// https://www.shadertoy.com/view/MtScWW
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3      u_resolution;           // viewport resolution (in pixels)
uniform float     u_time;                 // shader playback time (in seconds)

void main()
{
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec3 ro = vec3(0.0, sin(u_time), -5.0+u_time);
    vec3 ray = normalize(vec3(p, 2.5));
    float t = 0.01;
    vec3 col = vec3(0.0);
    
    float ac = 0.0;
    for(int i=0; i<99; i++) {
    	vec3 pos = ro + ray * t;
        pos = mod(pos-2.0, 4.0) -2.0;
        float d = length(pos) - 0.5;
        
        /*
        if (d < 0.0001) {
        	col = vec3(1.-float(i)/99.);
            break;
        }
		*/
        
        // Phantom Mode
        d = max(abs(d), 0.02);
        ac += exp(-d*3.0);
        ///////////////
        
        t += d*0.5;
    }
    
    col = vec3(ac * 0.01);
    gl_FragColor = vec4(col,1.0);
}