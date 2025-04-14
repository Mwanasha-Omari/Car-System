import dbConnect from '../../../../lib/dbConnect';
import Tenant from '../../../../models/Tenant';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const tenant = await Tenant.findById(id);
        if (!tenant) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: tenant });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      try {
        const tenant = await Tenant.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!tenant) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: tenant });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
