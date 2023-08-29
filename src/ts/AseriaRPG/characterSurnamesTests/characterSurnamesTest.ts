import { chunkify } from "@/ts/utils/utilityFuncs";
import characterSurnamesJSON from "@/ts/AseriaRPG/characterSurnames.json";
import type { ICharacterSurnames } from "../characterCreatorTypes";
import type { SurnameCounter } from "./characterSurnameTestTypes";

export async function runTest(tries: number): Promise<SurnameCounter[]> {

    return new Promise((resolve, reject) => {

        const characterSurnames = characterSurnamesJSON as ICharacterSurnames;
        
        const getCharacterSurnames = () =>
            JSON.parse(JSON.stringify(characterSurnames)) as ICharacterSurnames
        
        // const surnameChancesArray = Array.from({ length: tries }, () => getCharacterSurnames());
        
        // const chunks = chunkify(surnameChancesArray, Math.min(16, tries));
        
        const surnameCounts: SurnameCounter[][] = [];
        
        const amountPerWorker: number[] = [];

        const workersCount = Math.min(16, tries);

        const perWorkerCount = Math.floor(tries / workersCount);
        const remainder = tries % workersCount;

        console.log(perWorkerCount, remainder);
        

        for (let i = 0; i < workersCount; i++) {
            amountPerWorker.push(perWorkerCount);
        }

        for (let i = 0; i < remainder; i++) {
            amountPerWorker[i]++;
        }

        // for (let i = 0; i < amountPerWorker.length; i++) {
        //     const workerAmount = amountPerWorker[i];
            
        //     const worker = new Worker(new URL("./characterSurnamesWorker.ts", import.meta.url), { type: "module" });
        //     worker.postMessage({ workerAmount, characterSurnames });

        //     worker.onmessage = (e) => {
        //         const data = e.data as SurnameCounter[];
        //         surnameCounts.push(data);

        //         if (surnameCounts.length === amountPerWorker.length) {
        //             resolve(onFinish(surnameCounts));
        //         }
        //     }
        // }

        // for (let i = 0; i < chunks.length; i++) {
        //     const chunk = chunks[i];
                        
        //     const worker = new Worker(new URL("./characterSurnamesWorker.ts", import.meta.url), { type: "module" });
        //     worker.postMessage(chunk);
    
        //     worker.onmessage = (e) => {
        //         const data = e.data as SurnameCounter[];
        //         surnameCounts.push(data);
    
        //         if (surnameCounts.length === chunks.length) {
        //             resolve(onFinish(surnameCounts));
        //         }
        //     }
        // }
    });

}

function onFinish(surnameCounts: SurnameCounter[][]) {
    const surnameCountsFinal: SurnameCounter[] = [];

    for (let i = 0; i < surnameCounts.length; i++) {
        const element = surnameCounts[i];

        for (let j = 0; j < element.length; j++) {
            const rsurname = element[j];
            const surname = rsurname.surname;

            const foundSurname = surnameCountsFinal.find((x) => x.surname === surname);
            if (!foundSurname) {
                surnameCountsFinal.push(rsurname);
            } else {
                foundSurname.count += rsurname.count;
            }
        }
    }
    return surnameCountsFinal;
}

export function logData(surnameCounts: SurnameCounter[]) {
    const tries = surnameCounts.map((x) => x.count).reduce((a, b) => a + b);
    console.log(
        `%cTries: %c${tries.toLocaleString("en-US")}`,
        "color:gray;font-size:30px;", "color:lightgreen;font-size:30px;"
    );
    
    const formattedArray = surnameCounts.map((x) => ({ surname: x.surname, 'chance %': x.count / tries * 100, count: x.count.toLocaleString("en-US") }))
    
    console.table(formattedArray.sort((a, b) => b['chance %'] - a['chance %']));
    console.log(`total: ${tries.toLocaleString("en-US")}`);
    
}
