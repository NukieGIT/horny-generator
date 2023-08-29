import type { IBornWisdom, IMagic, IManaCost, IToki } from './playerAbilityCategories'
import type {
    IDexterity,
    IDexterityAttributes,
    IIntelligence,
    IIntelligenceAttributes,
    IModifiableStats,
    IStrength,
    IStrengthAttributes,
    IWisdom,
    IWisdomAttributes
} from './playerStatTypes'

export class Player implements IModifiableStats, IWisdom, IIntelligence, IStrength, IDexterity {
    private _name: string
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    private _surname: string
    public get surname(): string {
        return this._surname
    }
    public set surname(value: string) {
        this._surname = value
    }
    private _race: string
    public get race(): string {
        return this._race
    }
    public set race(value: string) {
        this._race = value
    }
    private _characterClass: string
    public get characterClass(): string {
        return this._characterClass
    }
    public set characterClass(value: string) {
        this._characterClass = value
    }

    private _level: number
    public get level(): number {
        return this._level
    }
    public set level(value: number) {
        this._level = value
    }
    private _attack: number
    public get attack(): number {
        return this._attack
    }
    public set attack(value: number) {
        this._attack = value
    }

    private _hp: number
    public get hp(): number {
        return this._hp
    }
    public set hp(value: number) {
        this._hp = value
    }
    private _mana: number
    public get mana(): number {
        return this._mana
    }
    public set mana(value: number) {
        this._mana = value
    }
    private _stamina: number
    public get stamina(): number {
        return this._stamina
    }
    public set stamina(value: number) {
        this._stamina = value
    }

    private _wisdomShort: string = 'WIS'
    public get wisdomShort(): string {
        return this._wisdomShort
    }
    private _wisdom: number
    public get wisdom(): number {
        return this._wisdom
    }
    public set wisdom(value: number) {
        this._wisdom = value
    }
    private _attributesWIS: IWisdomAttributes
    public get attributesWIS(): IWisdomAttributes {
        return this._attributesWIS
    }
    public set attributesWIS(value: IWisdomAttributes) {
        this._attributesWIS = value
    }

    private _intelligenceShort: string = 'INT'
    public get intelligenceShort(): string {
        return this._intelligenceShort
    }
    private _intelligence: number
    public get intelligence(): number {
        return this._intelligence
    }
    public set intelligence(value: number) {
        this._intelligence = value
    }
    private _attributesINT: IIntelligenceAttributes
    public get attributesINT(): IIntelligenceAttributes {
        return this._attributesINT
    }
    public set attributesINT(value: IIntelligenceAttributes) {
        this._attributesINT = value
    }

    private _strengthShort: string = 'STR'
    public get strengthShort(): string {
        return this._strengthShort
    }

    private _strength: number
    public get strength(): number {
        return this._strength
    }
    public set strength(value: number) {
        this._strength = value
    }
    private _attributesSTR: IStrengthAttributes
    public get attributesSTR(): IStrengthAttributes {
        return this._attributesSTR
    }
    public set attributesSTR(value: IStrengthAttributes) {
        this._attributesSTR = value
    }

    private _dexterityShort: string = 'DEX'
    public get dexterityShort(): string {
        return this._dexterityShort
    }
    private _dexterity: number
    public get dexterity(): number {
        return this._dexterity
    }
    public set dexterity(value: number) {
        this._dexterity = value
    }
    private _attributesDEX: IDexterityAttributes
    public get attributesDEX(): IDexterityAttributes {
        return this._attributesDEX
    }
    public set attributesDEX(value: IDexterityAttributes) {
        this._attributesDEX = value
    }

    private _IToki: IToki | undefined
    public get IToki(): IToki | undefined {
        return this._IToki
    }
    public set IToki(value: IToki | undefined) {
        this._IToki = value
    }

    private _IMagic: IMagic | undefined
    public get IMagic(): IMagic | undefined {
        return this._IMagic
    }
    public set IMagic(value: IMagic | undefined) {
        this._IMagic = value
    }

    private _IBornWisdom: IBornWisdom | undefined
    public get IBornWisdom(): IBornWisdom | undefined {
        return this._IBornWisdom
    }
    public set IBornWisdom(value: IBornWisdom | undefined) {
        this._IBornWisdom = value
    }

    constructor(
        name: string,
        surname: string,
        race: string,
        characterClass: string,
        modifiableStats: IModifiableStats,
        wisdom: IWisdom,
        intelligence: IIntelligence,
        strength: IStrength,
        dexterity: IDexterity,
        abilityCategory: {
            magic?: IMagic,
            toki?: IToki,
            bornWisdom?: IBornWisdom
        }
    ) {
        this._name = name
        this._surname = surname
        this._race = race
        this._characterClass = characterClass
        this._attack = modifiableStats.attack
        this._hp = modifiableStats.hp
        this._mana = modifiableStats.mana
        this._stamina = modifiableStats.stamina
        this._level = modifiableStats.level
        this._wisdom = wisdom.wisdom
        this._attributesWIS = wisdom.attributesWIS
        this._intelligence = intelligence.intelligence
        this._attributesINT = intelligence.attributesINT
        this._strength = strength.strength
        this._attributesSTR = strength.attributesSTR
        this._dexterity = dexterity.dexterity
        this._attributesDEX = dexterity.attributesDEX

        this._IToki = abilityCategory.toki
        this._IMagic = abilityCategory.magic
        this._IBornWisdom = abilityCategory.bornWisdom
    }


    public updateAbilityCategories(normal:string, after:string) {
        if (this.characterClass == normal) {
            this.characterClass = after;
        }
    }
}
