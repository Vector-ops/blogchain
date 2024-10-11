import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/metaoption/metaoption.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { UserService } from 'src/user/providers/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/createpost.dto';
import { UpdatePostDto } from '../dto/updatepost.dto';
import { Post } from '../post.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly userService: UserService,
    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    const author = await this.userService.findOneById(createPostDto.authorId);
    const tags = await this.tagsService.findMultiple(createPostDto.tags);

    let post = this.postRepository.create({
      ...createPostDto,
      tags,
      author: author,
    });

    return await this.postRepository.save(post);
  }

  public async findAll() {
    let posts = await this.postRepository.find({
      relations: {
        tags: true,
      },
    });

    return posts;
  }

  public async update(updatePostDto: UpdatePostDto, id: number) {
    const tags = await this.tagsService.findMultiple(updatePostDto.tags);

    const post = await this.postRepository.findOneBy({
      id,
    });

    post.title = updatePostDto.title ?? post.title;
    post.type = updatePostDto.type ?? post.type;
    post.content = updatePostDto.content ?? post.content;
    post.status = updatePostDto.status ?? post.status;
    post.slug = updatePostDto.slug ?? post.slug;
    post.featuredImageUrl =
      updatePostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = updatePostDto.publishOn ?? post.publishOn;

    post.tags = tags;

    return await this.postRepository.save(post);
  }

  public async delete(id: number) {
    await this.postRepository.delete(id);

    return { id: id };
  }
}
