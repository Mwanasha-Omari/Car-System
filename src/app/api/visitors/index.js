import dbConnect from "../../../../lib/dbConnect";
import Visitor from "../../../../models/Visitor";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { tenantId } = req.query;
        const query = tenantId ? { tenantId } : {};
        const visitors = await Visitor.find(query);
        res.status(200).json({ success: true, data: visitors });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const visitor = await Visitor.create(req.body);
        res.status(201).json({ success: true, data: visitor });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
