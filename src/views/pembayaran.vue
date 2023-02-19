<script>
import axios from 'axios'

export default{
    data(){
        return{
            id: this.$route.params.id,
            nominal:this.$route.params.nominal,
            bank:this.$route.params.bank,
            virtual:this.$route.params.virtual,
            idku:this.$route.params.idku,
            em:this.$route.params.em,
            pw:this.$route.params.pw
        }
    },
    methods:{
        cek(){
            let result =  axios.post("https://tame-lime-mackerel-wrap.cyclic.app/ambilbayaran",{
                "order_id":this.id,
                "id":this.idku,
            }).then(response=>{
                const status = response.data.status
                const datajson = JSON.parse(response.data.responsedata)
                console.log(datajson)
                if(datajson.transaction_status == "pending" && status == "success"){
                    alert("SEDANG MENUNGGU PEMBAYARAN-STATUS PENDING")
                } else if (status == "error" && datajson.status_message == "Sorry. The bank/payment partner is experiencing some connection issues. Please retry later."){
                    alert("KONEKSI BANK LAGI BERMASALAH")
                } else if(status == "error" && datajson.status_message == "Transaction doesn't exist." ){
                    alert("Ada Kesalahan Coba Lagi")
                }
                else if (datajson.transaction_status == "settlement" && status == "success"){
                    alert("SELAMAT PEMBAYARAN TERFONFIRMASI DAN BERHASIL")
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
                                        id:this.idku,
                                        em:this.em,
                                        pw:this.pw
                                }
                            })
                            } else {
                                localStorage.setItem("autenticated", true)
                                localStorage.setItem("status", "admin")
                                this.$router.push("/admin")
                            }
                            })
                  }
                })
                }
            })   
        }
    }  }

</script>

<template>
    <div>
        <div class="w-full h-96 text-white font-bold text-3xl flex items-center text-center justify-center">
            SILAHKAN BAYAR TAGIHAN ANDA MELALUI BANK {{ bank }}
            Nomor Virtual Account:{{ virtual }}
            Nominal:{{ nominal }}
        </div>
    </div>

    <div class="grid justify-items-center p-2 ">
        <button @click="cek" class="bg-green-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            Cek Status Pembayaran
        </button>
    </div>
</template>