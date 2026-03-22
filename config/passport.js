import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import db from '../scripts/userScript.js'
import bcrypt from "bcryptjs";



passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.findUserByName(username);

      if (!user) return done(null, false);

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);



passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        const user = await db.findUserById(payload.id);

        if (!user) return done(null, false);

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);



export default passport;