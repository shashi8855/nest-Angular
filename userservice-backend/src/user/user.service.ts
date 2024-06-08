/* eslint-disable prettier/prettier */
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from './user.entity';
import { UserQueries } from './user.queries';

@Injectable()
export class UserService {
  constructor(@Inject('DATABASE_CONNECTION') private connection: Connection) {}

  async createUser(user: Partial<User>): Promise<User | string> {
    try {
      const existingUser = await this.connection.query(
        UserQueries.existingUser,
        [user.email, user.phone_number],
      );

      if (existingUser.length > 0) {
        const emailExists = existingUser.some(
          (u: any) => u.email === user.email,
        );
        return emailExists
          ? 'email already exists'
          : 'phone number already exists';
      }

      const result = await this.connection.query(UserQueries.createUser, [
        user,
      ]);
      return { id: result.insertId, ...user } as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.connection.query(UserQueries.findAll);
    } catch (error) {
      console.error('Error finding users:', error);
      throw new HttpException(
        'Failed to find users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const users = await this.connection.query(UserQueries.findOneById, [id]);
      if (users.length === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return users[0];
    } catch (error) {
      console.error(`Error finding user with id ${id}:`, error);
      throw new HttpException(
        'Failed to find user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(id: number, updateUserDto: Partial<User>): Promise<User> {
    try {
      const userToUpdate = await this.findOne(id);

      if (!userToUpdate) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const { name, email, phone_number, address } = updateUserDto;
      await this.connection.query(UserQueries.updateUser, [
        name ?? userToUpdate.name,
        email ?? userToUpdate.email,
        phone_number ?? userToUpdate.phone_number,
        address ?? userToUpdate.address,
        id,
      ]);

      return this.findOne(id);
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const userToDelete = await this.findOne(id);

      if (!userToDelete) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await this.connection.query(UserQueries.deleteUser, [id]);
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
