import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IActiveUser } from 'src/auth/interfaces/activeuser.interface';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { MetaOption } from 'src/metaoption/metaoption.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { UserService } from 'src/user/providers/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/createpost.dto';
import { GetPostsDto } from '../dto/getpost.dto';
import { UpdatePostDto } from '../dto/updatepost.dto';
import { Post } from '../post.entity';
import { CreatepostProvider } from './createpost.provider';

@Injectable()
export class PostService {
  constructor(
    private readonly userService: UserService,
    private readonly tagsService: TagsService,
    private readonly paginationProvider: PaginationProvider,
    private readonly createPostProvider: CreatepostProvider,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto, user: IActiveUser) {
    return this.createPostProvider.createPost(createPostDto, user);
  }

  public async findAll(getPostsDto: GetPostsDto): Promise<Paginated<Post>> {
    const posts = this.paginationProvider.paginateQuery(
      {
        limit: getPostsDto.limit,
        page: getPostsDto.page,
      },
      this.postRepository,
    );

    return posts;
  }

  public async update(updatePostDto: UpdatePostDto, id: number) {
    try {
      const tags = await this.tagsService.findMultiple(updatePostDto.tags);

      if (!tags || tags.length !== updatePostDto.tags.length) {
        throw new BadRequestException('Some/All tags do not exist.');
      }

      let post = await this.postRepository.findOneBy({
        id,
      });

      if (!post) {
        throw new BadRequestException('Post does not exist');
      }

      post.title = updatePostDto.title ?? post.title;
      post.type = updatePostDto.type ?? post.type;
      post.content = updatePostDto.content ?? post.content;
      post.status = updatePostDto.status ?? post.status;
      post.slug = updatePostDto.slug ?? post.slug;
      post.featuredImageUrl =
        updatePostDto.featuredImageUrl ?? post.featuredImageUrl;
      post.publishOn = updatePostDto.publishOn ?? post.publishOn;

      post.tags = tags;

      post = await this.postRepository.save(post);

      if (!post) {
        throw new BadRequestException('Failed to update post');
      }
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process request at the moment.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
  }

  public async delete(id: number) {
    try {
      await this.postRepository.delete(id);

      return { id: id };
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process request at the moment.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
  }
}
