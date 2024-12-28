import authService from "../services/authService.js";
import requiredParams from "../utility/requiredCheck.js";
import db from "../../config/connection.js";
// import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const {} = authService;

class authController {
  static async signin() {
    try {
      const { email: strEmail, token: strToken } = req.body;
    } catch (error) {}
  }
}
export default authController;
