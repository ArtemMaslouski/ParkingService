import { IsInt, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  userId: number;

  @IsInt()
  parkingSpotId: number;

  @IsDateString()
  reservedDate: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsOptional()
  @IsString()
  status?: string;
}
