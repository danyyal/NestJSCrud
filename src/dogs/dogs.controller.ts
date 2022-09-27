import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { ForbiddenException } from '@nestjs/common';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsServices: DogsService) {}

  @Get('come-here')
  @HttpCode(200)
  callDog(): string {
    return 'Dog is coming';
  }

  @Get('bark')
  @HttpCode(200)
  makeBark(): string {
    return this.dogsServices.bark();
  }

  @Get('check-error-filters')
  async findAll() {
    //this will send the message 'unidentified' with error and status defined in the Class
    throw new ForbiddenException('unidentified');

    //this will send the message unidentified with error 'contact admin' and status defined in the Class
    // throw new ForbiddenException('unidentified', 'contact admin');

    //this will send status and error defined in the Class
    // throw new ForbiddenException();
  }

  @Get(':id')
  @HttpCode(200)
  getDog(
    // @Param() params,
    @Param('id', ParseIntPipe) id: string,
  ): object {
    return { message: 'getting the dog with ID ' + id, status: 200 };
  }

  @Post()
  @HttpCode(201)
  sleepNow(): string {
    return this.dogsServices.run();
  }
}
