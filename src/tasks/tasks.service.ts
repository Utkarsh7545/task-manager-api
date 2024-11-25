import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Pool } from 'pg';
import { DatabaseConfig } from '../config/database.config';

@Injectable()
export class TasksService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool(DatabaseConfig);
  }

  async createTask(userId: number, body: any) {
    const { title, description, metadata } = body;
    const query = `
      INSERT INTO tasks (user_id, title, description, metadata)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [userId, title, description, metadata || {}]; 
    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  

  async getTasks(userId: number) {
    const query = `
      SELECT * FROM tasks WHERE user_id = $1;
    `;
    const values = [userId];
    try {
      const result = await this.pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getTaskById(userId: number, taskId: string) {
    const query = `
      SELECT * FROM tasks WHERE user_id = $1 AND id = $2;
    `;
    const values = [userId, taskId];
    try {
      const result = await this.pool.query(query, values);
      if (result.rows.length === 0) {
        throw new InternalServerErrorException('Task not found');
      }
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateTask(userId: number, taskId: string, body: any) {
    if (Object.keys(body).length === 0) {
      throw new InternalServerErrorException('No fields provided for update');
    }
  
    const fields = [];
    const values = [userId, taskId];
    let index = 2;
  
    for (const key in body) {
      fields.push(`${key} = $${++index}`);
      values.push(body[key]);
    }
  
    const query = `
      UPDATE tasks
      SET ${fields.join(', ')}
      WHERE user_id = $1 AND id = $2
      RETURNING *;
    `;
    try {
      const result = await this.pool.query(query, values);
      if (result.rows.length === 0) {
        throw new InternalServerErrorException('Task not found or not updated');
      }
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  

  async deleteTask(userId: number, taskId: string) {
    const query = `
      DELETE FROM tasks WHERE user_id = $1 AND id = $2 RETURNING *;
    `;
    const values = [userId, taskId];
    try {
      const result = await this.pool.query(query, values);
      if (result.rows.length === 0) {
        throw new InternalServerErrorException('Task not found or not deleted');
      }
      return { message: 'Task deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
