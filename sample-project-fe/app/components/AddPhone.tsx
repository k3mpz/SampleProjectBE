'use client'
import React from 'react'
import { Button } from "@radix-ui/themes"
import Link from 'next/link'

const AddPhone = () => {
  return (
    <div>
        <Button><Link href='/phones/new'>Add Phone</Link></Button>
    </div>
  )
}

export default AddPhone