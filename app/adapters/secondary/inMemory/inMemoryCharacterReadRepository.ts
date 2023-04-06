import CharacterNotFoundExecption from "../../../core/exceptions/characterNotFoundExeception"
import Character from "../../../core/models/character/character"
import ICharacterReadRepository from "../../../core/useCases/character/interfaces/ICharacterReadRepository"
import InMemoryUnitOfWork from "../inMemory/inMemoryUnitOfWork"

export default class InMemoryCharacterReadRepository
    implements ICharacterReadRepository
{
    constructor(private unitOfWork: InMemoryUnitOfWork) {}

    /**
     * Get a caracter by id
     * @param id character id
     * @returns {Promise<void>}
     */
    public read(id: string): Promise<Character> {
        const character = this.unitOfWork.characters.find((c) => c.id === id)
        if (character) return Promise.resolve(new Character(character))
        throw new CharacterNotFoundExecption()
    }
}
