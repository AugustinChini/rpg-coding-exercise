export default class CharacterNameAlreadyExistException extends Error {
    constructor() {
        super("Cannot use twice the same character name")
    }
}
