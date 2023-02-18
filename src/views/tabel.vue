<script>
import axios from 'axios';

export default{
   data(){
    return{
        datasensor:[],
        namaup:"",
        nomorup:"",
        tagihanup:"",
        jenisup:"",
    }
   },

   created(){
    this.getData()
   },
   methods:{
    // async getData(){
    //     const data = await fetch("http://localhost:4000/get")
    //     const datajson = await data.json()
    //     this.datasensor = datajson
    //     console.log(this.datasensor)
    // }
    async getData(){
        const response= await axios.get("https://agreeable-blue-shrug.cyclic.app/get")
        this.datasensor = response.data
        console.log(this.datasensor)
    },

    hapus(x){
        console.log(x.id)
        console.log(x.idku)
        const response = axios.post("https://agreeable-blue-shrug.cyclic.app/hapus",{
            "id":x.id,
            "idku":x.idku
            // "email":x.email
        })
        // console.log(x)
        // console.log(response)
        this.getData()
    },

    // ubah(x){
    //     const response = axios.put("http://localhost:4000/update",{
    //         "id":x,
    //         "nama":this.namaup,
    //         "alamat":this.nomorup,
    //         "tagihan":this.tagihanup,
    //         "jenis":this.jenisup
    //     })
    //     console.log(response)
    //     this.getData()
    // },
    ubah(x){
        // if(x.status == "Lunas"){
        //     this.$router.push({
        //         name:"update",
        //         params:{
        //             id:x.id,
        //             idku:x.idku,
        //             statusku:"true",
        //             nominal:x.nominal
        //         }
        //     })
        // } else{
        //     this.$router.push({
        //         name:"update",
        //         params:{
        //             id:x.id,
        //             idku:x.idku,
        //             statusku:"false"
        //         }
        //     })
        // }
        this.$router.push({
                name:"update",
                params:{
                    id:x.id,
                    idku:x.idku,
                    statusku:x.status,
                    nominal:x.nominal

                }
            })
        // this.$router.push("/update")
    }
   }
}
</script>
<template>
    <RouterView />
   <div class="w-full text-white  font-bold grid justify-items-center py-20 px-10">
    <!-- Hello {{ datasensor }} -->
    <table class="w-full border-collapse border border-white text-white">
            <tr>
                <td class="border border-white p-3">Nama Lengkap</td>
                <td class="border border-white p-3">Email</td>
                <td class="border border-white p-3">Nomor Rumah</td>
                <td class="border border-white p-3">Tagihan</td>
                <td class="border border-white p-3">Bulan</td>
                <td class="border border-white p-3">Tahun</td>
                <td class="border border-white p-3">Status</td>
                <td class="border border-white p-3">Aksi</td>
                <!-- <td class="border border-white p-3">Opsi Ubah</td> -->

            </tr>
            <tr v-for="i in datasensor">
                <td class="border border-white p-3">{{ i.nama }}</td>
                <td class="border border-white p-3">{{ i.email }}</td>
                <td class="border border-white p-3">{{ i.alamat }}</td>
                <td class="border border-white p-3">{{ i.nominal }}</td>
                <td class="border border-white p-3">{{i.bulan}}</td>
                <td class="border border-white p-3">{{i.tahun}}</td>
                <td v-if="i.status == 'Lunas'" class="border border-white p-3">Lunas</td>
                <td v-if="i.status == 'Belum Lunas'" class="border border-white p-3">Belum Lunas</td>
                <td class="border border-white p-3">
                    <button v-if ="i.status == 'Belum Lunas'" @click="hapus(x=i)" class="bg-red-700 inline-block mx-2 p-2"> Hapus</button>
                    <!-- <button @click="ubah(x=i.id)" class="bg-green-700 inline-block mx-2 my-2.5 p-2"> Ubah</button> -->
                    <button @click="ubah(x=i)" class="bg-green-700 inline-block mx-2 my-2.5 p-2"> Ubah</button>
                    
                </td>
                <!-- <td class="border border-white p-3">
                    <div class="w-full">
                        <input v-model="namaup" class="shadow appearance-none border rounded w-fit p-1 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nama Lengkap">
                        <p class="font-bold text-white"> Value: {{ i.nama }}</p>
                        <input v-model="nomorup" class="shadow appearance-none border rounded w-fit mt-4 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Nomor Rumah">
                        <p class="font-bold text-white"> Value: {{ i.alamat }}</p>
                        <input v-model="tagihanup" class="shadow appearance-none border rounded w-fit mt-4 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Tagihan">
                        <p class="font-bold text-white"> Value: {{ i.tagihan }}</p>
                        <input v-model="jenisup" class="shadow appearance-none border rounded font-bol w-fit mt-4 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Jenis Kelamin">
                        <p class="font-bold text-white"> Value: {{ i.jenis }}</p>

                        <button @click="ubah(x=i.id)" class="bg-green-700 inline-block mx-2 my-2.5 p-2"> Ubah</button>
                        <button @click="coba" class="bg-green-700 inline-block mx-2 my-2.5 p-2"> Ubah</button>
                    </div>
                </td> -->
            </tr>
        </table>
   </div>

   


   <!-- <button @click="getData()">GET DATA</button> -->
</template>
<style></style>