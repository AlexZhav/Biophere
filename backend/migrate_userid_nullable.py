import sqlite3

conn = sqlite3.connect('app.db')
cur = conn.cursor()

# 1. Создать новую таблицу с user_id nullable
cur.execute('''
CREATE TABLE reviews_new (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    guest_name VARCHAR,
    guest_phone VARCHAR,
    rating INTEGER NOT NULL,
    text VARCHAR NOT NULL,
    created_at DATETIME NOT NULL,
    admin_reply TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
''')

# 2. Скопировать данные
cur.execute('''
INSERT INTO reviews_new (id, user_id, guest_name, guest_phone, rating, text, created_at, admin_reply)
SELECT id, user_id, guest_name, guest_phone, rating, text, created_at, admin_reply FROM reviews
''')

# 3. Удалить старую таблицу
cur.execute('DROP TABLE reviews')

# 4. Переименовать новую
cur.execute('ALTER TABLE reviews_new RENAME TO reviews')

conn.commit()
conn.close()
print('user_id теперь nullable!') 