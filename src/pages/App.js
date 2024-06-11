// Libs
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

// Components
import { history } from '../helpers'
import {
  Nav,
  Alert,
  PrivateRoute
} from "../components";

// Store
import { authSelectors } from "../data/store";
import { pollActions, pollSelectors } from "../data/store/poll.slice";

// Pages
import { Dashboard } from "./Dashboard";
import { Login } from './account'
import { NotFound } from "./NotFound"
import { TestPage } from "./TestPage";
import { About } from "./About";
import { useEffect } from "react";

import * as API from '../data/api';
const App = (props) => {

  // init custom history object to allow navigation from 
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();

  const dispatch = useDispatch();
  const auth = useSelector(authSelectors.selectValue);
  // const poll = useSelector(pollSelectors.selectValue);
  // const user = useSelector(userSelector);

  useEffect(() => {
    if (!auth) {
      return;
    }

    dispatch(pollActions.getQuestionsAsync());
    // dispatch(userActions.getUsersAsync());
  }, []);

  return (
    <NextUIProvider navigate={history.navigate}>
      <div className="dark text-foreground bg-background">
        <Nav />
        <Alert />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<TestPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            {/* 
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/add" element={<NewPoll />} />
            <Route path="/questions/:id" element={<Poll />} />
            */}
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </NextUIProvider>
  );
}

export default App;
