import { EditionCreateDto } from './edition-create.dto';
import { PartialType } from '@nestjs/swagger';

export class EditionUpdateDto extends PartialType(EditionCreateDto) {}
