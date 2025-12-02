import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  private convertBigIntToString(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }
    if (typeof obj === 'bigint') {
      return obj.toString();
    }
    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertBigIntToString(item));
    }
    if (typeof obj === 'object') {
      const converted: any = {};
      for (const key in obj) {
        converted[key] = this.convertBigIntToString(obj[key]);
      }
      return converted;
    }
    return obj;
  }

  async create(data: { title: string; author_id: number }) {
    const result = await this.prisma.books.create({
      data,
    });
    return this.convertBigIntToString(result);
  }

  async findAll(filters: { author_id?: number; is_borrowed?: boolean }) {
    const result = await this.prisma.books.findMany({
      where: {
        author_id: filters.author_id,
        is_borrowed: filters.is_borrowed,
      },
      include: { Authors: true },
    });
    return this.convertBigIntToString(result);
  }

  async update(id: number, data: { title?: string; author_id?: number }) {
    const result = await this.prisma.books.update({
      where: { id },
      data,
    });
    return this.convertBigIntToString(result);
  }

  async delete(id: number) {
    const result = await this.prisma.books.delete({
      where: { id },
    });
    return this.convertBigIntToString(result);
  }
}
