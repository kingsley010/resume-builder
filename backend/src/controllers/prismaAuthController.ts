import { prisma } from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";

export async function signup(req: any, res: any) {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      passwordHash: await hashPassword(password)
    }
  });
  res.json({ token: signToken(user.id) });
}

export async function login(req: any, res: any) {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await comparePassword(password, user.passwordHash)))
    return res.sendStatus(401);

  res.json({ token: signToken(user.id) });
}
