import { separateNumberIntoUnits } from '@/ts/utils/utilityFuncs'
import { ROMAN_NUMBERS } from '@/ts/romanConversionAPI/base'

function convert(number: number): string {
    for (const [key, value] of ROMAN_NUMBERS) {
        if (value === number) {
            return key
        }
    }

    const numbers = separateNumberIntoUnits(number)
    let romanString = ''

    unitNumberLoop: for (const unitNumber of numbers) {
        if (unitNumber === 0) {
            continue
        }

        // try to find exact number
        for (const [key, value] of ROMAN_NUMBERS) {
            if (value === unitNumber) {
                romanString += key
                continue unitNumberLoop
            }
        }

        // if not found, find closest number

        const closestNumber = findClosestNumberInRoman(unitNumber)
        let closestNumberLetter = 'unknown'

        for (const [key, value] of ROMAN_NUMBERS) {
            if (value === closestNumber) {
                closestNumberLetter = key
            }
        }

        const result = unitNumber - closestNumber

        const closest = findClosestNumberInRoman(Math.abs(result))

        // const howMany = (result / Math.pow(10, closest.toString().length - 1)); // honestly idk what i was thinking here but i'm gonna leave it since it might've been some big brain time at 4 am i just cannot comperhend right now
        const howMany = result / closest

        let closestLetter = 'unknown'
        for (const [key, value] of ROMAN_NUMBERS) {
            if (value === closest) {
                closestLetter = key
            }
        }

        if (Math.sign(result) === 1) {
            const closestLetters = closestLetter.repeat(howMany)
            romanString += closestNumberLetter + closestLetters
        } else {
            romanString += closestLetter + closestNumberLetter
        }

        // romanString = "";
    }

    if (romanString.length > 0) {
        return romanString
    }

    throw new Error('Cannot convert to roman')
}

function findClosestNumberInRoman(number: number): number {
    const numbers = Array.from(ROMAN_NUMBERS.values())

    const closestNumber = findClosestNumberWithOffsetUnlessOneBelow(number, numbers)

    return closestNumber
}

function findClosestNumberWithOffsetUnlessOneBelow(number: number, numbers: number[]): number {
    let indexOfClosestNumber = 0
    let offset = 0

    for (const num of numbers) {
        const sign = Math.sign(number - num)
        const currDiffNoAbs = number - num
        const currentDifference = Math.abs(number - num)
        const closestDifference = Math.abs(number - numbers[indexOfClosestNumber])
        // console.log(`number ${number} compared to ${num}`, `diff ${number - num}`, `sign ${sign}`);

        if (currentDifference < closestDifference) {
            const scalar = Math.pow(10, number.toString().length - 1)
            const isOneBelow = -1 * scalar
            const isNotOneBelow = -2 * scalar
            if (currDiffNoAbs === isOneBelow || sign === 1) {
                offset = 0
            } else if (currDiffNoAbs <= isNotOneBelow) {
                offset = -1
            }
            indexOfClosestNumber = numbers.indexOf(num)
        }
    }

    if (indexOfClosestNumber + offset < 0 || indexOfClosestNumber + offset >= numbers.length) {
        return numbers[indexOfClosestNumber]
    }

    return numbers[indexOfClosestNumber + offset]
}

export { convert }
