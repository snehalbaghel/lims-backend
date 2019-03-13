import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt-nodejs";


export type UserModel = mongoose.Document & {
    _id: mongoose.Types.ObjectId,
    username: string,
    name: string,
    password: string,
    accessLevel: number,
    comparePassword: comparePasswordFunction
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: mongoose.Error, isMatch: boolean) => void) => void;

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({

    //_id: Schema.Types.ObjectId,
    username: {type: Schema.Types.String, required: true},
    name: {type: Schema.Types.String, required: true},
    password: {type: Schema.Types.String, required: true},
    accessLevel: {type: Schema.Types.Number, required: true},
});

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next: mongoose.HookNextFunction) {
    const user: UserModel = this;
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, null, (err: mongoose.Error, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        next();
      });
    });
  });

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};
  
userSchema.methods.comparePassword = comparePassword;

const User: Model<UserModel> = mongoose.model<UserModel>("User", userSchema);

export default User;
  