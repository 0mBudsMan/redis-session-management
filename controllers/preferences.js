const User = require('../models/User');
const syncWithMongo = require('../utils/mongosync');
async function postPreferences(req, res) {
    try{
    if(!req.session || !req.session.user) {
        return res.status(401).json({ message: "Unauthorized." });
      }
  const { theme, language, notifications } = req.body;
  
  if (!theme || !notifications || !language) {
    return res.status(400).json({ message: "All preferences are required." });
  }

  
  res.cookie(
    "preferences",
    JSON.stringify({ theme, notifications, language }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    }
  );
  if (req.session.user) {
    syncWithMongo(req); //sync with mongodb
    
  }
  res.status(200).json({ message: "Preferences saved in cookies." });
}
catch(e){
    console.error(e);
    res.status(500).json({ message: "Server error." });
}}

async function getPreferences(req, res) {
    try{
  const preferences = req.cookies.preferences;
  if (!preferences) {
    return res.status(404).json({ message: "No preferences found." });
  }
  res.status(200).json({ preferences: JSON.parse(preferences) });
}
catch(e){
    console.error(e);
    res.status(500).json({ message: "Server error." });
}}

module.exports = { postPreferences, getPreferences };