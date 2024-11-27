import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

// @ApiTags('Task')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Created Tasks'
  })
  @Post()
  createTask(@Request() req, @Body() body: CreateTaskDto) {
    return this.tasksService.createTask(req.user.userId, body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Get All Tasks'
  })
  @Get()
  getTasks(@Request() req) {
    return this.tasksService.getTasks(req.user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Get Task By Id'
  })
  @Get(':id')
  getTaskById(@Request() req, @Param('id') id: string) {
    return this.tasksService.getTaskById(req.user.userId, id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Update Task'
  })
  @Patch(':id')
  updateTask(@Request() req, @Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.tasksService.updateTask(req.user.userId, id, body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Delete Task'
  })
  @Delete(':id')
  deleteTask(@Request() req, @Param('id') id: string) {
    return this.tasksService.deleteTask(req.user.userId, id);
  }
}
