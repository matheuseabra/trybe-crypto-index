import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../services/api';
import CurrencyLabel from '../components/CurrencyLabel';

export default function Home() {
  const router = useRouter();
  const [btcNumber, setBtcNumber] = useState<string | number>(1);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchBTCPrice = async () => {
      const response = await api.get('/api/crypto/btc', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('@user:token')}`
        }
      });
      const { bpi } = response.data;
      setCurrencies(Object.values(bpi).filter(({ code }) => code !== 'BTC'));
      console.log({ bpi, currencies });
    };
    fetchBTCPrice();
  }, []);



  return (
    <div className="container">
      <style jsx>
        {`
          .currencies-container {
            display: inline-flex;
          }
        
          .btc-label {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px 0;
          }

          input {
            text-align: center;
            height: 35px;
            width: 50px;
            margin: 10px 0;
            background-color: #C4C4C4;
            border: 1px solid #C4C4C4;
          }
        `}
      </style>

      <button onClick={() => router.push('/update')}>Atualizar valor monetário</button>

      <div className="btc-label">
        <label htmlFor="">BTC</label>
        <input type="text" min="1" value={btcNumber} onChange={e => setBtcNumber(e.target.value)} />
      </div>

      <div className="currencies-container">
        {currencies.map(({ code, rate, rate_float }) => <CurrencyLabel key={code} currency={code} value={rate_float} btcNumber={Number(btcNumber)} readOnly />)}
      </div>
    </div>
  );
}