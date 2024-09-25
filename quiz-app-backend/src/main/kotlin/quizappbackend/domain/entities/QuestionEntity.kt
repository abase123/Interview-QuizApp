package quizappbackend.domain.entities

import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.Table


@Entity
@Table(name = "question")
data class QuestionEntity(

    @Id
    @Column(name="question_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "question_id_seq")
    val id: Long = 0,

    @Column(name="question_text")
    val questionText: String = "",

    @OneToMany(mappedBy = "question", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.LAZY)
    val options: List<OptionEntity> = emptyList()

)
