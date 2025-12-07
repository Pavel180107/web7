document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('.service-type');
    const optionsContainer = document.getElementById('options-container');
    const optionsSelect = document.getElementById('options');
    const propertyContainer = document.getElementById('property-container');
    const propertyCheckbox = document.getElementById('property');
    const resultDiv = document.getElementById('result');

    // Базовая стоимость для каждого типа услуги
    const basePrices = {
        basic: 10000,
        premium: 20000,
        vip: 30000
    };

    // Функция для пересчета стоимости
    function calculateTotal() {
        const quantity = parseInt(quantityInput.value) || 0;
        
        // Получаем выбранный тип услуги
        let selectedServiceType = 'basic';
        serviceTypeRadios.forEach(radio => {
            if (radio.checked) {
                selectedServiceType = radio.value;
            }
        });

        // Базовая стоимость
        let basePrice = basePrices[selectedServiceType];
        let total = basePrice * quantity;

        // Добавляем стоимость опций для премиум услуги
        if (selectedServiceType === 'premium') {
            const optionPrice = parseInt(optionsSelect.value) || 0;
            total += optionPrice * quantity;
        }

        // Добавляем стоимость свойства для VIP услуги
        if (selectedServiceType === 'vip' && propertyCheckbox.checked) {
            total += 15000 * quantity;
        }

        // Обновляем отображение результата
        resultDiv.textContent = `Стоимость: ${total.toLocaleString('ru-RU')} руб`;
    }

    // Функция для обновления видимости дополнительных элементов
    function updateDynamicElements() {
        let selectedServiceType = 'basic';
        serviceTypeRadios.forEach(radio => {
            if (radio.checked) {
                selectedServiceType = radio.value;
            }
        });

        // Скрываем все дополнительные элементы
        optionsContainer.classList.add('d-none');
        propertyContainer.classList.add('d-none');

        // Показываем нужные элементы в зависимости от типа услуги
        if (selectedServiceType === 'premium') {
            optionsContainer.classList.remove('d-none');
        } else if (selectedServiceType === 'vip') {
            propertyContainer.classList.remove('d-none');
        }
    }

    // Обработчики событий
    quantityInput.addEventListener('input', calculateTotal);
    
    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateDynamicElements();
            calculateTotal();
        });
    });

    optionsSelect.addEventListener('change', calculateTotal);
    propertyCheckbox.addEventListener('change', calculateTotal);

    // Инициализация калькулятора
    updateDynamicElements();
    calculateTotal();

   
});