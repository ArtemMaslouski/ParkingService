import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { ParkingSpotService } from './parking.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Parking Spots')
@Controller('api')
export class ParkingSpotController {
  constructor(private readonly parkingSpotService: ParkingSpotService) {}

  @Get('/parking-spots')
  @ApiOperation({ summary: 'Get all available parking spots' })
  @ApiResponse({ status: 200, description: 'List of available parking spots' })
  async getParkingSpots() {
    return await this.parkingSpotService.getAvailableSpots();
  }

  @Get('/parking-spots/:parkingSpotId/available-times')
  @ApiOperation({
    summary: 'Get available times for a parking spot on a specific date',
  })
  @ApiParam({
    name: 'parkingSpotId',
    description: 'The ID of the parking spot',
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'The date to check availability for',
  })
  @ApiResponse({
    status: 200,
    description: 'Available times for the parking spot',
  })
  async availableTimes(
    @Param('parkingSpotId') parkingSpotId: string,
    @Query('date') date: string,
  ) {
    const dateString = date ?? new Date().toISOString().split('T')[0];
    return await this.parkingSpotService.getAvailableTimes(
      Number(parkingSpotId),
      dateString,
    );
  }

  @Post('/reservations')
  @ApiOperation({ summary: 'Create a new parking spot reservation' })
  @ApiBody({ type: CreateReservationDto })
  @ApiResponse({ status: 201, description: 'Reservation created successfully' })
  async createReservation(@Body() dto: CreateReservationDto) {
    return await this.parkingSpotService.bookParkingSpot(dto);
  }

  @Delete('reservation/:id')
  @ApiOperation({ summary: 'Cancel a parking spot reservation' })
  @ApiParam({ name: 'id', description: 'The ID of the reservation to cancel' })
  @ApiResponse({
    status: 200,
    description: 'Reservation cancelled successfully',
  })
  async cancelReservation(
    @Param('id') reservationId: string,
  ): Promise<{ message: string }> {
    await this.parkingSpotService.cancelReservation(reservationId);
    return { message: 'Бронирование успешно отменено' };
  }
}
