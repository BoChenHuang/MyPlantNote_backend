import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { id: user._id, name: user.name, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
