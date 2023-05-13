import * as yup from 'yup';

export const meSchema = yup.object().shape({
  firstName: yup.string().required('نام نمیتواند خالی باشد'),
  lastName: yup.string(),
  email: yup
    .string()
    .email('ایمیل معتبر نیست')
    .required('ایمیل نمیتواند خالی باشد'),
  phone: yup.string().optional(),
});
