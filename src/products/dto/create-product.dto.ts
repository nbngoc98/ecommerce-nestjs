import { IsNotEmpty } from 'class-validator';
export class CreateProductDto {
  @IsNotEmpty()
  title: string;
  image: string;
  description: string;
  price: number;
}
