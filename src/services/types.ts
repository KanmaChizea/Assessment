export type RequestResult<T> = {
  isSuccess: boolean;
  data?: T;
  errorMessage?: string;
};

export type SignupProps = {
  fullname: string;
  username: string;
  password: string;
  accountNo: string;
};

export type LoginProps = {
  username: string;
  password: string;
};
export type Account = {
  account: string;
  balance: number;
};
export type User = {
  fullName: string;
  username: string;
  password: string;
  accounts: Account[];
  id: string;
};
export type AddAccountProps = {
  user: User;
  accountno: string;
};
