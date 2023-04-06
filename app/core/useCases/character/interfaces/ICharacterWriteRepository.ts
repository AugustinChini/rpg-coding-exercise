import CharacterDto from "../../../models/character/dto/characterDto"

export default interface ICharacterWriteRepository {
    create: (characterDto: CharacterDto) => Promise<void>
}
