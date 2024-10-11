import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dto/createtag.dto';
import { Tag } from '../tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    const tags = this.tagsRepository.create(createTagDto);

    return await this.tagsRepository.save(tags);
  }

  public async findMultiple(ids: number[]) {
    const results = await this.tagsRepository.find({
      where: {
        id: In(ids),
      },
    });

    return results;
  }

  public async delete(id: number) {
    await this.tagsRepository.delete(id);
    return {
      id,
    };
  }

  public async softDelete(id: number) {
    await this.tagsRepository.softDelete(id);
    return { id };
  }
}
