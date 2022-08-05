import { Injectable } from '@nestjs/common';
import { CarDTO } from  './dto/car.dto'

@Injectable()
export class CarService {
    carList: CarDTO[] = [];

    saveCar(car: CarDTO) {
        this.carList.push(car);
    }

    getCarts(): CarDTO[] {
        return this.carList;
    }
}
