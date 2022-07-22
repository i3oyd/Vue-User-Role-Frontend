<template>
<div class="w-full flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-2 mx-4 mt-4 text-left bg-white shadow-lg md:w-2/3 lg:w-2/3 sm:w-4/5 w-11/12">
        <h3 class="text-2xl font-bold text-center">Edit/Update Role</h3>
        <form action="/" id="editRoleForm">
            
            <p class="text-red-500 text-sm pb-2" v-if="errorMessage">{{ errorMessage }}</p>
            <div v-if="errors">
                <p class="text-red-500 text-sm pb-2" v-if="errors.name">{{ errors.name[0] }}</p>
                <p class="text-red-500 text-sm pb-2" v-if="errors.description">{{ errors.description[0] }}</p>
            </div>
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
                    <label class="block" for="Description">Description</label>
                            <textarea type="text" placeholder="Description"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                name="description"
                                v-model="formData.description"
                                />
                </div>
                <!-- <span class="text-xs text-red-400">Password must be same!</span> -->
                <div class="flex">
                    <button type="button"
                     class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                     @click="updateRole()"
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
            formData: {
                'name': '',
                'description': ''
            },
            role_id_edit: localStorage.getItem('role_id_edit'),
            errors: [],
            errorMessage: ''
        }
    },
    created(){
        this.fetchRole()
    },
    methods: {
        updateRole(){
                axios.put(APISettings.baseURL+'roles/'+this.role_id_edit, this.formData,{
                    headers: {
                        'Authorization': 'Bearer '+APISettings.token
                    }
                })
                .then(res =>  {
                    console.log(res.data)
                    return this.$router.push('/roles')
                })
                .catch(err => {
                    this.errors = err.response.data.errors
                    this.errorMessage = err.response.data.message
                })
        },
        fetchRole(){
            axios.get(APISettings.baseURL+'roles/'+this.role_id_edit+'/edit',{
                    headers: {
                        'Authorization': 'Bearer '+APISettings.token
                    }
                })
                .then(res =>  {
                    this.roles = {...res.data.roles}
                    this.formData.name = res.data.role.name
                    this.formData.description = res.data.role.description
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }
}


</script>