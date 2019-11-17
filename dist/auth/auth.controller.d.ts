import { LoginDTO, RegisterDTO } from './auth.dto';
import { UserService } from './../shared/user.service';
export declare class AuthController {
    private userService;
    constructor(userService: UserService);
    login(userDTO: LoginDTO): Promise<any>;
    register(userDTO: RegisterDTO): Promise<any>;
}
