'use client'
import { Button, Callout, Flex, Select, TextField } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'
import { FaCircleInfo } from "react-icons/fa6";

// ... other imports
interface PhoneForm {
    id?: string; // Include the id field
    name: string;
    unit: string;
    brand: string;
    manufacturer: string;
    cpu: string;
    ram_size: number;
    rom_size: number;
    is_dual_sim: string;
    has_5g_lte: string;
  }

const NewPhone: React.FC = () => {
    // ... other state variables
    const router = useRouter();
    const [error, setError] = useState('')
    const [phoneNameValue, setphoneNameValue] = useState()
    const [phoneUnitValue, setphoneUnitValue] = useState()
    const [phoneBrandValue, setphoneBrandValue] = useState()
    const [phoneManufacturerValue, setphoneManufacturerValue] = useState()
    const [phoneCPUValue, setphoneCPUValue] = useState()
    const [phoneRAMValue, setphoneRAMValue] = useState()
    const [phoneROMValue, setphoneROMValue] = useState()
    const [dualSimValue, setDualSimValue] = useState('1')
    const [has5GValue, setHas5GValue] = useState('1')
    const { handleSubmit} = useForm<PhoneForm>()

    useEffect(() => {
        const { id } = router.query;
        const fetchData = async () => {
            if (id) {
                try {
                const response = await axios.get(`http://localhost:8080/phones/${id}`);
                const phoneData = response.data;

                setphoneNameValue(phoneData.name);
                setphoneUnitValue(phoneData.unit);
                setphoneBrandValue(phoneData.brand);
                setphoneManufacturerValue(phoneData.manufacturer);
                setphoneCPUValue(phoneData.cpu);
                setphoneRAMValue(phoneData.ram_size);
                setphoneROMValue(phoneData.rom_size);
                setDualSimValue(phoneData.is_dual_sim);
                setHas5GValue(phoneData.has_5g_lte);
                } catch (error) {
                    setError('An error occurred while fetching phone details.');
                }
            }
        };

        fetchData();
    }, [router.query]);

    return (
        <div>
        {/* ... other JSX code */}
        <form
            className="max-w-xl space-y-3"
            onSubmit={handleSubmit(async (data) => {
            data.is_dual_sim = dualSimValue;
            data.has_5g_lte = has5GValue;
            console.log(data);

            try {
                const { id } = router.query;
                if (id) {
                // Update phone if "id" exists
                await axios.put(`http://localhost:8080/phones/update/${id}`, data);
                } else {
                // Add new phone if "id" does not exist
                await axios.post('http://localhost:8080/phones/create', data);
                }

                router.push('/phones');
            } catch (error) {
                setError('An error occurred.');
            }
            })}
        >
            {/* ... other form fields ... */}
            <Button>{router.query.id ? 'Update Phone' : 'Add New Phone'}</Button>
        </form>
        </div>
    );
};

export default NewPhone;