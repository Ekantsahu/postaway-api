
import {v4 as uuidv4} from "uuid";

const likes = [];

export default class LikeModel{
    static toggle(userId , postId) {
        const existingIndex = likes.findIndex(
            (l) => l.userId === userId && l.postId === postId
        );

        if( existingIndex !== -1){
            const removed = likes.splice(existingIndex , 1)[0];
            return { action: "unliked", data : removed};
        }

        const newLike = {
            id : uuidv4(),
            userId,
            postId,
        };

        likes.push(newLike);
        return { action : "liked" , data: newLike};

    }

    static getByPost(postId){
        return likes.filter((l) => l.postId===postId);
    }
}