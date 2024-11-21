import mongoose from "mongoose";

export interface PlantUnit extends mongoose.Document {
  plant_type_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  age: number;
  water_velocity: number;
  total_water_volumn: number;
  status: "dry" | "normal" | "wet";
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
  name: {
    // Tên của cây, 1 cây có 1 tên và khác với tên loại cây

    type: String,
    required: true
  },
  description: {
    // Mô tả về cây

    type: String
  },
  age: {
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
  status: {
    // Trạng thái của cây

    type: String,
    enum: ["dry", "normal", "wet"],
    required: true
  }
})

export default mongoose.models.PlantUnit || mongoose.model<PlantUnit>("PlantUnit", PlantUnitSchema)