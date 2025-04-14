import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: [true, 'Please provide a tenant ID'],
  },
  fullName: {
    type: String,
    required: [true, 'Please provide a full name'],
    maxlength: [100, 'Full name cannot be more than 100 characters'],
  },
  carType: {
    type: String,
    maxlength: [100, 'Car type cannot be more than 100 characters'],
  },
  idNumber: {
    type: String,
    required: [true, 'Please provide an ID number'],
    maxlength: [50, 'ID number cannot be more than 50 characters'],
  },
  arrivalTime: {
    type: String,
    required: [true, 'Please provide an arrival time'],
  },
  departureTime: {
    type: String,
  },
  duration: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);
