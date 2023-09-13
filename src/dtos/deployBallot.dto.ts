import { ArrayMinSize, ArrayUnique } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeployBallotDto {
  @ApiProperty()
  @ArrayMinSize(2)
  @ArrayUnique()
  proposals: string[];
}