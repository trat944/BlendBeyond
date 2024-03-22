import { Schema, model } from "mongoose";

interface IUserSchema  {
    name: String,
    email: String,
    password: String,
    movies: string[],
    createAt?: Date,
    updateAt?: Date
}

const userSchema = new Schema<IUserSchema> ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    movies: [{
        type: Schema.Types.ObjectId, ref:"Movie"
    }]
}, { timestamps: true });

const UserModel = model<IUserSchema>("User", userSchema)

export default UserModel;