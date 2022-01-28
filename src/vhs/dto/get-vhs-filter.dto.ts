import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetVhsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isAvailable: boolean;
}
