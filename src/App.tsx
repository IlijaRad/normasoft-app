import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Home from "./pages/Home";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>
        <Route path={ROUTES.CREATE_POST}>
          <CreatePost />
        </Route>
        <Route path={ROUTES.EDIT_POST}>
          <EditPost />
        </Route>
        <Route path={ROUTES.POST}>
          <Post />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
