/**
 * @jest-environment jsdom
 */

import { Timeline } from '../js/timeline.js'; 

describe('Timeline', () => {
    let timeline;
    let timelineDiv;
    let textInput;

    beforeEach(() => {
        //jsdom эмулирует браузерное окружение, но он не создает DOM-элементы автоматически
        // Создаем DOM-элементы сами
        timelineDiv = document.createElement('div');
        timelineDiv.id = 'timeline';
        document.body.appendChild(timelineDiv);

        textInput = document.createElement('input');
        textInput.id = 'text-input';
        document.body.appendChild(textInput);

        // Создаем экземпляр Timeline
        timeline = new Timeline('timeline', 'text-input');
    });

    afterEach(() => {
        document.body.innerHTML = '';//Очистим DOM после каждого теста
    });

    it('должен корректно парсить координаты с пробелом', () => {
        expect(timeline.parseCoordinates('51.50851, -0.12572')).toEqual({ latitude: 51.50851, longitude: -0.12572 });
    });

    it('должен корректно парсить координаты без пробела', () => {
        expect(timeline.parseCoordinates('51.50851,-0.12572')).toEqual({ latitude: 51.50851, longitude: -0.12572 });
    });

    it('должен корректно парсить координаты в квадратных скобках', () => {
        expect(timeline.parseCoordinates('[51.50851, -0.12572]')).toEqual({ latitude: 51.50851, longitude: -0.12572 });
    });

    it('должен выбрасывать исключение при неверном формате', () => {
        expect(() => timeline.parseCoordinates('invalid format')).toThrow('Неверный формат координат');
    });
});