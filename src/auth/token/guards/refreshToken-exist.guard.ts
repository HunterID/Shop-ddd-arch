import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';

import { UsersRepositoryService } from '../../../repositories/users/users-repository.service';
import { UpdateTokenDto } from '../dto/requestDto/update-token.dto';

@Injectable()
export class RefreshTokenExistGuard implements CanActivate {
  constructor(private usersRepositoryService: UsersRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { refreshToken }: UpdateTokenDto = request.body;

    const user = await this.usersRepositoryService.getUserByToken(refreshToken);

    if (!user) throw new NotFoundException();

    request.user = user;

    return true;
  }
}
