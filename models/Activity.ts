import mongoose from "mongoose";

export interface Activity extends mongoose.Document {
  plant_unit_id: mongoose.Types.ObjectId;
  type: string;
  message: string;
  timestamp: Date
}

const ActivitySchema = new mongoose.Schema<Activity>({
  plant_unit_id: {
    // Khóa ngoại tham chiếu đến cây
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  type: {
    // Loại hoạt động
    type: String,
    required: true
  },
  message: {
    // Nội dung hoạt động
    type: String,
    required: true
  },
  timestamp: {
    // Thời gian hoạt động
    type: Date,
    required: true
  }
})

export default mongoose.models.Activity || mongoose.model<Activity>("Activity", ActivitySchema)