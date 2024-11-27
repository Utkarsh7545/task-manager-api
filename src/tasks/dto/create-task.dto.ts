import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title',
    example: 'Nodejs'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description',
    example: 'Lecture  Nodejs'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Metadata',
    example: {'dueDate': '2024-12-20', 'priority': 'high'}
  })
  @IsObject()
  metadata: object;
}
