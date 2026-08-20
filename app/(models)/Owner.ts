import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";

await dbConnect();

export interface Owner extends mongoose.Document {
  userId: string;
  name: string;
  leagueId: string;
}

const OwnerSchema = new mongoose.Schema<Owner>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  leagueId: {
    type: String,
    required: true,
  },
});

const Owner = mongoose.models.Owner || mongoose.model("Owner", OwnerSchema);

export default Owner;
