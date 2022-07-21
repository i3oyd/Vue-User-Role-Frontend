<script lang="ts">
import axios from "axios"
import { APISettings } from "@/api.config"

export default {
    data(){
        return{
            token: localStorage.getItem('token')
        }
    },
    created(){
        axios.post(APISettings.baseURL+'logout',{},{
                headers: {
                    'Authorization': 'Bearer '+this.token,
                    'Accept': 'application/json'
                }
            })
            .then(res => {
                console.log(res.data)
                localStorage.clear()
                //localStorage.setItem('logged','false')
                return this.$router.push('/')
            })
            .catch(err => {
                console.log(err.response.data, err.message)
            })
    }
}

</script>
<template>
</template>