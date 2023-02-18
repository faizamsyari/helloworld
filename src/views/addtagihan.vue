<script>
import axios from 'axios'
export default{
    data(){
        return{
            bulan:"",
            nominal:0,
            value:"",
            nomor:"",
            bulan:"",
            tahun:0,
            status:"Belum Lunas",
            id: this.$route.params.id,
            nama: this.$route.params.nama,
            alamat: this.$route.params.alamat,
            em:this.$route.params.em,
        }
    },
    methods:{
        getdata(){
            console.log(this.nama)
            console.log(this.alamat)
        },
        addtagihan(){
            let result =  axios.post("http://localhost:4000/addtagihan",{
                "id":this.id,
                "nama":this.nama,
                "alamat":this.alamat,
                "bulan":this.bulan,
                "nominal":this.nominal,
                "tahun":this.tahun,
                "status":this.status,
                "email":this.em 
                }).then(response=>{
                    // console.log(response.data);
                    if(`${response.data}` == "ADA KESALAHAN SILAHKAN COBA LAGI"){
                        alert(`${response.data}`)
                    } else{
                        alert("TAGIHAN BERHASIL DITAMBAHKAN")
                        this.$router.push("/tabel")
                    }
                })
        }
    }
}
</script>
<template>
     <div class="w-full px-40 py-5">
      <input v-model="bulan" class="shadow appearance-none border rounded w-full py-6 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Tuliskan Bulan">
      <p class="font-bold text-white"> Value: {{ bulan }}</p>
      <input v-model="tahun" class="shadow appearance-none border rounded w-full py-6 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="number" placeholder="Masukkan Tahun">
      <p class="font-bold text-white"> Value: {{ tahun }}</p>
      <input v-model="nominal" class="shadow appearance-none border rounded w-full py-6 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="number" placeholder="Masukkan Nominal">
      <p class="font-bold text-white"> Value: {{ nominal }}</p>  
      <input v-model="status" class="shadow appearance-none border rounded w-full py-6 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Status">
      <p class="font-bold text-white"> Value: {{ status }}</p>
    </div>
    <div class="grid justify-items-center p-2 ">
        <button @click="addtagihan" class="bg-red-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            Tambahkan Tagihan 
        </button>
    </div>
</template>