import mongoose from 'mongoose';

// Phone Config
const PhoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: String, required: true },
  brand: { type: String, required: true },
  manufacturer: { type: String, required: true },
  cpu: { type: String, required: true },
  ram_size: { type: Number },
  rom_size: { type: Number },
  is_dual_sim: { type: Boolean, default: false },
  has_5g_lte: { type: Boolean, default: false },
});

export const PhoneModel = mongoose.model('Phone', PhoneSchema);

// Phone Actions
export const getPhones = () => PhoneModel.find();
export const getPhoneByUnit = (unit: string) => PhoneModel.findOne({ unit });
export const getPhoneById = (id: string) => PhoneModel.findById(id);
export const createPhone = (values: Record<string, any>) => new PhoneModel(values).save().then((phone) => phone.toObject());
export const deletePhoneById = (id: string) => PhoneModel.findOneAndDelete({ _id: id });
export const updatePhoneById = (id: string, values: Record<string, any>) => PhoneModel.findByIdAndUpdate(id, values);
