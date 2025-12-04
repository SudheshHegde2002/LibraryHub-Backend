import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags ,ApiBody,ApiResponse, ApiOperation} from '@nestjs/swagger';

@ApiTags('Borrow')
@UseGuards(JwtAuthGuard)
@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @ApiOperation({ summary: 'Borrow a book' })
  @ApiResponse({ status: 201, description: 'The book has been successfully borrowed.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user_id: { type: 'number', example: 1 },
        book_id: { type: 'number', example: 1 },
      },
    },
  })
  @Post()
  borrow(@Body() body: { user_id: number; book_id: number }) {
    return this.borrowService.borrowBook(body.user_id, body.book_id);
  }

  @ApiOperation({ summary: 'Return a book' })
  @ApiResponse({ status: 200, description: 'The book has been successfully returned.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        book_id: { type: 'number', example: 1 },
      },
    },
  })
  @Post('return/:bookId')
  returnBook(@Param('bookId') bookId: string) {
    return this.borrowService.returnBook(Number(bookId));
  }

  @ApiOperation({ summary: 'Get all borrowed books for a user' })
  @ApiResponse({ status: 200, description: 'The books have been successfully retrieved.' })
  @Get('user/:userId')
  getUserBorrowed(@Param('userId') userId: string) {
    return this.borrowService.getUserBorrowedBooks(Number(userId));
  }
}
