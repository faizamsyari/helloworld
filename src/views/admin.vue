<script>
import axios from 'axios'
export default{
    data(){
        return {
            value:"",
            nomor:"",
            tagihan:"",
            jenis:"",
            dataiuran:"",
            email:"",
            password:"",
            role:""
        }
    },
    created(){
        // this.ambildata()
    },
    methods:{
        // reloadPage(){
        //     location.reload()
        // },
        getData(){
            if(this.value.length < 1){
                alert("Data Tidak Boleh Kosong")
            } else {
                let result =  axios.post("http://localhost:4000/create",{
                "nama":this.value,
                "email":this.email,
                "password":this.password,
                "alamat":this.nomor,
                // "tagihan":this.tagihan,
                // "jenis":this.jenis,
                "role":"client"
                }).then(response=>{
                    // console.log(response.data);
                    if(`${response.data}` == "ADA KESALAHAN SILAHKAN COBA LAGI"){
                        alert(`${response.data}`)
                    } else{
                        alert("DATA BERHASIL DITAMBAHKAN")
                        this.$router.push("/choose")
                    }
                })
            }
        },

        lihatdata(){
            // this.$router.push("/tabel")
        },
        
        totagihan(){
            this.$router.push("/choose")
        },
        logout(){
            let result =  axios.post("http://localhost:4000/logout").then(response=>{
                // console.log(response.data);
                if(`${response.data}` == "AKUN TERLOGOUT"){
                    alert("LOGOUT BERHASIL")
                    localStorage.setItem("autenticated", false)
                    this.$router.push("/")
                } else{
                    alert("TERJADI KESALAHAN")
                }
            })
            
        }
    }
}
</script>
<template>
    <div class="w-full px-40 py-5">
      <input v-model="email" class="shadow appearance-none border rounded w-full py-6 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="email" placeholder="Email">
      <p class="font-bold text-white"> Value: {{ email }}</p>
      <input v-model="password" class="shadow appearance-none border rounded w-full py-6 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="password" placeholder="Password">
      <p class="font-bold text-white"> Value: {{ password }}</p>
      <input v-model="value" class="shadow appearance-none border rounded w-full py-6 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama" type="text" placeholder="Nama Lengkap">
      <p class="font-bold text-white"> Value: {{ value }}</p>
      <input v-model="nomor" class="shadow appearance-none border rounded w-full mt-4 py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nomor" type="text" placeholder="Nomor Rumah">
      <p class="font-bold text-white"> Value: {{ nomor }}</p>
      <!-- <input v-model="tagihan" class="shadow appearance-none border rounded w-full mt-4 py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tagihan" type="text" placeholder="Tagihan">
      <p class="font-bold text-white"> Value: {{ tagihan }}</p>
      <input v-model="jenis" class="shadow appearance-none border rounded font-bol w-full mt-4 py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="jenis" type="text" placeholder="Jenis Kelamin">
      <p class="font-bold text-white"> Value: {{ jenis }}</p> -->
    </div>

    <div class="grid justify-items-center p-2 ">
        <button @click="getData" class="bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            Tambahkan Akun
        </button>
    </div>

    <div class="grid justify-items-center p-2 ">
        <button @click="totagihan" class="bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            Tambahkan Tagihan
        </button>
    </div>

    <!-- <div class="grid justify-items-center p-2 ">
        <button @click="lihatdata" class="bg-red-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            Lihat Data 
        </button>
    </div> -->

    <div class="grid justify-items-center p-2 ">
        <button @click="logout" class="bg-red-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            Logout 
        </button>
    </div>
    
</template>
<style>
    
</style>