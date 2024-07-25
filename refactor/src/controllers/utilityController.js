const utilityController = {
  async checkAccessToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      // return res.status(401).send({ message: "Access denied" });
    }

    next();
  }
}