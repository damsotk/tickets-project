const uk = {
  auth: {
    register: {
      title: 'Створити обліковий запис',
      subtitle: 'Приєднуйтесь до нас і почніть свою подорож!',
      button: 'Продовжити',
      buttonLoading: 'Створення облікового запису...',
    },
    login: {
      title: 'З поверненням!',
      subtitle: 'Ми раді бачити вас знову!',
      button: 'Увійти',
      buttonLoading: 'Вхід...',
    },
    fields: {
      name: "Ім'я",
      namePlaceholder: "Введіть ваше ім'я",
      email: 'Електронна пошта',
      emailPlaceholder: 'Введіть вашу електронну пошту',
      password: 'Пароль',
      passwordPlaceholder: 'Введіть ваш пароль',
    },
  },
  discordMessage: {
    header: {
      title: 'Надіслати анонімне повідомлення',
      subtitle: 'Заповніть форму, щоб надіслати повідомлення до каналу',
    },
    fields: {
      username: "Ім'я відправника",
      usernamePlaceholder: "Введіть ваше ім'я",
      avatar: 'Аватар',
      message: 'Повідомлення',
      messagePlaceholder: 'Ваше повідомлення...',
    },
    avatar: {
      useOwnUrl: 'Використати власне посилання',
      chooseFromPreset: 'Обрати з готових',
      customPlaceholder: 'https://example.com/avatar.png',
      altText: 'Аватар',
      customPreview: 'Попередній перегляд власного аватара',
    },
    button: {
      send: 'Надіслати',
      sending: 'Надсилання...',
    },
    status: {
      success: '✓ Повідомлення успішно надіслано!',
      error: '✗ Помилка надсилання. Спробуйте ще раз.',
    },
  },
  home: {
    header: {
      title: 'Ellium',
      logout: 'Вийти',
      login: 'Увійти',
      userAvatarAlt: 'Аватар користувача',
      ticketIconAlt: 'Тікети',
    },
    heroSection: {
      title: 'Ласково просимо до Еліуму',
      subtitle: 'Minecraft Roleplay Server',
    },
    navigatesButtons: {
      tickets: {
        title: 'Тікети',
        description:
          'Зверніться до адміністрації сервера. Подайте скаргу на гравця, задайте питання щодо історії, отримайте технічну підтримку або вирішіть інші проблеми.',
      },
      articles: {
        title: 'Лор',
        description:
          'Дослідіть світ Елліуму. Тут ви знайдете статті про історію сервера, посібники для новачків, новини про оновлення та важливі оголошення.',
      },
      rumors: {
        title: 'Анонімний слух',
        description: `Надішліть анонімну чутку на сервер. Ваше повідомлення з'явиться в грі без зазначення автора — інтриги, плітки та таємниці.`,
      },
    },
  },
  tickets: {
    allTickets: {
      title: 'Мої Тікети',
      createButton: '+ Створити',
      noTickets: 'Поки що немає тікетів.',
      categories: {
        complaint: 'Скарга',
        lore: 'Лор',
        tech: 'Тех',
      },
    },
    messenger: {
      header: 'Тікет #',
      closeButton: 'Закрити Тікет',
      inputPlaceholder: 'Напишіть повідомлення...',
      emptyState: 'Оберіть тікет, щоб почати спілкування',
      noMessages: 'Поки що немає повідомлень. Почніть розмову!',
      loading: 'Завантаження повідомлень...',
      you: 'Ви',
      support: 'Підтримка',
      sending: 'Надсилання...',
      ticketClosed: 'Тікет закритий',
      closingProcess: 'Закриття...',
    },
    createTicketsTypes: {
      types: {
        complaint: {
          title: 'Скарга',
          description: 'Написати скаргу на гравця',
        },
        lore: {
          title: 'Лор',
          description: 'Поставити питання про лор сервера',
        },
        tech: {
          title: 'Тех',
          description: 'Поставити питання про технічну частину сервера',
        },
      },
    },
    staff: {
      title: 'Персонал онлайн:',
      admins: 'Адміни',
      lore: 'Лор',
      tech: 'Тех',
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
    defaultName: 'Гравець',
    avatarAlt: 'Аватар користувача',
    infoCards: {
      role: 'Роль',
      userId: 'ID користувача',
      registrationDate: 'Дата реєстрації',
      lastUpdate: 'Останнє оновлення',
      notUpdated: 'Не оновлювалося',
      balance: 'Баланс',
    },
    stats: {
      title: 'Статистика акаунта',
      accountAge: 'Вік акаунта',
      exactCreationDate: 'Точна дата створення',
      lastModification: 'Остання зміна',
      timeUnits: {
        days: 'дн.',
        months: 'міс.',
        years: 'р.',
      },
    },
    badges: {
      admin: 'Адміністратор',
    },
  },
  footer: {
    title: 'Ellium Tickets',
    description: 'Створено, спроектовано Денисом Піяком',
    quickLinks: 'Швидкі посилання',
    home: 'Головна',
    tickets: 'Тікети',
    support: 'Підтримка',
    community: 'Спільнота',
    discord: 'Discord',
    github: 'GitHub',
    twitter: 'Twitter',
    legal: 'Правова інформація',
    privacy: 'Політика конфіденційності',
    copyright: 'Усі права захищені',
  },
  modals: {
    whilelistmodal: {
      card: {
        badge: 'Закрите спільнота',
        description:
          'На нашому сервері діє система вайт-листа. Подайте заявку, щоб приєднатися до нашої закритої спільноти!',
        button: 'Подати заявку',
      },
      modal: {
        title: 'Заявка в White List',
        validation: {
          required: "Це поле обов'язкове для заповнення",
        },
        pages: {
          page1: {
            text: 'Нам потрібно задати тобі кілька запитань, перш ніж пустити на сервер. Ми хочемо дізнатися про тебе більше, щоб адміністрації було простіше працювати з тобою!',
          },
          page2: {
            hint: 'Намагайтеся відповідати коротко і по суті',
            source: {
              label: 'Звідки ви дізналися про проєкт?',
              placeholder: 'Ваша відповідь...',
            },
            rpExperience: {
              label: 'Чи є досвід у РП?',
              placeholder: 'Ваша відповідь...',
            },
            plans: {
              label: 'Які плани на гру?',
              optional: "(необов'язково)",
              placeholder: 'Ваша відповідь...',
            },
          },
          page3: {
            almostDoneText: 'Майже готово! Залишилося ввести свій нік у Minecraft та Discord',
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
            successText: 'Успішно! Ми отримали вашу заявку. Залишилося лише зайти в Discord!',
            discordInfo: {
              text: 'Перейдіть за посиланням у Discord та прочитайте канал',
              channel: '#як-грати',
              textContinue: '. Вас додадуть до вайтлисту протягом 24 годин.',
              linkText: 'Приєднатися до Discord',
            },
          },
        },
        buttons: {
          next: 'Далі',
          submit: 'Надіслати заявку у вайтлист!',
        },
      },
    },
  },
};

export default uk;
