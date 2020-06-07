import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const axiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:8000/v1',
	headers: { 'Content-Type': 'application/json' },
})

export default new Vuex.Store({
	state: {
		accessToken: null,
		loginUser: null,
		loading: false,
		profileUser: null,
	},
	getters: {
		isAuthenticated(state) {
			state.accessToken = state.accessToken || localStorage.getItem('token')
			return !!state.accessToken
		},
		loginUser(state) {
			return state.loginUser
		},
	},
	mutations: {
		loginSuccess(state, { token, user }) {
			state.accessToken = token
			state.loginUser = user
		},
		logout(state) {
			state.loginUser = null
			state.accessToken = null
			localStorage.removeItem('token')
		},
		profile(state, payload) {
			state.profileUser = payload
		},
	},
	actions: {
		login({ dispatch }, { username, password }) {
			axiosInstance
				.post('/rest-auth/login/', { username, password })
				.then((res) => {
					localStorage.setItem('token', res.data.token)
					// axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
					dispatch('getLoginUser')
				})
				.catch(() => {
					alert('아이디 비밀번호를 확인해주세요')
				})
		},
		getLoginUser({ commit }) {
			const token = localStorage.getItem('token')
			axiosInstance.defaults.headers.common['Authorization'] = `JWT ${token}`
			console.log(axiosInstance.defaults.headers)
			axiosInstance.get('/accounts/me/').then((res) => {
				commit('loginSuccess', res.data)
			})
		},
		logout({ commit }) {
			commit('logout')
			console.log('logout')
			axiosInstance.defaults.headers.common['Authorization'] = null
		},
		signUp(_, { username, nickname, password }) {
			console.log(axiosInstance.defaults.headers)
			axiosInstance
				.post('/accounts/', { username, nickname, password })
				.then()
				.catch((err) => console.log(err))
		},
		profile({ commit }, { user: { id } }) {
			axiosInstance.get(`/accounts/${id}/`).then((res) => {
				commit('profile', res.data)
			})
		},
	},
	modules: {},
})
