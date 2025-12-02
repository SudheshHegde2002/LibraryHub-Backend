import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { UsersModule } from './users/users.module';
import { BorrowModule } from './borrow/borrow.module';


@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }), AuthModule, BooksModule, AuthorsModule, UsersModule, BorrowModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
