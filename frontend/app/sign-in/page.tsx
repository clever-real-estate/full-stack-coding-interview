"use client";
import { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { SubmitButton } from "../components/SubmitButton";
import { useRouter } from 'next/navigation'


export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8000/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password}),
        });

        const data = await response.json()
        console.log("response......", data)
        console.log("data.access_token......", data.access)
        console.log("data.refresh_token......", data.refresh)

        if (response.ok) {
            // save the token in local storage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('token', data.access)
                window.localStorage.setItem('refresh_token', data.refresh)
            }

            router.push('/photos')
        }else{
            const error = await response.json()
            alert(error.detail)
        }
    }

    return (
      <main>
        <div className="flex flex-col items-center gap-3">
            <Image src={`logo.svg`} alt='Clever logo' width="75" height="75" />
            <h1 className="text-xl font-bold">Sign in to your account</h1>
        </div>
        
        <form onSubmit={handleSubmit} >
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="email" 
                    aria-describedby="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
            </div>
            <div className="mb-3">
                <span>Not an user yet? sign up and don&apos;t miss anything: </span>
                <Link className="text-blue-500" href="/sign-up">sign-up</Link>
            </div>
            <SubmitButton label="Sign In" />
        </form>
      </main>
    );
}