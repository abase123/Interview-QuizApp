package quizappbackend.service.impl

import org.springframework.stereotype.Service
import quizappbackend.domain.entities.QuestionEntity
import quizappbackend.domain.QuizResult
import quizappbackend.repository.QuestionRepository
import quizappbackend.service.QuizService

@Service
class QuizServiceImpl(private val questionRepository: QuestionRepository): QuizService
{
    override fun generateQuiz(limit: Int): List<QuestionEntity> {
        return questionRepository.findAll().shuffled().take(limit)
    }
    override fun evaluateQuiz(userAnswers: Map<Long,Long>): QuizResult {
        val questions: List<QuestionEntity> = questionRepository.findAllById(userAnswers.keys)

        val correctAnswers: Map<Long, Long> = questions.associate { question ->
            val correctOptionId = question.options.first { it.isCorrect }.id
            question.id to correctOptionId
        }
        val score: Int = userAnswers.count { (questionId, selectedOptionId) ->
            correctAnswers[questionId] == selectedOptionId
        }
        return QuizResult(
            score = score,
            numbQuestion = questions.size,
            correctAnswers = correctAnswers,
            userAnswers = userAnswers
        )
    }
}