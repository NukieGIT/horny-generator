<script setup lang="ts">
import { computed, ref } from 'vue';

// [I	V	X	L	C	D	M]  XIV 1015 10(5-1) 104 

// LXXVIII 78      50 10 10 5 1 1 1   50 20 5 3  50 20 8  50 28  78
// CLXXXIV 184     100 50 10 10 10 1 5      100 50 10 10 10 1 5                       
// TODO: XCIX 99         10 100 1 10         10 100 9      90 9    99   x < y   y-x    x > y y+x  


const ROMAN_NUMBERS: Map<string, number> = new Map([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000],
    ['_V', 5000],
    ['_X', 10000],
    ['_L', 50000],
    ['_C', 100000],
    ['_D', 500000],
    ['_M', 1000000],
]);

const userNumber = ref<string>('');
const getUserNumber = computed(() => userNumber.value.toUpperCase());

const result = ref<string>('');

function convert() {
    if (isRoman(getUserNumber.value)) {
        //jest roman

    }else{
        // jest liczbą
        result.value = createRoman(parseInt(getUserNumber.value));
    }
}

function createRoman(number: number): string {
    for (const [key, value] of ROMAN_NUMBERS) {
        if (value === number) {
            return key;
        }

    }

    const numbers = separateNumberIntoUnits(number);
    let romanString = '';
    
    unitNumberLoop:
        for (const unitNumber of numbers) {
            if (unitNumber === 0) {
                continue;
            }
            
            // try to find exact number
            for (const [key, value] of ROMAN_NUMBERS) {
                if (value === unitNumber) {
                    romanString += key;
                    continue unitNumberLoop;
                }
            }

            // if not found, find closest number

            const closestNumber = findClosestNumberInRoman(unitNumber);
            let closestNumberLetter = "unknown";

            for (const [key, value] of ROMAN_NUMBERS) {
                if (value === closestNumber) {
                    closestNumberLetter = key;
                }
            }

            const result = unitNumber - closestNumber;
            console.log(closestNumber, result);
            
            const closest = findClosestNumberInRoman(Math.abs(result));

            // const howMany = (result / Math.pow(10, closest.toString().length - 1)); // honestly idk what i was thinking here but i'm gonna leave it since it might've been some big brain time at 4 am i just cannot comperhend right now
            const howMany = result / closest;
            
            
            let closestLetter = "unknown";
            for (const [key, value] of ROMAN_NUMBERS) {
                if (value === closest) {
                    closestLetter = key;
                }
            }

            if (Math.sign(result) === 1) {
                const closestLetters = closestLetter.repeat(howMany);
                romanString += closestNumberLetter + closestLetters;
            } else {
                romanString += closestLetter + closestNumberLetter;
            }

            // romanString = "";
        }

    if (romanString.length > 0) {
        return romanString;
    }

    throw new Error("Cannot convert to roman");
}

function findClosestNumberInRoman(number: number): number {
    const numbers = Array.from(ROMAN_NUMBERS.values());
    
    
    const closestNumber = findClosestNumberWithOffset(number, numbers);
    return closestNumber;
}

function findClosestNumberInRoman2(number: number): number {
    const numbers = Array.from(ROMAN_NUMBERS.values());
    

    
    const closestNumber = findClosestNumberWithOffset(number, numbers, -1);
    console.log(closestNumber, findClosestNumberInRoman2.name);
    
    return closestNumber;
}

function findClosestNumberWithOffset(number: number, numbers: number[], offset: number = 0): number {
    let indexOfClosestNumber = 0;
    
    for (const num of numbers) {
        if (Math.abs(number - num) < Math.abs(number - numbers[indexOfClosestNumber])) {
            console.log(indexOfClosestNumber, "index");
            
            indexOfClosestNumber = numbers.indexOf(num);
        }
    }

    if (indexOfClosestNumber + offset < 0 || indexOfClosestNumber + offset >= numbers.length) {
        return numbers[indexOfClosestNumber];
    }

    return numbers[indexOfClosestNumber + offset];
}

// function findClosestNumber(number: number, numbers: number[]): number {
//     let closestNumber = numbers[0];
//     for (const num of numbers) {
//         if (Math.abs(number - num) < Math.abs(number - closestNumber)) {
//             closestNumber = num;
//         }
//     }
//     return closestNumber;
// }

// console.log(findClosestNumber(8, [1, 5, 10, 50, 100, 500, 1000]));


function separateNumberIntoUnits(number: number): number[] {
    const numLen = number.toString().length;
    const numArray: number[] = [];
    for (let i = 0; i < numLen; i++) {
        numArray.push((number % 10) * Math.pow(10, i));
        number = Math.floor(number / 10);
    }
    return numArray.reverse();
}
    



function isRoman(number: string): boolean {
    if (number.match(/^[_IVXLCDMN]+$/)) {
        return true;
    } else if (!isNaN(parseInt(number, 10))) {
        return false;
    }
    throw new Error("Invalid number.");
}








function convertToRoman(number: number): string {
    
    return '';
}

function convertToNumber(number: string): number {
    
    return 0;
}

</script>

<template>
    <h1>Roman Converter</h1>
    <p>Converts numbers to roman numerals and vice versa.</p>
    <form @submit.prevent="convert" >
        <label for="number">Number:</label>
        <input type="text" id="number" v-model="userNumber"/><br>
        <button type="submit">Convert</button>
    </form>
    <h1 v-if="result">result: {{ result }}</h1>
</template>

<style scoped></style>
