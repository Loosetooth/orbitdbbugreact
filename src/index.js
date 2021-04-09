import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {openManyDbs} from './bug'


const addresses = [
  '/orbitdb/zdpuAtxMYsxuT68bJKaRQpJq2y9bCkUghtebx6HaTfvamwLUJ/Test0',
  '/orbitdb/zdpuAuA1Cc9PLWLgZnf8qj8MJSq6XSDsYxbB8jX4UcRv45Diz/Test1',
  '/orbitdb/zdpuAo2UiSF4V9qJuDJBBahBbQP2LSFV2uFrEVkEXN3uwry3P/Test2',
  '/orbitdb/zdpuB18Mry92AwT3AX29fujNEGMzH8oihd4soCsekGQwLa54A/Test3',
  '/orbitdb/zdpuAyzQS9fTANJk6jXvSn6TWtJYdA9bUQu3UGq8fE1jwneXi/Test4',
  '/orbitdb/zdpuB13YYTZzg2ov6pETS81AdryVFa8kLFkj7AduuZEDVqKQ2/Test5',
  '/orbitdb/zdpuB3LTLjT8Lthx137YGVbyEgWQ1PR2gnsReWWimtegJYQw2/Test6',
  '/orbitdb/zdpuAuMGC3ASZw8LRJuPMygNvT2DzCjP8wvPiJ7VgTv1kRxce/Test7'
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
