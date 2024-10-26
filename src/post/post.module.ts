import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { MetaOption } from 'src/metaoption/metaoption.entity';
import { TagsModule } from 'src/tags/tags.module';
import { UserModule } from 'src/user/user.module';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './providers/post.service';
import { CreatepostProvider } from './providers/createpost.provider';

@Module({
  controllers: [PostController],
  providers: [PostService, CreatepostProvider],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Post, MetaOption]),
    TagsModule,
    PaginationModule,
  ],
})
export class PostModule {}
