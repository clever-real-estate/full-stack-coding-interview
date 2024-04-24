"use client";
import { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { SubmitButton } from "../components/SubmitButton";
import { useRouter } from 'next/navigation'
import { formatError } from "../utils";


export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch(`${process.env.API_URL}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password}),
        });

        const data = await response.json()

        if (response.ok) {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('token', data.access)
                window.localStorage.setItem('refresh_token', data.refresh)
            }
            router.push('/photos')
        }else{
            const error = await response.json();
            const errorMessage = formatError(error);
            alert(errorMessage);
        }
    }

    return (
      <main className="lg:w-1/3 w-full">
        <div className="flex flex-col items-center gap-3">
            <Image src={`logo.svg`} alt='Clever logo' width="75" height="75" />
            <h1 className="text-xl font-bold">Sign in to your account</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-5">
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
                <span>Not an user yet? </span>
                <Link className="text-blue-500" href="/sign-up">sign-up</Link>
            </div>
            <SubmitButton label="Sign In" />
        </form>
      </main>
    );
}
