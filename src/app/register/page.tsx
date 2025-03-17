"use client"

import axios from "axios";
import { useState } from "react";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("User Registered:", { name, email, password });

        axios.post("http://localhost:3000/api/auth/register/",{
            name,
            email,
            password
        }).then((res)=>{
            console.log(res.data)
            alert(res.data.message)
        }).catch((err)=>{
            console.log(err)
            alert(err.response.data.message)
        })
    }


    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 mt-1 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e)=> setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 mt-1 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 mt-1 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }