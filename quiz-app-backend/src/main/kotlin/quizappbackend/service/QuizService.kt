package quizappbackend.service

import quizappbackend.domain.QuizResult
import quizappbackend.domain.entities.QuestionEntity


interface QuizService{
    fun generateQuiz(limit: Int): List<QuestionEntity>
    fun evaluateQuiz(userAnswers: Map<Long, Long>): QuizResult
}