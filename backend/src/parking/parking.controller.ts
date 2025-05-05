// parking-spot.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ParkingSpotService } from './parking.service';

@Controller('api/parking-spots')
export class ParkingSpotController {
  constructor(private readonly parkingSpotService: ParkingSpotService) {}

  // GET /api/parking-spots/:id/available-times?date=2025-05-06
  @Get(':id/available-times')
  async getAvailableTimes(
    @Param('id') id: string,
    @Query('date') date: string,
  ) {
    return await this.parkingSpotService.getAvailableTimes(Number(id), date);
  }
}
