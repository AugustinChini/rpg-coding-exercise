import CharacterLimitException from "../../exceptions/characterLimitException"
import CharacterNameAlreadyExistException from "../../exceptions/characterNameAlreadyExistException"
import Character from "../character/character"
import PlayerDto from "./dto/player"

export default class Player {
    private id: string
    private characters: Array<Character>

    public constructor(player: PlayerDto) {
        this.id = player.id
        this.characters = player.characters.map((cDto) => new Character(cDto))
    }

    public canCreateCharacter(newCharacter: Character): void {
        if (this.characters.length >= 10) {
            throw new CharacterLimitException()
        } else if (
            this.characters.find(
                (c) => c.toDto().name === newCharacter.toDto().name
            )
        ) {
            throw new CharacterNameAlreadyExistException()
        }
    }

    public addCharacter(newCharacter: Character): void {
        this.characters.push(newCharacter)
    }

    toDto(): PlayerDto {
        return Object.freeze({
            id: this.id,
            characters: this.characters.map((c) => c.toDto()),
        })
    }
}
