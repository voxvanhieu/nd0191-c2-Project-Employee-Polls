// Libs
import { useEffect } from "react";
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
import { userActions } from "../data/store";
import { pollActions } from "../data/store";

// Pages
import { Dashboard } from "./Dashboard";
import { Login } from './account'
import { NotFound } from "./NotFound"
import { TestPage } from "./TestPage";
import { About } from "./About";
import { Leaderboard } from "./Leaderboard";
import { QuestionDetails } from "./QuestionDetails";

const App = (props) => {

  // init custom history object to allow navigation from 
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();

  const dispatch = useDispatch();
  const auth = useSelector(authSelectors.selectValue);

  useEffect(() => {
    if (!auth) {
      return;
    }
    dispatch(pollActions.getQuestions());
    dispatch(userActions.getUsers());
  }, [auth, dispatch]);

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
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route
              path="/questions/:question"
              element={(<QuestionDetails />)}
            />
            {/*
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
