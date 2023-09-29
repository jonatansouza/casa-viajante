import { IsNumber, IsString } from "class-validator";

export class ChargeDto {
  @IsString()
  card: string;

  @IsNumber()
  amount: number;
}