const data = {
  common: {
    login: 'Войти',
    logout: 'Выйти',
    email: 'Email адрес',
    code: 'Код',
    back: 'Назад',
    sec: 'сек',
    firstName: 'Имя',
    lastName: 'Фамилия',
    continue: 'Продолжить',
    dislocation: 'Симферополь, Республика Крым',
    rights: '© {year} SEO Bot AI. Все права защищены.',
    articles: 'Статьи',
    indexation: 'Индексация',
    add: 'Добавить',
    cancel: 'Отмена',
    search: 'Поиск',
    all: 'Все',
  },
  errors: {
    system: 'Произошла системная ошибка, попробуйте еще раз',
    wrongCode: 'Неверный код',
    invalidEmail: 'Невалидный email',
    field: {
      required: 'Поле обязательное',
      validate: {
        email: 'Пожалуйста, введите корректный email адрес',
        url: 'Пожалуйста, введите корректный URL',
      },
    },
  },
  Footer: {
    text: 'Автоматизированная платформа для генерации SEO-статей и анализа сайтов. Повышайте позиции в поисковых системах с помощью искусственного интеллекта.',
    product: 'Продукт',
    opportunities: 'Возможности',
    tariffs: 'Тарифы',
    api: 'API документация',
    integrations: 'Интеграции',
    updates: 'Обновления',
    support: 'Поддержка',
    helpCenter: 'Центр помощи',
    guide: 'Руководства',
    techSupport: 'Техподдержка',
    statusSystem: 'Статус системы',
    company: 'Компания',
    aboutUs: 'О нас',
    blog: 'Блог',
    partners: 'Партнеры',
    contacts: 'Контакты',
    policy: 'Политика конфиденциальности',
    termOfUse: 'Условия использования',
    userAgreement: 'Пользовательское соглашение',
  },
  Home: {
    auth: {
      panel: {
        title: 'Добро пожаловать!',
        text: 'Введите ваш email для входа или регистрации в системе',
        code: {
          send: 'Отправить код',
          sent: 'Введите код отправленный на вашу почту',
          resend: 'Отправить код повторно',
          resendAfter: 'Отправить код повторно через',
        },
        social: {
          deliver: 'или войдите через',
          google: 'Войти через Google',
          yandex: 'Войти через Яндекс',
        },
      },
      content: {
        title: 'Добро пожаловать в SeoBot!',
        text: 'Мы поможем вам создавать SEO-контент, который действительно работает. Автоматические статьи, конкуренты и ускоренная индексация вашего сайта. Всё в одном месте.',
        list: ['Автогенерация статей', 'Ускоренная индексация', 'Рост выдачи'],
      },
    },
  },
  Welcome: {
    title: 'Добро пожаловать!',
    text: 'Давайте знакомиться! Как к вам обращаться? Это поможет нам персонализировать ваш опыт работы с платформой.',
  },
  User: {
    title: 'Настройки аккаунта',
    tariff: {
      value: 'Тариф: {value}',
      list: {
        premium: 'Премиум',
      },
    },
  },
  NotFound: {
    title: 'Страница не найдена',
    subtitle: 'Мы не можем найти страницу, которую вы ищете.',
    text: 'Вы можете вернуться на предыдущую страницу или посетить домашнюю страницу!',
    button: 'На главную',
  },
  Dashboard: {
    name: 'Панель управления',
    table: {
      domain: {
        label: 'Домен',
      },
      status: {
        label: 'Статус',
      },
      totalArticlesAvailable: {
        label: 'Подготовленно статей',
      },
      articlesWritten: {
        label: 'Сгенерированно статей',
      },
      analyzedLinksCount: {
        label: 'Проанализировано источников',
      },
    },
    empty: {
      title: 'Ваши сайты появятся здесь',
      text: 'Добавьте свой первый сайт для анализа и начните генерировать SEO-статьи, которые помогут улучшить позиции в поисковых системах',
    },
    append: {
      button: 'Добавить сайт',
      modal: {
        title: 'Добавить сайт',
      },
      fields: {
        domain: {
          label: 'URL сайта',
          placeholder: 'Например: blog.example.com',
        },
        isArticleGenerationEnabled: {
          label: 'Генерация статей',
        },
        isIndexingEnabled: {
          label: 'Индексация',
        },
        isChildren: {
          label: 'Дочерний сайт',
        },
      },
    },
    filter: {
      search: {
        placeholder: 'Найти сайт',
      },
    },
    articleGenerationStatus: {
      active: {
        label: 'Активно',
      },
      inactive: {
        label: 'Остановлено',
      },
      pending_payment: {
        label: 'Ожидает оплаты',
      },
      pending_analysis: {
        label: 'Ожидает анализ',
      },
    },
  },
};

export default data;
