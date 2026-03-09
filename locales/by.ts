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
      title: 'Квіткі Элліум ЎЎЎЎЎЎ ўўўўў',
      logout: 'Выйсці',
      login: 'Увайсці',
      userAvatarAlt: 'Аватар карыстальніка',
      ticketIconAlt: 'Квіткі',
    },
    staff: {
      title: 'Персанал онлайн:',
      admins: 'Адміны',
      lore: 'Лор',
      tech: 'Тэх',
    },
    tickets: {
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
  },
};

export default by;
