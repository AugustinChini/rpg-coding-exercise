import express, { Request, Response } from "express"
import CreateCharacter from "../../../core/useCases/character/createCharacter"

const CharacterRouter = (createCharacterUseCase: CreateCharacter) => {
    const router = express.Router()
    /** Create */
    router.post("/", async (req: Request, res: Response) => {
        try {
            await createCharacterUseCase.execute(req.body)
            res.status(204).send()
        } catch (err: any) {
            res.status(500).send(err?.message || "Unexpected error")
        }
    })

    return router
}

export default CharacterRouter
