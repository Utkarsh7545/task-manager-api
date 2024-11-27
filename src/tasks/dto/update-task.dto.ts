import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Title',
    example: 'Nodejs'
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Description',
    example: 'Lecture  Nodejs'
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Metadata',
    example: {'dueDate': '2024-12-20', 'priority': 'high'}
  })
  @IsObject()
  @IsOptional()
  metadata?: object;
}
