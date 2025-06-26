import sqlite3

conn = sqlite3.connect('app.db')
cur = conn.cursor()
try:
    cur.execute('ALTER TABLE reviews ADD COLUMN guest_name VARCHAR;')
    print('Колонка guest_name добавлена')
except Exception as e:
    print('guest_name:', e)
try:
    cur.execute('ALTER TABLE reviews ADD COLUMN guest_phone VARCHAR;')
    print('Колонка guest_phone добавлена')
except Exception as e:
    print('guest_phone:', e)
conn.commit()
conn.close()
print('Миграция завершена!') 