import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import CustomError from "../../utils/customError.js";

const SECRET_KEY = "mysecretkey";

export default class UserController {
    static signup (req , res , next){
        try{
            const {name , email , password} = req.body;

            if(!name || !email || !password){
                throw new CustomError(400 , "All fields are required");
            }

            const existingUser = UserModel.findByEmail(email)
                if(existingUser){
                    throw new CustomError(400, "User already exists");
                }

                const user = UserModel.addUser(name , email , password);

                res.status(201).json({
                    success:true,
                    data:true,
                    message:"User registered successfully",
                })
        }catch(err){
            next(err);
        }
    }

    static signin(req , res , next){
        try{
            const {email , password} = req.body;

            const user = UserModel.findByEmail(email);

            if(!user || user.password !== password){
                throw new CustomError(401 , "Invalid credentials");
            }

            const token = jwt.sign(
                {userId: user.id , email: user.email},
                SECRET_KEY,
                {expiresIn:"1h"}
            );

            res.status(200).json({
                success:true,
                token, 
                message:"Login Successful",
            })
        }catch(err){
            next(err)

        }
    }
}