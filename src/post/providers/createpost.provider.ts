import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IActiveUser } from 'src/auth/interfaces/activeuser.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { TagsService } from 'src/tags/providers/tags.service';
import { Tag } from 'src/tags/tags.entity';
import { UserService } from 'src/user/providers/user.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/createpost.dto';
import { Post } from '../post.entity';

@Injectable()
export class CreatepostProvider {
  constructor(
    private readonly userService: UserService,
    private readonly tagsService: TagsService,
    private readonly paginationProvider: PaginationProvider,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public async createPost(createPostDto: CreatePostDto, user: IActiveUser) {
    let author: User = undefined;
    let tags: Tag[] = undefined;

    try {
      author = await this.userService.findOneById(user.sub);

      tags = await this.tagsService.findMultiple(createPostDto.tags);
    } catch (error) {
      throw new ConflictException(error);
    }

    if (createPostDto.tags.length !== tags.length) {
      throw new BadRequestException('Please check your tag ids');
    }

    let post = this.postRepository.create({
      ...createPostDto,
      tags,
      author: author,
    });

    try {
      return await this.postRepository.save(post);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
