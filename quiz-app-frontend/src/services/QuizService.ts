
import { Quiz } from "../domain/Quiz";
import {handleServerException} from "./serivceUtils.ts";
import {QuizSubmission} from "../domain/QuizSubmission.ts";
import {QuizResult} from "../domain/QuizResult.ts";


const API_BASE_URL = '/api';  // TODO -> USE .ENV file


export interface QuizService {
    fetchQuiz(limit: number): Promise<Quiz>;
    submitQuiz(submissionData: QuizSubmission): Promise<QuizResult>;
}

export class QuizServiceImpl implements QuizService {
    async fetchQuiz(limit: number = 3): Promise<Quiz> {
        const response = await fetch(`${API_BASE_URL}/quiz/generate?limit=${limit}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        handleServerException(response);
        return (await response.json()) as Quiz;
    }
    
    async submitQuiz(submissionData: QuizSubmission): Promise<QuizResult> {
        const response = await fetch(`${API_BASE_URL}/quiz/submit`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionData),
        });
        handleServerException(response);
        return (await response.json()) as QuizResult;
    }
}
