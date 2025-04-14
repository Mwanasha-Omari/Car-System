import dbConnect from "../../../../../lib/dbConnect";
import Visitor from "../../../../../models/Visitor";

export default async function handler(req, res) {
  const {
    query: { tenantId },
    method,
  } = req;

  await dbConnect();

  if (method === 'DELETE') {
    try {
      const result = await Visitor.deleteMany({ tenantId });
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}