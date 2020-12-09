import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import api from '../services/api';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await api.post(
        '/api/login',
        { email, password }
      );
      const { data: { token } } = response;
      if (token && typeof token === 'string') localStorage.setItem('@user:token', token);
      router.push('/home');
    } catch (error) {
      setError('Campos Inválidos');
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Login</title>
      </Head>

      <style jsx>
        {`
          .field-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
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

      <div className="field-group">
        <label htmlFor="email">Email</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} name="email" aria-describedby="Email" required />
      </div>

      <div className="field-group">
        <label htmlFor="password">Senha</label>
        <input type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} aria-describedby="Senha" required />
      </div>

      {!!error && <p className="validation-error">{error}</p>}

      <button type="submit" className="primary-button" onClick={handleLogin}>ENTRAR</button>
    </div>
  )
}
