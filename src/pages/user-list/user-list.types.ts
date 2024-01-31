export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  phone: string;
  bio: string;
  role: string;
  isVerified: boolean;
  userAgent: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
