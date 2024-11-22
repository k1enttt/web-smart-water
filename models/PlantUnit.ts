import mongoose from "mongoose";

export interface PlantUnit extends mongoose.Document {
  plant_type_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  plant_name: string;
  plant_description: string;
  plant_age: number;
  water_velocity: number;
  total_water_volumn: number;
  plant_status: "dry" | "normal" | "wet";
  device_mac: string;
  device_name: string;
  device_status: string;
  automatic_watering: boolean;
}

const PlantUnitSchema = new mongoose.Schema<PlantUnit>({
  plant_type_id: {
    // Khóa ngoại tham chiếu loại cây

    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  user_id: {
    // Khóa ngoại tham chiếu người dùng

    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  plant_name: {
    // Tên của cây, 1 cây có 1 tên và khác với tên loại cây

    type: String,
    required: true
  },
  plant_description: {
    // Mô tả về cây

    type: String
  },
  plant_age: {
    // Tuổi hiện tại của cây
    
    type: Number
  },
  water_velocity: {
    // Vận tốc nước tưới

    type: Number,
    required: true
  },
  total_water_volumn: {
    // Tổng thể tích nước đã tưới cho cây

    type: Number,
    required: true
  },
  plant_status: {
    // Trạng thái của cây

    type: String,
    enum: ["dry", "normal", "wet"],
    required: true
  },
  device_mac: {
    // Địa chỉ MAC của thiết bị

    type: String,
    required: true
  },
  device_name: {
    // Tên của thiết bị

    type: String,
    required: true
  },
  device_status: {
    // Trạng thái của thiết bị

    type: String,
    required: true
  },
  automatic_watering: {
    // Có tự động tưới nước hay không

    type: Boolean,
    required: true
  }
})

export default mongoose.models.PlantUnit || mongoose.model<PlantUnit>("PlantUnit", PlantUnitSchema)