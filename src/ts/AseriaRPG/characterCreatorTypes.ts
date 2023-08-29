export type ICharacterSurnames = ICharacterSurname[]

export interface ICharacterSurname extends IChance, IAllowedRace {
    surname: string
    boosts: IBoost[]
    change: IChange[]
    allowedRace: string[]
}

export interface IChance {
    chance: number
}

export interface IBoost {
    statName: string
    boostAmount: number
}

export interface IChange{
    normalAbilityCategory: string,
    afterChangeAbilityCategory: string
}

export interface IAllowedRace{
    allowedRace:string[]
}