import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from '../reservation/dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto) {
    const { userId, parkingSpotId, reservedAt } = createReservationDto;
    return this.prisma.reservation.create({
      data: {
        userId,
        parkingSpotId,
        reservedAt,
      },
    });
  }

  async getReservations(userId: number) {
    return this.prisma.reservation.findMany({
      where: { userId },
    });
  }

  async cancelReservation(reservationId: number) {
    return this.prisma.reservation.delete({
      where: { id: reservationId },
    });
  }
}
