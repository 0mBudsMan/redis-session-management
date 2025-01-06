async function postPreferences(req, res) {
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
  res.status(200).json({ message: "Preferences saved in cookies." });
}

async function getPreferences(req, res) {
  const preferences = req.cookies.preferences;
  if (!preferences) {
    return res.status(404).json({ message: "No preferences found." });
  }
  res.status(200).json({ preferences: JSON.parse(preferences) });
}

module.exports = { postPreferences, getPreferences };