import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminRouteGuard implements CanActivate {
  constructor(
    private jwtServices: JwtService,
    private userServices: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Extract JWT token from cookies
    const token = request.cookies['access_token'];

    // Check if the token exists
    if (!token) {
      throw new ForbiddenException('Access Denied!');
    }

    try {
      // Verify the token's validity
      const payload = await this.jwtServices.verifyAsync(token);
      const { id } = payload;
      const userInDb = await this.userServices.getUserData(id);
      if (userInDb.role !== 'admin') {
        throw new ForbiddenException('Access Denied!');
      }

      // Attach the decoded payload to the request object for later use
      request.user = payload;
    } catch (error) {
      throw new ForbiddenException('Access Denied!');
    }

    return true; // Allow the request if the token is valid
  }
}
