import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export function createSimpelAsyncThunk(name, apiUtilFunciton) {
  return createAsyncThunk(
    name,
    async (args, thunkAPI) => {
      const argsArray = Array.isArray(args) ? args : [args]
      try {
        const response = await apiUtilFunciton(...argsArray)
        return response.data
      }
      catch (e) {
        return thunkAPI.rejectWithValue(e)
      }
    }
  )
}

export function loginUser(user) {
  return axios.post('http://localhost:3000/api/session/', {
    user
  }, { withCredentials: true })
}

export function logoutUser() {
  return axios.delete('http://localhost:3000/api/session/',
    {},
    { withCredentials: true })
}

export function getPresignedUrlForUserAvatar() {
  return axios.get('http://localhost:3000/api/session/avatar_presigned_url')
}

export function follow(user_id) {
  return axios.post('http://localhost:3000/api/session/follows', { user_id: user_id })
}

export function unfollow(user_id) {
  return axios.delete('http://localhost:3000/api/session/follows/' + encodeURI(user_id), { data: { followed_type: "User" } })
}

export function createUser(user) {
  return axios.post('http://localhost:3000/api/users/', { user: user })
}

export function updateUser(user) {
  return axios.patch(`http://localhost:3000/api/users/${user.id}`, { user: user })
}

export function findUser(queryString) {
  return axios.get('http://localhost:3000/api/users?q=' + encodeURI(queryString))
}

export function getUser(id) {
  return axios.get('http://localhost:3000/api/users/' + encodeURI(id))
}

export function getFollowers(user_id) {
  return axios.get('http://localhost:3000/api/users/' + encodeURI(user_id) + '/follows?type=followers')
}

export function getFollowings(user_id) {
  return axios.get('http://localhost:3000/api/users/' + encodeURI(user_id) + '/follows?type=followed_users')
}
