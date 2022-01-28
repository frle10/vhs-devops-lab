import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsISO8601,
  IsNumber,
} from 'class-validator';

export class UpdateVhsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsOptional()
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  releasedAt: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  rentalPrice: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  rentalDuration: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
