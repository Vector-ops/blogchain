import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdatePostParamDto {
  @ApiPropertyOptional({
    description: 'Post ID to update',
    example: 123,
  })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
