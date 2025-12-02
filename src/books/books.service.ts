import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { convertBigIntToString } from '../utils/bigint.util';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; author_id: number }) {
    const result = await this.prisma.books.create({
      data,
    });
    return convertBigIntToString(result);
  }

  async findAll(filters: { author_id?: number; is_borrowed?: boolean }) {
    const result = await this.prisma.books.findMany({
      where: {
        author_id: filters.author_id,
        is_borrowed: filters.is_borrowed,
      },
      include: { Authors: true },
    });
    return convertBigIntToString(result);
  }

  async update(id: number, data: { title?: string; author_id?: number }) {
    const result = await this.prisma.books.update({
      where: { id },
      data,
    });
    return convertBigIntToString(result);
  }

  async delete(id: number) {
    const result = await this.prisma.books.delete({
      where: { id },
    });
    return convertBigIntToString(result);
  }
}
