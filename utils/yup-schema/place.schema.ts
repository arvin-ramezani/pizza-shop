import * as yup from 'yup';

export default yup.array().of(
  yup.object().shape({
    id: yup.string().optional(),
    placeName: yup.string().required(),
    placeAddress: yup.string().required(),
    placeLocation: yup
      .object()
      .shape({
        lng: yup.number().min(-180).max(180),
        lat: yup.number().min(-90).max(90),
      })
      .optional(),
  })
);
