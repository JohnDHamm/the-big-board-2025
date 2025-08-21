import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";

await dbConnect();

export interface Team extends mongoose.Document {
  city: string;
  nickname: string;
  abbv: string;
  colors: {
    primary: string;
    secondary: string;
  };
  byeWeek: number;
}

const TeamSchema = new mongoose.Schema<Team>({
  city: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  abbv: {
    type: String,
    required: true,
  },
  colors: {
    primary: {
      type: String,
      required: true,
    },
    secondary: {
      type: String,
      required: true,
    }
  },
  byeWeek: {
    type: Number,
    required: true,
  }
})

const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

export default Team;
