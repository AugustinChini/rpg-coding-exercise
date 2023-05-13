import Character from "../../../domain/character/character";

export default interface ICharacterWriteRepository {
  read: (id: string) => Promise<Character>;
}
