import * as yup from 'yup';

const mobileRegex = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
const phoneRegex = /^0[0-9]{2,}[0-9]{7,}$/;

export default yup.object().shape({
  firstName: yup.string().required('نام نمیتواند خالی باشد'),
  lastName: yup.string(),
  email: yup
    .string()
    .email('ایمیل معتبر نیست')
    .required('ایمیل نمیتواند خالی باشد'),
  password: yup
    .string()
    .min(4, 'حداقل 4 کاراکتر باید باشد')
    .max(20, 'حداکثر 20 کاراکتر باید باشد')
    .required('پسوورد نمیتواند خالی باشد'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'پسوورد تایید اشتباه است')
    .required('پسوورد نمیتواند خالی باشد'),

  // address: yup.string().required('آدرس نمیتواند خالی بماند'),
  // placeName: yup.string().required('نام مکان نمیتواند خالی باشد'),

  // placeAddress: yup.string().required('آدرس نمیتواند خالی باشد'),
});
