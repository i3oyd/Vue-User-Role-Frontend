<template>
<main-nav></main-nav>
<div class="w-full flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <div class="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
        </div>
        <h3 class="text-2xl font-bold text-center">Join us</h3>
       
        <form action="/" id="regForm">
            <div>
                <p class="text-red-500 text-sm pb-2" v-if="errorMessage">{{ errorMessage }}</p>
            </div>
            <div class="mt-4">
                <div>
                    <div v-if="errors">
                        <p class="text-red-500 text-sm" v-if="errors.name">{{ errors.name[0] }}</p>
                    </div>
                    <label class="block" for="Name">Name</label>
                            <input type="text" placeholder="Name"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                name="name"
                                v-model="formData.name"
                                >
                </div>
                <div class="mt-4">
                    <div v-if="errors">
                        <p class="text-red-500 text-sm" v-if="errors.email">{{ errors.email[0] }}</p>
                    </div>
                    <label class="block" for="email">Email</label>
                            <input type="text" placeholder="Email"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                name="email"
                                v-model="formData.email"
                                >
                </div>
                <div class="mt-4">
                    <div v-if="errors">
                        <p class="text-red-500 text-sm" v-if="errors.password">{{ errors.password[0] }}</p>
                    </div>
                    <label class="block">Password</label>
                            <input type="password" placeholder="Password"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                name="password"
                                v-model="formData.password"
                                >
                </div>
                <div class="mt-4">
                    <label class="block">Confirm Password</label>
                            <input type="password" placeholder="Password"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                name="password_confirmation"
                                v-model="formData.password_confirmation"
                                >
                </div>
                <div class="flex">
                    <button type="button" class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" @click="registerUser()">Create
                        Account</button>
                </div>
                <div class="mt-6 text-grey-dark">
                    Already have an account?
                    <router-link class="text-blue-600 hover:underline" to="/login">
                        Log in
                    </router-link>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script lang="ts">
import { APISettings } from "@/api.config"
import axios from "axios"
import MainNav from "../components/MainNav.vue"
export default {
    components: { MainNav },
    data() {
        return {
            formData: {
                "name": "",
                "email": "",
                "password": "",
                "password_confirmation": "",
            },
            errors: [],
            errorMessage: ''
        };
    },
    methods: {
        async registerUser() {
            // const regData = {'name': 'John', 'email': 'john@gmail.com','password': '12345678', 'password_confirmation': '12345678'}
            axios.get("http://localhost:8000/sanctum/csrf-cookie").then(response => {
                axios.post(APISettings.baseURL + "register", this.formData)
                    .then(res => {
                    localStorage.setItem('logged','true')
                    localStorage.setItem('token',res.data.token)
                    localStorage.setItem('user',JSON.stringify(res.data.user))
                    this.$router.push("/")
                })
                    .catch(err => {
                    this.errors = err.response.data.errors
                    this.errorMessage = err.response.data.message
                });
            });
        }
    }
}


</script>
