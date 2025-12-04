import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Users')
  @UseGuards(JwtAuthGuard)
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'john.doe@example.com' },
        },
      },
    })
    @Post()
    create(@Body() body: { name: string; email: string }) {
      return this.usersService.create(body);
    }
  
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'The users have been successfully retrieved.' })
    @Get()
    findAll() {
      return this.usersService.findAll();
    }
  }
  