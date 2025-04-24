import {
    Controller,
    Get,
    Param,
    Put,
    Post,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  
  @Controller('dynamic-form')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post("createUser")
    create(@Body() dto: CreateUserDto) {
       
      return this.usersService.create(dto);
    }

    @Get('getAllusers')
    findAll() {
      return this.usersService.findAll();
    }
  
    @Get('getUser/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.findOne(id);
    }
  
   
  
    @Put('updateUser/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(id, updateUserDto);
    }



    validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
  }
  