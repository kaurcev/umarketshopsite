/*
    Это файл конфигурации.
    В нём указаны первоначалные значения для работы сайта.

    Переменная serverUrl указывает на домен для работы серверной части.
    По умолчанию в настройках домена, bapi.umarketshop.site будет ссылаться на localhost (127.0.0.1).

    Для развёртывания на локальном сервере можете использовать OpenServer с настроеным алиасом на bapi.umarketshop.site.
    (Настройки -> Алиасы -> в значении "исходный домен" вписывается "bapi.umarketshop.site", а в "конечный домен" выбирается домен и исходником серверной части.)
*/


const url = () => {
  if (localStorage.getItem("local") === "1") {
    return "bapi.umarketshop.site";
  } else {
    return "api.umarketshop.site";
  }
};

export const serverUrl = url();

//metrics links default
export const YandexMetrica =
  "https://metrika.yandex.ru/dashboard?group=day&period=week&id=95864034";
export const AnalyticsGoogle =
  "https://analytics.google.com/analytics/web/?authuser=0&hl=en#/p419756902/realtime/overview";
