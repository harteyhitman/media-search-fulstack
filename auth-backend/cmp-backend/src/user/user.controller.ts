import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './user.entity'; // Assuming you have a User entity or DTO

@ApiTags('Users') // Grouping routes under the "Users" tag
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' }) // Describes the operation for the GET /user route
  @ApiResponse({ status: 200, description: 'Successfully retrieved the list of users', type: [User] }) // Success response
  @ApiResponse({ status: 500, description: 'Internal server error' }) // Error response
  getUsers() {
    return this.userService.getAllUsers();
  }
}
