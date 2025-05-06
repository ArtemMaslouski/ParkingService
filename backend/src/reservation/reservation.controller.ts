import { Controller, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';
//import { CreateReservationDto } from '../reservation/dto/create-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // @Post()
  // async create(@Body() createReservationDto: CreateReservationDto) {
  //   return this.reservationService.create(createReservationDto);
  // }

  // @Get(':userId')
  // async getReservations(@Param('userId') userId: number) {
  //   return this.reservationService.getReservations(userId);
  // }

  // @Delete(':reservationId')
  // async cancelReservation(@Param('reservationId') reservationId: number) {
  //   return this.reservationService.cancelReservation(reservationId);
  // }
}
