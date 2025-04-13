import mongoose from "mongoose";

export interface SensorLog extends mongoose.Document {
  plant_unit_id: mongoose.Types.ObjectId;
  light: number;
  moisture: number;
  humidity: number;
  temperature: number;
  timestamp: Date;
}

const SensorLogSchema = new mongoose.Schema<SensorLog>({
  plant_unit_id: {
    // Khóa ngoại tham chiếu đến cây
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  light: {
    // Độ sáng
    type: Number,
    required: true
  },
  moisture: {
    // Độ ẩm
    type: Number,
    required: true
  },
  humidity: {
    // Độ ẩm không khí
    type: Number,
    required: true
  },
  temperature: {
    // Nhiệt độ
    type: Number,
    required: true
  },
  timestamp: {
    // Thời gian ghi nhận
    type: Date,
    required: true
  }
})

export default mongoose.models.SensorLog || mongoose.model<SensorLog>("SensorLog", SensorLogSchema)