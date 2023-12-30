import nc from 'next-connect';
// handle server error middleware
import onError from "../../../middleware/error";
// import the notes controller for postingNotes and fetching all notes
import { createOrderDetail } from "../../../controllers/OrderDetailController";

// initiate next-connect with error middleware
const handler = nc({ onError });

handler.post(createOrderDetail);

export default handler;