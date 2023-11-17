'use client'
import axios from "axios";
import React, { useEffect, useState } from "react"

interface Phone {
    id: string,
    name: string,
    unit: string,
    brand: string,
    manufacturer: string,
    cpu: string,
    ram_size: number,
    rom_size: number,
    is_dual_sim: boolean,
    has_5g_lte: boolean,
}
const PhoneList = () => {
    const [phoneList, setPhoneList] = useState<Phone[]>([])
    useEffect(() => {
        async function getList() {
            try{
                const res = await axios.get(`/api/getphones/`)
                setPhoneList(res.data)
            }catch(error){
                console.log(error)
            }
        }
        getList()
    },[])
    
        return (
            <div>
                <h1>All Phones</h1>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <th>Manufacturer</th>
                            <th>RAM</th>
                            <th>ROM</th>
                            <th>Dual-SIM</th>
                            <th>5G LTE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phoneList.map(phone => 
                            <tr key={phone.id}>
                                <td>{phone.name}</td>
                                <td>{phone.manufacturer}</td>
                                <td>{phone.ram_size} GB</td>
                                <td>{phone.rom_size} GB</td>
                                <td>{phone.is_dual_sim?'YES':'NO'}</td>
                                <td>{phone.has_5g_lte?'YES':'NO'}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
        
}

export default PhoneList