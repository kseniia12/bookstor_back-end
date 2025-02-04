import { authRouter } from "./authRoutse";
import { Router } from "express";
import { userRouter } from "./userRoutes";
import { bookRouter } from "./bookRoutes";
import { cartRouter } from "./cartRoutes";

const allRouter = Router();

allRouter.use("/auth", authRouter);
allRouter.use("/users", userRouter);
allRouter.use("/home", userRouter);
allRouter.use("/book", bookRouter);
allRouter.use("/cart", cartRouter);
export default allRouter;
