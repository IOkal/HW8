import * as yup from 'yup';

export const SignupSchema = yup.object({
    phone: yup.string().required(),
    firstname: yup.string().required(),
    lastname: yup.string().required()
});