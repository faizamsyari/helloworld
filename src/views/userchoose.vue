<script>
   import axios from 'axios';
   export default{
    data(){
        return{
            dataku:[]
        }
    },
    created(){
        this.cek()
    },
    methods:{
        async cek(){
           const get =  await axios.get("https://tame-lime-mackerel-wrap.cyclic.app/cobasaja")
           this.dataku = get.data
           console.log(this.dataku)
        },
        totagihan(x){
            this.$router.push({
                name:"tagihan",
                params:{
                    nama:x.nama,
                    alamat:x.alamat,
                    id:x.idku,
                    em:x.email
                }
            })
        }
    }
   }
</script>
<template>
    <body class="p-8">
        <h1 class="text-white font-bold text-xl ml-12">Pilih User Yang Akan Ditambahkan Tagihannya</h1>
        <div class="h-5">

        </div>
        <div class="flex justify-center flex-wrap ">
            <div v-for="i in dataku" class="pl-3 pt-5 pb-3 w-full  bg-green-700 rounded-2xl h-fit sm:w-1/3 mx-12 my-4 flex flex-col text-center">
            <button @click="totagihan(x=i)" class="font-bold text-xl text-white text-start">Email: {{i.email}}</button>
            <button @click="totagihan(x=i)" class="font-bold text-xl text-white text-start">Nama: {{i.nama}}</button>
        </div>
        </div>
    </body>
</template>