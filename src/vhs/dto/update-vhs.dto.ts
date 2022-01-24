import { PartialType } from '@nestjs/mapped-types';
import { CreateVhsDto } from './create-vhs.dto';

export class UpdateVhsDto extends PartialType(CreateVhsDto) {}
