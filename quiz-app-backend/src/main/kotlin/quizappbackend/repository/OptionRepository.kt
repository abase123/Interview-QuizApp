package quizappbackend.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import quizappbackend.domain.entities.OptionEntity

@Repository
interface OptionRepository : JpaRepository <OptionEntity,Long>