import Character from "../../../models/character/character"

export default interface ICharacterWriteRepository {
    read: (id: string) => Promise<Character>
}
