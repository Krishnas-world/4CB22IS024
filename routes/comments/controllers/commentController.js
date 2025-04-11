const storeComments = async (req, res) => {
    try {
        const { comments } = req.body;

        if (!Array.isArray(comments)) {
            return res.status(400).json({ message: "Request body must contain a 'comments' array." });
        }

        if (comments.length === 0) {
            return res.status(200).json({ message: "No comments to store." });
        }

        const storedCommentIds = [];
        const errors = [];

        for (const commentData of comments) {
            const { id, userid, content } = commentData;

            if (!id || !userid || !content) {
                errors.push({ message: "Each comment object must contain id, userid, and content.", data: commentData });
                continue;
            }

            const newComment = new Comment({
                commentId: String(id),
                postId: String(userid), 
                content
            });

            try {
                await newComment.save();
                storedCommentIds.push(id);
            } catch (error) {
                console.error("Error storing comment:", error);
                errors.push({ message: "Error storing comment.", data: commentData, error: error.message });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ message: "Some comments failed to store.", errors });
        }

        res.status(201).json({ message: "Comment details stored successfully.", commentIds: storedCommentIds });

    } catch (error) {
        console.error("Error processing comment details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getComments = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ message: "Request body must contain a 'userId'." });
        }
        // 
        const postId = req.body.postId;
        if (!postId) {
            return res.status(400).json({ message: "Request body must contain a 'postId'." });
        }
        const comments = await Comment.find().populate('postId').exec();
        res.status(200).json(comments);
        } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    storeComments,
    getComments
}