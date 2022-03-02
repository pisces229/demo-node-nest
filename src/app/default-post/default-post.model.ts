import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export interface DefaultPostCase01Model {
  text: string;
  value?: string;
}
export interface DefaultPostCase02Model {
  text: string;
  value?: string;
}
export interface DefaultPostCase03Model {
  text: string;
  value?: string;
}
export class DefaultPostCase09Model {
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  public readonly text: string;
  @IsString()
  @IsOptional()
  public readonly value: string;
}
