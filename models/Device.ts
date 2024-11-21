import mongoose from "mongoose";

export interface Device extends mongoose.Document {
  plant_unit_id: mongoose.Types.ObjectId;
  mac_address: string;
  name: string;
  status: string;
  is_automatic: boolean;
}

const DeviceSchema = new mongoose.Schema<Device>({
  plant_unit_id: {
    // Khóa ngoại tham chiếu đến cây
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  mac_address: {
    // Địa chỉ MAC của thiết bị
    type: String,
    required: true
  },
  name: {
    // Tên thiết bị
    type: String,
    required: true
  },
  status: {
    // Trạng thái của thiết bị
    type: String,
    required: true
  },
  is_automatic: {
    // Có tự động tưới nước không
    type: Boolean,
    required: true
  }
})

export default mongoose.models.Device || mongoose.model<Device>("Device", DeviceSchema)