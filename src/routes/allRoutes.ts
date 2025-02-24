import { authRouter } from "./authRoutse";
import { Router } from "express";
import { userRouter } from "./userRoutes";
import { bookRouter } from "./bookRoutes";
import { cartRouter } from "./cartRoutes";
import { favoritesRouter } from "./favoritesRoutes";
import { commentRouter } from "./commentRoutes";

const allRouter = Router();

allRouter.use("/auth", authRouter);
allRouter.use("/users", userRouter);
allRouter.use("/books", bookRouter);
allRouter.use("/cart-items", cartRouter);
allRouter.use("/favorites", favoritesRouter);
allRouter.use("/comments", commentRouter);

export default allRouter;
