import * as yup from 'yup';

export const SignupSchema = yup.object({
    email: yup.string().required().email(),
    username: yup.string().required(),
    password: yup.string().required()
      .test('is-length', 'Password must be at least 6 characters', (val) => {
        if (val != undefined) {
          return val.length > 5;
        }
    }),
});