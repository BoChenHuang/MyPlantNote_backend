import { PickType, PartialType } from "@nestjs/swagger";
import { CreatePlantDto } from "./create-plant.dto";
  
export class UpdatePlantDto extends PartialType(PickType(CreatePlantDto, ['name','description'] as const)) {
}