import IdentityDto from '@/features/identity/types/identityDto'
import { identityAxios } from '@/lib/axios'
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'
import { useQuery } from 'react-query'

type QueryFnType = typeof getLogin | typeof getGoogleLogin

type baseOptions = {
  config?: QueryConfig<QueryFnType>
}

type UseLoginOptions = baseOptions & {
  email: string
  password: string
}

const getLogin = async (
  email: string,
  password: string
): Promise<IdentityDto> => {
  const result: IdentityDto = await identityAxios.post('Account/login', {
    email,
    password,
    rememberMe: false,
  })

  return result
}

const getGoogleLogin = async () => {
  const response = await identityAxios.post('/Account/external-login', {})
  return response
}

export const useExternalLogin = ({ config }: UseLoginOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    enabled: false,
    queryFn: () => getGoogleLogin(),
  })
}

export const useLogin = ({ config, email, password }: UseLoginOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    enabled: false,
    queryFn: () => getLogin(email, password),
  })
}
