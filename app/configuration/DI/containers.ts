import Container from "typedi"
import InMemoryCharacterReadRepository from "../../adapters/secondary/inMemory/inMemoryCharacterReadRepository"
import InMemoryCharacterWriteRepository from "../../adapters/secondary/inMemory/inMemoryCharacterWriteRepository"
import InMemoryPlayerReadRepository from "../../adapters/secondary/inMemory/inMemoryPlayerReadRepository"
import InMemoryPlayerWriteRepository from "../../adapters/secondary/inMemory/inMemoryPlayerWriteRepository"
import InMemoryUnitOfWork from "../../adapters/secondary/inMemory/inMemoryUnitOfWork"

const container = Container.of("main")

const inMemoryUnitOfWork = new InMemoryUnitOfWork()
container.set("inMemoryUnitOfWork", inMemoryUnitOfWork)

const characterReadRepository = new InMemoryCharacterReadRepository(
    container.get("inMemoryUnitOfWork")
)
const characterWriteRepository = new InMemoryCharacterWriteRepository(
    container.get("inMemoryUnitOfWork")
)
const playerReadRepository = new InMemoryPlayerReadRepository(
    container.get("inMemoryUnitOfWork")
)
const playerWriteRepository = new InMemoryPlayerWriteRepository(
    container.get("inMemoryUnitOfWork")
)

container.set("characterReadRepository", characterReadRepository)
container.set("characterWriteRepository", characterWriteRepository)
container.set("playerReadRepository", playerReadRepository)
container.set("playerWriteRepository", playerWriteRepository)

export default container
