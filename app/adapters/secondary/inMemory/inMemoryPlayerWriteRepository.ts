import PlayerDto from "../../../core/domain/player/dto/player";
import IPlayerWriteRepository from "../../../core/useCases/character/interfaces/IPlayerWriteRepository";
import InMemoryUnitOfWork from "./inMemoryUnitOfWork";

export default class InMemoryPlayerWriteRepository
  implements IPlayerWriteRepository
{
  constructor(private unitOfWork: InMemoryUnitOfWork) {}

  /**
   * Create a player
   * @param player player dto
   * @returns {Promise<void>}
   */
  public create(player: PlayerDto): Promise<void> {
    this.unitOfWork.players.push(player);
    return Promise.resolve();
  }

  /**
   * Update a player
   * @param player player dto
   * @returns {Promise<void>}
   */
  public update(player: PlayerDto): Promise<void> {
    this.unitOfWork.players = this.unitOfWork.players.map((currentPlayer) => {
      return currentPlayer.id === player.id ? player : currentPlayer;
    });
    return Promise.resolve();
  }
}
