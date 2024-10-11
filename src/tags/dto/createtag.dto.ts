import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  name: string;

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;
}
