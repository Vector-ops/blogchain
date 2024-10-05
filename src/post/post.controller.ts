import { Controller } from '@nestjs/common';
import { PostService } from './providers/post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
}
