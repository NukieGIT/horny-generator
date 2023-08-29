export interface IModifiableStats {
    level: number
    attack: number
    hp: number
    mana: number
    stamina: number
}

export interface IWisdom {
    wisdomShort: string
    wisdom: number
    attributesWIS: IWisdomAttributes
}

export interface IWisdomAttributes {
    animalHandling: number
    insight: number
    medicine: number
    survival: number
    performance: number
}

export interface IIntelligence {
    intelligenceShort: string
    intelligence: number
    attributesINT: IIntelligenceAttributes
}

export interface IIntelligenceAttributes {
    arcana: number
    history: number
    runeStone: number
    nature: number
    religion: number
    stealth: number
}

export interface IStrength {
    strengthShort: string
    strength: number
    attributesSTR: IStrengthAttributes
}

export interface IStrengthAttributes {
    athletics: number
    deception: number
}

export interface IDexterity {
    dexterityShort: string
    dexterity: number
    attributesDEX: IDexterityAttributes
}

export interface IDexterityAttributes {
    acrobatic: number
    intimidation: number
    perception: number
}
