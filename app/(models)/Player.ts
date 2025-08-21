import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";

await dbConnect();

export interface Player extends mongoose.Document {
  firstName: string;
  lastName: string;
  teamId: string;
  position: NFL_Position;
}

const PlayerSchema = new mongoose.Schema<Player>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },

});

const Player = mongoose.models.Player || mongoose.model("Player", PlayerSchema);

export default Player;
