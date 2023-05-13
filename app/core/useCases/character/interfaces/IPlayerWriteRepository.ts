import PlayerDto from "../../../domain/player/dto/player";

export default interface IPlayerWriteRepository {
  create: (player: PlayerDto) => Promise<void>;
  update: (player: PlayerDto) => Promise<void>;
}
