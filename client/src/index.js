import ReactDOM from "react-dom";
import { makeMainRoutes } from "./routes";
import * as serviceWorker from "./serviceWorker";
const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById("root"));
serviceWorker.register();
