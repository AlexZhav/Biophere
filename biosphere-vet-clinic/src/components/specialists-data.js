const specialists = [
  { name: 'Орлова Роза Сергеевна', position: 'Главный врач', specialization: 'терапия, визуальная диагностика (УЗИ), кардиология, онкология, неврология', workplace: 'ул. Солнечная, у д. 19 Б, ул. Московская, д. 4', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'rgogoleva.jpg' },
  { name: 'Черемисинова Анастасия Сергеевна', position: 'Главный врач', specialization: 'терапия, онкология', workplace: 'пр-т. Строителей, д. 9, к. 1', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'ancheremisinova.jpg' },
  { name: 'Малышева Ольга Юрьевна', position: 'Ветеринарный врач-хирург', specialization: 'торакальная хирургия, абдоминальная хирургия, косметическая и реконструктивная хирургия', workplace: 'ул. Чернышевского, д. 7, ул. Солнечная, у д. 19 Б', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'olmalisheva.jpg' },
  { name: 'Онегов Иван Александрович', position: 'Ветеринарный врач-хирург', specialization: 'хирургия, кардиология, рентгенология, стоматология, ортодонтия', workplace: 'ул. Солнечная, у д. 19 Б, ул. Чернышевского, д. 7', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'ivonegov.jpg' },
  { name: 'Жаворонков Олег Николаевич', position: 'Главный хирург сети клиник', specialization: 'травматология, ортопедия, нейрохирургия, абдоминальная и торакальная хирургия', workplace: 'ул. Московская, д. 4', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'olzhavoronkov.jpg' },
  { name: 'Вавилова Ульяна Юрьевна', position: 'Главный врач', specialization: 'терапия, офтальмология', workplace: 'ул. Московская, д. 4, ул. Молодой Гвардии, д. 2 Д', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'ulvavilova.jpg' },
  { name: 'Казанцева Елена Валерьевна', position: 'Ведущий терапевт', specialization: 'терапия, визуальная диагностика (УЗИ), кардиология, анестезиология', workplace: 'ул. Московская, д. 4, пр-т. Строителей, д. 9, к. 1', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'elborovicheva.jpg' },
  { name: 'Панина Станислава Ивановна', position: 'Ветеринарный врач', specialization: 'терапия, визуальная диагностика (УЗИ)', workplace: 'ул. Солнечная, у д. 19 Б', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'slobanova.jpg' },
  { name: 'Безденежных Анна Николаевна', position: 'Ветеринарный врач-хирург', specialization: 'абдоминальная, торакальная, косметическая и реконструктивная хирургия', workplace: 'ул. Молодой Гвардии, д. 2 Д', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'anbezdenezhnih.jpg' },
  { name: 'Гурьева Ольга Вадимовна', position: 'Ветеринарный врач-хирург', specialization: 'терапия, абдоминальная хирургия, косметическая и реконструктивная хирургия', workplace: 'пр-т. Строителей, д. 9, к. 1', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'olguryeva.jpg' },
  { name: 'Кудрявцева Юлия Юрьевна', position: 'Ветеринарный врач', specialization: 'терапия, дерматология, лабораторная диагностика', workplace: 'ул. Московская, д. 4 , Нововятский район, ул. Молодой Гвардии, д. 2 Д', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'ulkudryavceva.jpg' },
  { name: 'Суханова Елена Михайловна', position: 'Ветеринарный врач', specialization: 'терапия, дерматология, лабораторная диагностика', workplace: 'ул. Солнечная, д. 19 Б, ул. Чернышевского, д. 7', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'elsuhanova.jpg' },
  { name: 'Пушкарёва Ирина Сергеевна', position: 'Ветеринарный врач', specialization: 'терапия', workplace: 'ул. Солнечная, у д. 19 Б', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'irpushkareva.jpg' },
  { name: 'Целищева Марина Владимировна', position: 'Ветеринарный врач', specialization: 'терапия, дерматология, лабораторная диагностика', workplace: 'ул. Московская, д. 4', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'mcelisheva.jpg' },
  { name: 'Вохмянина Елена Олеговна', position: 'Ветеринарный врач', specialization: 'терапия, хирургия, визуальная диагностика (УЗИ)', workplace: 'пр-т. Строителей, д. 9, к. 1', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'elvohmyanina.jpg' },
  { name: 'Ронжина Алёна Владимировна', position: 'Ветеринарный врач', specialization: 'терапия', workplace: 'ул. Солнечная, у д. 19 Б, ул. Московская, д. 4', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'alkovyazina.jpg' },
  { name: 'Токмалаева Ирина Васильевна', position: 'Ветеринарный врач', specialization: 'анестезиология, реаниматология', workplace: 'ул. Московская, д. 4', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'irtokmalaeva.jpg' },
  { name: 'Воротилина Ольга Леонидовна', position: 'Ветеринарный врач', specialization: 'терапия, груминг', workplace: 'ул. Московская, д. 4, ул. Чернышевского, д. 7, Нововятский район, ул. Молодой Гвардии, д. 2 Д', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'olvorotilina.jpg' },
  { name: 'Казаковцева Екатерина Владимировна', position: 'Ветеринарный врач', specialization: 'терапия', workplace: 'Нововятский район, ул. Молодой Гвардии, д. 2 Д', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'ekkazakovceva.jpg' },
  { name: 'Черезова Оксана Васильевна', position: 'Ветеринарный врач', specialization: 'терапия', workplace: 'ул. Солнечная, у д. 19 Б, пр-т. Строителей, д. 9, к. 1', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'okcherezova.jpg' },
  { name: 'Шустова Полина Сергеевна', position: 'Ветеринарный врач', specialization: 'терапия, хирургия, визуальная диагностика (УЗИ), кардиология', workplace: 'пр-т. Строителей, д. 9, к. 1', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'pshustova.jpg' },
  { name: 'Заварухин Иван Сергеевич', position: 'Ветеринарный врач', specialization: 'терапия, визуальная диагностика (УЗИ)', workplace: 'ул. Чернышевского, д. 7, ул. Московская, д. 4', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'ivzavaruhin.jpg' },
  { name: 'Лисова-Новгородцева Ксения Игоревна', position: 'Ветеринарный врач', specialization: 'терапия, дерматология, лабораторная диагностика, репродуктология', workplace: 'ул. Солнечная, у д. 19 Б, ул. Чернышевского, д. 7', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'knovgorodceva.jpg' },
  { name: 'Александрова Александра Андреевна', position: 'Ветеринарный врач', specialization: 'терапия', workplace: 'пр-т. Строителей, д. 9, к. 1', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'alkoroza.jpg' },
  { name: 'Заболотская Анастасия Михайловна', position: 'Ветеринарный врач', specialization: 'терапия, визуальная диагностика (УЗИ)', workplace: 'пр-т. Строителей, д. 9, к. 1', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'anvvedenskaya.jpg' },
  { name: 'Маликова Ксения Фуатовна', position: 'Ветеринарный врач', specialization: 'терапия', workplace: 'ул. Московская, д. 4, ул. Солнечная, у д. 19 Б', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'kmalikova.jpg' },
  { name: 'Богомолова Карина Александровна', position: 'Ветеринарный врач', specialization: 'терапия', workplace: 'ул. Московская, д. 4, Нововятский район, ул. Молодой Гвардии, д. 2 Д', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'kbogomolova.jpg' },
  { name: 'Коробейникова Марина Васильевна', position: 'Ветеринарный врач', specialization: 'терапия', workplace: 'ул. Московская, д. 4, Нововятский район, ул. Молодой Гвардии, д. 2 Д', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'mkorobeynikova.jpg' },
  { name: 'Махнёва Дарья Валентиновна', position: 'Ветеринарный врач', specialization: 'терапия', workplace: 'Нововятский район, ул. Молодой Гвардии, д. 2 Д', education: 'Московская Ветеринарная Академия', extra_qual: 'Кардиология, УЗИ-диагностика', photo: 'dmahneva.jpg' },
];

