export type IClasses = IClass[]

export interface IClass {
  name: string
  isMagic: boolean
  isToki: boolean
  isFamily: string
  statsBoosts: IStatsBoost[]
  classBoosts: IClassBoost[]
}

export interface IStatsBoost {
  statName: string
  boostAmount: number
  attributes: IAttribute[]
}

export interface IAttribute {
  attribute: string
  boostAmount: number
}

export interface IClassBoost {
  className: string
  type: string
  boostAmount: number
}
