import {sign, verify, Secret} from 'jsonwebtoken';
import config from "../../config";

const JWT_SECRET : Secret = config.JWT_SECRET

const createToken = (userId: string) => {
    return sign(userId, JWT_SECRET);
}

const verifyToken = (token: string) =>  {
    return verify(token, JWT_SECRET);
}

export {
    createToken,
    verifyToken
}