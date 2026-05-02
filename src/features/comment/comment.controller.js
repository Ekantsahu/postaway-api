    import CommentModel from "./comment.model.js";
    import CustomError from "../../utils/customError.js";
    import PostModel from "../post/post.model.js"

    export default class CommentController{
        static addComment(req , res , next) {
            try{
                const {content} = req.body;
                const postId = req.params.id;
                const userId = req.userId;

                if(!content) {
                    throw new CustomError(400 ,  "Content is required");
                }

                const post = PostModel.getById(postId);
                if (!post) {
                throw new CustomError(404, "Post not found");
                }

                const comment = CommentModel.add(userId , postId , content);

                res.status(201).json({
                    success: true,
                    data : comment,
                    message : "Comment added"
                })
            }catch(err){
                next(err);
            }
        }

        static getComments(req , res) {
            const postId = req.params.id;
            const comments = CommentModel.getByPost(postId);

            res.json({
                success : true,
                data : comments,
            })
        }


        static updateComment(req , res , next){
            const { content } = req.body;

            const result = CommentModel.update(
                req.params.id,
                req.userId,
                content
            );

            if(result === null){
                return next(new CustomError(404, "Comment not found"));
            }

            if(result === "UNAUTHORIZED"){
                return next(new CustomError(403 , "Not allowed"));
            }

            res.json({
                success:true,
                data:result,
                message:"Comment Updated",
            })
        }

        static deleteComment(req , res , next){
            const result = CommentModel.delete(
                req.params.id,
                req.userId
            );

            if(result === null){
                return next(new CustomError(404 , "Comment not found"));
            }

            if(result === "UNAUTHORIZED") {
                return next(new CustomError(403 , "Not allowed"));
            }

            res.json({
                success:true,
                data:result,
                message:"Comment Deleted!",
            })
        }
    }