import {
    Controller,
    Get,
    Param,
    Put,
    Post,
    Body,
    ParseIntPipe,
    Query,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
  
  @Controller('dynamic-form')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post("createUser")
    create(@Body() dto: CreateUserDto) {
       
      return this.usersService.create(dto);
    }

   
  
    @Get('getUser/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.findOne(id);
    }

    @Get('getUserById')
    getMany(@Query('ids') ids: string) {
      const idArray = ids
    .split(',')
    .map(id => parseInt(id))
    
  const users_array = this.usersService.findManyByIds(idArray);

  return {
    message: 'Users fetched successfully',
    data: users_array,
  };
}
  
    @Put('updateUser/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(id, updateUserDto);
    }
    

    @Delete('deleteUser/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
      const user = this.usersService.findOne(id);
      const index = this.usersService.findAll().indexOf(user);
      this.usersService.findAll().splice(index, 1);
      return {
        message: 'User deleted successfully',
        user,
      };
    }


    @UseGuards(JwtAuthGuard)
    @Get("getAllTasks")
    gettasks(){
      return this.usersService.findAll();
    }


    
  }
  