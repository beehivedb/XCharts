/**
 * X Chart.js
 * Based on svg
 * Copyright (C) all authors. 
 * Author : Ron.
 * Date: 2020-3-14 9:49
 */
import xc from './xchart'

var bar = new xc.BarChart({"container":"#root", "width": 400, "height": 200});

bar.data([2001, 2002, 2003, 2004, 2010, 2011, 2012, 2020]);
