import { ApiProperty } from "@nestjs/swagger";

export class CarDTO {
  @ApiProperty()
  readonly brand: string;
  @ApiProperty()
  readonly model: string;
  @ApiProperty()
  readonly year: number;
}