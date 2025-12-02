import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { convertBigIntToString } from '../utils/bigint.util';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string }) {
    const result = await this.prisma.authors.create({ data });
    return convertBigIntToString(result);
  }

  async findAll() {
    const result = await this.prisma.authors.findMany();
    return convertBigIntToString(result);
  }

  async update(id: number, data: { name?: string }) {
    const result = await this.prisma.authors.update({
      where: { id },
      data,
    });
    return convertBigIntToString(result);
  }

  async delete(id: number) {
    const result = await this.prisma.authors.delete({
      where: { id },
    });
    return convertBigIntToString(result);
  }
}
