import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(data: { title: string; author_id: number }) {
    return this.prisma.books.create({
      data,
    });
  }

  findAll(filters: { author_id?: number; is_borrowed?: boolean }) {
    return this.prisma.books.findMany({
      where: {
        author_id: filters.author_id,
        is_borrowed: filters.is_borrowed,
      },
      include: { Authors: true },
    });
  }

  update(id: number, data: { title?: string; author_id?: number }) {
    return this.prisma.books.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.books.delete({
      where: { id },
    });
  }
}
