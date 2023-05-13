import "reflect-metadata";
import { v4 } from "uuid";
import container from "../../app/configuration/DI/containers";
import CreateCharacter from "../../app/core/useCases/character/createCharacter";
import CreateCharacterCommand from "../../app/core/useCases/character/types/createCharacterCommand";
import PlayerDto from "../../app/core/domain/player/dto/player";
import InMemoryCharacterReadRepository from "../../app/adapters/secondary/inMemory/inMemoryCharacterReadRepository";
import InMemoryCharacterWriteRepository from "../../app/adapters/secondary/inMemory/inMemoryCharacterWriteRepository";
import InMemoryPlayerReadRepository from "../../app/adapters/secondary/inMemory/inMemoryPlayerReadRepository";
import InMemoryPlayerWriteRepository from "../../app/adapters/secondary/inMemory/inMemoryPlayerWriteRepository";
import CharacterLimitException from "../../app/core/exceptions/characterLimitException";

describe("Create character", () => {
  const inMemoryCharacterReadRepository: InMemoryCharacterReadRepository =
    container.get("characterReadRepository");
  const inMemoryCharacterWriteRepository: InMemoryCharacterWriteRepository =
    container.get("characterWriteRepository");
  const inMemoryPlayerReadRepository: InMemoryPlayerReadRepository =
    container.get("playerReadRepository");
  const inMemoryPlayerWriteRepository: InMemoryPlayerWriteRepository =
    container.get("playerWriteRepository");

  const playerId = v4();
  const playerDto: PlayerDto = {
    id: playerId,
    characters: [],
  };
  inMemoryPlayerWriteRepository.create(playerDto);

  test("a new character should be level 1, rank 1 and have 12 SP, 10 HP, 0 AP, 0 DP, 0 MP", async () => {
    const expectedCharacter = {
      playerId: playerId,
      name: "Lyanna Mormont",
      rank: 1,
      level: 1,
      skillPoints: 12,
      healthPoints: 10,
      defensePoints: 0,
      attackPoints: 0,
      magikPoints: 0,
    };

    const characterCommand: CreateCharacterCommand = {
      playerId,
      name: "Lyanna Mormont",
      healthPoints: 10,
      defensePoints: 0,
      attackPoints: 0,
      magikPoints: 0,
    };

    const createCharacterUseCase = new CreateCharacter(
      inMemoryCharacterWriteRepository,
      inMemoryPlayerWriteRepository,
      inMemoryPlayerReadRepository
    );

    const createdCharacter = await createCharacterUseCase.execute(
      characterCommand
    );

    const newCharacter = await inMemoryCharacterReadRepository.read(
      createdCharacter.toDto().id
    );

    expect({
      ...expectedCharacter,
      id: createdCharacter.toDto().id,
    }).toEqual(createdCharacter);
    expect(newCharacter).toEqual(createdCharacter);
  });

  test("a new character with 11 HP and 1 AP, 1 DP and 1 MP should have 8 SP left", async () => {
    const expectedCharacter = {
      playerId,
      name: "Daenerys Targaryen",
      rank: 1,
      level: 1,
      skillPoints: 8,
      healthPoints: 11,
      defensePoints: 1,
      attackPoints: 1,
      magikPoints: 1,
    };

    const characterCommand: CreateCharacterCommand = {
      playerId,
      name: "Daenerys Targaryen",
      healthPoints: 11,
      defensePoints: 1,
      attackPoints: 1,
      magikPoints: 1,
    };

    const createCharacterUseCase = new CreateCharacter(
      inMemoryCharacterWriteRepository,
      inMemoryPlayerWriteRepository,
      inMemoryPlayerReadRepository
    );

    const createdCharacter = await createCharacterUseCase.execute(
      characterCommand
    );

    expect({
      ...expectedCharacter,
      id: createdCharacter.toDto().id,
    }).toEqual(createdCharacter);
  });

  test("a new character with 11 HP and 8 AP should have 1 SP left", async () => {
    const expectedCharacter = {
      playerId,
      name: "Robert Baratheon",
      rank: 1,
      level: 1,
      skillPoints: 1,
      healthPoints: 11,
      defensePoints: 0,
      attackPoints: 8,
      magikPoints: 0,
    };

    const characterCommand: CreateCharacterCommand = {
      playerId,
      name: "Robert Baratheon",
      healthPoints: 11,
      defensePoints: 0,
      attackPoints: 8,
      magikPoints: 0,
    };

    const createCharacterUseCase = new CreateCharacter(
      inMemoryCharacterWriteRepository,
      inMemoryPlayerWriteRepository,
      inMemoryPlayerReadRepository
    );

    const createdCharacter = await createCharacterUseCase.execute(
      characterCommand
    );

    expect({
      ...expectedCharacter,
      id: createdCharacter.toDto().id,
    }).toEqual(createdCharacter);
  });

  test("When I try to create an eleventh character, I receive an error message", async () => {
    const characterCommand: CreateCharacterCommand = {
      playerId,
      name: "Multifaced Arya Stark",
      healthPoints: 11,
      defensePoints: 1,
      attackPoints: 1,
      magikPoints: 1,
    };

    const insertElevenCharcters = async () => {
      for (let index = 0; index < 12; index++) {
        const createCharacterUseCase = new CreateCharacter(
          inMemoryCharacterWriteRepository,
          inMemoryPlayerWriteRepository,
          inMemoryPlayerReadRepository
        );

        await createCharacterUseCase.execute({
          ...characterCommand,
          name: `${characterCommand.name} ${index}`,
        });
      }
    };

    await expect(insertElevenCharcters).rejects.toThrow(
      CharacterLimitException
    );
  });
});
