import { v4 as uuidv4 } from "uuid";

const users = [];

export default class UserModel {
    static getAll() {
        return users;
    }

    static findByEmail(email){
        return users.find((u) => u.email === email);
    }

    static addUser(name , email , password) {
        const newUser = {
            id : uuidv4(),
            name , 
            email ,
            password,
        };

        users.push(newUser);
        return newUser;
    }
}