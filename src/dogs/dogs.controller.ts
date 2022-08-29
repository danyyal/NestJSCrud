import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DogsService } from './dogs.service';

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
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message.',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get(':id')
  @HttpCode(200)
  getDog(
    @Param() params,
    // @Param('id') id: string,
  ): object {
    return { message: 'getting the dog with ID ' + params.id, status: 200 };
  }

  @Post()
  @HttpCode(201)
  sleepNow(): string {
    return this.dogsServices.run();
  }
}
