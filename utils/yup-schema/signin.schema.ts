import * as yup from 'yup';

const mobileRegex = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
const phoneRegex = /^0[0-9]{2,}[0-9]{7,}$/;

export default yup.object().shape({
  email: yup
    .string()
    .email('ایمیل معتبر نیست')
    .required('ایمیل نمیتواند خالی باشد'),
  password: yup
    .string()
    .min(4, 'حداقل 4 کاراکتر باید باشد')
    .max(20, 'حداکثر 20 کاراکتر باید باشد')
    .required('پسوورد نمیتواند خالی باشد'),
});
