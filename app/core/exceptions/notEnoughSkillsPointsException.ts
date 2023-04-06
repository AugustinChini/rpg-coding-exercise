export default class NotEnoughSkillsPointsException extends Error {
    constructor() {
        super("Not enough skills points")
    }
}
