package quizappbackend.domain

import jakarta.persistence.Table

@Table(name = "question")
data class QuizResult(
    val score: Int,
    val numbQuestion: Int,
    val correctAnswers: Map<Long,Long>, // Map of questionId to correct optionId
    val userAnswers:  Map<Long, Long>,  // Map of questionId to user's selected optionId
)