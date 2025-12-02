import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { convertBigIntToString } from '../utils/bigint.util';
@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}

  async borrowBook(user_id: number, book_id: number) {
    const book = await this.prisma.books.findUnique({
      where: { id: book_id },
    });

    if (!book) throw new BadRequestException('Book not found');
    if (book.is_borrowed)
      throw new BadRequestException('Book already borrowed');

    const borrow = await this.prisma.borrows.create({
      data: { user_id, book_id },
    });

    await this.prisma.books.update({
      where: { id: book_id },
      data: { is_borrowed: true },
    });

    return convertBigIntToString(borrow);
  }

  async returnBook(book_id: number) {
    const activeBorrow = await this.prisma.borrows.findFirst({
      where: {
        book_id,
        returned_at: null,
      },
    });

    if (!activeBorrow)
      throw new BadRequestException('No active borrow found');

    await this.prisma.borrows.update({
      where: { id: activeBorrow.id },
      data: { returned_at: new Date() },
    });

    await this.prisma.books.update({
      where: { id: book_id },
      data: { is_borrowed: false },
    });

    return convertBigIntToString({ message: 'Book returned successfully' });
  }

  async getUserBorrowedBooks(user_id: number) {
    const result = await this.prisma.borrows.findMany({
      where: {
        user_id,
        returned_at: null,
      },
      include: {
        Books: true,
      },
    });
    return convertBigIntToString(result);
  }
}
