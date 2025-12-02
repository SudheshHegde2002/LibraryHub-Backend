import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  create(data: { name: string }) {
    return this.prisma.authors.create({ data });
  }

  findAll() {
    return this.prisma.authors.findMany();
  }

  update(id: number, data: { name?: string }) {
    return this.prisma.authors.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.authors.delete({
      where: { id },
    });
  }
}
