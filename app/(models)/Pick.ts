import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";

await dbConnect();

export interface Pick extends mongoose.Document {
  selectionNumber: number;
  ownerId: string;
  playerId: string;
}

const PickSchema = new mongoose.Schema<Pick>({
  selectionNumber: {
    type: Number,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  playerId: {
    type: String,
    required: true,
  },
});

const Pick = mongoose.models.Pick || mongoose.model("Pick", PickSchema);

export default Pick;
