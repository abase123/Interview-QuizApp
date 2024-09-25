-- Drop sequences if they exist
DROP SEQUENCE IF EXISTS "question_id_seq";
DROP SEQUENCE IF EXISTS "option_id_seq";

-- Create sequences for auto-incrementing IDs
CREATE SEQUENCE "question_id_seq" INCREMENT BY 50 START 1;
CREATE SEQUENCE "option_id_seq" INCREMENT BY 50 START 1;

-- Drop the 'question' and 'option' tables if they already exist
DROP TABLE IF EXISTS "question";
DROP TABLE IF EXISTS "option";

-- Create the 'question' table
CREATE TABLE "question" (
"question_id" bigint NOT NULL DEFAULT nextval('question_id_seq'),
"question_text" VARCHAR(2048),
CONSTRAINT "question_pkey" PRIMARY KEY ("question_id")
);

-- Create the 'option' table
CREATE TABLE "option" (
  "id" bigint NOT NULL DEFAULT nextval('option_id_seq'),
  "option_text" VARCHAR(64),
  "is_correct" BOOLEAN NOT NULL,
  "question_id" bigint,  -- Foreign key to the 'question' table
  CONSTRAINT "option_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "option_question_fk" FOREIGN KEY ("question_id") REFERENCES "question" ("question_id") ON DELETE CASCADE
);

-- Insert sample data into the 'question' table and capture the generated IDs
WITH inserted_questions AS (
INSERT INTO "question" ("question_text") VALUES
    ('What is the capital of France?'),
    ('Which planet is known as the Red Planet?'),
    ('Who wrote the play "Hamlet"?'),
    ('What is the largest mammal?'),
    ('What is the chemical symbol for water?'),
    ('How many continents are there on Earth?'),
    ('Which element has the atomic number 1?'),
    ('Who painted the Mona Lisa?'),
    ('In which year did the Titanic sink?'),
    ('Which country is the largest by land area?')
    RETURNING "question_id", "question_text"
    )

-- Insert options using the question IDs from the previous insert
INSERT INTO "option" ("option_text", "is_correct", "question_id")
SELECT o.option_text, o.is_correct, q."question_id"
FROM inserted_questions q,
     LATERAL (
              SELECT unnest(ARRAY['Paris', 'London', 'Rome', 'Berlin']) AS option_text,
                     unnest(ARRAY[TRUE, FALSE, FALSE, FALSE]) AS is_correct
WHERE q."question_text" = 'What is the capital of France?'

UNION ALL

SELECT unnest(ARRAY['Earth', 'Mars', 'Jupiter', 'Venus']) AS option_text,
       unnest(ARRAY[FALSE, TRUE, FALSE, FALSE]) AS is_correct
    WHERE q."question_text" = 'Which planet is known as the Red Planet?'

UNION ALL

SELECT unnest(ARRAY['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain']) AS option_text,
       unnest(ARRAY[TRUE, FALSE, FALSE, FALSE]) AS is_correct
    WHERE q."question_text" = 'Who wrote the play "Hamlet"?'

UNION ALL

SELECT unnest(ARRAY['Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear']) AS option_text,
       unnest(ARRAY[FALSE, TRUE, FALSE, FALSE]) AS is_correct
    WHERE q."question_text" = 'What is the largest mammal?'

UNION ALL

SELECT unnest(ARRAY['O2', 'CO2', 'H2O', 'HO']) AS option_text,
       unnest(ARRAY[FALSE, FALSE, TRUE, FALSE]) AS is_correct
    WHERE q."question_text" = 'What is the chemical symbol for water?'

UNION ALL

SELECT unnest(ARRAY['5', '6', '7', '8']) AS option_text,
       unnest(ARRAY[FALSE, FALSE, TRUE, FALSE]) AS is_correct
    WHERE q."question_text" = 'How many continents are there on Earth?'

UNION ALL

SELECT unnest(ARRAY['Oxygen', 'Hydrogen', 'Carbon', 'Helium']) AS option_text,
       unnest(ARRAY[FALSE, TRUE, FALSE, FALSE]) AS is_correct
    WHERE q."question_text" = 'Which element has the atomic number 1?'

UNION ALL

SELECT unnest(ARRAY['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet']) AS option_text,
       unnest(ARRAY[FALSE, FALSE, TRUE, FALSE]) AS is_correct
    WHERE q."question_text" = 'Who painted the Mona Lisa?'

UNION ALL

SELECT unnest(ARRAY['1912', '1914', '1920', '1905']) AS option_text,
       unnest(ARRAY[TRUE, FALSE, FALSE, FALSE]) AS is_correct
    WHERE q."question_text" = 'In which year did the Titanic sink?'

UNION ALL

SELECT unnest(ARRAY['Russia', 'Canada', 'China', 'USA']) AS option_text,
       unnest(ARRAY[TRUE, FALSE, FALSE, FALSE]) AS is_correct
    WHERE q."question_text" = 'Which country is the largest by land area?'
    ) o;
