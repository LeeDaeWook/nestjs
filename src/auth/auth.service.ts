import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth_credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		private jwtService: JwtService
	) {}

	async signUp(authCredentialsDto): Promise<void> {
		return this.userRepository.createUser(authCredentialsDto);
	}

	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
		const { username, password } = authCredentialsDto;
		const user = await this.userRepository.findOne({ username });

		if (user && (await bcrypt.compare(password, user.password))) {
			// 유저 토큰 생성 (secret + payload)
			const payload = { username }
			const accessToken = await this.jwtService.sign(payload);

			return {accessToken};
		} else {
			throw new UnauthorizedException('login failed');
		}
	}
}
