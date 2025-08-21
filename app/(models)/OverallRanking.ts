import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";

await dbConnect();

export interface OverallRanking extends mongoose.Document {
  scoringType: ScoringType;
  rank: number;
  playerId: string;
}

const OverallRankingSchema = new mongoose.Schema<OverallRanking>({
  scoringType: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  playerId: {
    type: String,
    required: true,
  },
})

const OverallRanking = mongoose.models.OverallRanking || mongoose.model("OverallRanking", OverallRankingSchema);

export default OverallRanking;
