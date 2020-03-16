/**
 * X Chart.js
 * Based on svg
 * Copyright (C) all authors. 
 * Author : Ron.
 * Date: 2020-3-14 9:49
 */
const xmlns = "http://www.w3.org/2000/svg";
const xlink = "http://www.w3.org/1999/xlink";

 function createElement(name, parent){
     let el = document.createElementNS(xmlns, name);
     if(parent){
        parent.appendChild(el);
     }
     return el;
 }

class Base{

    constructor(name){
        this.el = createElement(name);
    }

    attr(key, value){
        if(typeof value == "object"){
            for(let k in value){
                this.el.setAttribute(k, value[k]);
            }
        }else{
            this.el.setAttribute(key, value);
        }
        
    }

    getEl(){
        return this.el;
    }

    stroke(val){
        this.attr("stroke", val);
        return this;
    }

    strokeWidth(width){
        this.attr("stroke-width", width);
        return this;
    }

    fill(val){
        this.attr("fill", val);
        return this;
    }
}

class Line extends Base{
    constructor(att){
        super("line");
        this.attr("x1", att.x1);
        this.attr("x2", att.x2);
        this.attr("y1", att.y1);
        this.attr("y2", att.y2);
    }
}

class Svg{
    constructor(el){
        this.$root = el;
    }

    dataset(data){
        this.$data = data;
    }

    line(x1, y1, x2, y2){
        let l;
        if(y1 == undefined){
            l = new Line(x1);
        }else{
            l = new Line({"x1": x1, "y1": y1, "x2": x2, "y2": y2});
        }
        this.$root.appendChild(l.el);
        return l;
    }

}

export default function svg(select, w, h){
    if(select && typeof select === 'string' && select.charAt(0) !== '<'){
        let node = document.querySelector(select);
        if(node == undefined){
            throw "Can't Find Node. " + select;
        }
        if(node && node.tagName && node.tagName.toLowerCase() === "svg"){
            return new Svg(node);
        }

        let s = createElement("svg", node);
        s.setAttribute("width", w ? w: "100%");
        s.setAttribute("height", h ? h: "100%");
        return new Svg(s);
    }else{
        throw "usage : let s = svg('#root')";
    }
}
