export interface AuthModalProps {
  onClose: () => void;
  show: boolean;
}

export interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  image?: any;
  placeName: string;
  placeAddress: string;
}

export interface UserAttrs {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  password: string;
  image?: string;
}
