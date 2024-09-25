export type QuizResult = {
    score : number,
    numbQuestion : number,
    correctAnswers: { [questionId: number]: number }
    userAnswers: { [questionId: number]: number };
}