// Добавляем недостающих специалистов из specialists2
const specialists2 = [
    { name: 'Просвирнина Ксения Алексеевна', position: 'Администратор', specialization: '', workplace: '', education: '', photo: 'kprosvirnina.jpg' },
    { name: 'Ефимова Елизавета Леонидовна', position: 'Администратор', specialization: '', workplace: '', education: '', photo: 'elivanova.jpg' },
    { name: 'Ишимова Людмила Дмитриевна', position: 'Администратор', specialization: '', workplace: '', education: '', photo: 'lishimova.jpg' },
    { name: 'Бакина Наталья Владимировна', position: 'Администратор', specialization: '', workplace: '', education: '', photo: 'nbakina.jpg' },
    { name: 'Орлова Алла Геннадьевна', position: 'Администратор', specialization: '', workplace: '', education: '', photo: 'alorlova.jpg' },
    { name: 'Юрченко Татьяна Алексеевна', position: 'Администратор', specialization: '', workplace: '', education: '', photo: 'tyurchenko.jpg' },
];

// Объединяем без дублей по name
const namesSet = new Set(specialists.map(s => s.name));
specialists2.forEach(s => {
  if (!namesSet.has(s.name)) {
    specialists.push({
      name: s.name,
      position: s.position.replace(/^: /, '').replace(/^:/, '').trim(),
      specialization: s.specialization.replace(/^: /, '').replace(/^:/, '').trim(),
      workplace: s.workplace && s.workplace.replace(/^: /, '').replace(/^:/, '').trim() || '',
      education: s.education.replace(/^: /, '').replace(/^:/, '').replace('высшее, ', '').replace('Вятская государственная сельскохозяйственная академия', 'Московская Ветеринарная Академия').trim(),
      extra_qual: '',
      photo: s.photo
    });
  }
});

// После формирования массива специалистов:
specialists.forEach(s => {
  s.workplace = s.workplace
    .split(',')
    .map(w => w.trim())
    .filter(w => !/^((у\s*)?д\.?\s*\d+\s*\D*|д\.?\d+\s*\D*)$/i.test(w) && w.length > 5)
    .map(w => w.replace(/,?\s*д\.?\s*\d+\s*\D*$/i, ''))
    .filter(Boolean)
    .join(', ')
})

export default specialists;

  