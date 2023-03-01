import { IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateOrdersDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsPhoneNumber('US')
  phoneNumber: string;
}
