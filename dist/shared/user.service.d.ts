import { User } from 'src/types/user';
import { Model } from 'mongoose';
import { RegisterDTO, LoginDTO } from './../auth/auth.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    private sanitizerUser;
    create(userDTO: RegisterDTO): Promise<User>;
    findByLogin(userDTO: LoginDTO): Promise<User>;
    findByPayload(payload: any): Promise<User>;
}
