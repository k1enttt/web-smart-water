import mongoose from "mongoose";

export interface PlantUnit extends mongoose.Document {
  plant_type_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  age: number;
  water_velocity: number;
  total_water_volumn: number
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
  }
})

export default mongoose.models.PlantUnit || mongoose.model<PlantUnit>("PlantUnit", PlantUnitSchema)