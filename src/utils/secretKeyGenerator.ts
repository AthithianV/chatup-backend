import {randomBytes} from "crypto";
export const secretKeyGenerator = () => {
    return randomBytes(32).toString('hex');
}


//  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"