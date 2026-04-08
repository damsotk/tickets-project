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
      balance: 'Баланс',
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
  shop: {
    title: 'Крама Эліум',
    subtitle: 'Падтрымай сервер і атрымай унікальныя магчымасці для сваёй гульні',
    from: 'ад',
    notice:
      'За валюту сайта, якая выдаецца за розныя віды актыўнасці або за нейкія дзеянні, якія адміністрацыя палічыла карыснымі для сервера, можна купіць сабе што-небудзь карыснае. Валюту нельга набыць за рэальныя грошы. Пакуль што гэтая крама — толькі прайс-ліст, без магчымасці аўтаматычна нешта купляць, распрацоўшчык сайта актыўна працуе над аўтаматызацыяй. У цяперашні час, калі ў вас дастаткова валюты на тое, што вы хочаце, напішыце заяўку, вам усё дадуць.',
    items: {
      createTwink: {
        name: 'Стварыць твінка',
        description: 'Стварэнне дадатковага акаўнта на серверы для гульні з іншым нікнеймам.',
        badge: '',
      },
      addSchematic: {
        name: 'Дадаць вашу схематыку на сервер',
        description:
          'Ваша ўласная пабудова будзе загружана на сервер як схематыка. Кошт залежыць ад складанасці.',
        badge: 'Індывідуальна',
      },
      customMechanic: {
        name: 'Даданне кастамнай механікі',
        description:
          'Унікальная механіка, распрацаваная спецыяльна для вас. Патрабуе папярэдняга абмеркавання з адміністрацыяй.',
        badge: 'Пасля абмеркавання',
      },
      flightAbility: {
        name: 'РП абдараванне сілай палёту',
        description: 'Атрымайце магчымасць лятаць на серверы праз ролевую падзею.',
        badge: '',
      },
      reduceBan: {
        name: 'Скасціць тэрмін бану',
        description: 'Памяншэнне тэрміну вашага бану на серверы.',
        badge: '',
      },
      escapeKant: {
        name: 'Выцягнуць з Канта',
        description: 'Выратаванне вашага персанажа з лакацыі Кант.',
        badge: '',
      },
    },
  },
  modals: {
    whilelistmodal: {
      card: {
        badge: 'Закрытая суполка',
        description:
          'На нашым серверы дзейнічае сістэма вайт-ліста. Падайце заяўку, каб далучыцца да нашай закрытай суполкі!',
        button: 'Падаць заяўку',
      },
      modal: {
        title: 'Заяўка ў White List',
        validation: {
          required: 'Гэта поле абавязковае для запаўнення',
        },
        pages: {
          page1: {
            text: 'Нам трэба задаць табе некалькі пытанняў, перш чым пусціць на сервер. Мы хочам даведацца пра цябе больш, каб адміністрацыі было прасцей працаваць з табой!',
          },
          page2: {
            hint: 'Старайцеся адказваць коратка і па сутнасці',
            source: {
              label: 'Адкуль вы даведаліся пра праєкт?',
              placeholder: 'Ваш адказ...',
            },
            rpExperience: {
              label: 'Ці ёсць досвед у РП?',
              placeholder: 'Ваш адказ...',
            },
            plans: {
              label: 'Якія планы на гульню?',
              optional: '(неабавязкова)',
              placeholder: 'Ваш адказ...',
            },
          },
          page3: {
            almostDoneText: 'Амаль гатова! Засталося ўвесці свой нік у Minecraft і Discord',
            minecraftNick: {
              label: 'Ваш нік у Minecraft',
              placeholder: 'Steve',
            },
            discordNick: {
              label: 'Ваш нік у Discord',
              placeholder: 'username#0000',
            },
          },
          page4: {
            successText: 'Паспяхова! Мы атрымалі вашу заяўку. Засталося толькі зайсці ў Discord!',
            discordInfo: {
              text: 'Перайдзіце па спасылцы ў Discord і прачытайце канал',
              channel: '#як-гуляць',
              textContinue: '. Вас дададуць у вайтліст на працягу 24 гадзін.',
              linkText: 'Далучыцца да Discord',
            },
          },
        },
        buttons: {
          next: 'Далей',
          submit: 'Адправіць заяўку ў вайтліст!',
        },
      },
    },
  },
};

export default by;
