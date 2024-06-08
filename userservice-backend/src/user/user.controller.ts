import {
    Controller,
    Get,
    Param,
    Delete,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    HttpException,
    ParseIntPipe,
    Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface CustomResponse {
    status: number;
    error: string | null;
    message: string;
    data?: any;
}

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<CustomResponse> {
        try {
            const newUser = await this.userService.createUser(createUserDto);

            if (typeof newUser === 'string') {
                const errorMessage = newUser === "email already exists" ? 'Email already exists' : 'Phone number already exists';
                return {
                    status: HttpStatus.BAD_REQUEST,
                    error: newUser,
                    message: errorMessage,
                    data: null
                };
            }

            return {
                status: HttpStatus.CREATED,
                error: null,
                message: 'Data inserted successfully',
                data: newUser
            };
        } catch (error) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.userService.findOne(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Patch(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<CustomResponse> {
        try {
            const updatedUser = await this.userService.updateUser(id, updateUserDto);

            if (!updatedUser) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            return {
                status: HttpStatus.OK,
                error: null,
                message: 'Data updated successfully',
                data: updatedUser,
            };
        } catch (error) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        try {
            const user = await this.userService.findOne(id);
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            await this.userService.remove(id);
        } catch (error) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
