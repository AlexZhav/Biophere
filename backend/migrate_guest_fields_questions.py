import sqlite3

conn = sqlite3.connect('app.db')
cur = conn.cursor()

# 1. Создать новую таблицу с user_id nullable и guest_name, guest_phone
cur.execute('''
CREATE TABLE questions_new (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    guest_name VARCHAR,
    guest_phone VARCHAR,
    text TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    admin_reply TEXT
)
''')

# 2. Скопировать данные
cur.execute('''
INSERT INTO questions_new (id, user_id, text, created_at, admin_reply)
SELECT id, user_id, text, created_at, admin_reply FROM questions
''')

# 3. Удалить старую таблицу
cur.execute('DROP TABLE questions')

# 4. Переименовать новую
cur.execute('ALTER TABLE questions_new RENAME TO questions')

conn.commit()
conn.close()
print('questions: user_id теперь nullable, добавлены guest_name и guest_phone!') 