import { Message } from "../../types/message";

export default class MessageRepository {
    
    async add(message:Message){
        try {
            console.log(message);
        } catch (error) {
            throw error;
        }
    }

    async delete(message:Message){
        try {
            console.log(message);
        } catch (error) {
            throw error;
        }
    }    

}
