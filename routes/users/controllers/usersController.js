const getUsers = (req, res) => {
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

module.exports = {
    getUsers
}

