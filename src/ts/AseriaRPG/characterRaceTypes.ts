export type IRaces = IRace[]

export interface IRace {
  name: string
  boosts: IBoost[]
  allowedAbilityCategories: string[]
}

export interface IBoost {
  statName: string
  boostAmount: number
}