const Post = require("../model/posts"); 

const getPosts = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const posts = await Post.find({ userId: String(userId) }); 
        if (posts.length === 0) {
            return res.status(404).json({ message: "No posts found for this user." });
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    } 
};

const storePosts = async (req, res) => {
    try {
        const { posts } = req.body;

        if (!Array.isArray(posts)) {
            return res.status(400).json({ message: "Request body must contain a 'posts' array." });
        }

        if (posts.length === 0) {
            return res.status(200).json({ message: "No posts to store." });
        }

        const storedPostIds = [];
        const errors = [];

        for (const postData of posts) {
            const { id, userid, content } = postData;

            if (!id || !userid || !content) {
                errors.push({ message: "Each post object must contain id, userid, and content.", data: postData });
                continue;
            }

            const newPost = new Post({
                postId: String(id), 
                userId: String(userid),
                content
            });

            try {
                await newPost.save();
                storedPostIds.push(id);
            } catch (error) {
                console.error("Error storing post:", error);
                errors.push({ message: "Error storing post.", data: postData, error: error.message });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ message: "Some posts failed to store.", errors });
        }

        res.status(201).json({ message: "Post details stored successfully.", postIds: storedPostIds });

    } catch (error) {
        console.error("Error processing post details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getPosts,
    storePosts
};