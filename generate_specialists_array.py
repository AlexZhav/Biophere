import re
from bs4 import BeautifulSoup
import os

def clean_text(text):
    # Удаляет переносы строк, лишние пробелы и экранирует одинарные кавычки
    return re.sub(r'\s+', ' ', (text or '').replace("'", "\\'")).strip()

with open('doctors.html', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
specialists = []

for block in soup.find_all('div', class_='specialist-block'):
    img = block.find('img')
    photo = ''
    if img and img.get('src'):
        photo = img['src'].replace('doctors/', '').replace('doctors\\', '').strip()
    name = clean_text(block.find('h3', class_='specialist-name').get_text()) if block.find('h3', class_='specialist-name') else ''
    position = ''
    spec = ''
    workplace = ''
    education = ''
    extra_qual = ''
    for p in block.find_all('p'):
        txt = p.get_text()
        if 'Должность:' in txt:
            position = clean_text(txt.replace('Должность:', ''))
        if 'Специализация:' in txt:
            spec = clean_text(txt.replace('Специализация:', ''))
        if 'Место работы:' in txt:
            workplace = clean_text(txt.replace('Место работы:', ''))
    edu_div = block.find('div', class_='education-info')
    if edu_div:
        for p in edu_div.find_all('p'):
            txt = p.get_text()
            if 'Образование:' in txt:
                education = clean_text(txt.replace('Образование:', ''))
            if 'Дополнительные квалификации:' in txt:
                extra_qual = clean_text(txt.replace('Дополнительные квалификации:', ''))
    specialists.append({
        'name': name,
        'position': position,
        'specialization': spec,
        'workplace': workplace,
        'education': education,
        'extra_qual': extra_qual,
        'photo': photo,
    })

with open('biosphere-vet-clinic/src/components/specialists-data.js', 'w', encoding='utf-8') as f:
    f.write('const specialists = [\n')
    for s in specialists:
        f.write(f"  {{ name: '{s['name']}', position: '{s['position']}', specialization: '{s['specialization']}', workplace: '{s['workplace']}', education: '{s['education']}', extra_qual: '{s['extra_qual']}', photo: '{s['photo']}' }},\n")
    f.write('];\n\nexport default specialists;\n') 