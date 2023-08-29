import type { IDexterity, IIntelligence, IStrength, IWisdom } from './playerStatTypes'

export interface IToki {
    tokiManaCost: IManaCost
}

export interface IMagic {
    magicType: 'Fire' | 'Water' | 'Earth' | 'Electric' | 'Nature'
    magicManaCost: IManaCost
}

export interface IBornWisdom {
    transromation: 'Human' | 'Devil' | 'Dragon'
    bornManaCost: IManaCost
    modifiedStats: {
        health: number
        wisdom: IWisdom
        interface: IIntelligence
        strength: IStrength
        dexterity: IDexterity
    }
}

export interface IManaCost {
    small: number
    medium: number
    large: number
}
