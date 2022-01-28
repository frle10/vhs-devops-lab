import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental } from './entities/rental.entity';
import { GetRentalsFilterDto } from './dto/get-rentals-filter.dto';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  /**
   * Gets all rentals. It is possible to filter by user id.
   */
  @Get()
  getRentals(
    @Query(ValidationPipe) rentalFilterDto: GetRentalsFilterDto,
  ): Promise<Rental[]> {
    return this.rentalsService.getRentals(rentalFilterDto);
  }

  /**
   * Gets the rental with given id if it exists. If not, 404 is returned.
   */
  @Get(':id')
  getRentalById(@Param('id', ParseIntPipe) id: number): Promise<Rental> {
    return this.rentalsService.getRentalById(+id);
  }

  /**
   * Registers a new rental.
   */
  @Post()
  createRental(@Body() createRentalDto: CreateRentalDto): Promise<Rental> {
    return this.rentalsService.createRental(createRentalDto);
  }

  /**
   * Updates specified rental's data if it exists.
   */
  @Patch(':id')
  updateRental(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRentalDto: UpdateRentalDto,
  ): Promise<Rental> {
    return this.rentalsService.updateRental(+id, updateRentalDto);
  }

  /**
   * Deletes the rental with specified id if it exists.
   */
  @Delete(':id')
  @HttpCode(204)
  deleteRental(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.rentalsService.deleteRental(+id);
  }
}
