import Head from 'next/head'
import { useEffect } from 'react'

async function getClients() {
  const response = await fetch('http://localhost:3000/api/clients')
  const data = await response.json()
  console.log(data)
}
export default function Home() {
  useEffect(()=>{
    getClients()
  }, [])
    
  return (
    <div>
      <Head>
        <h1>Home</h1>
      </Head>
      <h1>Hello World</h1>
    </div>
  )
}
