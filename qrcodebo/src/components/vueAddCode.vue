<template>
    <div class="main">
        <button class="retour" @click="goHome">Home</button>
        <h1>Ajouter un qRCode</h1>
        <form action="">
            <input id="codeInput" v-model="codeInput" type="text" class="name" placeholder="code..">
            <br>
            <select name="" id="" class="list">
                <option value="">Promo 1</option>
                <option value="">Promo 2</option>
            </select>
            <button type="submit" @click="onSubmit">Ajouter</button>
        </form>
        <table>
            <tr class="title">
                <th>QRCode</th>
                <th>Promo</th>
            </tr>
            <tr class="items" v-for="(info, index) in infos" :key="index">
                <td> {{info.code}} </td>
                <td>  </td>
                <td><img src="https://image.flaticon.com/icons/svg/491/491721.svg" @click="deleteCode(info._links.self.href)"></td>
            </tr>
        </table>
    </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import axios from 'axios';
export default {
    name: 'vueOffice',
    data: () => ({
        infos: "",
        codeInput: "",
        descInput: ""
    }),

    created: function() {
        this.fetchData()
    },

    methods: {
        goHome() {
            this.$router.push('office')
        },
        fetchData() {
            axios.get("http://127.0.0.1:8080/api-rest/qRCodes/").then(response =>{
                this.infos = response.data._embedded.qRCodes
                console.log(this.infos)
            })
        },
        onSubmit(evt){
            evt.preventDefault();
            this.fetchData()
            var code = this.codeInput
            axios.post("http://127.0.0.1:8080/api-rest/qRCodes/", {
                code
            }).then(response => {
                console.log(code)
            })
            this.fetchData()
        },
        deleteCode(hrefCode) {
            this.fetchData()
            console.log("delete clicked")
            console.log(hrefCode)
            axios.delete(hrefCode).then(response =>{
                console.log("delete de "+hrefCode+" effectué")
                this.fetchData()
            })

        }
    }
}
</script>

<style scoped>
    table {
        float: right;
        margin: 10px;
        border-collapse: collapse;
        width: 75%;
    }
    table, th, td {
        border: 1px solid black;
    }
    th, td {
        text-align: left;
    }
    .title {
        font-size: 16px;
    }
    .items:hover {background-color: #f5f5f5;}

    form {
        float: left;
        margin-left: auto;
        margin-right: auto;
        width: 18%;
    }

    form input {
        width: 58%;
    }

    button {
        margin: 5px;
    }
    h1 {
        font-size: 30px;
        margin: auto;
    }
    .retour {
        float: left;
    }
</style>