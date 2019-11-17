import { User } from 'src/types/user';
import { Model } from 'mongoose';
import { RegisterDTO, LoginDTO } from './../auth/auth.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    private sanitizerUser;
    create(userDTO: RegisterDTO): Promise<any>;
    findByLogin(userDTO: LoginDTO): Promise<any>;
}
