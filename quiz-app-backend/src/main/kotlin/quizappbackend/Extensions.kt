package quizappbackend

import quizappbackend.domain.dto.OptionDto
import quizappbackend.domain.dto.QuestionDto
import quizappbackend.domain.dto.QuizResultDto
import quizappbackend.domain.entities.OptionEntity
import quizappbackend.domain.entities.QuestionEntity
import quizappbackend.domain.QuizResult

fun QuestionEntity.toDto() = QuestionDto (
        id = this.id,
        text = this.questionText,
        options = this.options.map { it.toDto() }
)

fun OptionEntity.toDto() = OptionDto(
        id = this.id,
        text = this.optionText,
)


fun QuizResult.toDto() = QuizResultDto(
    score = this.score,
    numbQuestion = this.numbQuestion,
    correctAnswers = this.correctAnswers,
    userAnswers = this.userAnswers
)
