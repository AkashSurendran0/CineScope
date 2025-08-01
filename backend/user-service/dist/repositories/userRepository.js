import { getUserModel } from "../models/userModel.js";
const findByEmail = async (email) => {
    const User = getUserModel();
    return User.findOne({ where: { email: email } });
};
const createUser = async (name, email, password) => {
    const User = getUserModel();
    return User.create({
        name,
        email,
        password
    });
};
const findByEmailAndUpdatePass = async (email, password) => {
    const User = getUserModel();
    return User.update({ password: password }, { where: { email: email } });
};
const findUserById = async (userId) => {
    const User = getUserModel();
    console.log('asdf', userId);
    return User.findByPk(userId);
};
const findByIdAndUpdate = async (userid, name, image) => {
    const User = getUserModel();
    return User.update({
        name: name,
        image: image
    }, { where: { id: userid } });
};
export default {
    findByEmail,
    createUser,
    findByEmailAndUpdatePass,
    findUserById,
    findByIdAndUpdate
};
