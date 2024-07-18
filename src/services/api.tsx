import {
  RequestResult,
  User,
  LoginProps,
  SignupProps,
  AddAccountProps,
} from './types';
import {getRandomInteger} from './utils';
import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://66991e632069c438cd715bee.mockapi.io/api/',
});

export const rtkQueryService = createApi({
  reducerPath: 'rtkQueryService',
  baseQuery: baseQuery,
  endpoints: builder => ({
    login: builder.mutation<RequestResult<User>, LoginProps>({
      query: data => ({
        url: 'users/',
        method: 'GET',
        params: {
          username: data.username,
          password: data.password,
        },
      }),
      transformResponse: (response: User[]) => {
        return {
          isSuccess: true,
          data: response[0],
        };
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        if (response.status === 400) {
          return {
            isSuccess: false,
            errorMessage: 'Invalid username or password',
          };
        } else {
          return {
            isSuccess: false,
            errorMessage: 'Error logging in',
          };
        }
      },
    }),
    sigup: builder.mutation<RequestResult<User>, SignupProps>({
      query: data => ({
        url: 'users/',
        method: 'POST',
        body: {
          fullname: data.fullname,
          username: data.username,
          password: data.password,
          accounts: [
            {
              account: data.accountNo,
              balance: getRandomInteger(),
            },
          ],
        },
      }),
      transformResponse: (response: User) => {
        return {
          isSuccess: true,
          data: response,
        };
      },
      transformErrorResponse: _ => {
        return {
          isSuccess: false,
          errorMessage: 'Error logging in',
        };
      },
    }),
    addNewAccount: builder.mutation<RequestResult<void>, AddAccountProps>({
      query: data => ({
        url: 'users/' + data.user.id,
        method: 'PUT',
        body: {
          fullname: data.user.fullName,
          username: data.user.username,
          password: data.user.password,
          accounts: [
            ...data.user.accounts,
            {
              account: data.accountno,
              balance: getRandomInteger(),
            },
          ],
        },
      }),
    }),
  }),
});
export const {useLoginMutation, useSigupMutation} = rtkQueryService;
