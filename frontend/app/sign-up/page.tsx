"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const first_name = firstName;
        const last_name = lastName;

        const response = await fetch('http://localhost:8000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, first_name, last_name}),
        });

        if (response.ok) {
            router.push('/sign-in')
        }else{
            const error = await response.json()
            alert(error.detail)
        }
    } 

    return (
      <main>
        <div className="flex flex-col items-center gap-3">
            <Image src={`logo.svg`} alt='Clever logo' width="75" height="75" />
            <h1 className="text-xl font-bold">Sign up to an account</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-5">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    aria-describedby="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input 
                    type="firstName" 
                    className="form-control" 
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input 
                    type="lastName" 
                    className="form-control" 
                    id="lastName" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <span>Already have an account? </span>
                <Link className="text-blue-500" href="/sign-in">sign-in</Link>
            </div>
            <button type="submit" className="btn btn-primary">SignUp</button>
        </form>
      </main>
    );
}
