import "reflect-metadata"
import * as dotenv from "dotenv"
import { env } from "process"
import server from "./server"
import container from "./configuration/DI/containers"
import ICharacterWriteRepository from "./core/useCases/character/interfaces/ICharacterWriteRepository"
import CharacterRouter from "./adapters/primary/express/character"
import CreateCharacter from "./core/useCases/character/createCharacter"
import IPlayerReadRepository from "./core/useCases/character/interfaces/IPlayerReadRepository"
import IPlayerWriteRepository from "./core/useCases/character/interfaces/IPlayerWriteRepository"

dotenv.config()
if (env.PORT) {
    const characterWriteRepository: ICharacterWriteRepository = container.get(
        "characterWriteRepository"
    )
    const playerWriteRepository: IPlayerWriteRepository = container.get(
        "playerWriteRepository"
    )
    const playerReadRepository: IPlayerReadRepository = container.get(
        "playerReadRepository"
    )

    const characterMiddleware = CharacterRouter(
        new CreateCharacter(
            characterWriteRepository,
            playerWriteRepository,
            playerReadRepository
        )
    )

    server.use("/character", characterMiddleware)

    server.listen(env.PORT, () => {
        console.log(`Running on port ${env.PORT}`)
    })
} else {
    console.error("Missing env variables")
}
