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
			return state.accessToken
		},
	},
	mutations: {
		loginSuccess(state, { token, user }) {
			state.accessToken = token
			state.loginUser = user
			localStorage.setItem('token', token)
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
		login({ commit }, { username, password }) {
			axiosInstance
				.post('/rest-auth/login/', { username, password })
				.then((res) => {
					commit('loginSuccess', res.data)
					axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
				})
				.catch((err) => console.log(err))
		},
		logout({ commit }) {
			commit('logout')
			axiosInstance.defaults.headers.commit['Authorization'] = null
		},
		signUp(_, { username, nickname, password1, password2 }) {
			axiosInstance
				.post('/rest-auth/registration/', { username, nickname, password1, password2 })
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
