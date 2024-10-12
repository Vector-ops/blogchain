import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaoptionController } from './metaoption.controller';
import { MetaOption } from './metaoption.entity';
import { MetaoptionService } from './providers/metaoption.service';

@Module({
  controllers: [MetaoptionController],
  imports: [TypeOrmModule.forFeature([MetaOption])],
  providers: [MetaoptionService],
})
export class MetaoptionModule {}
