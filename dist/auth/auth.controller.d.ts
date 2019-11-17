import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { UserService } from './../shared/user.service';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    tempAuth(): {
        auth: string;
    };
    login(userDTO: LoginDTO): Promise<{
        user: import("../types/user").User;
        token: string;
    }>;
    register(userDTO: RegisterDTO): Promise<{
        user: import("../types/user").User;
        token: string;
    }>;
}
