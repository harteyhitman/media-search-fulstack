// src/dashboard/dashboard.controller.ts

import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Dashboard') // This groups the routes under the 'Dashboard' tag in the Swagger UI
@Controller('dashboard')
export class DashboardController {
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get dashboard data' }) // Describes the operation
  @ApiResponse({ status: 200, description: 'Successfully retrieved dashboard data' }) // Response when successful
  @ApiResponse({ status: 401, description: 'Unauthorized' }) // Response when unauthorized
  getDashboard(@Request() req) {
    return {
      message: 'Welcome to your dashboard!',
      user: req.user,
    };
  }
}
