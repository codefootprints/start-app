User:
- id uuid
- username string unique
- email string unique
- created_at timestamp

Resource:
- id uuid
- name string
- category string
- status enum available|in_use|maintenance

Task:
- id uuid
- title string
- description text
- status enum todo|in_progress|done
- user_id users fk
- resource_id resources fk
- created_at timestamp