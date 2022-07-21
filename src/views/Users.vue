<template>

<MainNav></MainNav>
<p class="w-11/12 flex flex-row-reverse mb-2"><router-link to="users/create" class="bg-green-500 rounded-md text-white p-2 flex-end">Add New User</router-link></p>
<table class="w-11/12 text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th>id</th>
            <th>User</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="user in { ...users }" :key="user.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td class="flex flex-rows space-x-1 text-white flex-end">
                    <a href="javascript:void(0)" class="rounded-md bg-indigo-500 p-2 hover:bg-indigo-600" @click="editUser(user.id)">Edit</a>
                    <a href="javascript:void(0)" class="rounded-md bg-red-500 p-2 hover:bg-red-600" @click="deleteUser(user.id)">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import MainNav from "@/components/MainNav.vue"
import { APISettings } from "@/api.config"
import axios from "axios"

    export default{
        components: { MainNav },
        data(){
            return{
                users: [],
                roles: [],
                logged: localStorage.getItem('logged'),
                token: localStorage.getItem('token')
            }
        },
        beforeCreate(){
        
        
        },
        created(){
            if(this.logged !== 'true'){
                this.$router.push('/')
           }
            axios.get(APISettings.baseURL+'users',{
                headers: {
                    'Authorization': 'Bearer '+this.token,
                    'Accept': 'application/json',
                }
                })
                .then(res =>  {
                    
                    this.users = { ...res.data.users }
                    this.roles = {...res.data.roles }
                    console.log(this.users)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        methods: {
            editUser(id: number){
                localStorage.setItem('user_id_edit', JSON.stringify(id))

                return this.$router.push('/users/edit')
            },

            deleteUser(id: number){
                
                axios.delete(APISettings.baseURL+'users/'+id,{
                headers: {
                    'Authorization': 'Bearer '+this.token,
                    'Accept': 'application/json',
                }
                })
                .then(res =>  {
                    
                    this.users = { ...res.data.users }
                    return this.$router.push('/users')
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    td {
        padding: 6px 4px 6px 4px;
    }

    th {
        padding: 6px 3px 6px 3px;
    }
</style>