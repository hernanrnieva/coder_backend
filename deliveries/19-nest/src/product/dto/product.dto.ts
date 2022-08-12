import { ApiProperty } from "@nestjs/swagger";

export class ProductDTO {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly price: number;
  @ApiProperty()
  readonly thumbnail: string;
}