import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParkingService {
  constructor(private prisma: PrismaService) {}

  async getAvailableParkingSpots() {
    return this.prisma.parkingSpot.findMany({
      where: { reservations: { none: {} } },
    });
  }

  async getAvailableTimes(parkingSpotId: number) {
    return this.prisma.availableTime.findMany({
      where: { parkingSpotId },
    });
  }
}
