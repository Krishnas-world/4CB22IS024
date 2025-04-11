const User = require("../model/User");
const Post = require("../../posts/model/posts");
const Comment = require("../../comments/model/comments");

const getUsers = async (req, res) => {
    try {

        const topUsers = await Post.aggregate([
            // Join with comments to get comment counts
            {
                $lookup: {
                    from: 'comments',
                    localField: 'postId',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },
            {
                $group: {
                    _id: '$userId',
                    totalComments: { $sum: { $size: '$comments' } },
                    postCount: { $sum: 1 }
                }
            },
            {
                $sort: { totalComments: -1 }
            },
            {
                $limit: 5
            }
        ]);

        const userDetails = await Promise.all(
            topUsers.map(async (user) => {
                const userDoc = await User.findOne({ userId: user._id });
                return {
                    userId: user._id,
                    name: userDoc ? userDoc.name : 'Unknown User',
                    totalComments: user.totalComments,
                    postCount: user.postCount
                };
            })
        );

        res.status(200).json(userDetails);
    } catch (error) {
        console.error("Error fetching top users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const storeUserDetails = async (req, res) => {
    try {
        const users = {
            "1": "John Doe",
            "2": "Jane Doe",
            "3": "Alice Smith",
            "4": "Bob Johnson",
            "5": "Charlie Brown",
            "6": "Diana White",
            "7": "Edward Davis",
            "8": "Fiona Miller",
            "9": "George Wilson",
            "10": "Helen Moore",
            "11": "Ivy Taylor",
            "12": "Jack Anderson",
            "13": "Kathy Thomas",
            "14": "Liam Jackson",
            "15": "Mona Harris",
            "16": "Nathan Clark",
            "17": "Olivia Lewis",
            "18": "Paul Walker",
            "19": "Quinn Scott",
            "20": "Rachel Young"
        };
        if (!users) {
            return res.status(400).json({ message: "Users are required" });
        }
        const userEntries = Object.entries(users).map(([userId, name]) => ({
            userId,
            name
        }));

        for (const user of userEntries) {
            await User.updateOne(
                { userId: user.userId },
                { $set: user },
                { upsert: true }
            );
        }

        res.status(200).json({ message: "User details stored successfully." });
    } catch (error) {
        console.error("Error storing user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getUsers,
    storeUserDetails
}

