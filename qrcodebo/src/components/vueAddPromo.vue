<template>
    <div class="main">
        <button class="retour" @click="goHome">Home</button>
        <h1>Ajouter une promotion</h1>
        <form action="">
            <input v-model="codeInput" type="text" class="name" placeholder="code promo..">
            <input v-model="promoInput" type="text" class="name" placeholder="valeur..">
            <input v-model="descInput" type="text" class="name" placeholder="description..">
            <input v-model="codeImageInput" type="text" class="name" placeholder="qrcode..">
            <FunctionalCalendar 
            v-model="calendarData"
            :is-modal='true' 
            :is-date-range='true'
            :date-format="'yyyy-mm-dd'"
            ></FunctionalCalendar>
            <br>
            <button class="buttonAdd" type="submit" @click="onSubmit" v-bind:style="{display: computedDisplayAdd}">Ajouter</button>
            <button class="buttonModify" type="submit" @click="onModifyPromo()" v-bind:style="{display: computedDisplayModify}">Modifier</button>
        </form>
        <table>
            <tr class="title">
                <th>Code Promo</th>
                <th>Valeur</th>
                <th>Description</th>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>QrCode</th>
            </tr>
            <tr class="items" v-for="(info, index) in infos" :key="index" >
                <td>{{info.libellePromotion}}</td>
                <td>{{info.promotion}}</td>
                <td>{{info.description}}</td>
                <td>{{info.dateDebut}}</td>
                <td>{{info.dateFin}}</td>
                <td>{{info.qrCode.codeImage}}</td>
                <td><img src="https://image.flaticon.com/icons/svg/684/684930.svg" @click="onModify(info.libellePromotion, info.description, info.promotion, info.dateDebut, info.dateFin, info._links.self.href,info.qrCode.codeImage , $event)"></td>
                <td><img src="https://image.flaticon.com/icons/svg/491/491721.svg" @click="deleteCode(info._links.self.href)"></td>
            </tr>
        </table>
    </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import { FunctionalCalendar } from 'vue-functional-calendar'
