import { transformToCumulativeSums, getRandomElemBasedOnChance } from "../../utils/utilityFuncs";
import type { ICharacterSurnames } from "../characterCreatorTypes";
import type { SurnameCounter } from "./characterSurnameTestTypes";

addEventListener('message', (e) => {

    const data = e.data as { workerAmount: number, characterSurnames: ICharacterSurnames };
    const surnameCountsDataResult: SurnameCounter[] = [];

    // const { workerAmount, characterSurnames } = jobs;

    const surnameChancesArray = Array.from({ length: data.workerAmount }, () => JSON.parse(JSON.stringify(data.characterSurnames)) as ICharacterSurnames);

    surnameChancesArray.forEach((job) => {
        const rsurname = getRandomElemBasedOnChance(transformToCumulativeSums(job))

        const surname = rsurname.surname;
        const isPresent = surnameCountsDataResult.find((x) => x.surname === surname);
        if (!isPresent) {
            surnameCountsDataResult.push({ surname, count: 1 });
        } else {
            surnameCountsDataResult.find((x) => x.surname === surname)!.count++;
        }
    });

    postMessage(surnameCountsDataResult);



    // const jobs = e.data as ICharacterSurnames[];
    // const surnameCountsDataResult: SurnameCounter[] = [];
    
    // jobs.forEach((job) => {
    //     const rsurname = getRandomElemBasedOnChance(transformToCumulativeSums(job))
        
    //     const surname = rsurname.surname;
    //     const isPresent = surnameCountsDataResult.find((x) => x.surname === surname);
    //     if (!isPresent) {
    //         surnameCountsDataResult.push({ surname, count: 1 });
    //     } else {
    //         surnameCountsDataResult.find((x) => x.surname === surname)!.count++;
    //     }
    // });
    
    // postMessage(surnameCountsDataResult);
});
