import { freezeMap } from "@/ts/utils/utilityFuncs";

const ROMAN_NUMBERS_BASE: Map<string, number> = new Map([
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

const ROMAN_NUMBERS: Map<string, number> = freezeMap(ROMAN_NUMBERS_BASE);

export { ROMAN_NUMBERS }