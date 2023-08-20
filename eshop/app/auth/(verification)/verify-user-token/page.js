"use client";
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();

  const [email, token] = [searchParams.get('email'), searchParams.get('token')];
  console.log(email, token);

  useEffect(() => {
    const verifyUserToken = async () => {
      try {
        const response = await fetch('/api/auth/verifyUserToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, token })
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("error is occuring: ", error);
      }
    }

    verifyUserToken();

  }, []);

  return (
    <div>
      <h1>Page</h1>
    </div>
  )
}

export default Page
