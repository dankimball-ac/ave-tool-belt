import { identityAxios } from '@/lib/axios'
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'
import Cookies from 'js-cookie'
import { useQuery } from 'react-query'

type QueryFnType = typeof forgotPassword

type UseLoginOptions = {
  config?: QueryConfig<QueryFnType>
  email: string
}

const userToken = Cookies.get('token')

const forgotPassword = async (email: string) => {
  const response: any = await identityAxios.post('api/Account/resetPassword', {
    email,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  })
  return response
}

export const useForgotPassword = ({ config, email }: UseLoginOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    enabled: false,
    queryFn: () => forgotPassword(email),
  })
}
