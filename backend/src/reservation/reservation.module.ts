import { Module } from '@nestjs/common';
import { ReservationController } from '../reservation/reservation.controller';
import { ReservationService } from '../reservation/reservation.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ReservationController], // Импортируем правильный контроллер
  providers: [ReservationService, PrismaService],
})
export class AppModule {}
