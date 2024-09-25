package quizappbackend.repository

import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import quizappbackend.domain.entities.QuestionEntity

@Repository
interface QuestionRepository: JpaRepository <QuestionEntity,Long>{
    @EntityGraph(attributePaths = ["options"])
    override fun findAll(): List<QuestionEntity>
}


