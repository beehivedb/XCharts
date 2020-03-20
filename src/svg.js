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

function setAttribute(el, attr, ns){
    if(el instanceof Element && typeof attr == "object"){
        for(let k in attr){
            let v = attr[k];
            if(v){
                if(ns){
                    el.setAttributeNS(ns, k, v);
                }else{
                    el.setAttribute(k, v);
                }
            }
        }
    }
}

class Base{

    constructor(name, att){
        this.$el = createElement(name);
        if(att){
            this.attr(att);
        }
    }

    attr(key, value){
        if(arguments.length == 0){
            throw "Usage: attr('key', 'value') or attr({'key':'value'})";
        }

        if(arguments.length == 1){
            setAttribute(this.$el, arguments[0]);
        }else if(value){
            this.$el.setAttribute(key, value);
        }
        return this;
    }

    getAttr(key){
        if(key){
            return this.$el.getAttribute(key);
        }
    }

    getEl(){
        return this.$el;
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
        if(att){
            super("line", att);
        }else{
            throw "usage: Svg.line(x1, y1, x2, y2)"
        }
    }
}

class Rect extends Base{
    constructor(att){
        if(att){
            super("rect", att);
        }else{
            throw "usage: Svg.rect(x, y, width, height, rx, ry)";
        }
    }
}

class Circle extends Base{
    constructor(att){
        if(att){
            super("circle", att);
        }else{
            throw "usage: Svg.circle(cx, cy, r)";
        }
    }
}

class Ellipse extends Base{
    constructor(att){
        if(att){
            super("ellipse", att);
        }else{
            throw "usage: Svg.ellipse(cx, cy, rx, ry)";
        }
    }
}

class Polygon extends Base{
    constructor(att){
        if(att){
            super("polygon", att);
        }else{
            throw "usage: Svg.polygon(points)";
        }
    }
}

class Polyline extends Base{
    constructor(att){
        if(att){
            super("polyline", att);
        }else{
            throw "usage: Svg.polyline(points)";
        }
    }
}

class Path extends Base{
    constructor(att){
        super("path", att);
        let dt = this.getAttr("d");
        if(dt){
            this.d = dt;
        }else{
            this.d = ""; 
        }
    }

    moveTo(x, y){
        this.d += `M ${x} ${y} `;
        return this;
    }

    lineTo(x, y){
        this.d += `L ${x} ${y} `;
        return this;
    }

    vertical(y){
        this.d += `V ${y} `;
        return this;
    }

    horizontal(x){
        this.d += `H ${x} `;
        return this;
    }

    closePath(){
        this.d += "Z";
        this.attr("d", this.d);
        return this;
    }
}

class Tspan extends Base{
    constructor(att, tx){
        super("tspan", att);
        if(tx){
            this.$el.textContent = tx;
        }
    }

    textContent(tx){
        this.$el.textContent = tx;
        return this;
    }
}

class Text extends Base{
    constructor(x, y, tx){
        super("text");
        this.attr("x", x).attr("y", y);
        if(tx){
            this.$el.textContent = tx;
        }
    }
    tspan(att, tx){
        let sp = createElement("tspan");
        if(tx){
            sp.textContent = tx;
        }
        setAttribute(sp, att);
        this.$el.appendChild(sp);
        return this;
    }
    tref(id){
        let ref = createElement("tref");
        ref.setAttributeNS(xlink, "href", "#" + id);
        this.$el.appendChild(ref);
        return this;
    }

    textPath(id, tx){
        let pat = createElement("textPath");
        pat.setAttributeNS(xlink, "href", "#" + id);
        if(tx){
            pat.textContent = tx;
        }
        this.$el.appendChild(pat);
        return this;
    }

    content(tx){
        this.$el.textContent = tx;
        return this;
    }
}

class Image extends Base{
    constructor(att){
        super("image", att);
    }
    href(ref){
        if(ref){
            this.$el.setAttributeNS(xmlns, "href", ref);
        }
    }
}

class Container{
    constructor(name){
        this.$el = createElement(name);
    }

    appendChild(child){
        if(child){
            this.$el.appendChild(child.getEl());
        }
        return this;
    }

    getEl(){
        return this.$el;
    }

    attr(key, value){
        if(arguments.length == 1 && typeof arguments[0] == "object"){
            setAttribute(this.$el, arguments[0]);
        }
        if(key && value){
            this.$el.setAttribute(key, value);
        }
        return this;
    }
}

class Defs extends Container{
    constructor(){
        super("defs");
    }
}

class Group extends Container{
    constructor(att){
        super("g");
        this.attr(att);
    }
}


class ForeignObject {
    constructor(att){
        this.$el = createElement("foreignObject");
        setAttribute(this.$el, att);
    }
    getEl(){
        return this.$el;
    }
    appendChild(el){
        this.$el.appendChild(el);
        return this;
    }
}

export default class Svg extends Container{
    constructor(select, w, h){
        super("svg");
        this.$el.setAttributeNS(xmlns, "xlink", xlink);
        if(select && typeof select === 'string' && select.charAt(0) !== '<'){
            let node = document.querySelector(select);
    
            if(node == undefined){
                throw "Can't Find Node. " + select;
            }
            node.appendChild(this.$el);

            this.attr("width", w ? w: "100%");
            this.attr("height", h ? h: "100%");
        }else{
            throw "usage : let s = svg('#root')";
        }
    }
    static text(x, y, tx){
        return new Text(x, y, tx);
    }

    static defs(){
        return new Defs();
    }

    static group(attr){
        return new Group(attr);
    }

    static image(att){
        return new Image(att);
    }

    static foreignObject(att){
        return new ForeignObject(att);
    }

    static circle(cx, cy, r){
        let att;
        if(arguments.length == 1){
            att = arguments[0];
        }else{
            att = {"cx": cx, "cy": cy, "r": r};
        }
        return new Circle(att);
    }

    static line(x1, y1, x2, y2){
        let att;
        if(arguments.length == 1){
            att = arguments[0];
        }else{
            att = {"x1": x1, "y1": y1, "x2": x2, "y2": y2};
        }

        return new Line(att);
    }

    static rect(x, y, width, height, rx, ry){
        let att;
        if(arguments.length == 1){
            att = arguments[0];
        }else{
            att = {"x": x, "y": y, "width": width, "height": height, "rx": rx, "ry": ry};
        }
        return new Rect(att);
    }

    static ellipse(cx, cy, rx, ry){
        let att;
        if(arguments.length == 1){
            att = arguments[0];
        }else{
            att = {"cx": cx, "cy": cy, "rx": rx, "ry": ry};
        }
        return new Ellipse(att);
    }

    static polygon(points){
        if(typeof points == "object"){
            return new Polygon(points);
        }
        if(typeof points == "string"){
            return new Polygon({points});
        }
    }

    static polyline(points){
        if(typeof points == "object"){
            return new Polyline(points);
        }else{
            return new Polyline({points});
        }
    }

    static path(d){
        if(typeof d == "string"){
            return new Path({d});
        }else{
            return new Path(d);
        }
    }

    size(w, h){
        this.attr("width", w ? w: "100%");
        this.attr("height", h ? h: "100%")
    }
}