/* eslint-disable import/extensions */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

// @ApiTags('Task')
@Controller('tasks')
export class TasksController {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private readonly tasksService: TasksService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a task' })
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Created Tasks',
  })
  @Post()
  createTask(@Request() req, @Body() body: CreateTaskDto) {
    return this.tasksService.createTask(req.user.userId, body);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all tasks' })
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Get All Tasks',
  })
  @Get()
  getTasks(@Request() req) {
    return this.tasksService.getTasks(req.user.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a task by id' })
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Get Task By Id',
  })
  @Get(':id')
  getTaskById(@Request() req, @Param('id') id: string) {
    return this.tasksService.getTaskById(req.user.userId, id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a task' })
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Update Task',
  })
  @Patch(':id')
  updateTask(
    @Request() req,
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(req.user.userId, id, body);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a task' })
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Delete Task',
  })
  @Delete(':id')
  deleteTask(@Request() req, @Param('id') id: string) {
    return this.tasksService.deleteTask(req.user.userId, id);
  }
}
