import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class TestBodyDto {
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  public readonly title: string;
  @IsString()
  @IsOptional()
  public readonly description?: string;
}
