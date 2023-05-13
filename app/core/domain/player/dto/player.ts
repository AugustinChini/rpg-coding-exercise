import CharacterDto from "../../character/dto/characterDto"

type PlayerDto = {
    id: string
    characters: Array<CharacterDto>
}

export default PlayerDto
