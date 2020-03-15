/**
 * X Chart.js
 * Based on svg
 * Copyright (C) all authors. 
 * Author : Ron.
 * Date: 2020-3-14 9:49
 */

function createSvg(w, h){
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    w == null ? "100%" : w;
    h == null ? "100%" : h;
    svg.setAttribute("width", w);
    svg.setAttribute("height", h);
}



export default function svg(select, w, h){
    let node;
    if(select && typeof element === 'string' && element.charAt(0) !== '<'){
        node = document.querySelector(select);
        if(node == undefined){
            throw "Can't Find Node. " + select;
        }
        
        node.appendChild(createSvg(w, h));
        return node;
    }else{
        throw "usage : let s = svg('#root')";
    }
}
