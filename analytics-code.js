// Код отслеживания конверсий для Any-Home лендинга

// ========================================
// 1. КОД ДЛЯ HEAD СЕКЦИИ (добавить в <head>)
// ========================================

<!-- Яндекс.Метрика -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(XXXXXX, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/XXXXXX" style="position:absolute; left:-9999px;" alt="" /></div></noscript>

<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

// ========================================
// 2. КОД ДЛЯ JAVASCRIPT СЕКЦИИ (заменить существующий script)
// ========================================

<script>
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Отслеживание конверсий
    function trackConversion(eventName, category = 'conversion', label = '') {
        // Яндекс.Метрика
        if (typeof ym !== 'undefined') {
            ym(XXXXXX, 'reachGoal', eventName);
        }
        
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: category,
                event_label: label
            });
        }
        
        console.log('Conversion tracked:', eventName, category, label);
    }

    // Отслеживание кликов по CTA кнопкам
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackConversion('cta_click', 'engagement', buttonText);
        });
    });

    // Отслеживание кликов по телефону
    document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
        phoneLink.addEventListener('click', function() {
            trackConversion('phone_click', 'contact', 'phone_number');
        });
    });

    // Form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.phone) {
            trackConversion('form_error', 'conversion', 'validation_error');
            alert('Пожалуйста, заполните обязательные поля');
            return;
        }
        
        // Отслеживаем успешную отправку
        trackConversion('form_submit', 'conversion', 'contact_form');
        
        // Simulate form submission
        alert('Спасибо за заявку! Мы свяжемся с вами в течение 1 дня для составления расчета.');
        
        // Reset form
        this.reset();
    });

    // Отслеживание начала заполнения формы
    document.getElementById('contactForm').addEventListener('focusin', function() {
        trackConversion('form_start', 'engagement', 'form_interaction');
    }, { once: true });

    // Отслеживание прокрутки страницы
    let scrollTracked = {
        '25': false,
        '50': false,
        '75': false,
        '100': false
    };

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);

        // Отслеживаем достижение определенных процентов прокрутки
        Object.keys(scrollTracked).forEach(percent => {
            if (scrollPercent >= parseInt(percent) && !scrollTracked[percent]) {
                scrollTracked[percent] = true;
                trackConversion('scroll_' + percent + 'percent', 'engagement', 'page_scroll');
            }
        });
    });

    // Отслеживание времени на странице
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage += 30;
        if (timeOnPage === 60) { // 1 минута
            trackConversion('time_1min', 'engagement', 'page_time');
        } else if (timeOnPage === 120) { // 2 минуты
            trackConversion('time_2min', 'engagement', 'page_time');
        } else if (timeOnPage === 300) { // 5 минут
            trackConversion('time_5min', 'engagement', 'page_time');
        }
    }, 30000);

    // Отслеживание кликов по галерее
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const projectName = this.querySelector('h4').textContent;
            trackConversion('gallery_click', 'engagement', projectName);
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
</script>

// ========================================
// 3. НАСТРОЙКА ЦЕЛЕЙ В ЯНДЕКС.МЕТРИКЕ
// ========================================

// Зайдите в Яндекс.Метрику → Настройки → Цели → Создать цель

// Цель 1: "Отправка формы"
// Тип: JavaScript-событие
// Идентификатор: form_submit

// Цель 2: "Клик по телефону"
// Тип: JavaScript-событие
// Идентификатор: phone_click

// Цель 3: "Клик по CTA"
// Тип: JavaScript-событие
// Идентификатор: cta_click

// Цель 4: "Просмотр галереи"
// Тип: JavaScript-событие
// Идентификатор: gallery_click

// Цель 5: "Время на сайте > 2 мин"
// Тип: Время на сайте
// Условие: Больше 120 секунд

// Цель 6: "Прокрутка 75%"
// Тип: JavaScript-событие
// Идентификатор: scroll_75percent

// ========================================
// 4. НАСТРОЙКА СОБЫТИЙ В GOOGLE ANALYTICS 4
// ========================================

// Зайдите в GA4 → События → Создать событие

// Событие 1: form_submit
// Параметры: event_category = conversion, event_label = contact_form

// Событие 2: phone_click
// Параметры: event_category = contact, event_label = phone_number

// Событие 3: cta_click
// Параметры: event_category = engagement, event_label = call_to_action

// Событие 4: gallery_click
// Параметры: event_category = engagement, event_label = project_name

// ========================================
// 5. ИНСТРУКЦИИ ПО НАСТРОЙКЕ
// ========================================

// 1. Замените XXXXXX на ваш ID счетчика Яндекс.Метрики
// 2. Замените G-XXXXXXXXXX на ваш ID Google Analytics 4
// 3. Добавьте код в head секцию HTML
// 4. Замените JavaScript секцию на новый код
// 5. Настройте цели в Яндекс.Метрике
// 6. Настройте события в Google Analytics 4
// 7. Проверьте работу через консоль браузера

// ========================================
// 6. ОТСЛЕЖИВАЕМЫЕ СОБЫТИЯ
// ========================================

/*
Основные конверсии:
- form_submit - отправка формы
- phone_click - клик по телефону
- cta_click - клик по любой CTA кнопке

Микро-конверсии:
- form_start - начало заполнения формы
- form_error - ошибка валидации формы
- scroll_25percent - прокрутка 25%
- scroll_50percent - прокрутка 50%
- scroll_75percent - прокрутка 75%
- scroll_100percent - прокрутка 100%
- time_1min - время на сайте 1 минута
- time_2min - время на сайте 2 минуты
- time_5min - время на сайте 5 минут
- gallery_click - клик по проекту в галерее

Дополнительные события:
- section_viewed - просмотр секции (если добавить Intersection Observer)
- button_hover - наведение на кнопку (если нужно)
- form_field_filled - заполнение поля формы (если нужно)
*/
