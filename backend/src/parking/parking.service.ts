import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ParkingSpotService {
  constructor(private readonly prisma: PrismaService) {}

  async getAvailableTimes(
    parkingSpotId: number,
    date: string,
  ): Promise<string[]> {
    const day = new Date(date);
    const startOfDay = new Date(
      Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()),
    );
    const endOfDay = new Date(
      Date.UTC(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        23,
        59,
        59,
        999,
      ),
    );

    const reservations = await this.prisma.reservation.findMany({
      where: {
        parkingSpotId,
        reservedDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: 'booked',
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    const allSlots: string[] = [];
    for (let hour = 8; hour <= 20; hour++) {
      const slotStart = new Date(
        Date.UTC(
          day.getFullYear(),
          day.getMonth(),
          day.getDate(),
          hour,
          0,
          0,
          0,
        ),
      );
      allSlots.push(slotStart.toISOString());
    }

    const availableSlots = allSlots.filter((slot) => {
      const slotStart = new Date(slot);
      const slotEnd = new Date(slotStart);
      slotEnd.setHours(slotEnd.getHours() + 1);

      return !reservations.some(
        (r) =>
          r.startTime !== null &&
          r.endTime !== null &&
          r.startTime < slotEnd &&
          r.endTime > slotStart,
      );
    });

    return availableSlots;
  }

  async getMonthBusySlots(parkingSpotId: number, year: number, month: number) {
    const startOfMonth = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
    const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    const reservations = await this.prisma.reservation.findMany({
      where: {
        parkingSpotId,
        reservedDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        status: 'booked',
      },
      select: {
        reservedDate: true,
        startTime: true,
        endTime: true,
      },
    });

    const busySlotsByDate: { [date: string]: number[] } = {};

    reservations.forEach((r) => {
      if (!r.reservedDate || !r.startTime || !r.endTime) return;

      const dateKey = r.reservedDate.toISOString().slice(0, 10);
      const startHour = r.startTime.getHours();
      const endHour =
        r.endTime.getMinutes() > 0
          ? r.endTime.getHours()
          : r.endTime.getHours() - 1;

      for (let hour = startHour; hour <= endHour; hour++) {
        if (!busySlotsByDate[dateKey]) busySlotsByDate[dateKey] = [];
        if (!busySlotsByDate[dateKey].includes(hour)) {
          busySlotsByDate[dateKey].push(hour);
        }
      }
    });

    Object.keys(busySlotsByDate).forEach((date) => {
      busySlotsByDate[date].sort((a, b) => a - b);
    });

    return busySlotsByDate;
  }

  async bookParkingSpot(dto: CreateReservationDto) {
    const overlapping = await this.prisma.reservation.findMany({
      where: {
        parkingSpotId: dto.parkingSpotId,
        reservedDate: new Date(dto.reservedDate),
        AND: [
          { startTime: { lt: new Date(dto.endTime) } },
          { endTime: { gt: new Date(dto.startTime) } },
        ],
        status: 'booked',
      },
    });

    if (overlapping.length > 0) {
      throw new Error('Место уже занято в этот интервал времени');
    }

    return this.prisma.reservation.create({
      data: {
        userId: dto.userId,
        parkingSpotId: dto.parkingSpotId,
        reservedDate: new Date(dto.reservedDate),
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        status: dto.status || 'booked',
      },
    });
  }

  async getAvailableSpots() {
    return this.prisma.parkingSpot.findMany();
  }

  async cancelReservation(reservationId: string): Promise<void> {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: Number(reservationId) },
    });

    if (!reservation) {
      throw new Error('Бронирование не найдено');
    }

    await this.prisma.reservation.update({
      where: { id: Number(reservationId) },
      data: { status: 'canceled' },
    });
  }
}
