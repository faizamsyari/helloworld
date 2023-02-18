<script>
  import axios from 'axios'
  import AOS from 'aos'
  import 'aos/dist/aos.css'
  AOS.init()
  export default{
    data(){
        return {
            value:"",
            nomor:"",
            datasensor:""
        }
    },
    created(){
      console.log("created run")
      localStorage.setItem("autenticated", false)
    },
    methods:{
      getData(){
        this.$router.push("/admin")
        // alert("HALOOOOO")
      },
      async login(){
            if(this.value.length < 1){
                alert("Data Tidak Boleh Kosong")
            } else {
                let result =  axios.post("https://agreeable-blue-shrug.cyclic.app/login",{
                "nama":this.value,    
                "alamat":this.nomor,
                }).then(async response =>{
                  const datares = response.data
                  console.log(datares.data)
                  if(`${response.data}` == "ADA KESALAHAN COBA LAGI"){
                        alert(`${response.data}`)
                        localStorage.setItem("autenticated", false)
                        this.$router.push("/login")
                  } else if (`${datares.data}` == "BERHASIL LOGIN") {
                    // alert(`${response.data}`)
                    const response= await axios.post("https://agreeable-blue-shrug.cyclic.app/cekuser",{
                      "id": datares.uid
                    }).then(response =>{
                      console.log(response.data)
                      if (response.data.role == "client"){
                        localStorage.setItem("autenticated", true)
                        localStorage.setItem("status", "client")
                        this.$router.push({
                            name:"landing",
                            params:{
                                id:datares.uid,
                                em:this.value,
                                pw:this.nomor
                            }
                        })
                      } else if(response.data.role == "admin") {
                        localStorage.setItem("autenticated", true)
                        localStorage.setItem("status", "admin")
                        this.$router.push("/admin")
                      } else{
                        alert("ADA KESALAHAN SAAT LOGIN")
                      }
                    })
                    
                    
                    
                    // this.datasensor = response.data
                    // console.log(this.datasensor)
                    // console.log("IYAAA")
                    // localStorage.setItem("autenticated", true)
                    // this.$router.push("/admin")
                  }
                })
                // alert("Anda Telah login")
                // this.$router.push("/landing")
            }
        },
    }
  }
</script>

<template>
  <header>
    <div data-aos="zoom-in-up" data-aos-delay="200" class="w-full p-4 bg-slate-700 flex justify-between">
        <h1 class="w-fit font-bold text-white flex items-center p-4">House Pay</h1>
        <!-- <div class="grid justify-items-center p-2 ">
          <button @click="getData" class="bg-red-700 text-xs text-white hover:bg-gray-400 font-bold rounded-full inline-flex items-center px-2">
              Admin Action
          </button>
      </div> -->
  
    </div>
  </header>
  <body>
    <div class="bg-slate-800 h-24 items-center flex justify-center">
        <div data-aos="fade-right" data-aos-delay="200" class="w-fit flex justify-center font-bold text-white text-xl text-center"> SELAMAT DATANG DI WEB IURAN PERUMAHAN  </div>
    </div>
   <div class="flex flex-col p-5" data-aos="fade-up" data-aos-delay="1000">
    <div class="w-full h-fit flex flex-col sm:flex-row ">
      <img src="../assets/rumah.png" width="500" height="600" alt="inirumah">
      <div class="w-full h-fit sm:pl-72 sm:mt-14">
        <h3 class="text-white font-bold text-lg">Email</h3>
        <input v-model="value" class="shadow appearance-none border rounded w-96 py-6 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama" type="text" placeholder="Masukkan Email">
        <!-- <p class="font-bold text-white"> Value: {{ value }}</p> -->
        <div class="h-5"></div>
        <h3 class="text-white font-bold text-lg">Password</h3>
        <input v-model="nomor" class="shadow appearance-none border rounded w-96 mt-4 py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nomor" type="password" placeholder="Masukkan Password">
        <div class="h-5"></div>
        <!-- <p class="font-bold text-white"> Value: {{ nomor }}</p> -->
      <div class="grid justify-items-center p-2 ml-60 ">
          <button @click="login" class="bg-green-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              Login
          </button>
      </div>
      <!-- <RouterLink to="/admin">About</RouterLink> -->
    </div>
    </div>
  </div>
  <!-- ===========================INI PEMBATAS========================================== -->
  <div class="bg-slate-300 flex">
      <div class="max-w-3xl m-auto flex-row gap-12  items-center md:my-44">
        <div data-aos="fade-up bg-black">
          <h1 class="py-8 uppercase text-3.5 font-bold text-black text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">tentang kita</h1>
        </div>
        <div class="flex justify-center w-full">
          <div class="flex-col box-border flex justify-between items-center md:flex-row">
            <div data-aos="fade-down" data-aos-delay="200" class="flex justify-center md:mr-10 cursor-pointer mb-6 md:mb-0">
              <img src="../assets/faiz.jpg" alt="saya" class="flex justify-center w-40 rounded-full"/>
              <article class="ml-4 pt-2 flex justify-center items-center uppercase text-xl font-bold text-cyan-700 text-center w-80">faiz amsyari rustam</article>
              <article class="flex justify-center items-center text-base font-bold text-black text-center">Hidup Itu Adalah Sebuah Pertanyaan, Maka Dari Itulah Gunanya Kita Hidup Untuk Menjawab Pertanyaan Tersebut</article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
<style>
body{
  background-color: #1e293b;
  
}
</style>