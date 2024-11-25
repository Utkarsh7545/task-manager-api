import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';

@Module({
  imports: [AuthModule, TasksModule],
  controllers: [AppController],
})
export class AppModule {}
