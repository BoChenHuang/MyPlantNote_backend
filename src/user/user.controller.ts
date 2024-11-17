import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, BadRequestException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { isValidObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      this.logger.error(error.stack);
      throw error;
    }
  }

  @Get('all')
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      this.logger.error(error.stack);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      if(!isValidObjectId(id))
        throw new BadRequestException(`Id: ${id} is not valid.`);

      return await this.userService.findOne(id);
    } catch (error) {
      this.logger.error(error.stack);
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      if(!isValidObjectId(id))
        throw new BadRequestException(`Id: ${id} is not valid.`);

      return await this.userService.update(id, updateUserDto); 
    } catch (error) {
        this.logger.error(error.stack);
        throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      if(!isValidObjectId(id))
        throw new BadRequestException(`Id: ${id} is not valid.`);

      return await this.userService.remove(id);
    } catch (error) {
        this.logger.error(error.stack);
        throw error;
    }
  }
}
