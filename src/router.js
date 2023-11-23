import { Router } from "express";
import { userRegister } from "./controller/userRegister";


const appRouter = Router();

appRouter.post('/register',userRegister);


export default appRouter;