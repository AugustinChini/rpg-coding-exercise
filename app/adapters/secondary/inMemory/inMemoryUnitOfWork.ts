import InMemoryCharacter from "./types/inMemoryCharacter"
import InMemoryPlayer from "./types/inMemoryPlayer"

export default class InMemoryUnitOfWork {
    public players: InMemoryPlayer[] = []
    public characters: InMemoryCharacter[] = []
}
