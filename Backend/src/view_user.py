import sqlite3

conn = sqlite3.connect("matrimony.db")

cursor = conn.cursor()

cursor.execute("SHOW TABLES;")

rows = cursor.fetchall()

for row in rows:
    print(row)

conn.close()