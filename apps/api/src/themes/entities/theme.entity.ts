import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "../../users/entities/user.entity";

export type ThemeDocument = Theme & Document;

@Schema({
  timestamps: true,
  collection: "themes",
  toJSON: {
    versionKey: false,
    getters: true,
  },
})
export class Theme {
  @Prop({
    type: String,
    get: function (this: ThemeDocument) {
      return this._id?.toString();
    },
  })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, required: true })
  settings: Record<string, any>;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", required: true })
  userId: User;
}

export const ThemeSchema = SchemaFactory.createForClass(Theme);

// Create a compound index for name and userId to ensure uniqueness of theme names per user
ThemeSchema.index({ name: 1, userId: 1 }, { unique: true });

// Create an index for isActive to optimize queries for active themes
ThemeSchema.index({ isActive: 1, userId: 1 });