import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {openManyDbs} from './bug'


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
