import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import checkDbConnection from "./dbConnectionMiddleware.js";

const authMiddleware = async (req, res, next) => {
  // Überprüfen der Datenbankverbindung
  checkDbConnection(req, res, async () => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Token aus dem Cookie oder Header lesen

    if (!token) {
      return res.status(401).json({ msg: "Kein Token, Zugriff verweigert." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // isAdmin überprüfen
      const user = await User.findById(req.user.id);
      if (!user)
        return res.status(404).json({ msg: "Benutzer nicht gefunden." });

      req.user.isAdmin = user.isAdmin;
      next();
    } catch (err) {
      return res.status(403).json({ msg: "Ungültiges Token." });
    }
  });
};

export default authMiddleware;
