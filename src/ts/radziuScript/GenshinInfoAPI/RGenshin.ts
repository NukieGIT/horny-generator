import { useMemoize } from '@vueuse/core'
import type { IGenshinCharacterInfo } from './RGenshinCharacterInfoTypes'

export const fetchCharacterData = useMemoize(
    async (characterName: string): Promise<IGenshinCharacterInfo> => {
        const fetchedCharacter: IGenshinCharacterInfo = await fetch(
            `https://genshin.jmp.blue/characters/${characterName}`
        ).then((response) => response.json())

        return fetchedCharacter
    }
)

export const fetchCharacterCard = useMemoize(async (characterName: string): Promise<Blob> => {
    const characterCard: Blob = await fetch(
        `https://genshin.jmp.blue/characters/${characterName}/card`
    ).then((response) => response.blob())

    return characterCard
})

// class GenshinCharacter {
//     private characterName: string;
//     private character?: IGenshinCharacterInfo;
//     constructor(character: string) {
//         this.characterName = character;
//     }

//     public fetchCharacter = useMemoize(async (): Promise<IGenshinCharacterInfo> => {
//         const fetchedCharacter: IGenshinCharacterInfo = await fetch(`https://genshin.jmp.blue/characters/${this.characterName}`)
//          .then((response) => response.json())

//         this.character = fetchedCharacter;
//         return fetchedCharacter;
//     }, {
//         getKey: () => this.characterName
//     })

//     public getCharacterCard = useMemoize(async (): Promise<Blob> => {
//         const characterCard: Blob = await fetch(`https://genshin.jmp.blue/characters/${this.characterName}/card`)
//         .then((response) => response.blob())

//         return characterCard;
//     }, {
//         getKey: () => this.characterName
//     })
// }

// export { GenshinCharacter }
