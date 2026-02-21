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
      title: 'Ellium тікети',
      logout: 'Вийти',
      login: 'Увійти',
      userAvatarAlt: 'Аватар користувача',
      ticketIconAlt: 'Тікети',
    },
    staff: {
      title: 'Персонал онлайн:',
      admins: 'Адміни',
      lore: 'Лор',
      tech: 'Тех',
    },
    tickets: {
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
    },
  },
};

export default uk;
