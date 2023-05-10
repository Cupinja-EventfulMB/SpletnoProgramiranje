import { jwt } from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).json("You are not authenticated!");
    }

    if (token.startsWith("Bearer ")) { //make sure it starts with the bearer
      token = token.substring(7, token.length).trimLeft();  //token placed after the bearer
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
