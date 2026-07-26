# CryptoVPS React Design System

React-библиотека компонентов CryptoVPS и каталог Storybook.

В проект входят:

- 18 компонентов дизайн-системы с состояниями и вариантами;
- демонстрационная галерея компонентов;
- Storybook с Autodocs и controls;
- интерактивные песочницы формы, модального окна, навигации и данных.

## Запуск

```bash
npm install
npm run dev
```

Локальный адрес Vite появится в терминале, обычно `http://127.0.0.1:5173/`.

## Storybook

```bash
npm run storybook
```

Storybook откроется по адресу `http://127.0.0.1:6006/`.

## Проверка

```bash
npm run lint
npm run build
npm run build-storybook
```

Компоненты экспортируются из `src/components/index.ts`, тестовая галерея находится в `src/Showcase.tsx`.
