const ru = {
  auth: {
    register: {
      title: 'Создать учётную запись',
      subtitle: 'Присоединяйтесь к нам и начните своё путешествие!',
      button: 'Продолжить',
      buttonLoading: 'Создание учётной записи...',
    },
    login: {
      title: 'С возвращением!',
      subtitle: 'Мы рады видеть вас снова!',
      button: 'Войти',
      buttonLoading: 'Вход...',
    },
    fields: {
      name: 'Имя',
      namePlaceholder: 'Введите ваше имя',
      email: 'Электронная почта',
      emailPlaceholder: 'Введите вашу электронную почту',
      password: 'Пароль',
      passwordPlaceholder: 'Введите ваш пароль',
    },
  },
  discordMessage: {
    header: {
      title: 'Отправить анонимное сообщение',
      subtitle: 'Заполните форму, чтобы отправить сообщение в канал',
    },
    fields: {
      username: 'Имя отправителя',
      usernamePlaceholder: 'Введите ваше имя',
      avatar: 'Аватар',
      message: 'Сообщение',
      messagePlaceholder: 'Ваше сообщение...',
    },
    avatar: {
      useOwnUrl: 'Использовать свою ссылку',
      chooseFromPreset: 'Выбрать из готовых',
      customPlaceholder: 'https://example.com/avatar.png',
      altText: 'Аватар',
      customPreview: 'Предварительный просмотр вашего аватара',
    },
    button: {
      send: 'Отправить',
      sending: 'Отправка...',
    },
    status: {
      success: '✓ Сообщение успешно отправлено!',
      error: '✗ Ошибка отправки. Попробуйте ещё раз.',
    },
  },
  home: {
    header: {
      title: 'Ellium тикеты',
      logout: 'Выйти',
      login: 'Войти',
      userAvatarAlt: 'Аватар пользователя',
      ticketIconAlt: 'Тикеты',
    },
    heroSection: {
      title: 'Добро пожаловать в Эллиум',
      subtitle: 'Minecraft Roleplay Server',
    },
    navigatesButtons: {
      tickets: {
        title: 'Тикеты',
        description:
          'Обратитесь к администрации сервера. Подайте жалобу на игрока, задайте вопрос по лору, получите техническую поддержку или решите другие проблемы.',
      },
      articles: {
        title: 'Лор',
        description:
          'Исследуйте мир Эллиума. Здесь вы найдёте статьи по истории сервера, гайды для новичков, новости об обновлениях и важные объявления.',
      },
      rumors: {
        title: 'Анонимный слух',
        description: `Отправьте анонимный слух на сервер. Ваше сообщение появится в игре без указания автора — интриги, сплетни и тайны.`,
      },
    },
  },
  tickets: {
    allTickets: {
      title: 'Мои тикеты',
      createButton: '+ Создать',
      noTickets: 'Пока нет тикетов.',
      categories: {
        complaint: 'Жалоба',
        lore: 'Лор',
        tech: 'Тех',
      },
    },
    messenger: {
      header: 'Тикет #',
      closeButton: 'Закрыть тикет',
      inputPlaceholder: 'Напишите сообщение...',
      emptyState: 'Выберите тикет, чтобы начать общение',
      noMessages: 'Пока нет сообщений. Начните разговор!',
      loading: 'Загрузка сообщений...',
      you: 'Вы',
      support: 'Поддержка',
      sending: 'Отправка...',
      ticketClosed: 'Тикет закрыт',
      closingProcess: 'Закрытие...',
    },
    createTicketsTypes: {
      types: {
        complaint: {
          title: 'Жалоба',
          description: 'Написать жалобу на игрока',
        },
        lore: {
          title: 'Лор',
          description: 'Задать вопрос по лору сервера',
        },
        tech: {
          title: 'Тех',
          description: 'Задать вопрос по технической части сервера',
        },
      },
    },
    staff: {
      title: 'Персонал онлайн:',
      admins: 'Админы',
      lore: 'Лор',
      tech: 'Тех',
    },
  },
};

export default ru;
