    import LikeModel from "./like.model.js";
    import CustomError from "../../utils/customError.js"
    import PostModel from "../post/post.model.js";

    export default class LikeController{
        static toggleLike( req , res , next) {
            try{
                const postId = req.params.postId;
                const userId = req.userId;

                if(!postId){
                    throw new CustomError(400 , "Post ID is required");
                }

                const post = PostModel.getById(postId);
                if (!post) {
                throw new CustomError(404, "Post not found");
                }

                const result = LikeModel.toggle(userId, postId);

                res.json({
                    sucess:true,
                    action:result.action,
                    data:result.data,
                })
            }catch(err){
                next(err)
            }
        }

        static getLikes(req , res){
            const postId = req.params.postId;

            const likes = LikeModel.getByPost(postId);

            res.json({
                success:true,
                count:likes.length,
                data:likes,
            })
        }
    }