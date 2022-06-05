import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetArticleFilterDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;
}
