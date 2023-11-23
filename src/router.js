import { Router } from "express";
import { userRegister } from "./controller/Auth/userRegister";


const appRouter = Router();

appRouter.post('/register',userRegister);


export default appRouter;