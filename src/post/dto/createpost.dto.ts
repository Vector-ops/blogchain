import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
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
import { PostStatus } from '../enums/poststatus.enum';
import { PostType } from '../enums/posttype.enum';
import { MetaOptionsDto } from './metaoptions.dto';

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
    description: 'Tags for the blog post',
    example: ['nest', 'node'],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'Can be any string identifier for your meta option',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value that you want to add to the key',
          example: true,
        },
      },
    },
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MetaOptionsDto)
  metaOptions?: MetaOptionsDto[];
}
