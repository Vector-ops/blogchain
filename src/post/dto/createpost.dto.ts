import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Tag } from 'src/tags/tags.entity';
import { MetaOptionsDto } from '../../metaoption/dto/createmetaoptions.dto';
import { PostStatus } from '../enums/poststatus.enum';
import { PostType } from '../enums/posttype.enum';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title for the blog',
    example: "What's new in the world today?",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(512)
  title: string;

  @ApiProperty({
    description: 'Type of post [ "post", "page", "story", "series" ]',
    enum: PostType,
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  type: PostType;

  @ApiProperty({
    description: 'Example: "my-url"',
    example: 'new-in-world-today',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      "Slug should contain only small letters and uses only '-' and no spaces",
  })
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    description: '[ "draft", "review", "scheduled", "published" ]',
    enum: PostStatus,
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiPropertyOptional({
    description: 'Content of the post',
    example: 'Skibidi Bop',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'Serialized JSON only',
    example:
      '{\r\n "@context":"https://schema.org",\r\n "@type": "Person"\r\n}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured Image url',
    example: 'https://random/image/200',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'Published on date',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'Tag ids for the blog post',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        metavalue: {
          type: 'json',
          description: 'The metavalue is a json string',
          example: '{"sidebarenabled":true}',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MetaOptionsDto)
  metaOptions?: MetaOptionsDto | null;

  @ApiProperty({
    type: 'integer',
    required: true,
    example: 3344,
  })
  @IsInt()
  @IsNotEmpty()
  authorId: number;
}
