/**
 * Freezes a map so that it can't be modified
 * @param map The map to freeze
 */
function freezeMap<K, V>(map: Map<K, V>): Map<K, V> {
    map.set = (key: K, value: V) => {
        throw(`Can\'t add property ${key} with a value of ${value}, map is not extensible`);
    }

    map.delete = (key: K): boolean => {
        throw(`Can\'t delete property ${key}, map is frozen`);
    }

    map.clear = () => {
        throw(`Can\'t clear map, map is frozen`);
    }

    return map;
}


/**
 * Separates a number into an array of numbers, each representing a unit of the original number
 * @param number The number to separate into units
 */
function separateNumberIntoUnits(number: number): number[] {
    const numLen = number.toString().length;
    const numArray: number[] = [];
    for (let i = 0; i < numLen; i++) {
        numArray.push((number % 10) * Math.pow(10, i));
        number = Math.floor(number / 10);
    }
    return numArray.reverse();
}

/**
 * 
 * @param dividend The number to divide
 * @param divisor The number to divide by
 * @returns Floored remainder of the division
 */
function mod(dividend: number, divisor: number): number {
    return dividend - divisor * Math.floor(dividend / divisor);
}    

export {
    freezeMap,
    separateNumberIntoUnits,
    mod
}