import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export interface Demo03Case01Model {
  text: string;
  value?: string;
}
export interface Demo03Case02Model {
  text: string;
  value?: string;
}
export interface Demo03Case03Model {
  text: string;
  value?: string;
}
export class Demo03Case09Model {
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  public readonly text: string;
  @IsString()
  @IsOptional()
  public readonly value: string;
}
