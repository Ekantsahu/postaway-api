import { v4 as uuidv4 } from "uuid";

const posts = [];

export default class PostModel {
    static create(userId , caption , imageUrl) {
        const newPost = {
            id: uuidv4(),
            userId,
            caption,
            imageUrl,
            createdAt: new Date(),
        };

        posts.push(newPost);
        return newPost;
    }

    static getAll(){
        return posts;
    }

    static getById(id){
        return posts.find((p) => p.id === id);
    }

    static getByUser(userId){
        return posts.filter((p)=> p.userId === userId);
    }

    static update(id , userId , caption , imageUrl) {
        const post  = posts.find((p) => p.id == id);

        if(!post) return null;

        if(post.userId !== userId) return "UNAUTHORIZED";

        if(caption) post.caption = caption;
        if(imageUrl)post.imageUrl = imageUrl;

        return post;
    }

    static delete (id , userId){
        const index = posts.findIndex((p) => p.id === id);

        if(index === -1) return null;

        if(posts[index].userId !== userId) return "UNAUTHORIZED";

        return posts.splice(index , 1)[0];
    }
}