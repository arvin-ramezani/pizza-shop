import * as yup from 'yup';

export default yup.object().shape({
  comment: yup.string().required('متن نمیتواند خالی باشد'),
});
