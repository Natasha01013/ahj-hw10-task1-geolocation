export class Timeline {
    constructor(timelineId, inputId) {
        this.timeline = document.getElementById(timelineId);
        this.textInput = document.getElementById(inputId);
        this.manualCoordinates = null; // Свойство для хранения ручных координат
        this.pendingText = null; // Свойство для хранения текста поста
  
        this.textInput.addEventListener('keydown', this.handleKeyDown.bind(this)); // Используем bind, чтобы не потерять контекст и текст поста сохранялся
    }

        //Запишем в отдельную функцию, чтобы применить bind
        handleKeyDown(event) {
            if (event.key === 'Enter') {
                this.pendingText = this.textInput.value;
                this.addTextPost(); //добавляет текст
                this.textInput.value = ''; //очищаем поле ввода 
            }
        }

    addTextPost() {
        if (this.manualCoordinates) { //Если вводим ручные координаты
            // Вызываем метод createPost() для создания поста с ручными координатами и текстом
            this.createPost(this.pendingText, this.manualCoordinates.latitude, this.manualCoordinates.longitude);
            this.pendingText = null; // Сбрасываем текст поста после использования
            this.manualCoordinates = null; // Сбрасываем ручные координаты после использования
        } else if (navigator.geolocation) { //Если дали разрешение на определение геолокации
            console.log('geolocation условие if'); 
            navigator.geolocation.getCurrentPosition( // Получим координаты
                (position) => {
                    console.log('geolocation success');
                    const latitude = position.coords.latitude; // Получаем широту
                    const longitude = position.coords.longitude; // Получаем долготу
                    // Вызываем метод createPost() для создания поста с координатами и текстом
                    this.createPost(this.pendingText, latitude, longitude);
                    this.pendingText = null; // Сбрасываем текст поста после использования
                },
                (error) => { //Если не дали разрешение на получение геолокации
                    console.log('geolocation error:', error); 
                    this.showModal('Геолокация недоступна. Введите координаты вручную.');
                    this.promptForCoordinates(); // Запрашиваем координаты вручную
                }
            );
        } else { //Если геолокация недоступна в браузере.
            console.log('else условие');
            this.showModal('Геолокация не поддерживается браузером.');
            this.promptForCoordinates(); // Запрашиваем координаты вручную
        }
    }

    // Метод для отображение модального окна для ручного ввода координат
    promptForCoordinates() {
        const modal = document.getElementById('coordinatesModal'); //Модальное окно для ввода ручных координат
        const coordinatesInput = document.getElementById('coordinatesInput'); //Поле для ввода ручных координат в модальном окне
        const cancelBtn = document.getElementById('cancelCoordinates'); //Кнопка отмена в модальном окне
        const okBtn = document.getElementById('okCoordinates');//Кнопка ОК в модальном окне
        const closeBtn = document.getElementsByClassName('close')[0]; // Крестик для закрытия окна

        coordinatesInput.value = ''; // Очищаем поле ввода координат
        modal.style.display = 'block'; //Отображаем модальное окно

        const closeModal = () => { //Закрываем модальное окно
            modal.style.display = 'none';
        };

        cancelBtn.addEventListener('click', closeModal); //Закроем модальное окно при нажатии кнопки ОТМЕНА
        closeBtn.addEventListener('click', closeModal); //Закроем модальное окно при нажатии на крестик

        // Удаляем все предыдущие обработчики перед добавлением нового
        // Чтобы не создавалось дубляжа постов
        okBtn.replaceWith(okBtn.cloneNode(true));
        const newOkBtn = document.getElementById('okCoordinates');

        newOkBtn.addEventListener('click', () => {
            const input = coordinatesInput.value;
            if (input) {
                try {
                    this.manualCoordinates = this.parseCoordinates(input);
                    this.addTextPost();
                    closeModal();
                } catch (error) {
                    this.showModal('Неверный формат координат. Попробуйте еще раз.');
                }
            } else {
                this.showModal('Введите координаты широты и долготы через запятую.');
            }
        });
    }

    // Метод добавления нового текстового поста в ленту
    createPost(text, latitude, longitude) {
        console.log('вызываем createPost с текстом:', text, 'latitude:', latitude, 'longitude:', longitude);
        const post = document.createElement('div');
        post.classList.add('post');
        post.innerHTML = `<p>${text}</p><p>Координаты: ${latitude}, ${longitude}</p>`;
        this.timeline.insertBefore(post, this.timeline.firstChild);
    }

    //Показываем сообщения в случае ошибок
    showModal(message) {
        alert(message); 
    }

    parseCoordinates(input) {
        const regex = /^\[?(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)\]?$/;
        const match = input.match(regex);//Соответствует ли введеная строка регулярному выражению

        if (match) { //Если соответствие найдено
            return {
                latitude: parseFloat(match[1]), //Возвращает объект с широтой (включая целую и дробную части)
                longitude: parseFloat(match[3])//Возвращает объект с долготой (включая целую и дробную части)
            };
        } else {
            throw new Error('Неверный формат координат');
        }
    }
}