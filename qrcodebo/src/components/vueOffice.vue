<template>
    <div class="main">
        <form action="">
            <button @click="addPromo">Ajouter promo</button>
        </form>
        <table>
            <tr class="title">
                <th>QRCode</th>
                <th>Promo</th>
            </tr>
            <tr class="items" v-for="(info, index) in infos" :key="index">
                <td> {{info.qrCode.codeImage}} </td>
                <td> {{info.libellePromotion}} </td>
                
            </tr>
        </table>
    </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import router from "../router"; 
import axios from 'axios';
export default {
    name: 'vueOffice',
    data: () => ({
        description :"",
        infos: "",
    }),
    created: function() {
        this.fetchData()
    },

    methods: {
        addCode(){
            this.$router.push("addcode")
        },
        addPromo(){
            var AuthToken = this.$route.params
            this.$router.push({name: "addpromo", params: AuthToken})
        },
        fetchData() {
            // J'ai laissé le token en dur afin de faire des test + facilement
            //var AuthStr = this.$route.params.accessToken
            var AuthStr = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTU4MDg5NzE5NiwiZXhwIjoxNTgwOTgzNTk2fQ.IOLUboedNmpwg5Ye4iybfSAt7YlyKDjaxbOonsRUUV7NiLPCmo0vqPxJZVNM5HAJyQzB8BpBd9hLc5gbNk7HnA"
            console.log(AuthStr)
            axios.get("http://127.0.0.1:8080/api-rest/codes", { headers: { Authorization: 'Bearer ' + AuthStr }
            }).then(response =>{
                this.infos = response.data._embedded.codes
                console.log(this.infos) 
            })
        }
    }
}
</script>

<style scoped>
    table {
        margin-left: auto;
        margin-right: auto;
        border-collapse: collapse;
        width: 68%;
    }
    table, th, td {
        border: 1px solid black;
    }
    th, td {
        padding: 6px;
        text-align: left;
    }
    .title {
        font-size: 16px;
    }
    .items:hover {background-color: #f5f5f5;}

    form {
        margin-left: auto;
        margin-right: auto;
        width: 18%;
    }

    button {
        margin: 5px;
        margin-left: -130px;
    }
</style>