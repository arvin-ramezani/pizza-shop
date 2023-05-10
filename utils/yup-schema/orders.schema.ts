import * as yup from 'yup';

export default yup.object().shape({
  cartFoods: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          name: yup.string().required(),
          image: yup.string().required(),
          price: yup.number().required(),
          quantity: yup.number().required(),
        })
        .required()
    )
    .min(1)
    .required(),
  totalPrice: yup.number().positive().required(),
  placeId: yup.object().shape({
    id: yup.string().optional(),
    placeName: yup.string().optional(),
    placeAddress: yup.string().optional(),
    placeLocation: yup
      .object()
      .shape({
        lng: yup.number().min(-180).max(180).optional(),
        lat: yup.number().min(-90).max(90).optional(),
      })
      .optional(),
  }),
  cartLength: yup.number().min(1).required(),
  isPaid: yup.bool().optional(),
  isDelivered: yup.bool().optional(),
  paidAt: yup.date().optional(),
  deliveredAt: yup.date().optional(),
});
