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
      title: 'Ellium',
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
  articles: {
    mainPage: {
      titleOfCategory: {
        characters: 'Персонажи',
        faith: 'Вера',
        cities: 'Города',
      },
      descOfCategory: {
        characters: 'Легенды и герои нашего мира',
        faith: 'Боги, культы и священные ритуалы',
        cities: 'Великие поселения и их история',
      },
    },
    articlesList: {
      title: 'Статьи страницы',
      noArticles: 'Статьи в этой категории не найдены.',
    },
  },
  profile: {
    defaultName: 'Игрок',
    avatarAlt: 'Аватар пользователя',
    infoCards: {
      role: 'Роль',
      userId: 'ID пользователя',
      registrationDate: 'Дата регистрации',
      lastUpdate: 'Последнее обновление',
      notUpdated: 'Не обновлялось',
    },
    stats: {
      title: 'Статистика аккаунта',
      accountAge: 'Возраст аккаунта',
      exactCreationDate: 'Точная дата создания',
      lastModification: 'Последнее изменение',
      timeUnits: {
        days: 'дн.',
        months: 'мес.',
        years: 'г.',
      },
    },
    badges: {
      admin: 'Администратор',
    },
  },
  footer: {
    title: 'Ellium Tickets',
    description: 'Создано, спроектировано Денисом Пияком',
    quickLinks: 'Быстрые ссылки',
    home: 'Главная',
    tickets: 'Тикеты',
    support: 'Поддержка',
    community: 'Сообщество',
    discord: 'Discord',
    github: 'GitHub',
    twitter: 'Twitter',
    legal: 'Правовая информация',
    privacy: 'Политика конфиденциальности',
    copyright: 'Все права защищены',
  },
  modal: {
    whilelistmodal: {
      card: {
        badge: 'Закрытое сообщество',
        description:
          'На нашем сервере действует система вайт-листа. Подайте заявку, чтобы присоединиться к нашему закрытому сообществу!',
        button: 'Подать заявку',
      },
      modal: {
        title: 'Заявка в White List',
        pages: {
          page1: {
            text: 'Нам нужно задать тебе несколько вопросов, перед тем как пустить на сервер. Мы хотим узнать о тебе побольше, дабы администрации было проще работать с тобой!',
          },
          page2: {
            hint: 'Постарайтесь отвечать коротко и по существу',
            source: {
              label: 'Откуда вы узнали о проекте?',
              placeholder: 'Ваш ответ...',
            },
            rpExperience: {
              label: 'Имеется ли опыт в РП?',
              placeholder: 'Ваш ответ...',
            },
            plans: {
              label: 'Какие планы на игру?',
              optional: '(необязательно)',
              placeholder: 'Ваш ответ...',
            },
          },
          page3: {
            successText: 'Успешно! Мы получили ваши ответы, введите свой ник ниже, пожалуйста.',
            minecraftNick: {
              label: 'Ваш ник в Minecraft',
              placeholder: 'Steve',
            },
            discordNick: {
              label: 'Ваш ник в Discord',
              placeholder: 'username#0000',
            },
            discordInfo: {
              text: 'После этого перейдите по ссылке в Discord и прочтите канал',
              channel: '#как-играть',
              textContinue: '. Добавят вас в вайтлист в течении 24 часов.',
              linkText: 'Присоединиться к Discord',
            },
          },
        },
        buttons: {
          next: 'Далее',
          submit: 'Отослать заявку в вайтлист!',
        },
      },
    },
  },
};

export default ru;
