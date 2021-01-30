import { User } from "./user.model";

export interface News {
    date: any;
    country: string;
    description: string;
    user: User;
    
}
