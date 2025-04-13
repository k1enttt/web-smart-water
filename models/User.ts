import mongoose from "mongoose";

export interface User extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  count_of_plant: number
}

const UserSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: [true, "Hãy đặt tên tài khoản."],
    maxlength: [60, "Tên tài khoản không quá 60 ký tự."]
  },
  email: {
    type: String,
    required: [true, "Hãy nhập email của bạn."],
    maxlength: [255, "Email không quá 255 ký tự"]
  },
  password: {
    // Mật khẩu sau khi được mã hóa

    type: String,
    required: [true, "Hãy nhập mật khẩu của bạn."],
    minlength: [8, "Mật khẩu phải có tối thiểu 8 ký tự."]
  },
  count_of_plant: {
    // Số lượng cây mà người dùng đã thêm

    type: Number,
    required: true
  }
})

export default mongoose.models.User || mongoose.model<User>("User", UserSchema)