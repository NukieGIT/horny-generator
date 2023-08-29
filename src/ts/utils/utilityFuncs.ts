import { v4 as uuidv4 } from 'uuid'
import type { IChance } from '../AseriaRPG/characterCreatorTypes'

/**
 * Freezes a map so that it can't be modified
 * @param map The map to freeze
 */
export function freezeMap<K, V>(map: Map<K, V>): Map<K, V> {
    map.set = (key: K, value: V) => {
        throw `Can't add property ${key} with a value of ${value}, map is not extensible`
    }

    map.delete = (key: K): boolean => {
        throw `Can't delete property ${key}, map is frozen`
    }

    map.clear = () => {
        throw `Can't clear map, map is frozen`
    }

    return map
}

/**
 * Separates a number into an array of numbers, each representing a unit of the original number
 * @param number The number to separate into units
 */
export function separateNumberIntoUnits(number: number): number[] {
    const numLen = number.toString().length
    const numArray: number[] = []
    for (let i = 0; i < numLen; i++) {
        numArray.push((number % 10) * Math.pow(10, i))
        number = Math.floor(number / 10)
    }
    return numArray.reverse()
}

/**
 *
 * @param dividend The number to divide
 * @param divisor The number to divide by
 * @returns Floored remainder of the division
 */
export function mod(dividend: number, divisor: number): number {
    return dividend - divisor * Math.floor(dividend / divisor)
}

export interface IUUIDItem<T> {
    uuid: string
    item: T
}

export function uuidWrapSingle<T>(toWrap: T): IUUIDItem<T> {
    return { uuid: uuidv4(), item: toWrap }
}

export function uuidWrap<T>(toWrap: T[]): IUUIDItem<T>[] {
    return toWrap.map((item) => ({ uuid: uuidv4(), item }))
}


/**
 *
 * @param arr cumulative sum array
 * @returns random element based on chance
 */
export function getRandomElemBasedOnChance<T extends IChance>(arr: T[]): T {
    const chancesSum = arr[arr.length - 1].chance
    const randNum = Math.random() * chancesSum
    let randomSurname: T
    let lastVal = 0
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i]

        if (lastVal <= randNum && randNum < element.chance) {
            randomSurname = element
            break
        }
        lastVal = element.chance
    }
    return randomSurname!
}

export function transformToCumulativeSums<T extends IChance>(arr: T[]): T[] {
    let sum = 0

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i]
        sum += element.chance
        element.chance = sum
    }

    return arr
}

export function chunkify<T>(arr: T[], n: number): T[][] {
    let chunks: T[][] = [];
    for (let i = n; i > 0; i--) {
        chunks.push(arr.splice(0, Math.ceil(arr.length / i)));
    }
    return chunks;
}