import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsDto } from './dto/createmetaoptions.dto';
import { MetaoptionService } from './providers/metaoption.service';

@Controller('metaoption')
export class MetaoptionController {
  constructor(private readonly metaoptionService: MetaoptionService) {}

  @Post()
  public create(@Body() createMetaOptionsDto: MetaOptionsDto) {
    return this.metaoptionService.create(createMetaOptionsDto);
  }
}
