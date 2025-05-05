import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ParkingSpotController } from './parking/parking.controller';
import { ParkingSpotService } from './parking/parking.service';
import { ReservationController } from './reservation/reservation.controller';
import { ReservationService } from './reservation/reservation.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [AuthController, ParkingSpotController, ReservationController],
  providers: [
    AuthService,
    ParkingSpotService,
    ReservationService,
    PrismaService,
  ],
})
export class AppModule {}
