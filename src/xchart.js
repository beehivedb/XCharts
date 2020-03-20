/**
 * X Chart.js
 * Based on svg
 * Copyright (C) all authors. 
 * Author : Ron.
 * Date: 2020-3-14 9:49
 */
import Svg from './svg';
import Com from './common';

function range(max, min, num){
    let x = (max - min)/num;
    let res = [];
    for(let i = 0; i < num; i++){
        res.push(Math.ceil(min + x * i));
    }
    return res;
}

class Axis{
    /**
     * data: 坐标轴数据。
     * ticks: 刻度数。 
     * isX: 纵轴或横轴。
     */
    constructor(data, ticks){
        this.array = [];
        if(Array.isArray(data)){
            let mx = Com.max(data);
            let mn = Com.min(data);
            this.array = range(mx, mn, ticks);
        }
    }
    getXAxis(width, height, orient){
        let g = Svg.group();
        let y = orient && orient=="top" ? 0 : height;
        let x = 0;
        let step  = width / this.array.length;
        let l = Svg.line(0, y - 20, width, y-20).stroke("black");
        g.appendChild(l);
        for(let i = 0; i < this.array.length; i++){
            x = i * step;
            let tx = this.array[i];
            let t = Svg.text(x, y, tx);
            g.appendChild(t);
        }
        return g;
    }
    
    // getYAxis(width, height, orient){

    // }
}

export class BarChart{
    constructor(conf){
        this.$svg = new Svg(conf.container, conf.width, conf.height);
        this.$width = conf.width; 
        this.$height = conf.height;
    }
    data(dat){
        let ax = new Axis(dat, 7);
        let xAxis = ax.getXAxis(this.$width, this.$height, "buttom");
        this.$svg.appendChild(xAxis);
        let t = Svg.text(10, 10, 100);
        this.$svg.appendChild(t);
    }
}


export default {
    BarChart
}