var express = require('express')
var app = express()
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
require('./scrapper')
require('./controllers/banController')(app)
const Data = require('./models/user');
const summary = require('./axiosSettings')
const ipJson = require('./ips.json')

async function getData(){
    const { data } = await summary.get('https://onionoo.torproject.org/summary');

    var onionData = data.relays.map((item)=>{
        if(item.a)
            return item.a
    })

    var tornodeData = ipJson.map((item)=>{
        if(item.ip){
            return item.ip
        }
    })


    return {
        onion: onionData,
        tornodes: tornodeData
    }
}


app.listen(8000, ()=>{
    app.get('/listIps', async(req,res) => {
        try{
            return res.send(await getData())
        }catch(error){
            console.log(error)
        }
    })


    app.get('/listBannedIps', async(req,res) =>{
        try {
            const bannedIps = (await Data.find()).map((item)=>{
                return item.ip
            })

            const data = await getData()
            const filteredOnion = data.onion.filter((item)=>{
                return item.filter((ip)=>{
                    return !bannedIps.includes(ip)
                }).length
            })

            const filteredTornodes = data.tornodes.filter((item)=>{
                return !bannedIps.includes(item)
            })

            return res.send({
                onion: filteredOnion,
                tornodes: filteredTornodes
            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({error: 'Error'})
        }
    })
});

