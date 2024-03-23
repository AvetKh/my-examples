import { api } from "./_api.root";
import { ApiResponse, LoginResponse, PhoneLoginResponse, UserProfile } from "./types";

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        profile: build.query<UserProfile, void>({
            query: () => '/auth/me',
            keepUnusedDataFor: Number.MAX_SAFE_INTEGER,
            transformResponse(value: ApiResponse<UserProfile>): UserProfile {
                // console.log(value);
                if (value.data !== null) {
                    return value.data
                }
                throw new Error(value.errors.join('\n'))
            },
            providesTags: [{id: 'PROFILE', type: 'UserProfile'}, 'UserContent']
        }),
        emailExists: build.query<void, { email: string }>({
            query: ({email}) => ({
                method: 'post',
                url: '/auth/login/new',
                body: {
                    email: email.trim().toLowerCase(),
                    password: '',
                    type: "email"
                },
            }),
        }),
        passwordLogin: build.mutation<LoginResponse, { email: string, password: string }>({
            query: ({email, password}) => ({
                method: 'post',
                url: '/auth/login/new',
                body: {email: email.trim().toLowerCase(), password, type: "email"},
            }),
            invalidatesTags: ['AllPendingOrders'],
        }),
        tokenLogIn: build.mutation<LoginResponse, {
            type: 'google' | 'apple' | 'facebook',
            token: string,
            meta?: any
        }>({
            query: ({token, type, meta}) => ({
                method: 'post',
                url: '/auth/login/new',
                body: {token, type, meta},
            }),
            invalidatesTags: ['AllPendingOrders'],
        }),
        phoneLogin: build.mutation<PhoneLoginResponse, { phone: string, pin: number }>({
            query: ({phone, pin}) => {
                return ({
                    method: 'post',
                    url: '/auth/login/new',
                    body: {
                        phone: phone.trim(),
                        pin,
                        type: "phone"
                    },
                })
            },
        }),
        phoneExists: build.query<void, { phone: string }>({
            query: ({phone}) => {
                return ({
                    method: 'post',
                    url: '/auth/login',
                    body: {
                        phone: phone.trim(),
                        type: "phone"
                    },
                })
            },
        }),
        sendEmailPin: build.mutation<ApiResponse<string>, { email: string }>({
            query: ({email}) => ({
                method: 'POST',
                url: '/security/pin/email',
                body: {email},
            }),
        }),
    }),
    overrideExisting: true,
})
