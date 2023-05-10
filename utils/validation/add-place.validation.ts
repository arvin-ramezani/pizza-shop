export function validatePlaceInputs({
  placeName,
  placeAddress,
}: {
  placeName: string;
  placeAddress: string;
}) {
  const result: {
    errors: {
      placeName: string | undefined;
      placeAddress: string | undefined;
    };
    isValid: boolean;
  } = {
    errors: {
      placeName: undefined,
      placeAddress: undefined,
    },
    isValid: true,
  };

  if (!placeName?.trim()) {
    result.errors.placeName = 'نام مکان نمیتواند خالی باشد';
    result.isValid = false;
  }

  if (!placeAddress?.trim()) {
    result.errors.placeAddress = 'آدرس مکان نمیتواند خالی باشد';
    result.isValid = false;
  }

  return result;
}
