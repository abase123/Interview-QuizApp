import { createContext } from "react";
import {QuizServiceImpl} from "../services/QuizService.ts";

const AppContext = createContext({
    quizService: new QuizServiceImpl(),
});

export default AppContext;
