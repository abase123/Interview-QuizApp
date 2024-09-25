package quizappbackend.domain.dto

data class QuizSubmissionDto(
    val answers: Map<Long, Long>    // Map of questionId to selected optionId (nullable)
)