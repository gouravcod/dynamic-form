import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  private users: any[] = [];

    private nextId = 1;
  

    create(createUserDto: CreateUserDto) {
      const phoneExists = this.users.some(user => user.phone === createUserDto.phone);
      if (phoneExists) {
        throw new BadRequestException('Phone number already exists');
      }
    
      const newUser = {
        id: this.nextId++,
        ...createUserDto,
      };
    
      this.users.push(newUser);
     return {
        message: 'User created successfully',
        user: newUser,
        
      };
    }
    
      
  
  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  }

  findManyByIds(ids: number[]) {
    const foundUser = this.users.filter(user => ids.includes(user.id));

    if (foundUser.length === 0) {
        throw new NotFoundException('No users found for the provided IDs');
      }
      return foundUser;

}   

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    Object.assign(user, updateUserDto);
    return {
        "message": "User updated successfully",
        "user": user
    };
  }
}
