/**
 * X Chart.js
 * Based on svg
 * Copyright (C) all authors. 
 * Author : Ron.
 * Date: 2020-3-14 9:49
 */
import Svg from './svg'

class BaseChart{
    constructor(conf){
        this.$svg = new Svg(conf.container, conf.width, conf.height);
    }
    data(da){
        if(typeof da == "array"){
            da.forEach(element => {
                
            });
        }
    }
}

export class BarChart extends BaseChart{
    constructor(conf){
        super(conf);
        let line = Svg.line(10, 110, 50, 150).stroke("orange").fill("transparent").strokeWidth("5");
        let rect = Svg.rect(0, 0, 20, 20).attr("rx", "3").attr("ry", "3").fill("red");
        let path = Svg.path().moveTo(10, 10).horizontal(90).vertical(90).horizontal(10).closePath().attr("id", "hello");
        let tx = Svg.text(30, 30).tspan({"fill": "red"}, "GoodLuck").textPath("hello", "layout by path.");
        this.$svg.appendChild(rect).appendChild(line).appendChild(path).appendChild(tx);
    }
    
}


export default {
    BarChart
}