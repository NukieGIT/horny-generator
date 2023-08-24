export interface IGenshinCharacterInfo {
    name: string
    title: string
    vision: string
    weapon: string
    gender: string
    nation: string
    affiliation: string
    rarity: number
    release: string
    constellation: string
    birthday: string
    description: string
    skillTalents: ISkillTalent[]
    passiveTalents: IPassiveTalent[]
    constellations: IConstellation[]
    vision_key: string
    weapon_type: string
}

export interface ISkillTalent {
    name: string
    unlock: string
    description: string
    upgrades: IUpgrade[]
    type: string
}

export interface IUpgrade {
    name: string
    value: string
}

export interface IPassiveTalent {
    name: string
    unlock: string
    description: string
    level?: number
}

export interface IConstellation {
    name: string
    unlock: string
    description: string
    level: number
}

export interface ICharacterCardProps {
    characterData: IGenshinCharacterInfo
    characterCard?: string
}

export const IGenshinCharacterInfoDefault: IGenshinCharacterInfo = {
    name: 'no name',
    title: 'no title',
    vision: 'no vision',
    weapon: 'no weapon',
    gender: 'no gender',
    nation: 'no nation',
    affiliation: 'no affiliation',
    rarity: 0,
    release: 'no release',
    constellation: 'no constellation',
    birthday: 'no birthday',
    description: 'no description',
    skillTalents: [],
    passiveTalents: [],
    constellations: [],
    vision_key: 'no vision key',
    weapon_type: 'no weapon type'
}
