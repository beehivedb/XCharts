function max(array){
    if(Array.isArray(array)){
        let max = Number.MIN_VALUE;
        for (const v of array) {
            max = Math.max(max, v);
        }
        return max;
    }
    return NaN;
}

function min(array){
    if(Array.isArray(array)){
        let min = Number.MAX_VALUE;
        for (const v of array) {
            min = Math.min(min, v);
        }
        return min;
    }
    return NaN;
}

export default {
    max, 
    min
}