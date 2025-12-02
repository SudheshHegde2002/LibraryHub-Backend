import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { convertBigIntToString } from '../utils/bigint.util';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; email: string }) {
    const result = await this.prisma.users.create({ data });
    return convertBigIntToString(result);
  }

  async findAll() {
    const result = await this.prisma.users.findMany();
    return convertBigIntToString(result);
  }
}
