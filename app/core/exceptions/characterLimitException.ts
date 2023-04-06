export default class CharacterLimitException extends Error {
    constructor() {
        super("You've reached the limit of 10 characters per player")
    }
}
