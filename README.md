# CI Test
[![Build status](https://ci.appveyor.com/api/projects/status/9ji0ogm5b3vkc08a?svg=true)](https://ci.appveyor.com/project/Natasha01013/ahj-hw10-task1-geolocation)

[Github Pages]()


# Домашнее задание к занятию "10. Geolocation, Notification, Media"  
----------

Правила сдачи задания:  
1. **Важно**: в рамках этого ДЗ можно использовать любой менеджер пакетов  
2. Все три задачи нужно делать в одном репозитории.  
3. Всё должно собираться через Webpack (включая картинки и стили) и выкладываться на Github Pages через Appveyor  
4. В README.md должен быть размещён бейджик сборки и ссылка на Github Pages  
5. В качестве результата присылайте проверяющему ссылки на ваши GitHub-проекты   
6. Авто-тесты нужно сделать только на функцию, которая обрабатывает ввод пользователем координат вручную (см. задачу 1) 
7. Серверную часть и загрузку также реализовывать не нужно, храните всё в памяти  
----------

### Общая легенда  
Вам предстоит создать проект "Timeline" - некую ленту постов человека, где он может прикреплять текстовые посты, а также записывать аудио и видео в привязке к своей геопозиции.  

Затем посты с текстом можно просматривать, посты с аудио - прослушивать, посты с видео - "проигрывать".  

Как это примерно должно выглядеть:  

![image](https://github.com/netology-code/ahj-homeworks/blob/AHJ-50/media/pic/timeline.png)  


Записи отображаются сверху вниз, наверху самая последняя.  

Первая запись - пример текстовой записи.  

Вторая запись - пример аудио-записи (при нажатии на кнопке Play происходит проигрывание аудио-записи). 

Третья запись - пример видео-записи (при нажатии на кнопке Play происходит проигрывание видео-записи).  

Для каждой записи указаны координаты, где сделана запись.  
--------

### Задача 1. Текстовые записи с координатами  
При создании текстовой записи (пользователь вводит текст в нижнее поле ввода и нажимает Enter) запросите координаты пользователя (через Geolocation API). Если координаты доступны, то добавьте сообщение в Timeline. Если же координаты не доступны - выведите пользователю соответствующее предупреждение с помощью модального окна и предложите указать координаты вручную (в реальном приложении, вы, конечно, будете использовать провайдера карт, но мы пока поступим именно так):  

![image-2](https://github.com/netology-code/ahj-homeworks/blob/AHJ-50/media/pic/test.png)  

Напишите авто-тест для функции, которая будет обрабатывать пользовательский ввод координат, при этом функция корректно должна обрабатывать следующие ситуации (и выводить объект содержащий широту и долготу):  

1. 51.50851, −0.12572 (есть пробел)  
2. 51.50851,−0.12572 (нет пробела)  
3. [51.50851, −0.12572] (есть квадратные скобки)  

При несоответствии формата функция должна генерировать исключение, которое должно влиять на валидацию поля (валидацию мы проходили).  