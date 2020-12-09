import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import api from '../services/api';
import mapToCurrencySymbol from '../utils/mapToCurrencySymbol';

export default function Update() {
  const router = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState('BRL');
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [newPrice, setnewPrice] = useState('');
  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchBTCPrice = async () => {
      const response = await api.get('/api/crypto/btc', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('@user:token')}`
        }
      });
      const { bpi } = response.data;
      setCurrencies(Object.values(bpi).filter(({ code }) => code !== 'BTC' && code !== 'USD'));
      setSelectedPrice(currencies.find(({ code }) => code === selectedCurrency)?.rate);
    };
    fetchBTCPrice();
  }, []);

  const handleUpdateCurrencyPrice = async () => {
    try {
      const response = await api.post(
        '/api/crypto/btc',
        { currency: selectedCurrency, value: Number(newPrice) },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('@user:token')}`
          }
        }
      );
      router.push('/home');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChangeSelect = e => {
    setSelectedCurrency(e.target.value);
    setSelectedPrice(currencies.find(({ code }) => code === e.target.value)?.rate);
  };

  const handleGoBack = () => router.back();

  return (
    <div className="container">
      <Head>
        <title>Update Currency Price</title>
      </Head>

      <style jsx>
        {`
          .field-group:first-of-type {
            margin-top: 10px;
          }

          .field-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .back-button {
            margin-right: 150px;
            width: 100px;
          }

          select {
            height: 35px;
            width: 250px;
            padding: 10px;
            margin: 10px 0 20px;
          }
          
          input {
            height: 35px;
            width: 250px;
            padding: 10px;
            margin: 10px 0 20px;
            border: 1px solid #333;
          }
          
          .validation-error {
            color: red;
          }
        `}
      </style>

      <button className="back-button" onClick={handleGoBack}>Voltar</button>

      <div className="field-group">
        <label htmlFor="currencies-select">Moeda</label>
        <select name="currencies-select" onChange={handleChangeSelect}>
          <option disabled selected>Selecione uma moeda</option>
          {currencies.map(({ code }) => <option key={code} value={code}>{code}</option>)}
        </select>
      </div>

      {
        !!selectedPrice && <p><b>Valor atual:</b> {mapToCurrencySymbol(selectedCurrency)} {selectedPrice}</p>
      }

      <div className="field-group">
        <label htmlFor="newPrice">Novo valor</label>
        <input type="text" value={newPrice} onChange={e => setnewPrice(e.target.value)} name="newPrice" aria-describedby="Novo Valor" required />
      </div>

      {!!error && <p className="validation-error">{error}</p>}

      <button className="primary-button" onClick={handleUpdateCurrencyPrice}>ATUALIZAR</button>
    </div>
  )
}