import axios from 'axios'
export default {
    name: 'vueOffice',
    data: () => ({
        infos: "",
        codeInput: "",
        descInput: "",
        promoInput: "",
        dateDebutInput: "2020-02-03",
        dateFinInput: "2020-02-05",
        displayModify: "none",
        displayAdd: "inline",
        hrefCodeModify: "",
        calendarData: {},
        codeImageInput: [],
  
    }),
    components: {
        FunctionalCalendar
    },

    created: function() {
        this.fetchData()
    },
    computed: {
        computedDisplayModify() {
            return this.displayModify;
        },
        computedDisplayAdd() {
            return this.displayAdd;
        },
        formQrCode() {
            return {
                codeImage : this.codeImageInput
            }
        }
    },

    methods: {
        goHome() {
            this.$router.push('office')
        },
        fetchData() {
            //var AuthStr = this.$route.params.accessToken
            var AuthStr = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTU4MDg5NzE5NiwiZXhwIjoxNTgwOTgzNTk2fQ.IOLUboedNmpwg5Ye4iybfSAt7YlyKDjaxbOonsRUUV7NiLPCmo0vqPxJZVNM5HAJyQzB8BpBd9hLc5gbNk7HnA"
            console.log(AuthStr)
             axios.get("http://127.0.0.1:8080/api-rest/codes/", { headers: { Authorization: "Bearer " + AuthStr}}).then(response =>{
                this.infos = response.data._embedded.codes
                console.log(this.infos)
            })
        },
        onSubmit(evt) {
            evt.preventDefault();
            this.fetchData()
            var libellePromotion = this.codeInput
            var promotion = this.promoInput
            var description = this.descInput
            var qrCode = this.formQrCode
            console.log(this.formQrCode.qrCode)
            var[anneeDebut, moisDebut, jourDebut] = this.calendarData.dateRange.start.date.split('-')
            var[anneeFin, moisFin, jourFin] = this.calendarData.dateRange.end.date.split('-')
            if(moisDebut <= 9) {
                moisDebut = "0" + moisDebut
            }
            if(moisFin <= 9) {
                moisFin = "0" + moisFin
            }
            if(jourDebut <= 9) {
                jourDebut = "0" + jourDebut
            }
            if(jourFin <= 9) {
                jourFin = "0" + jourFin
            }
            var dateDebut = anneeDebut+"-"+moisDebut+"-"+jourDebut
            var dateFin = anneeFin+"-"+moisFin+"-"+jourFin
            //var AuthStr = this.$route.params.accessToken
            var AuthStr = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTU4MDg5NzE5NiwiZXhwIjoxNTgwOTgzNTk2fQ.IOLUboedNmpwg5Ye4iybfSAt7YlyKDjaxbOonsRUUV7NiLPCmo0vqPxJZVNM5HAJyQzB8BpBd9hLc5gbNk7HnA"
            axios.post("http://127.0.0.1:8080/api-rest/codes/", {
                libellePromotion,
                promotion,
                description,
                dateDebut,
                dateFin,
                qrCode},
                { headers: {'Authorization': 'Bearer ' + AuthStr}
            }).then(response => {
                console.log("code : " + libellePromotion +  " promotion : " + promotion + " desc : " + description + " DateDebut : " + dateDebut + " DateFin : " + dateFin)
                this.fetchData()
            })
            this.fetchData()
        },
        onModify(infoCodeData, infoDescData, infoPromoData, infoDateD, infoDateF, hrefCode, infoImg ,event){
            event.preventDefault()
            console.log(infoCodeData + "  " + infoDescData)
            this.codeInput = infoCodeData
            this.descInput = infoDescData
            this.promoInput = infoPromoData
            this.displayModify = "inline"
            this.displayAdd = "none"
            this.hrefCodeModify = hrefCode
            this.codeImageInput = infoImg
        },

        onModifyPromo(){
            var libellePromotion = this.codeInput
            var description = this.descInput
            var promotion = this.promoInput
            var qrCode = this.formQrCode
            var[anneeDebut, moisDebut, jourDebut] = this.calendarData.dateRange.start.date.split('-')
            var[anneeFin, moisFin, jourFin] = this.calendarData.dateRange.end.date.split('-')
            if(moisDebut <= 9) {
                moisDebut = "0" + moisDebut
            }
            if(moisFin <= 9) {
                moisFin = "0" + moisFin
            }
            if(jourDebut <= 9) {
                jourDebut = "0" + jourDebut
            }
            if(jourFin <= 9) {
                jourFin = "0" + jourFin
            }
            var dateDebut = anneeDebut+"-"+moisDebut+"-"+jourDebut
            var dateFin = anneeFin+"-"+moisFin+"-"+jourFin
            console.log(this.hrefCodeModify)
            // On laisse le token en dur sinon c'est un peu chiant de se co
            //var AuthStr = this.$route.params.accessToken
            var AuthStr = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTU4MDg5NzE5NiwiZXhwIjoxNTgwOTgzNTk2fQ.IOLUboedNmpwg5Ye4iybfSAt7YlyKDjaxbOonsRUUV7NiLPCmo0vqPxJZVNM5HAJyQzB8BpBd9hLc5gbNk7HnA"
            axios.put(this.hrefCodeModify, {
                libellePromotion,
                description,
                promotion,
                dateDebut,
                dateFin,
                qrCode},
                { headers: { Authorization : "Bearer " + AuthStr }
            }).then(response => {
                console.log(libellePromotion + " " + description + " " + this.hrefCodeModify)
                this.fetchData()
            })
            this.fetchData()
            this.displayModify = "none"
            this.displayAdd = "inline"
            this.codeInput = ""
            this.descInput = ""
            this.promoInput = ""
            this.dateDebutInput = ""
            this.dateFinInput = ""
            this.codeImageInput = ""
        },
        deleteCode(hrefCode) {
            this.fetchData()
            console.log("delete clicked")
            var AuthStr = this.$route.params.accessToken
            axios.delete(hrefCode, { headers: { Authorization: "Bearer " + AuthStr}}).then(response =>{
                console.log("delete de "+hrefCode+" effectué")
                this.fetchData()
            })
        },

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
        padding: 2.5px;
        text-align: left;
    }
    .title {
        font-size: 16px;
    }
    .items:hover {
        background-color: #f5f5f5;
    }
    form {
      float: left;
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
