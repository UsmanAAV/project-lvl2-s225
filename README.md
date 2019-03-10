# project-gendiff

[![Build Status](https://travis-ci.org/UsmanAAV/project-lvl2-s225.svg?branch=master)](https://travis-ci.org/UsmanAAV/project-lvl2-s225) [![Maintainability](https://api.codeclimate.com/v1/badges/e854b4e74661dc02b662/maintainability)](https://codeclimate.com/github/UsmanAAV/project-lvl2-s225/maintainability)

#project-lvl2-s225
## Проект 'Вычислитель отличий'

Это приложение, реализованное в рамках второго проекта при изучении профессии Javascript-разработчика на [hexlet.io](https://ru.hexlet.io/?ref=155709). Ссылка на проект - [Вычислитель отличий](https://ru.hexlet.io/projects/3/sessions/225?ref=155709)

## Цель

Второй проект является логическим развитием [первого](https://ru.hexlet.io/projects/2/sessions/462?ref=155709). Он захватывает большую часть синтаксических возможностей `js` и использует более сложную архитектуру. Требования:

 - научиться создавать полноценные `CLI`-приложения (command-line interface), с парсингом входных параметров, валидацией, и генерацией справки;
 - разобраться с форматами данных `json`, `yaml`, `ini` - понять структуру, научиться парсить в `js` и обратно;
 - поработать с деревьями - обход, трансформация, формирование АСТ (абстрактное синтаксическое дерево) - немного кода, кипятящего мозг;
 - познакомиться и реализовать на практике архитектурные принципы 'Фасад', 'Адаптер';
 - реализовать полиморфизм подтипов на практике;
 - сделать весь проект в функциональном стиле.

## Описание
В рамках данного проекта необходимо реализовать утилиту для поиска отличий в конфигурационных файлах.

Возможности утилиты:
- Поддержка разных форматов
- Генерация отчета в виде plain text, pretty и json

Пример использования:

```
$ gendiff --format plain first-config.ini second-config.ini
Setting "common.setting2" deleted.
Setting "common.setting4" added with value "blah blah".
Setting "group1.baz" changed from "bas" to "bars".
Section "group2" deleted.
```

## Установка
`npm i -g project-gendiff`

## Запуск
```
$ gendiff --help
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  Output format (default: "stylish")
  -h, --help           output usage information
```
