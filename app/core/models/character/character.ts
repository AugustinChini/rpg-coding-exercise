import CharacterNameTooLongException from "../../exceptions/characterNameTooLongException"
import NotEnoughSkillsPointsException from "../../exceptions/notEnoughSkillsPointsException"
import wrongCharacterPointFormatException from "../../exceptions/wrongCharacterPointFormatException"
import CharacterDto from "./dto/characterDto"

export default class Character {
    private id: string
    private name: string
    private playerId: string
    private level: number
    private rank: number
    private skillPoints: number
    private healthPoints: number
    private attackPoints: number
    private defensePoints: number
    private magikPoints: number

    public constructor(character: {
        id: string
        name: string
        playerId: string
        level?: number
        rank?: number
        skillPoints?: number
        healthPoints?: number
        attackPoints?: number
        defensePoints?: number
        magikPoints?: number
    }) {
        if (character.name.length > 25) {
            throw new CharacterNameTooLongException()
        }
        this.id = character.id
        this.name = character.name
        this.playerId = character.playerId
        this.level = character.level || 1
        this.rank = character.rank || 1
        this.skillPoints = character.skillPoints || 12
        this.healthPoints = character.healthPoints || 10
        this.attackPoints = character.attackPoints || 0
        this.defensePoints = character.defensePoints || 0
        this.magikPoints = character.magikPoints || 0
    }

    /**
     * applySkillsPoints Apply the skills points to the categories
     */
    public applySkillsPoints(
        heath: number,
        attack: number,
        defense: number,
        magik: number
    ): void {
        this.addHealthPoints(heath)
        this.addAttackPoints(attack)
        this.addDefensePoints(defense)
        this.addMagikPoints(magik)
    }

    /**
     * Check the number of skills points to spend to have Npoints in a category
     */
    private getSkillPointToSpend(pointsToAdd: number) {
        if (pointsToAdd >= 0) {
            let toSpend = 0
            // apply the SP spending rule
            for (let index = 0; index < pointsToAdd; index++) {
                toSpend += toSpend ? Math.ceil(index / 5) : 1
            }
            // check if there is enough SP left
            if (toSpend > this.skillPoints)
                throw new NotEnoughSkillsPointsException()

            return toSpend
        }
        throw new wrongCharacterPointFormatException()
    }
    /**
     * addHealthPoints increase the Heath points according to the skill point rule
     */
    public addHealthPoints(pointsToAdd: number): void {
        const toSubFromSkills = pointsToAdd - 10
        // if enough skills
        if (toSubFromSkills > 0 && toSubFromSkills <= this.skillPoints) {
            // add heath points
            this.healthPoints = pointsToAdd
            // sub skills
            this.skillPoints -= toSubFromSkills
        } else if (toSubFromSkills > this.skillPoints)
            throw new NotEnoughSkillsPointsException()
    }

    /**
     * addAttackPoints increase the Attack points according to the skill point rule
     */
    public addAttackPoints(pointsToAdd: number): void {
        const skillsPointsToSpend = this.getSkillPointToSpend(pointsToAdd)
        this.attackPoints = pointsToAdd
        this.skillPoints -= skillsPointsToSpend
    }

    /**
     * addDefensePoints increase the Defense points according to the skill point rule
     */
    public addDefensePoints(pointsToAdd: number): void {
        const skillsPointsToSpend = this.getSkillPointToSpend(pointsToAdd)
        this.defensePoints = pointsToAdd
        this.skillPoints -= skillsPointsToSpend
    }

    /**
     * addMagikPoints increase the Magik points according to the skill point rule
     */
    public addMagikPoints(pointsToAdd: number): void {
        const skillsPointsToSpend = this.getSkillPointToSpend(pointsToAdd)
        this.magikPoints = pointsToAdd
        this.skillPoints -= skillsPointsToSpend
    }

    /**
     * toDto return a readOnly deep copy of the character
     */
    public toDto(): CharacterDto {
        return Object.freeze({
            id: this.id,
            name: this.name,
            playerId: this.playerId,
            level: this.level,
            rank: this.rank,
            skillPoints: this.skillPoints,
            healthPoints: this.healthPoints,
            attackPoints: this.attackPoints,
            defensePoints: this.defensePoints,
            magikPoints: this.magikPoints,
        })
    }
}
