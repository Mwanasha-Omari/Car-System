import mongoose from 'mongoose';

const TenantSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, 'Please provide a business name'],
    maxlength: [100, 'Business name cannot be more than 100 characters'],
  },
  ownerName: {
    type: String,
    required: [true, 'Please provide an owner name'],
    maxlength: [100, 'Owner name cannot be more than 100 characters'],
  },
  businessType: {
    type: String,
    required: [true, 'Please provide a business type'],
    maxlength: [50, 'Business type cannot be more than 50 characters'],
  },
  car: {
    type: String,
    maxlength: [100, 'Car cannot be more than 100 characters'],
  },
  numberPlate: {
    type: String,
    maxlength: [20, 'Number plate cannot be more than 20 characters'],
  },
  imageUrl: {
    type: String,
  },
  floor: {
    type: String,
    required: [true, 'Please provide a floor'],
    maxlength: [50, 'Floor cannot be more than 50 characters'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Tenant || mongoose.model('Tenant', TenantSchema);