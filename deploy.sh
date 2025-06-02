#!/bin/bash

# Скрипт для ручного деплоя на GitHub Pages

# Сборка проекта
npm run build

# Создание .nojekyll файла для предотвращения обработки Jekyll
touch out/.nojekyll

# Копирование файла 404.html в папку out
cp public/404.html out/404.html

# Если вы используете кастомный домен, раскомментируйте следующую строку
# echo "khwtshitpost.us" > out/CNAME

# Деплой на GitHub Pages
git add out/
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix out origin gh-pages
