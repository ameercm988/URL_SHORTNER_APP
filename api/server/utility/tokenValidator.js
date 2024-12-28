import jwt from "jsonwebtoken";
const { verify } = jwt;
import rateLimit from "express-rate-limit";
// import db from "../config/connection.js";

const authorization = async (req, res, next) => {
  const { key, secret, api_name } = req.body;
  const token = req.get("authorization")?.replace("Bearer ", "");
  // console.log("token", token);

  try {
    // Check if API is active
    const [apiConfig] = await db
      .promise()
      .query("SELECT * FROM api_config WHERE name = ? AND is_active = 1", [
        api_name,
      ]);
    // console.log("apiConfig", apiConfig);
    if (apiConfig.length === 0) {
      return res.status(401).send({ success: false, msg: "API disabled" });
    }

    if (key && secret) {
      // Validate key and secret
      const [brand] = await db
        .promise()
        .query("SELECT * FROM brand WHERE id = ?", [1]);
      if (!brand.length || brand[0].key !== key || brand[0].secret !== secret) {
        return res
          .status(401)
          .send({ success: false, msg: "Invalid credentials" });
      }
      return next();
    } else if (token) {
      // Validate JWT
      verify(token, process.env.JWT_KEY, (err, decoded) => {
        // console.log("decoded", decoded);
        if (err || !decoded) {
          return res.status(401).send({ success: false, msg: "Invalid Token" });
        }
        next();
      });
    } else {
      return res.status(401).send({ success: false, msg: "Unauthorized" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, msg: "Server Error" });
  }
};

// Apply rate limiting (optional)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    msg: "Too many requests, please try again later.",
    data: {},
  },
});

export default { authorization, limiter };
