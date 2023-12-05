import { apiClient } from './ApiClient'

export const findAllDaily = (username) => apiClient.get(`/${username}/daily`)

export const updateTask = (id, isDone) => apiClient.put(`/daily/${id}`, { isDone: isDone }, {
    headers: {
        'Content-Type': 'application/json'
    }
})

export const deleteTask = (id) => apiClient.delete(`/daily/${id}`)

export const addTask = (daily) => apiClient.post(`/daily`, daily)
