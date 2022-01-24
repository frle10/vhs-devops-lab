import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateVhsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  @IsISO8601({ strict: true })
  releasedAt: Date;
}
