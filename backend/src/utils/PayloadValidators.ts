import Joi from "joi";

const payloadValidator = (schema: Joi.Schema) => (payload: any) => schema.validate(payload, { abortEarly: false });

const signUpSchema = Joi.object({
  email: Joi.string().email().required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required()
});

const taskSchema = Joi.object({
  title: Joi.string().max(200).required(),
  description: Joi.string().max(2000),
  status: Joi.string().valid('todo', 'inprogress', 'done').required(),
  created_at: Joi.string().isoDate()
});

const tasksSchema = Joi.array().items(taskSchema);

const signUpValidator = payloadValidator(signUpSchema);
const loginValidator = payloadValidator(loginSchema);
const taskValidator = payloadValidator(taskSchema);
const tasksValidator = payloadValidator(tasksSchema);

export {
  signUpValidator,
  loginValidator,
  taskValidator,
  tasksValidator
};