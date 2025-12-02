import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { AuthorsService } from './authors.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Authors')
  @UseGuards(JwtAuthGuard)
  @Controller('authors')
  export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) {}
  
    @Post()
    create(@Body() body: { name: string }) {
      return this.authorsService.create(body);
    }
  
    @Get()
    findAll() {
      return this.authorsService.findAll();
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() body: { name?: string },
    ) {
      return this.authorsService.update(Number(id), body);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.authorsService.delete(Number(id));
    }
  }
  