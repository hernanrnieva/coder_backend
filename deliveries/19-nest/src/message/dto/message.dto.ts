import { ApiProperty } from "@nestjs/swagger";

export class MessageDTO {
    @ApiProperty()
    readonly authorEmail: string;
    @ApiProperty()
    readonly date: string;
    @ApiProperty()
    readonly text: string;
}