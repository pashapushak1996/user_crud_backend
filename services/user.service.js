const { UserModel } = require("../dataBase");
const userService = {
    getUserByParam: async (param) => {
        const user = await UserModel.findOne({ param: [param] });

        return user;
    }
};

module.exports = userService;