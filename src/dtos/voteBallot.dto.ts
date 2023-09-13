import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VoteBallotDto {
  @ApiProperty()
  @IsNotEmpty()
  ballotAddress: string;
  @ApiProperty()
  @IsNumberString()
  proposalNumber: number;
  @ApiProperty()
  @IsNumberString()
  amountOfVotes: number;
}