import mongoose from "mongoose";

export interface PlantType extends mongoose.Document {
  name: string;
  description: string,
  high_moisture_threshold: number;
  low_moisture_threshold: number;
  image_url: string
}

const PlantTypeSchema = new mongoose.Schema<PlantType>({
  name: {
    type: String,
    required: [true, "Hãy đặt tên cho loài cây này."],
    maxlength: [60, "Tên loài cây không được quá 60 ký tự."]
  },
  description: {
    type: String,
    required: [true, "Hãy mô tả loài cây này."],
    maxlength: [255, "Mô tả loài cây không được quá 255 ký tự."]
  },
  high_moisture_threshold: {
    type: Number,
    required: [true, "Hãy nhập ngưỡng độ ẩm cao."]
  },
  low_moisture_threshold: {
    type: Number,
    required: [true, "Hãy nhập ngưỡng độ ẩm thấp."]
  },
  image_url: {
    type: String,
    required: [true, "Hãy gắn đường dẫn hình ảnh của loài cây."]
  }
})

export default mongoose.models.PlantType || mongoose.model<PlantType>("PlantType", PlantTypeSchema);
