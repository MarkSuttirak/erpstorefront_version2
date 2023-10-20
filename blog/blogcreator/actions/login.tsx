'use server'
import { cookies } from 'next/headers'
import {User} from "@/typing"

export const login =  async(e: FormData) => {
    const name = e.get("user")?.toString();
    const password = e.get("password")?.toString();

    
    if (name && password) {
      const newUser: User = {
        usr : name,
        pwd : password,
      }
      await fetch(`https://dev.zaviago.com/api/method/frappeauth_app.authentication.login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }).then((response) => response.json()).then((data) => {
        if (data.message.token) {
          cookies().set('token', data.message.token);
        }else{
        }
      })
    }
  }