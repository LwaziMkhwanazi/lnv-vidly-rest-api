import helmet from "helmet";
import compression from "compression";

const prodMiddleWare =(app) => {
app.use(helmet())
app.use(compression())
}

export default prodMiddleWare;