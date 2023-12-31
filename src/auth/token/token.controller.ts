import { Controller, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { TokenService } from './token.service';

import { RefreshTokenExistGuard } from './guards/refreshToken-exist.guard';

import { UpdateTokenDto } from './dto/requestDto/update-token.dto';
import { User } from '../../common/decorators/user.decorator';
import { TokenResponseDto } from './dto/responseDto/tokens.dto';

@ApiTags('Auth')
@UseGuards(RefreshTokenExistGuard)
@Controller('auth/token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @ApiOperation({ summary: 'Update access token' })
  @ApiBody({ type: UpdateTokenDto })
  @Patch('update-access')
  public async updateAccessToken(@User('userId', ParseIntPipe) userId: number): Promise<{
    accessToken: string;
  }> {
    return this.tokenService.updateAccessToken(userId);
  }

  @ApiOperation({ summary: 'Update refresh token' })
  @ApiBody({ type: UpdateTokenDto })
  @Patch('update-refresh')
  public async updateRefreshToken(@User('userId', ParseIntPipe) userId: number): Promise<TokenResponseDto> {
    return this.tokenService.updateRefreshToken(userId);
  }
}
