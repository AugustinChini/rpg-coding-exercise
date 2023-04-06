export default class CharacterNameTooLongException extends Error {
    constructor() {
        super("A character's name maximum length is 25 characters")
    }
}
