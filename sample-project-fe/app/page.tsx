import Image from 'next/image'
import Link from 'next/link'
import PhoneCard from './components/PhoneCard'

export default function Home() {
  return (
    <main>
      <h1>Phone Catalog App</h1>
      <PhoneCard/>
    </main>
  )
}
