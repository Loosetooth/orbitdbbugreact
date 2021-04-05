import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import OrbitDB from "orbit-db"
import IpfsClient from "ipfs-http-client"

var ipfs
var orbitdb

async function init() {
  ipfs = IpfsClient({ host: 'localhost', port: '5001', protocol: 'http' })
  orbitdb = await OrbitDB.createInstance(ipfs)
}

// Loads a number of feed dbs from their addresses
async function openManyDbs(addresses) {
  await init()

  let data = []
  let dbs = []

  for (let address of addresses) {
    let db = await orbitdb.open(address)
    await db.load()
    dbs.push(db)

    let elements = await db.iterator({ reverse: true, limit: -1 }).collect()
    let myData = elements.map((element) => element.payload.value.text)
    data.push({ name: db.dbname, data: myData })
  }

  console.log(data)
}

const addresses = [
  '/orbitdb/zdpuAtxMYsxuT68bJKaRQpJq2y9bCkUghtebx6HaTfvamwLUJ/Test0',
  '/orbitdb/zdpuAuA1Cc9PLWLgZnf8qj8MJSq6XSDsYxbB8jX4UcRv45Diz/Test1',
  '/orbitdb/zdpuAo2UiSF4V9qJuDJBBahBbQP2LSFV2uFrEVkEXN3uwry3P/Test2',
  '/orbitdb/zdpuB18Mry92AwT3AX29fujNEGMzH8oihd4soCsekGQwLa54A/Test3'
]

openManyDbs(addresses)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
