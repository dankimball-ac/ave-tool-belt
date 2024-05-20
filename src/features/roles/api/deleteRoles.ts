import { useDeleteRequest } from '@/hooks/useDeleteRequest'
import { identityAxios } from '@/lib/axios'
import { AxiosHeaders } from 'axios'
import Cookies from 'js-cookie'

const route = `roles`
const token = Cookies.get('token')
const headers: AxiosHeaders = new AxiosHeaders({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
})
const axiosInstance = identityAxios

export function useDeleteRole() {
  const mutation = useDeleteRequest({ url: route, axiosInstance, headers })
  return mutation
}
