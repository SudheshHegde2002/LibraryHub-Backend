import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { BooksService } from './books.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @UseGuards(JwtAuthGuard)
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
  
    @Post()
    create(@Body() body: { title: string; author_id: number }) {
      return this.booksService.create(body);
    }
  
    @Get()
    findAll(
      @Query('author_id') author_id?: string,
      @Query('is_borrowed') is_borrowed?: string,
    ) {
      return this.booksService.findAll({
        author_id: author_id ? Number(author_id) : undefined,
        is_borrowed:
          is_borrowed !== undefined ? is_borrowed === 'true' : undefined,
      });
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() body: { title?: string; author_id?: number },
    ) {
      return this.booksService.update(Number(id), body);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.booksService.delete(Number(id));
    }
  }
  