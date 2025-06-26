import re
from bs4 import BeautifulSoup

with open('table.html', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

services = []
current_section = None

def clean_text(text):
    # Удаляет переносы строк и лишние пробелы
    return re.sub(r'\s+', ' ', text or '').strip()

for tr in soup.find_all('tr'):
    # Секция
    div = tr.find('div', class_='ui big ribbon label')
    if div:
        current_section = clean_text(div.get_text())
        continue
    tds = tr.find_all('td')
    if len(tds) == 2:
        name = clean_text(tds[0].get_text())
        price = clean_text(tds[1].get_text())
        # Примечание (note) — если есть span или после <span style="float: right;">
        note = ''
        span = tds[0].find('span', style=re.compile('float: ?right'))
        if span:
            note = clean_text(span.get_text())
            # Убираем note из name
            name = clean_text(tds[0].get_text().replace(span.get_text(), ''))
        services.append({
            'section': current_section or '',
            'name': name,
            'note': note,
            'price': price
        })

# Сохраняем результат в файл services-data.js
with open('services-data.js', 'w', encoding='utf-8') as f:
    f.write('const services = [\n')
    for s in services:
        f.write(f"  {{ section: '{s['section']}', name: '{s['name']}', note: '{s['note']}', price: '{s['price']}' }},\n")
    f.write('];\n\nexport default services;\n') 