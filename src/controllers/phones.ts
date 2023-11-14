import express from 'express';

import { deletePhoneById, getPhones, getPhoneById, createPhone, getPhoneByUnit } from '../db/phones';

export const getAllPhones = async (req: express.Request, res: express.Response) => {
  try {
    const phones = await getPhones();

    return res.status(200).json(phones);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getPhone = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const phone = await getPhoneById(id);

    return res.json(phone);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deletePhone = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const deletedPhone = await deletePhoneById(id);

    return res.json(deletedPhone);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updatePhone = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { unit, brand, name, manufacturer, cpu, ram_size, rom_size, is_dual_sim, has_5g_lte } = req.body;

    if (!id) {
      return res.sendStatus(400);
    }

    const phone = await getPhoneById(id);
    
    phone.unit = unit;
    if(unit) phone.unit = unit;
    if(brand) phone.brand = brand;
    if(brand) phone.brand = brand;
    if(name) phone.name = name;
    if(manufacturer) phone.manufacturer = manufacturer;
    if(cpu) phone.cpu = cpu;
    if(ram_size) phone.ram_size = ram_size;
    if(rom_size) phone.rom_size = rom_size;
    if(is_dual_sim) phone.is_dual_sim = is_dual_sim;
    if(has_5g_lte) phone.has_5g_lte = has_5g_lte;
    await phone.save();

    return res.status(200).json(phone).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const addPhone = async (req: express.Request, res: express.Response) => {
  try {
    const { unit, brand, name, manufacturer, cpu, ram_size, rom_size, is_dual_sim, has_5g_lte } = req.body;

    if ( !unit || !brand || !name || !manufacturer || !cpu || !ram_size || !rom_size || !is_dual_sim || !has_5g_lte) {
      return res.sendStatus(400);
    }

    const existingPhone = await getPhoneByUnit(unit);
  
    if (existingPhone) {
      return res.sendStatus(400);
    }

    const phone = await createPhone({
      unit,
      brand,
      name,
      manufacturer,
      cpu,
      ram_size,
      rom_size,
      is_dual_sim,
      has_5g_lte,
    });

    return res.status(200).json(phone).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}