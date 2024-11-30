/* eslint-disable class-methods-use-this */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiOperation({ summary: 'Root message' })
  @Get()
  root() {
    return { message: 'Welcome to the Task Manager API!' };
  }
}
