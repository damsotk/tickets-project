const by = {
  auth: {
    register: {
      title: 'Стварыць акаўнт',
      subtitle: 'Далучыся да нас і пачні сваё вандраванне!',
      button: 'Працягнуць',
      buttonLoading: 'Стварэнне акаўнта...',
    },
    login: {
      title: 'Вітаем зноў!',
      subtitle: 'Мы рады бачыць вас зноў!',
      button: 'Увайсці',
      buttonLoading: 'Уваходзім...',
    },
    fields: {
      name: 'Імя',
      namePlaceholder: 'Увядзіце свае імя',
      email: 'Электронная пошта',
      emailPlaceholder: 'Увядзіце сваю электронную пошту',
      password: 'Пароль',
      passwordPlaceholder: 'Увядзіце свой пароль',
    },
  },
  discordMessage: {
    header: {
      title: 'Адправіць ананімнае паведамленне',
      subtitle: 'Запоўніце форму, каб адаслаць паведамленне ў канал',
    },
    fields: {
      username: 'Імя адпраўніка',
      usernamePlaceholder: 'Увядзіце ваша імя',
      avatar: 'Аватар',
      message: 'Паведамленне',
      messagePlaceholder: 'Ваша паведамленне...',
    },
    avatar: {
      useOwnUrl: 'Выкарыстайце свой url',
      chooseFromPreset: 'Выбярыце з ужо гатовых',
      customPlaceholder: 'https://example.com/avatar.png',
      altText: 'Аватар',
      customPreview: 'Прадпрагляд уласнага аватара',
    },
    button: {
      send: 'Адправіць',
      sending: 'Адпраўка...',
    },
    status: {
      success: '✓ Паведамленне паспяхова адпраўлена!',
      error: '✗ Памылка адпраўкі. Калі ласка, паспрабуйце яшчэ раз.',
    },
  },
  home: {
    header: {
      title: 'Ellium',
      logout: 'Выйсці',
      login: 'Увайсці',
      userAvatarAlt: 'Аватар карыстальніка',
      ticketIconAlt: 'Квіткі',
    },
    heroSection: {
      title: 'Сардэчна запрашаем у Эліум',
      subtitle: 'Minecraft Roleplay Server',
    },
    navigatesButtons: {
      tickets: {
        title: 'Квіткі',
        description:
          'Звяжыцеся з адміністрацыяй сервера. Падайце скаргу на гульца, задайце пытанне па лоры, атрымайце тэхнічную падтрымку або вырашыце іншыя праблемы.',
      },
      articles: {
        title: 'Веды',
        description: `Даследуйце свет Эліума. Тут вы знойдзеце артыкулы пра гісторыю сервера, кіраўніцтва для пачаткоўцаў, навіны аб абнаўленнях і важныя аб'явы.`,
      },
      rumors: {
        title: 'Ананімнае паведамленне',
        description: `Адпраўце ананімную чутку на сервер. Ваша паведамленне з'явіцца ў гульні без указання аўтара — інтрыгі, плёткі і сакрэты.`,
      },
    },
  },
  tickets: {
    allTickets: {
      title: 'Мае квіткі',
      createButton: '+ Стварыць',
      noTickets: 'Няма квіткоў.',
      categories: {
        complaint: 'Скарга',
        lore: 'Лор',
        tech: 'Тэх',
      },
    },
    messenger: {
      header: 'Квіток #',
      closeButton: 'Зачыніць квіток',
      inputPlaceholder: 'Набярыце паведамленне...',
      emptyState: 'Выбярыце квіток каб пачаць бяседу',
      noMessages: 'Няма паведамленняў.Пачніце размову!',
      loading: 'Загрузка паведамленняў...',
      you: 'Вы',
      support: 'Падтрымка',
      sending: 'Адпраўка...',
      ticketClosed: 'Квіток зачынены',
      closingProcess: 'Зачыненне...',
    },
    createTicketsTypes: {
      types: {
        complaint: {
          title: 'Скарга',
          description: 'Напішыце скаргу на гульца',
        },
        lore: {
          title: 'Лор',
          description: 'Задайце пытанне аб лоры сервера',
        },
        tech: {
          title: 'Тэх',
          description: 'Задайце пытанне аб тэхнічным баку сервера',
        },
      },
    },
    staff: {
      title: 'Персанал онлайн:',
      admins: 'Адміны',
      lore: 'Лор',
      tech: 'Тэх',
    },
  },
  articles: {
    mainPage: {
      titleOfCategory: {
        characters: 'Персонажі',
        faith: 'Віра',
        cities: 'Міста',
      },
      descOfCategory: {
        characters: 'Легенди та герої нашого світу',
        faith: 'Боги, культи та священні ритуали',
        cities: 'Великі поселення та їхня історія',
      },
    },
    articlesList: {
      title: 'Статті сторінки',
      noArticles: 'Статті в цій категорії не знайдені.',
    },
  },
  profile: {
    defaultName: 'Гулец',
    avatarAlt: 'Аватар карыстальніка',
    infoCards: {
      role: 'Роля',
      userId: 'ID карыстальніка',
      registrationDate: 'Дата рэгістрацыі',
      lastUpdate: 'Апошняе абнаўленне',
      notUpdated: 'Не абнаўлялася',
    },
    stats: {
      title: 'Статыстыка акаўнта',
      accountAge: 'Узрост акаўнта',
      exactCreationDate: 'Дакладная дата стварэння',
      lastModification: 'Апошняе змяненне',
      timeUnits: {
        days: 'дз.',
        months: 'мес.',
        years: 'г.',
      },
    },
    badges: {
      admin: 'Адміністратар',
    },
  },
  footer: {
    title: 'Ellium Tickets',
    description: 'Распрацаваў і дызайн Дзяніс Піак',
    quickLinks: 'Хуткія спасылкі',
    home: 'Галоўная',
    tickets: 'Тыкеты',
    support: 'Падтрымка',
    community: 'Супольнасць',
    discord: 'Discord',
    github: 'GitHub',
    twitter: 'Twitter',
    legal: 'Прававая інфармацыя',
    privacy: 'Палітыка прыватнасці',
    copyright: 'Усе правы абаронены',
  },
};

export default by;
