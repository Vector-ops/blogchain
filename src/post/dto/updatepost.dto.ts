import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './createpost.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
