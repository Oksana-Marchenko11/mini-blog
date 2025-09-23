import { createUser, loginUser } from "../services/userService.js";

export async function registerController(req, res) {
  try {
    const user = await createUser(req.body);
    const userObj = user.toObject();
    const { password, ...userSafe } = userObj;
    res.status(201).json(userSafe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function loginController(req, res) {
  try {
    const { user, token } = await loginUser(req.body);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
