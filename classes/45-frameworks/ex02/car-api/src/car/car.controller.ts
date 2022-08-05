import { Body, Controller, Get, Post } from '@nestjs/common';
import { CarService } from './car.service';
import { CarDTO } from './dto/car.dto';

@Controller('car')
export class CarController {
    constructor(private readonly carService: CarService) {};

    @Post()
    saveCars(@Body() car: CarDTO): string {
        this.carService.saveCar(car);
        return 'Saved';
    }

    @Get()
    getCars(): CarDTO[] {
        return this.carService.getCarts();
    }

}
