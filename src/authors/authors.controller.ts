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
  import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
  
  @ApiTags('Authors')
  @UseGuards(JwtAuthGuard)
  @Controller('authors')
  export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) {}
  
    @ApiOperation({ summary: 'Create a new author' })
    @ApiResponse({ status: 201, description: 'The author has been successfully created.' })
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'John Doe' },
        },
      },
    })
    @Post()
    create(@Body() body: { name: string }) {
      return this.authorsService.create(body);
    }
  
    @ApiOperation({ summary: 'Get all authors' })
    @ApiResponse({ status: 200, description: 'The authors have been successfully retrieved.' })
    @Get()
    findAll() {
      return this.authorsService.findAll();
    }
  
    @ApiOperation({ summary: 'Update an author' })
    @ApiResponse({ status: 200, description: 'The author has been successfully updated.' })
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Jane Doe' },
        },
      },
    })
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() body: { name?: string },
    ) {
      return this.authorsService.update(Number(id), body);
    }
  
    @ApiOperation({ summary: 'Delete an author' })
    @ApiResponse({ status: 200, description: 'The author has been successfully deleted.' })
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.authorsService.delete(Number(id));
    }
  }
  