import Player from "../../../models/player/player"

export default interface IPlayerReadRepository {
    read: (id: string) => Promise<Player>
}
