import { v4 } from "uuid";
import Character from "../../domain/character/character";
import ICharacterWriteRepository from "./interfaces/ICharacterWriteRepository";
import IPlayerReadRepository from "./interfaces/IPlayerReadRepository";
import IPlayerWriteRepository from "./interfaces/IPlayerWriteRepository";
import CreateCharacterCommand from "./types/createCharacterCommand";

export default class CreateCharacter {
  private characterWriteRepository: ICharacterWriteRepository;
  private playerWriteRepository: IPlayerWriteRepository;
  private playerReadRepository: IPlayerReadRepository;

  constructor(
    characterWriteRepository: ICharacterWriteRepository,
    playerWriteRepository: IPlayerWriteRepository,
    playerReadRepository: IPlayerReadRepository
  ) {
    this.characterWriteRepository = characterWriteRepository;
    this.playerWriteRepository = playerWriteRepository;
    this.playerReadRepository = playerReadRepository;
  }

  async execute(command: CreateCharacterCommand): Promise<Character> {
    const newCharacter = new Character({
      id: v4(),
      name: command.name,
      playerId: command.playerId,
    });

    newCharacter.applySkillsPoints(
      command.healthPoints,
      command.attackPoints,
      command.defensePoints,
      command.magikPoints
    );

    const player = await this.playerReadRepository.read(command.playerId);
    player.canCreateCharacter(newCharacter);

    await this.characterWriteRepository.create(newCharacter.toDto());
    player.addCharacter(newCharacter);
    this.playerWriteRepository.update(player.toDto());
    return newCharacter;
  }
}
