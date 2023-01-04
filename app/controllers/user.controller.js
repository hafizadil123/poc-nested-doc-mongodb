import BaseController from './base.controller';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Constant from '../config/constants';
class UsersController extends BaseController {
	whitelist = [
	  'firstName',
	  'lastName',
	  'email',
	  'password',
	  'role',
	];

	register = async (req, res, next) => {
		const params = this.filterParams(req.body, this.whitelist);
		try {
		  // See if user exist
		  let user = await User.findOne({ email: params.email });
		  if (user) {
			return res.status(400).json({ message: 'user already exists', success: 0 });
		  }
		  user = new User(params);
		  // Encrypt password
		  const salt = await bcrypt.genSalt(10);
		  user.password = await bcrypt.hash(params.password, salt);
		  await user.save();
		  // Return jsonwebtoken
  
		  const payload = {
			user: params,
		  };
		  jwt.sign(payload, Constant.security.sessionSecret, { expiresIn: Constant.security.sessionExpiration }, (err, token) => {
			if (err) throw err;
			res.status(200).json({ token: token, message: 'user has been registered succesfully', success: 1, user });
		  });
		} catch (err) {
		  err.status = 400;
		  next(err);
		}
	  };

	  login = async (req, res, next) => {
		const { email, password } = req.body;
  
		try {
		  // See if user exist
		  const user = await User.findOne({ email });
		  if (!user) {
			return res.status(400).json({ message: 'invalid credentials', success: 0 });
		  }
  
		  const isMatch = await bcrypt.compare(password, user.password);
		  if (!isMatch) {
			return res.status(400).json({ message: 'invalid credentials', success: 0 });
		  }
  
		  // Return jsonwebtoken
		  const payload = {
			user: {
			  id: user.id,
			  email: user.email,
			  role: user.role,
			},
		  };
		  jwt.sign(payload, Constant.security.sessionSecret, { expiresIn: Constant.security.sessionExpiration }, (err, token) => {
			if (err) throw err;
			res.status(200).json({ token, success: 1, message: 'user has been logged In', user });
		  });
		} catch (err) {
		  err.status = 400;
		  next(err);
		}
	  };

}

export default new UsersController();
