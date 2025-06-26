import React, { useState } from 'react';
import services from '../../../services-data.js';

const sections = ['Все разделы', ...Array.from(new Set(services.map(s => s.section)))];

export default function PriceTable() {
  const [search, setSearch] = useState('');
  const [section, setSection] = useState('Все разделы');

  const filtered = services.filter(s =>
    (section === 'Все разделы' || s.section === section) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || (s.note && s.note.toLowerCase().includes(search.toLowerCase())))
  );

  // Группировка по разделам для отображения секций
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-white dark:bg-gray-900 p-4">
      <div className="flex flex-col md:flex-row gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-1/2 focus:outline-none focus:ring focus:border-biosphere-primary text-black"
        />
        <select
          value={section}
          onChange={e => setSection(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-1/3 focus:outline-none focus:ring focus:border-biosphere-primary"
        >
          {sections.map(sec => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse text-sm md:text-base">
        <thead>
          <tr>
            <th className="bg-biosphere-warm/10 text-left px-4 py-2 font-bold w-3/4 text-gray-900 dark:text-white">Название</th>
            <th className="bg-biosphere-warm/10 text-left px-4 py-2 font-bold w-1/4 text-gray-900 dark:text-white">Цена, руб.</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([sec, items]) => (
            <React.Fragment key={sec}>
              <tr>
                <td colSpan={2} className="bg-biosphere-primary/10 font-semibold px-4 py-2 text-biosphere-primary">{sec}</td>
              </tr>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="border-t px-4 py-2">
                    {item.name}
                    {item.note && <span className="float-right text-gray-500">{item.note}</span>}
                  </td>
                  <td className="border-t px-4 py-2">{item.price}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={2} className="text-center text-gray-400 py-8">Ничего не найдено</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 