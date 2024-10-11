import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/createpost.dto';
import { UpdatePostDto } from './dto/updatepost.dto';
import { UpdatePostParamDto } from './dto/updatepostparam.dto';
import { PostService } from './providers/post.service';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 if your post is created successfully',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({
    summary: 'Update blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 if your post is updated successfully',
  })
  @Patch('/:id')
  public updatePost(
    @Param() updatePostParam: UpdatePostParamDto,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(updatePostDto, updatePostParam.id);
  }

  @Get()
  public findAll() {
    return this.postService.findAll();
  }

  @Delete('/:id')
  public deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
