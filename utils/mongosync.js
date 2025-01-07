const User = require('../models/User'); 

async function syncWithMongo(req){
    if(!req.session || !req.session.user) {
        return res.status(500).json({ message: "Nothing to sync" });
    }
    const user = await User.findOne({ username: req.session.user.username });
    if (!user) {
        return res.status(401).json({ message: "Guest User not in mongoDB" });
    }
    user.pageVisited = req.session.visitedPages;
    user.preferences = req.cookies.preferences;
    await user.save();
}

module.exports = syncWithMongo; 