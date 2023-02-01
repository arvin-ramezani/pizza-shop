import * as yup from 'yup';

export const patchBodySchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().optional(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
});
