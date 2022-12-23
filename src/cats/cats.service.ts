import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateCatDto } from './dto/createCat.dto';
@Injectable()
export class CatsService {
  meow(): string {
    return 'Meow';
  }
  sleep(): string {
    return 'sleeping';
  }
  createCat(catObj: CreateCatDto) {
    return {
      ...catObj,
      status: HttpStatus.CREATED,
      message: 'successfully created',
    };
  }
}
