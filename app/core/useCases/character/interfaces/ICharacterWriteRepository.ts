import CharacterDto from "../../../domain/character/dto/characterDto";

export default interface ICharacterWriteRepository {
  create: (characterDto: CharacterDto) => Promise<void>;
}
