import { Module } from '@nestjs/common';
import { ParkingSpotService } from './parking.service';
import { ParkingSpotController } from './parking.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ParkingSpotController],
  providers: [ParkingSpotService, PrismaService],
})
export class ParkingModule {}
