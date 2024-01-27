const zod = require("zod");


const UserValidation = zod.object({
    username:zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(6),
})
const UpdateValidation = zod.object({
    password:zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string(),
});

module.exports = {
    UserValidation,
    UpdateValidation
}