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
  import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags,ApiBody } from '@nestjs/swagger';
  
  @ApiTags('Books')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
    @ApiOperation({ summary: 'Create a new book' })
    @ApiResponse({ status: 201, description: 'The book has been successfully created.' })
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Clean Code' },
          author_id: { type: 'number', example: 1 },
        },
      },
    })
    @Post()
    create(@Body() body: { title: string; author_id: number }) {
      return this.booksService.create(body);
    }
  
    @ApiOperation({ summary: 'Get all books' })
    @ApiResponse({ status: 200, description: 'The books have been successfully retrieved.' })
    @Get()
    @ApiQuery({ name: 'author_id', required: false })
    @ApiQuery({ name: 'is_borrowed', required: false })
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
  
    @ApiOperation({ summary: 'Update a book' })
    @ApiResponse({ status: 200, description: 'The book has been successfully updated.' })
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Clean Code New Edition' },
          author_id: { type: 'number', example: 1 },
        },
      },
    })
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() body: { title?: string; author_id?: number },
    ) {
      return this.booksService.update(Number(id), body);
    }
    
    @ApiOperation({ summary: 'Delete a book' })
    @ApiResponse({ status: 200, description: 'The book has been successfully deleted.' })
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.booksService.delete(Number(id));
    }
  }
  