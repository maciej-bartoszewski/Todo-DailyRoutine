import { apiClient } from './ApiClient'

export const test = () => apiClient.get("/test")

export const isUsernameFree = (username) => apiClient.get(`/user/${username}`)

export const logToApp = (user) => apiClient.post(`/login`, user)

export const addNewUser = (user) => apiClient.post(`/register`, user)