import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  @IsArray()
  tags: string[];
}
