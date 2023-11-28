import nc from "next-connect";
// handle server error middleware
import onError from "../../../middleware/error";
// import the notes controller for postingNotes and fetching all notes
import { updateDistributionPoint, deleteDistributionPoint, getDistributionPoint } from "../../../controllers/DistributionPointController";

const handler = nc({ onError });

// get a single note
handler.get(getDistributionPoint);
// update a single note
handler.put(updateDistributionPoint);
// delete a single note
handler.delete(deleteDistributionPoint);

export default handler;