import { Controller, Get, Param } from '@nestjs/common';
import { ParkingService } from './parking.service';

@Controller('parking-spots')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get()
  async getAvailableParkingSpots() {
    return this.parkingService.getAvailableParkingSpots();
  }

  @Get(':id/available-times')
  async getAvailableTimes(@Param('id') id: number) {
    return this.parkingService.getAvailableTimes(id);
  }
}
