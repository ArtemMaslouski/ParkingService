import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParkingSpotService {
  constructor(private readonly prisma: PrismaService) {}

  async getAvailableTimes(parkingSpotId: number, date: string) {
    const allTimes = await this.prisma.availableTime.findMany({
      where: { parkingSpotId },
      select: { id: true, time: true },
    });

    const startDate = new Date(`${date}T00:00:00`);
    const endDate = new Date(`${date}T23:59:59`);

    const reservedTimes: { reservedAt: Date }[] =
      await this.prisma.reservation.findMany({
        where: {
          parkingSpotId,
          reservedAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: { reservedAt: true },
      });

    const reservedTimeSet = new Set(
      reservedTimes.map((r) => {
        const hours = r.reservedAt.getHours().toString().padStart(2, '0');
        const minutes = r.reservedAt.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      }),
    );

    return allTimes.filter(
      (t) => !reservedTimeSet.has(t.time.toISOString().slice(11, 16)),
    );
  }
}
