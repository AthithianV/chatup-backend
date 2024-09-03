import ApplicationError, { missingError } from "../../middlewares/errorHandler";
import UserRepository from "../user/repository";
import userModel from "../user/schema";

export default class PresenceRepository {
    
    async updateStatus(userId:string, status:string):Promise<void>{
        try {
            let online:boolean;
            if(status==="online"){
                online = true;
            }else if(status === "offline"){
                online = false;
            }else{
                throw new ApplicationError(400, "Status can either online or offline");
            }
            const user = await userModel.findByIdAndUpdate(userId, {online, updatedAt:new Date()});
            if(!user){
                throw missingError("User", userId);
            }

        } catch (error) {
            throw error;
        }
    }

    async getUserStatus(userId:string):Promise<boolean>{
        try {
            const user = await UserRepository.getUserById(userId);
            return user.online;
        } catch (error) {
            throw error;
        }
    }    

}
