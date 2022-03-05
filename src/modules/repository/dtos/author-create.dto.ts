import { ApiProperty } from '@nestjs/swagger';

export class AuthorCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  secondLastName: string;

  @ApiProperty()
  biography: string;

  @ApiProperty()
  photoPath: string;
}
