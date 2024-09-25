package quizappbackend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class QuizAppBackend

fun main(args: Array<String>) {
    runApplication<QuizAppBackend>(*args)
}