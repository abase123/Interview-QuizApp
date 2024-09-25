package quizappbackend.domain.dto

data class QuestionDto(
    val id: Long,
    val text: String,
    val options: List<OptionDto>
)
