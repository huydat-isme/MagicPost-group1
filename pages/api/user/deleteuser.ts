import nc from 'next-connect';
// handle server error middleware
import onError from "../../../middleware/error";
// import the notes controller for postingNotes and fetching all notes
import { deleteUser } from "../../../controllers/UserController";

// initiate next-connect with error middleware
const handler = nc({ onError });

handler.delete(deleteUser);

export default handler;