const OrbitDB = require("orbit-db")
const IpfsClient = require("ipfs-http-client")

var ipfs
var orbitdb

async function init() {
    ipfs = IpfsClient({ host: 'localhost', port: '5001', protocol: 'http' })
    orbitdb = await OrbitDB.createInstance(ipfs)
}

// Creates a certain number of feed databases
// and fills them up with three text values
async function createManyDbs(number) {
    await init()

    let dbs = []
    for(let i = 0; i < number; i++) {
        let db = await orbitdb.feed("Test" + i)
        await db.load()
        dbs.push(db)

        for(let j = 0; j<3; j++) {
            await db.add({text: "Tweet" + j})
        }
    }

    // Log addresses
    console.log("Addresses:")
    console.log(dbs.map(db => db.id))
}

// Loads a number of feed dbs from their addresses
async function openManyDbs(addresses) {
    await init()

    let data = []
    let dbs = []

    for(let address of addresses) {
        let db = await orbitdb.open(address)
        await db.load()
        dbs.push(db)

        let elements = await db.iterator({ reverse: true, limit: -1}).collect()
        let myData = elements.map((element) => element.payload.value.text)
        data.push({name: db.dbname, data: myData})
    }

    console.log(data)
}

const addresses = [
    '/orbitdb/zdpuAnrgVSgQu6FsgBMuM3HuvkCnatZCPZyDnd8tKNnTjTRV7/Test0',
    '/orbitdb/zdpuB3JC6THJ91VrHmdQb6WZAdhV2au91pCrzWN3fGLYZRCga/Test1',
    '/orbitdb/zdpuAwSs3AXwd6EUekS254STCJQXP8wyajaLadwuLjYcncsZX/Test2',
    '/orbitdb/zdpuAtHT3VkRFQMPzRch7JJgJBeAWAgFMykvX6w4SnH5WDwF2/Test3'
  ]

// openManyDbs(addresses)
createManyDbs(4)
