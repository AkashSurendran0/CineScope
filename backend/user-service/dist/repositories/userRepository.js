import User from "../models/userModel.js";
const findById = async () => {
};
const findByEmail = async (email) => {
    return User.findOne({ where: { email: email } });
};
const createUser = async (name, email, password) => {
    return User.create({
        name,
        email,
        password
    });
};
const findByEmailAndUpdatePass = async (email, password) => {
    return User.update({ password: password }, { where: { email: email } });
};
const findUserById = async (userId) => {
    return User.findByPk(userId);
};
const findByIdAndUpdate = async (userid, name, image) => {
    return User.update({
        name: name,
        image: image
    }, { where: { id: userid } });
};
export default {
    findById,
    findByEmail,
    createUser,
    findByEmailAndUpdatePass,
    findUserById,
    findByIdAndUpdate
};
