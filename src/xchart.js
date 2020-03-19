/**
 * X Chart.js
 * Based on svg
 * Copyright (C) all authors. 
 * Author : Ron.
 * Date: 2020-3-14 9:49
 */
import svg from './svg'

class Each{
    constructor(d){
        this.d = d;
    }
    show(f){
        f(d);
    }
}

class BaseChart{
    constructor(conf){
        this.$svg = svg(conf.container, conf.width, conf.height);
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
        this.$svg.line(10, 110, 50, 150).stroke("orange").fill("transparent").strokeWidth("5");
    }
    
}

export default {
    BarChart
}