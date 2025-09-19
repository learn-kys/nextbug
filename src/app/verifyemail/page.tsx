"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function VerifyEmailPage() {

    const searchParams = useSearchParams()
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async()=>{
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true)
            setError(false)
            toast.success("Email verified successfully")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(true)
            setVerified(false)
            toast.error("Verification failed")
        }
    }

    useEffect(()=>{
        setError(false)
        const urlToken = searchParams.get('token') || ""
        setToken(urlToken)
    },[searchParams])

    useEffect(()=>{
        setError(false)
        if(token.length > 0){
            verifyUserEmail()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])

  return (
    <div 
    className='flex flex-col items-center justify-center min-h-screen py-2'
    >
        <h1 className='text-4xl'>Verify Email</h1>
        <h2 className='p-2 bg-orange-500 text-black'>{token ? `Token: ${token}` : "No token"}</h2>
        {
            verified && (
                <div>
                    <h2 className='text-2xl'>Email verified successfully</h2>
                    <Link href="/login" className='text-blue-500'>Login</Link>
                </div>
            )
        }
        {
            error && (
                <div>
                    <h2 className='text-2xl'>Error Occured</h2>
                </div>
            )
        }
      
    </div>
  )
}


