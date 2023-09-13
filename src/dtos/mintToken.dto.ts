import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MintTokensDto {
  @ApiProperty()
  @IsNotEmpty()
  address: string;
}