import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";

const SECRET_KEY = 'mysecretkey';

export const authMiddleware = (req , res , next)=>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            throw new CustomError(401, "Token missing");
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            throw new CustomError(401 , "Invalid token format");
        }

        const payload = jwt.verify(token, SECRET_KEY);

        req.userId = payload.userId;

        next();
    }catch(err){
        next(new CustomError(401 , "Unauthorized"));
    }
}