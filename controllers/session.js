const { now } = require("mongoose");

async function createSession(req, res) {
  if (!req.session || !req.session.user) {
    //if no session exists already, create a new session with random id
    req.session.id = Math.random().toString(36).substring(2, 10);
    res.status(201).json({
      message: "Guest Session Created Successfully",
    });
  }
  //if session exists already, (i.e. when a user has already logged in (ref. login controller)), no need to create new session again
  res.status(201).json({
    message: "A session exists already, no need to create new one again!",
  });
}

async function logPage(req, res) {
  const { page } = req.body;
  //session will have a currentPage, and an array of all the visited pages
  const now = Date.now();
  if (!req.session.visitedPages) {
    req.session.visitedPages = [];
  }
  if (!req.session.currentPage) {
    req.session.currentPage = page;
    req.session.timestamp = now;
  } else {
    const lastPage = req.session.currentPage;
    const duration = now - req.session.timestamp;
    
    req.session.visitedPages.push({ page: lastPage, duration: duration });
    req.session.currentPage = page;
    req.session.timestamp = now;
  }
  res.status(200).json({ message: `Logged visit to ${page}` });
}

async function getSessionDetails(req, res) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  res.status(200).json({ session: req.session });
}

async function deleteSession(req, res) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  if (!req.session.visitedPages) {
    req.session.visitedPages = [];
  }
  if (req.session.currentPage)
    req.session.visitedPages.push({
      page: req.session.currentPage,
      duration: now() - req.session.timestamp,
    });
  req.session.destroy();
  
  res.status(200).json({ message: "Session deleted successfully." });
}

module.exports = {
  createSession,
  logPage,
  getSessionDetails,
  deleteSession,
};