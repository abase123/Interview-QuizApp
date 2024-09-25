package quizappbackend.domain.dto

data class QuizResultDto(
    val score: Int,
    val numbQuestion: Int,
    val correctAnswers: Map<Long,Long>, // Map of questionId to correct optionId
    val userAnswers:  Map<Long, Long>   // Map of questionId to user's selected optionId
)
