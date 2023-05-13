import Player from "../../../domain/player/player";

export default interface IPlayerReadRepository {
  read: (id: string) => Promise<Player>;
}
