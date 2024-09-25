package quizappbackend.domain.entities

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

@Entity
@Table(name = "option")
data class OptionEntity(
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "option_id_seq")
    val id: Long = 0,

    @Column(name="option_text")
    val optionText: String = "",

    @Column(name="is_correct")
    val isCorrect: Boolean = false,

    @ManyToOne
    @JoinColumn(name = "question_id")
    val question: QuestionEntity = QuestionEntity()
)