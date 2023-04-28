import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExternalContextCreator } from "@nestjs/core";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserRepository } from "./user.repository";
import {User} from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository
		) {
			super({
				secretOrKey: 'Secret1234',
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
			})
		}

		async validate(payload) {
			const { username } = payload;
			const user: User = await this.userRepository.findOne({username});

			if (!user) {
				throw new UnauthorizedException();
			}

			return user;
		}
}