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
import { AuthGuard } from '../auth/auth.guard';
import { TasksService } from './tasks.service';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Request() req, @Body() body: any) {
    return this.tasksService.createTask(req.user.userId, body);
  }

  @Get()
  getTasks(@Request() req) {
    return this.tasksService.getTasks(req.user.userId);
  }

  @Get(':id')
  getTaskById(@Request() req, @Param('id') id: string) {
    return this.tasksService.getTaskById(req.user.userId, id);
  }

  @Patch(':id')
  updateTask(
    @Request() req,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.tasksService.updateTask(req.user.userId, id, body);
  }

  @Delete(':id')
  deleteTask(@Request() req, @Param('id') id: string) {
    return this.tasksService.deleteTask(req.user.userId, id);
  }
}
