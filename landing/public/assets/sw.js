/*
  Проект: юМаркет Шоп (анг. uMarket Shop)
  Описание: юМаркет Шоп - маркетплейс, реализованный технологиями React.JS,
  серверная часть реализована средствами PHP (7.2) и СУБД MySQL (5.2)  

  Разработчик: Александр Каурцев (анг. Alexsandr Kaurcev)

  Обратная связь:
  - KS: https://kaurcev.space/kaurcev
  - GitHub: https://github.com/kaurcev
  - VK: https://vk.com/kaurcev
  - Telegram: https://t.me/kaurcev
 */

if (navigator.serviceWorker.controller) {
} else {
navigator.serviceWorker.register('sw.js', {
    scope: './'
}).then(function(reg) {
    console.log('Service worker has been registered for scope:'+ reg.scope);
});
}
