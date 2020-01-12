### app_users

- id INT
- firstname TEXT
- lastname TEXT
- email TEXT
- password TEXT
- status INT
- created_at DATE
- updated_at DATE

### quizzes

- id INT
- title TEXT
- description TEXT
- status INT
- created_at DATE
- updated_at DATE
- app_users_id (1:N app_users)

### questions

- id INT
- label TEXT
- anecdote TEXT
- wiki TEXT
- status INT
- created_at DATE
- updated_at DATE
- levels_id INT (1:N levels)
- answers_id INT (1:1 answers la bonne réponse)
- quizzes_id (1:N quizzes)

### answer

- id INT
- description TEXT
- status INT
- created_at DATE
- updated_at DATE
- questions_id INT (0:N questions)

### level

- id INT
- name TEXT
- status INT
- created_at DATE
- updated_at DATE

### tag

- id INT
- name TEXT
- status INT
- created_at DATE
- updated_at DATE

### quizzes_has_tags

- quizzes_id INT (1:N quizzes)
- tags_id INT (1:N tags)
- created_at TIMESTAMP