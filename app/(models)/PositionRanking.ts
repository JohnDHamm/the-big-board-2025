import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";

await dbConnect();

export interface PositionRanking extends mongoose.Document {
  scoringType: ScoringType;
  rank: number;
  playerId: string;
  position: NFL_Position;
}

const PositionRankingSchema = new mongoose.Schema<PositionRanking>({
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
  position: {
    type: String,
    required: true,
  },
})

const PositionRanking = mongoose.models.PositionRanking || mongoose.model("PositionRanking", PositionRankingSchema);

export default PositionRanking;
