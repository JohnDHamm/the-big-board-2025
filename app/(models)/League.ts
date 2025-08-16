import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";

await dbConnect();

export interface League extends mongoose.Document {
  name: string;
  positionSlots: Position_Slot[];
  draftStatus: DraftStatus;
  draftOrder: string[];
  scoringType: ScoringType;
}

const LeagueSchema = new mongoose.Schema<League>({
  name: {
    type: String,
    required: true,
  },
  positionSlots: {
    type: [],
    required: true,
  },
  draftStatus: {
    type: String,
    required: true,
  },
  draftOrder: {
    type: [],
    required: true,
  },
  scoringType: {
    type: String,
    required: true,
  },
})

const League = mongoose.models.League || mongoose.model("League", LeagueSchema);

export default League;
