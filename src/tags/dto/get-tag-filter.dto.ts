import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class GetTagFilterDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  tagname?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  date?: string;
}
