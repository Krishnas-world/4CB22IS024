const User = require("../model/User");
const getUsers = async (req, res) => {
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
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const storeUserDetails = async (req, res) => {
    try {
        const { users } = req.body;
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

