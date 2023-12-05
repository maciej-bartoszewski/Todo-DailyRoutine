import { apiClient } from './ApiClient'

export const findAllTodo = (username) => apiClient.get(`/${username}/todo`)

export const deleteTask = (id) => apiClient.delete(`/todo/${id}`)

export const FindTask = (id) => apiClient.get(`/todo/${id}`)

export const addTask = (todo) => apiClient.put(`/todo`, todo)

export const updateTask = (id, isDone) => apiClient.patch(`/todo/${id}`, { isDone: isDone }, {
    headers: {
        'Content-Type': 'application/json'
    }
})
