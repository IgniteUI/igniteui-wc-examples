import { defineComponents, IgcRatingComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcRatingComponent);
export class CustomRatingSymbol {
    constructor() {
        registerIconFromText(
            'heart',
            '<?xml version="1.0"?> <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" id="svg1" viewBox="0 0 475.82 442.01" version="1.0"> <g id="layer1" transform="translate(-134.07 -225.8)"> <path id="path7" d="m263.42 235.15c-66.24 0-120 53.76-120 120 0 134.75 135.93 170.08 228.56 303.3 87.57-132.4 228.56-172.85 228.56-303.3 0-66.24-53.76-120-120-120-48.05 0-89.4 28.37-108.56 69.18-19.16-40.81-60.52-69.18-108.56-69.18z" stroke="#000" stroke-width="18.7" fill="#e60000"/> </g> </svg>'
        );
        registerIconFromText(
            'empty-heart',
            '<?xml version="1.0" encoding="UTF-8" standalone="no"?> <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" id="svg2" viewBox="0 0 241.59736 220.05746" inkscape:export-xdpi="90" version="1.0" width="100%" height="100%"> <g id="layer1" inkscape:label="Layer 1" inkscape:groupmode="layer" transform="translate(-175.32265,-1696.4765)"> <path style="opacity:0.98000004;fill:none;stroke:#000000;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" d="m 243.45243,1708.9786 c -26.9341,0.2312 -51.58009,21.4767 -55.08178,48.2939 -3.11346,23.844 7.32949,47.3995 23.96855,64.2142 27.5148,27.8054 61.22631,49.7939 83.44686,82.5473 4.39089,-4.6889 9.27818,-12.0655 14.22742,-17.529 25.22951,-27.8509 58.1653,-48.0133 80.86454,-78.1545 17.17546,-22.8065 19.10279,-58.1138 -0.53802,-80.4051 -18.24975,-20.7125 -51.76012,-25.1712 -74.36972,-9.2543 -8.22594,5.791 -15.27469,13.3707 -19.93251,22.3123 -10.05314,-19.3195 -30.53412,-32.2142 -52.58534,-32.0248 z" id="path3925-8" inkscape:connector-curvature="0" sodipodi:nodetypes="ssscsssscs" /> </g> </svg>'
        )
    }
}

new CustomRatingSymbol();
