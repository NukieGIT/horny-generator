import { convert as convertToRoman } from '@/ts/romanConversionAPI/arabicToRoman'
import { romanConverter as convertToArabic } from '@/ts/romanConversionAPI/romanToArabic'

function convert(number: string): string {
    if (isRoman(number)) {
        return convertToArabic(number)
    } else {
        return convertToRoman(parseInt(number, 10))
    }
}

function isRoman(number: string): boolean {
    if (number.match(/^[_a-zA-Z]+$/)) {
        return true
    } else if (!isNaN(parseInt(number, 10))) {
        return false
    }
    throw new Error('Invalid number.')
}

export { convert }
