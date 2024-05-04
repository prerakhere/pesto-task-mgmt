import { Schema, object, string } from "joi";

const payloadValidator = (schema: Schema) => (payload: any) => schema.validate(payload, { abortEarly: false });

const signUpSchema = object({
  email: string().email().required()
});

const loginSchema = object({
  email: string().email().required()
});

const taskSchema = object({
  title: string().max(200).required(),
  description: string().max(2000),
  status: string().valid('todo', 'inprogress', 'done').required()
});

const signUpValidator = payloadValidator(signUpSchema);
const loginValidator = payloadValidator(loginSchema);
const taskValidator = payloadValidator(taskSchema);

export {
  signUpValidator,
  loginValidator,
  taskValidator
};