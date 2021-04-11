const OrbitDB = require("orbit-db")
const IpfsClient = require("ipfs-http-client")

var ipfs
var orbitdb

export async function init() {
  ipfs = IpfsClient({ host: 'localhost', port: '5001', protocol: 'http' })
  orbitdb = await OrbitDB.createInstance(ipfs)
}

// Creates a certain number of feed databases
// and fills them up with three text values
export async function createManyDbs(number) {
  await init()

  let dbs = []
  for (let i = 0; i < number; i++) {
    let db = await orbitdb.feed("Test" + i)
    await db.load()
    dbs.push(db)

    for (let j = 0; j < 3; j++) {
      await db.add({ text: "Tweet" + j }, { pin: true })
    }
  }

  // Log addresses
  console.log("Addresses:")
  console.log(dbs.map(db => db.id))
}

export async function openDB(address) {
  console.log("Opening database...")
  let db = await orbitdb.open(address)
  await db.load()
  console.log("Loaded database.")
  return db
}

export async function loadData(db) {
  console.log("Getting elements...")
  let elements = await db.iterator({ reverse: true, limit: -1, pin: true }).collect()
  console.log("Got elements: ")
  let myData = elements.map((element) => element.payload.value.text)
  console.log(myData)
  return myData
}

// Loads a number of feed dbs from their addresses
export async function openManyDbs(addresses) {
  await init()

  let data = []
  let dbs = []

  for (let address of addresses) {
    let promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        let myDB = await openDB(address)
        resolve(myDB)
      }, 30000)
      
    })

    let db = await promise
    let myData = loadData(db)

    dbs.push(db)
    data.push({ name: db.dbname, data: myData })
  }

  console.log(data)
}

const addresses = [
  '/orbitdb/zdpuArCsRGLKyFMM44xNDWHWT3r1KcwfBswsM6amWrNRf4M8q/Test0',
  '/orbitdb/zdpuAtvrjRVGRL2zc6pHs5SviBxjHfjfuLpGdUFfJuzhAecVN/Test1',
  '/orbitdb/zdpuAuh4XuhCiX9JoQWQysm7AAKDaLjXarkS9uPWZKWpS7pyX/Test2',
  '/orbitdb/zdpuAp7LajjwbZUxQX3wHf8A8tBjUqu75T4xS7e3upLCK43rN/Test3',
  '/orbitdb/zdpuAz4hY7HJb3M97N6Zfyr2PzwVF9qUiiB6yeEFYYmRBrJjT/Test4',
  '/orbitdb/zdpuAtTts1YY5hPD9Gd7Tj3EkBJcoQtY5h5DiaTFKBzAHBkew/Test5',
  '/orbitdb/zdpuAwXbznaah3nuCQePSfgsQNTTnkzUjYGBajDJw1dAYSjQk/Test6',
  '/orbitdb/zdpuAvtfWPSrvEmQGA2X4xmMGXoNm2b6LCAavLgGMogqP1uUo/Test7'
]


// openManyDbs(addresses)
// createManyDbs(4)
