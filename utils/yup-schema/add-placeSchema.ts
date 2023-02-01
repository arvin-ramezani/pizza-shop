import * as yup from 'yup';

export default yup.object().shape({
  placeName: yup.string().required('نام مکان نمیتواند خالی باشد'),

  placeAddress: yup.string().required('آدرس نمیتواند خالی باشد'),
});
