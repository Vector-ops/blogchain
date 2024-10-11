import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from './providers/tags.service';
import { TagsController } from './tags.controller';
import { Tag } from './tags.entity';

@Module({
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
