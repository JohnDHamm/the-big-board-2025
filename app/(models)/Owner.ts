import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";

await dbConnect();

export interface Owner extends mongoose.Document {
  name: string;
  leagueId: string;
  isCommish: boolean;
}

const OwnerSchema = new mongoose.Schema<Owner>({
  name: {
    type: String,
    required: true,
  },
  leagueId: {
    type: String,
    required: true,
  },
  isCommish: {
    type: Boolean,
    required: true,
  },
});

const Owner = mongoose.models.Owner || mongoose.model("Owner", OwnerSchema);

export default Owner;
