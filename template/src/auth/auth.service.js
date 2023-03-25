const User = require('./auth.model');

exports.createUser = async (body) => {
  const user = await User.create(body);
  return user;
};

exports.getUser = async (condition, selectPassword) => {
  if (selectPassword) {
    const user = await User.findOne(condition).select('+password');
    return user;
  }
  const user = await User.findOne(condition);
  return user;
};

exports.updateUser = async (condition, body) => {
  const user = await User.findOneAndUpdate(
    condition,
    {
      $set: body,
    },
    {
      new: true,
    }
  );
  return user;
};

exports.deleteUser = async (condition) => {
  const user = await User.findOneAndDelete(condition);
  return user;
};
