import jwt from "jsonwebtoken";

export function generateToken(userId: number) {
  const secretKey = process.env.SECRET_KEY!;
  const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: "6h" });
  return token;
}

export function verifyToken(token: string): boolean {
  try {
    const secretKey = process.env.SECRET_KEY!;
    const decoded = jwt.verify(token, secretKey);

    if (typeof decoded === "object" && decoded !== null) {
      return true;
    } else {
      console.error("Token decoding failed:", decoded);
      return false;
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}
