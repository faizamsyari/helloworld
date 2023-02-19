<script>
import axios from 'axios';

export default{
    data(){
       return{
        id: this.$route.params.id,
        em: this.$route.params.em,
        pw: this.$route.params.pw,
        dataku:[],
        // showbuttonpay:""
       }
    },
    created(){
        this.ambildata()
    },
    methods:{
        logout(){
            let result =  axios.post("https://tame-lime-mackerel-wrap.cyclic.app/logout").then(response=>{
                // console.log(response.data);
                if(`${response.data}` == "AKUN TERLOGOUT"){
                    alert("LOGOUT BERHASIL")
                    localStorage.setItem("autenticated", false)
                    localStorage.clear("status")
                    this.$router.push("/")
                } else{
                    alert("TERJADI KESALAHAN")
                }
            })
            
        },
        async ambildata(){
            const response= await axios.post("https://tame-lime-mackerel-wrap.cyclic.app/ambildataperuser",{
                      "id": this.id
                    }).then(response =>{
                      console.log(response.data)
                      this.dataku = response.data
                      console.log(this.dataku)
                    })
        },
        printid(){
            console.log(this.id)
        },
        cek(x){
            let result =  axios.post("https://tame-lime-mackerel-wrap.cyclic.app/ambilbayaran",{
                "order_id":x.idku,
                "id":this.id,
            }).then(response=>{
                console.log(response)
                const statusres = response.data.status
                const datares = JSON.parse(response.data.responsedata)
                console.log(datares)
                if(statusres == "error" && datares.status_message == "Sorry. The bank/payment partner is experiencing some connection issues. Please retry later."){
                    alert("Koneksi Dengan Bank Sedang Bermasalah, Silahkan Coba Lagi Beberapa Saat")
                } else if (statusres == "success" && datares.transaction_status == "pending"){
                    alert("SEDANG MENUNGGU PEMBAYARAN-STATUS PENDING")
                } else if(statusres == "error" && datares.status_message == "Transaction doesn't exist." ){
                    alert("Ada Kesalahan Silahkan Coba Lagi, Transaksi Tidak Ada")
                } else if (datares.transaction_status == "settlement" && statusres == "success"){
                    alert("SELAMAT PEMBAYARAN TERKONFIRMASI DAN BERHASIL")
                    let result =  axios.post("https://tame-lime-mackerel-wrap.cyclic.app/login",{
                        "nama":this.em,    
                        "alamat":this.pw,
                    }).then(async response =>{
                            const datares = response.data
                            console.log(datares.data)
                        if(`${response.data}` == "ADA KESALAHAN COBA LAGI"){
                            alert(`${response.data}`)
                            localStorage.setItem("autenticated", false)
                            this.$router.push("/login")
                        } else if (`${datares.data}` == "BERHASIL LOGIN") {
                        // alert(`${response.data}`)
                            const response= await axios.post("https://tame-lime-mackerel-wrap.cyclic.app/cekuser",{
                            "id": datares.uid
                        }).then(response =>{
                            console.log(response.data)
                            if (response.data.role == "client"){
                                localStorage.setItem("autenticated", true)
                                localStorage.setItem("status", "client")
                                this.$router.push({
                                    name:"landing",
                                    params:{
                                        id:this.id,
                                        em:this.em,
                                        pw:this.pw
                                },
                            })
                            location.reload()
                            } else {
                                localStorage.setItem("autenticated", true)
                                localStorage.setItem("status", "admin")
                                this.$router.push("/admin")
                            }
                            })
                  }
                })
                }
                // console.log(response.data.transaction_status)
                // if(response.data.transaction_status == "pending"){
                //     alert("SEDANG MENUNGGU PEMBAYARAN-STATUS PENDING")
                // } else if (response.data.transaction_status == "settlement"){
                //     alert("SELAMAT PEMBAYARAN TERFONFIRMASI DAN BERHASIL")
                //     location.reload()
                // } 
            })   
        },
        async bayar(x){
            // console.log(x.idku)
            const response= await axios.post("https://tame-lime-mackerel-wrap.cyclic.app/bayar",{
                "payment_type": "bank_transfer",
                "bank_transfer": {
                    "bank": "bca"
                    },
                "transaction_details": {
                    "order_id": `${x.idku}`,
                    // "order_id": "S34363",
                    "gross_amount": x.nominal
                },
                "id_user":this.id
                }).then(response =>{
                    // console.log(JSON.parse(response.data.responsedata))
                    // console.log(response.data.status)
                    const responsedata = JSON.parse(response.data.responsedata)
                    const status = response.data.status
                    console.log(responsedata)
                    console.log(status)
                    if (responsedata.status_message == "Success, Bank Transfer transaction is created" && status == "success"){
                        console.log(responsedata)
                        console.log(responsedata.va_numbers[0].bank)
                        console.log(responsedata.va_numbers[0].va_number)
                        this.$router.push({
                             name:"pembayaran",
                             params:{
                                id:responsedata.order_id,
                                nominal:responsedata.gross_amount,
                                bank:responsedata.va_numbers[0].bank,
                                virtual:responsedata.va_numbers[0].va_number,
                                idku:this.id,
                                em:this.em,
                                pw:this.pw
                                // idku:x.idku
                            }
                        })

                    } else if (status == "error" && responsedata.status_message == "The request could not be completed due to a conflict with the current state of the target resource, please try again"){
                        console.log("APAAN TUH")
                        alert("Nomor VA Belum Expire, Silahkan Membayar Dengan Menggunakan Nomor VA Yang Ada Pada Tabel")
                    } else if (status == "error" && responsedata.status_message == "Unable to create va_number for this transaction"){
                        alert("Ada Kesalahan Silahkan Coba Lagi")
                    } else if (status == "error" && responsedata.status_message == "Sorry. The bank/payment partner is experiencing some connection issues. Please retry later."){
                        alert("Ada Kesalahan Silahkan Coba Lagi, Terdapat Permasalahan Koneksi Dengan Bank Yang Dituju")
                    }
                    //   this.$router.push("/pembayaran")
                      
                })
        }
    }
}
</script>
<template>
     <div class="w-full text-white  font-bold grid justify-items-center py-20 px-10">
    <!-- Hello {{ datasensor }} -->
    <table class="w-full border-collapse border border-white text-white">
            <tr >
                <td class="border border-white p-3">Nama Lengkap</td>
                <td class="border border-white p-3">Nomor Rumah</td>
                <td class="border border-white p-3">Tagihan</td>
                <td class="border border-white p-3">Bulan</td>
                <td class="border border-white p-3">Tahun</td>
                <td class="border border-white p-3">Nomor Virtual Account</td>
                <td class="border border-white p-3">Status</td>
                <td class="border border-white p-3">Aksi</td>
                <!-- <td class="border border-white p-3">Opsi Ubah</td> -->

            </tr>
            <tr v-for = "i in dataku">
                <td class="border border-white p-3">{{ i.nama}}</td>
                <td class="border border-white p-3">{{ i.alamat }}</td>
                <td class="border border-white p-3">{{ i.nominal }}</td>
                <td class="border border-white p-3">{{ i.bulan }}</td>
                <td class="border border-white p-3">{{ i.tahun }}</td>
                <td class="border border-white p-3">{{ i.nomorva }}</td>
                <td v-if="i.status == 'Lunas'" class="border border-white p-3">Lunas</td>
                <td v-if="i.status == 'Belum Lunas'" class="border border-white p-3">Belum Lunas</td>
                <!-- <td class="border border-white p-3">{{ i.status }}</td> -->
                <td class="border border-white p-3">
                    <button v-if="i.status == 'Belum Lunas'" @click="bayar(x=i)" class="bg-green-700 inline-block mx-2 p-2"> Bayar </button>
                    <button v-if="i.kondisi && i.status=='Belum Lunas'" @click="cek(x=i)" class="bg-green-700 inline-block mx-2 p-2"> Cek Pembayaran </button>
                    <button v-if="i.status == 'Lunas'" class="bg-red-700 inline-block mx-2 p-2"> TELAH TERBAYAR </button>
                </td>
            </tr>
        </table>
   </div>
   <div class="grid justify-items-center p-2 ">
        <button @click="logout" class="bg-red-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            Logout 
        </button>
        <!-- <button @click="printid" class="bg-red-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            Logout 
        </button> -->
    </div>
    <!-- <div class="grid justify-items-center p-2 ">
        <button @click="printid" class="bg-red-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            cek 
        </button>
    </div> -->
</template>
<style></style>


