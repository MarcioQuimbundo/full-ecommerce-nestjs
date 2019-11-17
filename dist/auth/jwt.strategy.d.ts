import { AuthService } from './auth.service';
import { Strategy, VerifiedCallback } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => typeof Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: any, done: VerifiedCallback): Promise<void>;
}
export {};
