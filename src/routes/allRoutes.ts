import { authRouter } from "./authRoutse";
import { Router } from "express";
import { userRouter } from "./userRoutes";
import { bookRouter } from "./bookRoutes";
import { cartRouter } from "./cartRoutes";
import { favoritesRouter } from "./favorites";

const allRouter = Router();

allRouter.use("/auth", authRouter);
allRouter.use("/users", userRouter);
// allRouter.use("/", userRouter);
allRouter.use("/book", bookRouter);
allRouter.use("/cart", cartRouter);
allRouter.use("/favorites", favoritesRouter);
export default allRouter;
