import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOptionsDto } from '../dto/createmetaoptions.dto';
import { MetaOption } from '../metaoption.entity';

@Injectable()
export class MetaoptionService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaoptionRepository: Repository<MetaOption>,
  ) {}
  public async create(createMetaoptionDto: MetaOptionsDto) {
    let metaoption = this.metaoptionRepository.create(createMetaoptionDto);

    return await this.metaoptionRepository.save(metaoption);
  }
}
