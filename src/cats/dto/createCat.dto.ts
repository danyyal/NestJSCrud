import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  breed: string;
}

export class UpdateCatDto {
  name: string;
  age: number;
  breed: string;
}
