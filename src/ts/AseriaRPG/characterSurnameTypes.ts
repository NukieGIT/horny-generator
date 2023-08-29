export type ISurnames = ISurname[]

export interface ISurname {
  surname: string
  chance: number
  boosts: IBoost[]
  change: IChange[]
  allowedRace: string[]
}

export interface IBoost {
  statName: string
  boostAmount: number
}

export interface IChange {
  normalAbilityCategory: string
  afterChangeAbilityCategory: string
}
