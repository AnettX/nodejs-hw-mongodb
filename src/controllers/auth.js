import { loginUser, registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.json({
    status: 201,
    message: 'Successfully registered user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  await loginUser(req.body);
  //   const user = await loginUser(req.body);
  //   res.json({
  //     status: 200,
  //     message: 'Successfully authorizated',
  //     data: user,
  //   });
};
