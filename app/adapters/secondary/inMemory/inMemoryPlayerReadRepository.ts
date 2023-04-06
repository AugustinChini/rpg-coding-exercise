import Player from "../../../core/models/player/player"
import IPlayerReadRepository from "../../../core/useCases/character/interfaces/IPlayerReadRepository"
import PlayerNotFoundExecption from "../../../core/exceptions/playerNotFoundExeception"
import InMemoryUnitOfWork from "./inMemoryUnitOfWork"

export default class InMemoryPlayerReadRepository
    implements IPlayerReadRepository
{
    constructor(private unitOfWork: InMemoryUnitOfWork) {}

    /**
     * Return a player by id
     * @param id player id
     * @returns {Promise<PlayerDto>}
     */
    public read(id: string): Promise<Player> {
        const player = this.unitOfWork.players.find((p) => p.id === id)
        if (player) return Promise.resolve(new Player(player))
        throw new PlayerNotFoundExecption()
    }
}
