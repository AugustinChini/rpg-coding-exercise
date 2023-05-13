import CharacterDto from "../../../core/domain/character/dto/characterDto";
import ICharacterWriteRepository from "../../../core/useCases/character/interfaces/ICharacterWriteRepository";
import InMemoryUnitOfWork from "../inMemory/inMemoryUnitOfWork";

export default class InMemoryCharacterWriteRepository
  implements ICharacterWriteRepository
{
  constructor(private unitOfWork: InMemoryUnitOfWork) {}
  /**
   * Create a new caracter
   * @param character New character
   * @returns {Promise<void>}
   */
  public create(character: CharacterDto): Promise<void> {
    this.unitOfWork.characters.push(character);
    return Promise.resolve();
  }
}
