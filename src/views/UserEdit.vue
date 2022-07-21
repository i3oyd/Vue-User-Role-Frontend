<template>
<div class="w-full flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-2 mx-4 mt-4 text-left bg-white shadow-lg md:w-2/3 lg:w-2/3 sm:w-4/5 w-11/12">
        <h3 class="text-2xl font-bold text-center">Edit/Update User</h3>
        <form action="/" id="newUserForm">
            <div class="mt-4">
                <div>
                    <label class="block" for="Name">Name</label>
                            <input type="text" placeholder="Name"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                name="name"
                                v-model="formData.name"
                                >
                </div>
                <div class="mt-4">
                    <label class="block" for="email">Email</label>
                            <input type="text" placeholder="Email"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                name="email"
                                v-model="formData.email"
                                >
                </div>
                <div class="mt-4">
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
                <div class="mt-4">
                    <label class="block">User Role: </label>
                        <select id="role" name="role_id" v-model="formData.role_id">
                            <option v-for="(role,i) in { ...roles }" :value="role.id" :key="i"
                            :selected="role.id == user.role_id"
                                >{{ role.name }}</option>
                        </select>
                </div>
                <!-- <span class="text-xs text-red-400">Password must be same!</span> -->
                <div class="flex">
                    <button type="button"
                     class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                     @click="updateUser()"
                     >Update
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script lang="ts">
import { APISettings } from "@/api.config"
import axios from "axios"

export default {
    data(){
        return{
            roles: [],
            user: [],
            formData: {
                'name': '',
                'email': '',
                'password': '',
                'password_confirmation': '',
                'role_id': ''
            },
            user_id_edit: localStorage.getItem('user_id_edit'),
        }
    },
    created(){
        this.fetchUser()
    },
    methods: {
        updateUser(){
                axios.put(APISettings.baseURL+'users/'+this.user_id_edit, this.formData,{
                    headers: {
                        'Authorization': 'Bearer '+APISettings.token
                    }
                })
                .then(res =>  {
                    console.log(res.data)
                    return this.$router.push('/users')
                })
                .catch(err => {
                    console.log(err.message,err)
                })
        },
        fetchUser(){
            axios.get(APISettings.baseURL+'users/'+this.user_id_edit+'/edit',{
                    headers: {
                        'Authorization': 'Bearer '+APISettings.token
                    }
                })
                .then(res =>  {
                    this.roles = {...res.data.roles}
                    this.user = {...res.data.user}
                    this.formData.name = res.data.user.name
                    this.formData.email = res.data.user.email
                    this.formData.role_id = res.data.user.role_id
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }
}


</script>