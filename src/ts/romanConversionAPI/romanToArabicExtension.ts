import { ref } from 'vue'
import { ROMAN_NUMBERS } from './base'

const addedRomanNumbers = ref<Map<string, number>>(new Map())

function addingRomans(letter: string, Number: number) {
    if (letter.match(/^[a-zA-Z]+$/)) {
        //Normal Number
        addedRomanNumbers.value.set(letter, Number)

        // _ TypeNumber (aka *1000)
        addedRomanNumbers.value.set('_' + letter, Number * 1000)
    } else {
        throw new Error('Illegal Letter')
    }
}

function multyRomans(operation: string) {
    const operationArray: string[] = operation.split('')
    const finalOperation: number[] = []
    let final: number = 0

    operationArray.forEach((operative) => {
        if (operative.match(/^[a-zA-Z]+$/)) {
            finalOperation.push(createNumber(operative))
        }
    })
    final = finalOperation[0] + finalOperation[1]
    console.log(operationArray, finalOperation, final)
}

function createNumber(number: string): number {
    if (addedRomanNumbers.value.has(number)) {
        const num = addedRomanNumbers.value.get(number)
        if (num !== undefined) {
            return num
        }
    } else if (ROMAN_NUMBERS.has(number)) {
        const num = ROMAN_NUMBERS.get(number)
        if (num !== undefined) {
            return num
        }
    }
    throw new Error('Cannot convert number')
}

export { addingRomans, addedRomanNumbers, createNumber, multyRomans }
