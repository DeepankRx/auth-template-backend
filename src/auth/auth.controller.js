const AuthServices = require('./auth.service');
const { missingFields } = require('../common/utils');
const bcrypt = require('bcryptjs');
exports.signUp = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, mobile } = req.body;
    const missing = missingFields(
      ['username', 'email', 'password', 'firstName', 'lastName', 'mobile'],
      req.body
    );
    if (missing.length > 0) {
      return res.status(400).json({
        message: `Missing fields: ${missing.join(', ')}`,
      });
    }
    const user = await AuthServices.createUser(req.body);
    return res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const missing = missingFields(['username', 'password'], req.body);
    if (missing.length > 0) {
      return res.status(400).json({
        message: `Missing fields: ${missing.join(', ')}`,
      });
    }
    const user = await AuthServices.getUser({ username }, true);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: 'Incorrect password',
      });
    }
    const token = await user.generateAuthToken();
    return res.status(200).json({
      message: 'Login successful',
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await AuthServices.getUser({ _id: id });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    return res.status(200).json({
      message: 'User found',
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await AuthServices.updateUser({ _id: id }, req.body);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    return res.status(200).json({
      message: 'User updated successfully',
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await AuthServices.deleteUser({ _id: id });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    return res.status(200).json({
      message: 'User deleted successfully',
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
