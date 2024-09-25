package quizappbackend.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import quizappbackend.domain.dto.QuizDto
import quizappbackend.domain.dto.QuizResultDto
import quizappbackend.domain.dto.QuizSubmissionDto
import quizappbackend.service.QuizService
import quizappbackend.toDto

@RestController
@RequestMapping("/api/quiz")
class QuizController(private val quizService: QuizService) {

    @GetMapping("/generate")
    fun getQuiz(@RequestParam(required = false, defaultValue = "3") limit: Int): QuizDto {
        return QuizDto(quizService.generateQuiz(limit).map{it.toDto()})
    }
    @PostMapping("/submit")
    fun submitQuiz(@RequestBody submission: QuizSubmissionDto): ResponseEntity<QuizResultDto> {
        return try {
            val result = quizService.evaluateQuiz(submission.answers).toDto()
            ResponseEntity(result,HttpStatus.OK)
        } catch (e: IllegalStateException) {
            ResponseEntity(HttpStatus.BAD_REQUEST)
        }
    }

}