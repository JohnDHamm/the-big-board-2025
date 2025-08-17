import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";

await dbConnect();

export interface Test extends mongoose.Document {
  message: string;
  date: Date;
}

const TestSchema = new mongoose.Schema<Test>({
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
})

const Test = mongoose.models.Test || mongoose.model("Test", TestSchema);

export default Test;
