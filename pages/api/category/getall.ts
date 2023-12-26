import nc from 'next-connect';
// handle server error middleware
import onError from "../../../middleware/error";
// import the notes controller for postingNotes and fetching all notes
import { getAllCategories } from "../../../controllers/CategoryController";

// initiate next-connect with error middleware
const handler = nc({ onError });

handler.get(getAllCategories);

export default handler;