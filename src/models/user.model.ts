import mongoose, { InferSchemaType } from 'mongoose'

export type userType = InferSchemaType<typeof userSchema>

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        lowercase: true,
    },
    lname: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    hashPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    emailVerificationToken: {
        type: String,
    },
    emailVerificationTokenExpireAt: {
        type: String,
    },
})

export const User = mongoose.model('User', userSchema)
