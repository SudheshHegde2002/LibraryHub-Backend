import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post()
  borrow(@Body() body: { user_id: number; book_id: number }) {
    return this.borrowService.borrowBook(body.user_id, body.book_id);
  }

  @Post('return/:bookId')
  returnBook(@Param('bookId') bookId: string) {
    return this.borrowService.returnBook(Number(bookId));
  }

  @Get('user/:userId')
  getUserBorrowed(@Param('userId') userId: string) {
    return this.borrowService.getUserBorrowedBooks(Number(userId));
  }
}
