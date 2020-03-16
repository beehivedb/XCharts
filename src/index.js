/**
 * X Chart.js
 * Based on svg
 * Copyright (C) all authors. 
 * Author : Ron.
 * Date: 2020-3-14 9:49
 */
import svg from './svg'

let Svg = svg("#root", 200, 250);
Svg.line(10, 110, 50, 150).stroke("orange").fill("transparent").strokeWidth("5");
