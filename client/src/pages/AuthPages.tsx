import { useState } from 'react';
import type { FormEvent } from 'react';
import { ErrorBanner } from '../components/ErrorBanner';
import { PageShell } from '../components/PageShell';
import { useAuth } from '../context/AuthContext';
import { navigate } from '../utils/router';
import { request } from '../api/http';

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <PageShell title="Login">
      <ErrorBanner message={error} />
      <form onSubmit={submit} className="form">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Login</button>
      </form>
    </PageShell>
  );
}

export function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <PageShell title="Register">
      <ErrorBanner message={error} />
      <form onSubmit={submit} className="form">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Register</button>
      </form>
    </PageShell>
  );
}

export function OtpPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const getOtp = async () => {
    try {
      const res = await request<{ otp: string; message: string }>('/auth/otp', { method: 'POST', body: JSON.stringify({ email }) });
      setOtp(res.otp);
      setMessage('OTP generated (dev display).');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const verify = async () => {
    try {
      await request('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ email, otp }) });
      setMessage('OTP verified');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <PageShell title="OTP">
      <ErrorBanner message={error} />
      <div className="form">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <button onClick={getOtp}>Get OTP</button>
        <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
        <button onClick={verify}>Verify OTP</button>
        <p>{message}</p>
      </div>
    </PageShell>
  );
}
