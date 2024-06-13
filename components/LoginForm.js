import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/accounts/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      // Сохранение токенов в localStorage
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      
      // Сохранение имени пользователя в localStorage
      localStorage.setItem('username', formData.username);

      // Перенаправление на главную страницу
      router.push('/');
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center text-black">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
        Don't have an account?{' '}
          <Link href="/RegisterForm">
            <a className="text-blue-500 hover:underline">Register!</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
