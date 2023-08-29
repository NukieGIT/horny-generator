import characterSurnames from '@/ts/AseriaRPG/characterSurnames.json'
import characterClasses from '@/ts/AseriaRPG/characterClasses.json'

import type { IChance, IBoost, ICharacterSurnames, ICharacterSurname, IAllowedRace } from './characterCreatorTypes'
import { Player } from './player/player'
import type { IDexterity, IDexterityAttributes, IIntelligence, IIntelligenceAttributes, IModifiableStats, IStrength, IStrengthAttributes, IWisdom, IWisdomAttributes } from './player/playerStatTypes'
import type { IBornWisdom, IMagic, IManaCost, IToki } from './player/playerAbilityCategories'
import { getRandomElemBasedOnChance, transformToCumulativeSums } from '../utils/utilityFuncs'

import { DiceRoller, DiceRoll } from '@dice-roller/rpg-dice-roller';
import type { IClasses } from './characterClassTypes'


const getCharacterSurnames = () =>
    JSON.parse(JSON.stringify(characterSurnames)) as ICharacterSurnames

export class CharacterCreator {
    private _name: string = ''
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    private _surname: string = ''
    public get surname(): string {
        return this._surname
    }
    public set surname(value: string) {
        this._surname = value
    }
    private _strength: number = 0
    public get strength(): number {
        return this._strength
    }
    public set strength(value: number) {
        this._strength = value
    }

    private _isSpecialSurname: boolean = false
    public get isSpecialSurname(): boolean {
        return this._isSpecialSurname
    }

    constructor() {
        this.makeSpecialSurname()
    }

    private makeSpecialSurname() {
        this._isSpecialSurname = true
        // this._isSpecialSurname = Math.random() > 0.7;
        if (this._isSpecialSurname) {
            let randomSurname = getRandomElemBasedOnChance(
                transformToCumulativeSums(getCharacterSurnames())
            )
            createPlayer(randomSurname)
            this.surname = randomSurname.surname
        }
    }

}

//NOTE: nie RUSZAJ TEGO, to jest do testowania

function rollDice(notation: string): number {
    const roll = new DiceRoll(notation);
    const rollTotal = roll.total;
    return rollTotal;
}

function checkClass(classes: IClasses, surname: string, abilityCategory: {magic?: IMagic, toki?: IToki, bornWisdom?: IBornWisdom}): string[] {
    let allowedClass: string[] = [];
    classes.forEach((element) => {
        if (element.isFamily == surname) {
            allowedClass.push(element.name);
        }else if (element.isMagic == true && abilityCategory.magic != undefined){
            allowedClass.push(element.name);
        }else if (element.isToki == true && abilityCategory.toki != undefined){
            allowedClass.push(element.name);
        }else if(element.isMagic == false && element.isToki == false){
            allowedClass.push(element.name);
        }
    });

    console.log(allowedClass);
    return allowedClass;
}
function createPlayer(family: ICharacterSurname) {

    //attack max 20, hp max 500, mana max 600, stamina max 100                                           
    let modifiableStats: IModifiableStats = { attack: rollDice("d20"), hp: rollDice("d500"), level: 1, mana: rollDice("d600"), stamina: rollDice("d100") }

    //wisdomValue max 20
    let wisdomValue: number = rollDice("d20")

    //animalHandling max 5+ floor(wisdomValue/4), insight max 5+ floor(wisdomValue/4), medicine max 5+ floor(wisdomValue/4), survival max 5+ floor(wisdomValue/4), performance max 5+ floor(wisdomValue/4)
    let wisdomAtr: IWisdomAttributes = { animalHandling: rollDice(`d5+floor(${wisdomValue}/4)`), insight: rollDice(`d5+floor(${wisdomValue}/4)`), medicine: rollDice(`d5+floor(${wisdomValue}/4)`), survival: rollDice(`d5+floor(${wisdomValue}/4)`), performance: rollDice(`d5+floor(${wisdomValue}/4)`) }
    let wisdom: IWisdom = { wisdomShort: "WIS", wisdom: wisdomValue, attributesWIS: wisdomAtr }

    //intelligenceValue max 20
    let intelligenceValue: number = rollDice("d20")

    //arcana max 5+ floor(intelligenceValue/4), history max 5+ floor(intelligenceValue/4), runeStone max 5+ floor(intelligenceValue/4), nature max 5+ floor(intelligenceValue/4), religion max 5+ floor(intelligenceValue/4), stealth max 5+ floor(intelligenceValue/4)
    let intelligenceAtr: IIntelligenceAttributes = { arcana: rollDice(`d5+floor(${intelligenceValue}/4)`), history: rollDice(`d5+floor(${intelligenceValue}/4)`), runeStone: rollDice(`d5+floor(${intelligenceValue}/4)`), nature: rollDice(`d5+floor(${intelligenceValue}/4)`), religion: rollDice(`d5+floor(${intelligenceValue}/4)`), stealth: rollDice(`d5+floor(${intelligenceValue}/4)`) }
    let intelligence: IIntelligence = { intelligenceShort: "INT", intelligence: intelligenceValue, attributesINT: intelligenceAtr }

    //strengthValue max 20
    let strengthValue: number = rollDice("d20")

    //athletics max 5+ floor(strengthValue/4), deception max 5+ floor(strengthValue/4)
    let strengthAtr: IStrengthAttributes = { athletics: rollDice(`d5+floor(${strengthValue}/4)`), deception: rollDice(`d5+floor(${strengthValue}/4)`) }
    let strength: IStrength = { strengthShort: "STR", strength: strengthValue, attributesSTR: strengthAtr }

    //dexterityValue max 20
    let dexterityValue: number = rollDice("d20")

    //acrobatic max 5+ floor(dexterityValue/4), intimidation max 5+ floor(dexterityValue/4), perception max 5+ floor(dexterityValue/4)
    let dexterityAtr: IDexterityAttributes = { acrobatic: rollDice(`d5+floor(${dexterityValue}/4)`), intimidation: rollDice(`d5+floor(${dexterityValue}/4)`), perception: rollDice(`d5+floor(${dexterityValue}/4)`) }
    let dexterity: IDexterity = { dexterityShort: "DEX", dexterity: dexterityValue, attributesDEX: dexterityAtr }

    let manacost: IManaCost = { small: 2, medium: 4, large: 6 }
    let toki: IToki = { tokiManaCost: manacost }

    //make inputs
    let race: string = family.allowedRace[Math.floor(Math.random() * family.allowedRace.length)].toString();

    const classJSON = characterClasses as IClasses
    const characterClassArray: string[] = checkClass(classJSON, family.surname, { toki: toki });
    let characterClass: string = characterClassArray[Math.floor(Math.random() * characterClassArray.length)].toString();



    let player: Player = new Player("A", family.surname, race, characterClass, modifiableStats, wisdom, intelligence, strength, dexterity, { toki: toki })
    player.updateAbilityCategories(family.change[0].normalAbilityCategory, family.change[0].afterChangeAbilityCategory)
    console.log(player);
}
