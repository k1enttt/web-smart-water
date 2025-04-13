import mongoose from "mongoose";

export interface Notification extends mongoose.Document {
  sensor_log_id: mongoose.Types.ObjectId;
  title: string;
  message: string;
}

const NotificationSchema = new mongoose.Schema<Notification>({
  sensor_log_id: {
    // Khóa ngoại tham chiếu đến log cảm biến
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    // Tiêu đề thông báo
    type: String,
    required: true
  },
  message: {
    // Nội dung thông báo
    type: String,
    required: true
  }
})

export default mongoose.models.Notification || mongoose.model<Notification>("Notification", NotificationSchema)