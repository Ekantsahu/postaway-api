import PostModel from "./post.model.js";
import CustomError from "../../utils/customError.js";

export default class PostController {
    static createPost(req , res, next){
        try{
            const {caption} = req.body;
            const userId = req.userId;

            const imageUrl = req.file ? req.file.filename : null;

            if(!caption && !imageUrl){
                throw new CustomError(400 , "Post must have caption or image");
            }

            const post = PostModel.create(userId , caption , imageUrl);

            res.status(201).json({
                success: true,
                data:post,
                message: "Post created",
            });
        } catch (err){
            next (err);
        }
    }

    static getAllPosts(req, res) {
        const { page = 1, limit = 5 } = req.query;

        const start = (page - 1) * limit;
        const end = start + Number(limit);

        const allPosts = PostModel.getAll().sort(
         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const paginated = allPosts.slice(start, end);

        res.json({
            success: true,
            total: allPosts.length,
            page: Number(page),
            data: paginated,
        });
        }

        static filterPosts(req, res, next) {
        try {
            const { caption } = req.query;

            if (!caption) {
            return res.status(400).json({
                success: false,
                message: "Caption query is required",
            });
            }

            const posts = PostModel.getAll().filter((p) =>
            p.caption?.toLowerCase().includes(caption.toLowerCase())
            );

            if (posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No posts found with this caption",
            });
            }

            res.json({
            success: true,
            data: posts,
            });

        } catch (err) {
            next(err);
        }
}
    static getPostById( req , res ,next){
        const post = PostModel.getById(req.params.id);

        if(!post){
            return next(new CustomError(404, "Post not found"));
        }

        res.json({
            success:true,
            data:post,
        })
    }

    static getUserPosts(req , res){
        const posts = PostModel.getByUser(req.userId);

        res.json({
            success:true,
            data:posts
        })
    }

    static updatePost(req , res , next){
        const {caption} = req.body;
        const imageUrl = req.file ? req.file.filename : null;

        if (!caption && !imageUrl) {
          throw new CustomError(400, "Nothing to update");
        }

        const result = PostModel.update(
            req.params.id,
            req.userId,
            caption,
            imageUrl
        )

        if(result === null){
            return next (new CustomError(404 , "Post not found"));
        }

        if(result === "UNAUTHORIZED") {
            return next(new CustomError(403 , "Not allowed"));
        }

        res.json({
            success:true,
            data:result,
            message:"Post Updated",
        })
    }

    static deletePost ( req , res, next){
        const result = PostModel.delete(req.params.id,req.userId);

        if(result === null){
            return next(new CustomError(404 , "Post not found"));
        }

        if(result === "UNAUTHORIZED"){
            return next(new CustomError(403, "Not Allowed"))
        }

        res.json({
            success:true,
            data:result,
            message:"Post deleted"
        })
    }
}