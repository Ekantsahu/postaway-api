
import { v4 as uuidv4 } from "uuid";

const comments = [];

export default class CommentModel{
    static add(userId , postId , content){
        const newComment ={
            id: uuidv4(),
            userId,
            postId,
            content,
            createdAt: new Date(),
        };

        comments.push(newComment);
        return newComment;
    }

    static getByPost(postId) {
        return comments.filter((c) => c.postId === postId);
    }

    static update(id , userId , content){
        const comment = comments.find((c) => c.id === id);

        if(!comment) return null;
        if(comment.userId !== userId) return "UNAUTHORIZED";

        comment.content = content;
        return comment;
    }

    static delete(id , userId) {
        const index = comments.findIndex((c) => c.id === id);

        if(index === -1) return null;
        if(comments[index].userId !== userId) return "UNAUTHORIZED";

        return comments.splice(index  , 1)[0];
    }
}