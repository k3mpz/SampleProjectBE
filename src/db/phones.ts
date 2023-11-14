import mongoose from 'mongoose';

// Phone Config
const PhoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: String, required: false },
  brand: { type: String, required: false },
  manufacturer: { type: String, required: false },
  cpu: { type: String, required: false },
  ram_size: { type: Number },
  rom_size: { type: Number },
  is_dual_sim: { type: Boolean, default: true },
  has_5g_lte: { type: Boolean, default: true },
});

export const PhoneModel = mongoose.model('Phone', PhoneSchema);

// Phone Actions
export const getPhones = () => PhoneModel.find();
export const getPhoneByUnit = (unit: string) => PhoneModel.findOne({ unit });
export const getPhoneById = (id: string) => PhoneModel.findById(id);
export const createPhone = (values: Record<string, any>) => new PhoneModel(values).save().then((phone) => phone.toObject());
export const deletePhoneById = (id: string) => PhoneModel.findOneAndDelete({ _id: id });
export const updatePhoneById = (id: string, values: Record<string, any>) => PhoneModel.findByIdAndUpdate(id, values);
