import React from "react"

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
const PhonesPage = async() => {
    const res = await fetch(
        'http://localhost:8080/phones/'
        , { cache: 'no-store' }
        )
    const phones: Phone[] = await res.json();
    return (
        <div>
            <h1>All Phones</h1>
            {/* <p>{new Date().toLocaleTimeString()}</p> */}
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
                    {phones.map(phone => 
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

export default PhonesPage