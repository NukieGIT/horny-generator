import { multyRomans, createNumber } from "@/ts/romanConversionAPI/romanToArabicExtension";

function romanConverter(value: string): string {
    multyRomans(value)

    value = formatToRoman(value);
    const romanArray: string[] = RegexRomons(value.split(""));
    let resultArray: number[] = [];
    romanArray.forEach(element => {
        resultArray.push(createNumber(element));
    });
    resultArray = MashRomans(resultArray);
    if (resultArray.length != 1) {
        while (resultArray.length != 1) {
            resultArray[resultArray.length-2] = CheckRomans(resultArray[resultArray.length-2], resultArray[resultArray.length-1]);
            resultArray.pop();  
        }
    }

    const result: string = resultArray[0].toString();
    return result;
}

function formatToRoman(value: string): string {
    return value.toUpperCase();
}



function CheckRomans(penultimate:number, last:number): number {
    if (penultimate < 0) {
        return penultimate < last ? last + penultimate : penultimate + last;  
    }
    return penultimate < last ? last - penultimate : penultimate + last;
}

function MashRomans(mashes:number[]): number[] {
    for (let i = 0; i < mashes.length-1; i++) {
        if(mashes[i] == mashes[i+1]){
            const temponnary = mashes[i] + mashes[i+1];
            const index = mashes.indexOf(mashes[i+1]);
            mashes.splice(index, 1);
            mashes[i] = temponnary;
        }
    }    
    
    return mashes;
}

function RegexRomons(regexes:string[]): string[] {
    const finalRegex: string[] = [];
    for (let i = 0; i < regexes.length; i++) {
        if (regexes[i] == "_") {
            const mud: string = regexes[i]+regexes[i+1];
            finalRegex.push(mud);
            const index = regexes.indexOf(regexes[i+1]);
            regexes.splice(index, 1);
        }else{
            finalRegex.push(regexes[i]);
        }
        
    }
    return finalRegex;
}



export { romanConverter }