import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  img: {
    type: String,
  },
  roles: {
    type: [String],
    default: ['USER_ROLE'],
    enum: ['USER_ROLE', 'ADMIN_ROLE'], // enum son los posibles valores, si envías otro, da error
  },
});

// User nombre del modelo
// mongodb creará coleccion "users" porque pone minúsculas y plural automáticamente
export const UserModel = mongoose.model('User', userSchema);
