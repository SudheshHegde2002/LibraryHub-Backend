import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @UseGuards(JwtAuthGuard)
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post()
    create(@Body() body: { name: string; email: string }) {
      return this.usersService.create(body);
    }
  
    @Get()
    findAll() {
      return this.usersService.findAll();
    }
  }
  