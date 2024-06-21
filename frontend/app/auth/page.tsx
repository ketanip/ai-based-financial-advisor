"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { jwt, user } from "../utils";

const AuthPage = () => {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLogin, setIsLogin] = useState(false);

  const SignUp = async () => {
    const options = {
      method: "POST",
      url: "http://localhost:3001/auth/sign-up",
      headers: { "Content-Type": "application/json" },
      data: {
        name,
        email,
        password,
      },
    };

    try {
      const resp = await axios(options);
      toast(resp.data.message);
      setIsLogin(true);
    } catch (error: any) {
      toast(error.response.data.error);
    }
  };

  type SignInResponseData = {
    user: {
      id: number;
      name: string;
      email: string;
    };
    jwt_token: string;
  };

  const SignIn = async () => {
    const options = {
      method: "POST",
      url: "http://localhost:3001/auth/sign-in",
      headers: { "Content-Type": "application/json" },
      data: {
        email,
        password,
      },
    };

    try {
      const resp = await axios(options);
      const data = resp.data as SignInResponseData;

      // Setting JWT.
      jwt.setJWT(data.jwt_token);
      user.setUser(data.user);

      // Toast message.
      toast("You logged in successfully.");
      router.replace("/chats");
    } catch (error: any) {
      toast(error.response.data.error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-6 max-w-sm border-2 border-gray-100 px-6 py-4 rounded-lg mx-auto mt-10 shadow-lg ">
        <h2 className="font-bold mx-auto text-xl">Authenticate</h2>

        <div className="grid grid-cols-2 gap-4 py-2">
          <button
            className={
              isLogin
                ? "btn btn-neutral btn-ghost btn-sm"
                : "btn btn-neutral  btn-sm"
            }
            onClick={(e) => setIsLogin(false)}
          >
            Sign Up
          </button>
          <button
            className={
              !isLogin
                ? "btn btn-neutral btn-ghost btn-sm"
                : "btn btn-neutral  btn-sm"
            }
            onClick={(e) => setIsLogin(true)}
          >
            Sign In
          </button>
        </div>

        {!isLogin && (
          <div className="flex flex-col gap-1">
            <span>Name</span>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Jhon Doe"
              className="input input-bordered"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <span>Email</span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="jhon@example.com"
            required
            className="input input-bordered"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span>Password</span>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="input input-bordered"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-success text-white"
          onClick={(e) => {
            if (isLogin) SignIn();
            else SignUp();
          }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
