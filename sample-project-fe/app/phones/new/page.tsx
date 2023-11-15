'use client'
import { Button, Callout, Flex, Select, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FaCircleInfo } from "react-icons/fa6";

interface PhoneForm {
    name: string,
    unit: string,
    brand: string,
    manufacturer: string,
    cpu: string,
    ram_size: number,
    rom_size: number,
    is_dual_sim: string,
    has_5g_lte: string,
}
const NewPhone: React.FC = () => {
    const router = useRouter()
    const { register, control, handleSubmit} = useForm<PhoneForm>()
    const [error, setError] = useState('')
    const [dualSimValue, setDualSimValue] = useState('1')
    const [has5GValue, setHas5GValue] = useState('1')
    return (
        <div>
            {error && 
            <Callout.Root color="red" className='mb-5'>
                <Callout.Icon>
                    <FaCircleInfo/>
                </Callout.Icon>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>
            }
            
            <form 
            className='max-w-xl space-y-3' 
            onSubmit={handleSubmit( async(data) => {
                data.is_dual_sim = dualSimValue
                data.has_5g_lte = has5GValue
                console.log(data)
                try{
                    await axios.post('https://sample-project-be.vercel.app:8080/phones/create', data)
                    router.push('/phones')
                }catch(error){
                    setError('An error occured.')
                }
                })}>
                <TextField.Root>
                    <Controller 
                    name='name' 
                    control={control}
                    render={({ field }) => <TextField.Input placeholder='Phone Name' {...field}/>}
                    />
                </TextField.Root>
                <TextField.Root>
                    <Controller 
                    name='unit' 
                    control={control}
                    render={({ field }) => <TextField.Input placeholder='Unit Name' {...field}/>}
                    />
                </TextField.Root>
                <TextField.Root>
                    <Controller 
                    name='brand' 
                    control={control}
                    render={({ field }) => <TextField.Input placeholder='Brand Name' {...field}/>}
                    />
                </TextField.Root>
                <TextField.Root>
                    <Controller 
                    name='manufacturer' 
                    control={control}
                    render={({ field }) => <TextField.Input placeholder='Manufacturer Name' {...field}/>}
                    />
                </TextField.Root>
                <TextField.Root>
                    <Controller 
                    name='cpu' 
                    control={control}
                    render={({ field }) => <TextField.Input placeholder='CPU Name' {...field}/>}
                    />
                </TextField.Root>
                <TextField.Root>
                    <Controller 
                    name='ram_size' 
                    control={control}
                    render={({ field }) => <TextField.Input placeholder='RAM Size(GB)' {...field}/>}
                    />
                </TextField.Root>
                <TextField.Root>
                    <Controller 
                    name='rom_size' 
                    control={control}
                    render={({ field }) => <TextField.Input placeholder='ROM Size(GB)' {...field}/>}
                    />
                </TextField.Root>
                <Flex gap="3"  align="center">
                    <label>Has Dual-SIM</label>
                    <Select.Root value={dualSimValue} onValueChange={setDualSimValue} {...register('is_dual_sim')}>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.Group>
                        <Select.Item value="1">Yes</Select.Item>
                        <Select.Item value="0">No</Select.Item>
                        </Select.Group>
                    </Select.Content>
                    </Select.Root>
                </Flex>
                <Flex gap="3"  align="center">
                    <label>5G LTE Enabled</label>
                    <Select.Root value={has5GValue} onValueChange={setHas5GValue} {...register('has_5g_lte')}>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.Group>
                        <Select.Item value="1">Yes</Select.Item>
                        <Select.Item value="0">No</Select.Item>
                        </Select.Group>
                    </Select.Content>
                    </Select.Root>
                </Flex>
                <Button>Add New Phone</Button>
            </form>
        </div>
    )
}

export default NewPhone