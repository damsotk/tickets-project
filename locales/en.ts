const en = {
  auth: {
    register: {
      title: 'Create an account',
      subtitle: 'Join us and start your journey!',
      button: 'Continue',
      buttonLoading: 'Creating account...',
    },
    login: {
      title: 'Welcome back!',
      subtitle: "We're happy to see you again!",
      button: 'Log In',
      buttonLoading: 'Logging in...',
    },
    fields: {
      name: 'Name',
      namePlaceholder: 'Enter your name',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
    },
  },
  discordMessage: {
    header: {
      title: 'Send an anonymous message',
      subtitle: 'Fill out the form to send a message to the channel',
    },
    fields: {
      username: 'Sender name',
      usernamePlaceholder: 'Type your name',
      avatar: 'Avatar',
      message: 'Message',
      messagePlaceholder: 'Your message...',
    },
    avatar: {
      useOwnUrl: 'Use own url',
      chooseFromPreset: 'Choose from ready-made',
      customPlaceholder: 'https://example.com/avatar.png',
      altText: 'Avatar',
      customPreview: 'Custom avatar preview',
    },
    button: {
      send: 'Send',
      sending: 'Sending...',
    },
    status: {
      success: '✓ Message sent successfully!',
      error: '✗ Error sending. Please try again.',
    },
  },
  home: {
    header: {
      title: 'Ellium',
      logout: 'Logout',
      login: 'Login',
      userAvatarAlt: 'User avatar',
      ticketIconAlt: 'Tickets',
    },
    heroSection: {
      title: 'Welcome to Ellium',
      subtitle: 'Minecraft Roleplay Server',
    },
    navigatesButtons: {
      tickets: {
        title: 'Tickets',
        description:
          'Contact the server administration. File a complaint against a player, ask a lore question, get technical support, or resolve other issues.',
      },
      articles: {
        title: 'Articles',
        description:
          'Explore the world of Ellium. Here you`ll find articles about server lore, guides for newcomers, update news, and important announcements.',
      },
      rumors: {
        title: 'Rumors',
        description:
          'Send an anonymous rumor to the server. Your message will appear in the game without identifying the author—intrigue, gossip, and secrets.',
      },
      shop: {
        title: 'Shop',
        description: 'Buy unique items with in-site currency. Cosmetics, abilities and much more!',
      },
      howToPlay: {
        title: 'How to Play',
        description:
          'Learn everything about the server concept, mechanics, classes and where to start your adventure.',
      },
    },
  },
  tickets: {
    allTickets: {
      title: 'My Tickets',
      createButton: '+ Create',
      noTickets: 'No tickets yet.',
      categories: {
        complaint: 'Complaint',
        lore: 'Lore',
        tech: 'Tech',
      },
    },
    messenger: {
      header: 'Ticket #',
      closeButton: 'Close Ticket',
      inputPlaceholder: 'Type a message...',
      emptyState: 'Select a ticket to start chatting',
      noMessages: 'No messages yet. Start the conversation!',
      loading: 'Loading messages...',
      you: 'You',
      support: 'Support',
      sending: 'Sending...',
      ticketClosed: 'Ticket Closed',
      closingProcess: 'Closing...',
    },
    createTicketsTypes: {
      types: {
        complaint: {
          title: 'Complaint',
          description: 'Write a complaint against a player',
        },
        lore: {
          title: 'Lore',
          description: 'Ask a question about server lore',
        },
        tech: {
          title: 'Tech',
          description: 'Ask a question about the technical side of the server',
        },
      },
    },
    staff: {
      title: 'Staff online:',
      admins: 'Admins',
      lore: 'Lore',
      tech: 'Tech',
    },
  },
  articles: {
    mainPage: {
      titleOfCategory: {
        characters: 'Characters',
        faith: 'Faith',
        cities: 'Cities',
      },
      descOfCategory: {
        characters: 'Legends and heroes of our world',
        faith: 'Gods, cults and sacred rituals',
        cities: 'Great settlements and their history',
      },
    },
    articlesList: {
      title: 'Articles of page',
      noArticles: 'No articles found in this category.',
    },
  },
  profile: {
    defaultName: 'Player',
    avatarAlt: 'User avatar',
    infoCards: {
      role: 'Role',
      userId: 'User ID',
      registrationDate: 'Registration date',
      lastUpdate: 'Last update',
      notUpdated: 'Not updated',
      balance: 'Balance',
    },
    stats: {
      title: 'Account statistics',
      accountAge: 'Account age',
      exactCreationDate: 'Exact creation date',
      lastModification: 'Last modification',
      timeUnits: {
        days: 'd.',
        months: 'mo.',
        years: 'y.',
      },
    },
    badges: {
      admin: 'Administrator',
    },
  },
  footer: {
    title: 'Ellium Tickets',
    description: 'Created and designed by Denys Piiak',
    quickLinks: 'Quick Links',
    home: 'Home',
    tickets: 'Tickets',
    support: 'Support',
    community: 'Community',
    discord: 'Discord',
    github: 'GitHub',
    twitter: 'Twitter',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    copyright: 'All rights reserved',
  },
  shop: {
    title: 'Elium Shop',
    subtitle: 'Support the server and get unique abilities for your gameplay',
    from: 'from',
    notice:
      'You can buy something useful for yourself with the site currency, which is issued for various activities or for some actions that the administration has considered useful for the server. Currency cannot be purchased for real money. So far, this store is only a price list, without the ability to automatically buy something, the site developer is actively working on automation. Currently, if you have enough currency for what you want, write a ticket, they will give you everything.',
    items: {
      createTwink: {
        name: 'Create a Twink',
        description:
          'Create an additional account on the server to play with a different nickname.',
        badge: '',
      },
      addSchematic: {
        name: 'Add Your Schematic to the Server',
        description:
          'Your own build will be uploaded to the server as a schematic. Price depends on complexity.',
        badge: 'Individual',
      },
      customMechanic: {
        name: 'Custom Mechanic Addition',
        description:
          'A unique mechanic developed specifically for you. Requires prior discussion with the administration.',
        badge: 'After Discussion',
      },
      flightAbility: {
        name: 'RP Granting the Power of Flight',
        description: 'Gain the ability to fly on the server through a roleplay event.',
        badge: '',
      },
      reduceBan: {
        name: 'Reduce Ban Duration',
        description: 'Reduction of your ban duration on the server.',
        badge: '',
      },
      escapeKant: {
        name: 'Escape from Kant',
        description: 'Rescue your character from the Kant location.',
        badge: '',
      },
    },
  },
  modals: {
    whilelistmodal: {
      card: {
        badge: 'Closed Community',
        description:
          'Our server uses a whitelist system. Submit an application to join our closed community!',
        button: 'Apply',
      },
      modal: {
        title: 'White List Application',
        validation: {
          required: 'This field is required',
        },
        pages: {
          page1: {
            text: 'We need to ask you a few questions before letting you onto the server. We want to learn more about you so the administration can work with you more easily!',
          },
          page2: {
            hint: 'Try to answer briefly and to the point',
            source: {
              label: 'How did you find out about the project?',
              placeholder: 'Your answer...',
            },
            rpExperience: {
              label: 'Do you have any RP experience?',
              placeholder: 'Your answer...',
            },
            plans: {
              label: 'What are your plans for the game?',
              optional: '(optional)',
              placeholder: 'Your answer...',
            },
          },
          page3: {
            almostDoneText: 'Almost done! Just enter your Minecraft and Discord nicknames',
            minecraftNick: {
              label: 'Your Minecraft nickname',
              placeholder: 'Steve',
            },
            discordNick: {
              label: 'Your Discord nickname',
              placeholder: 'username#0000',
            },
          },
          page4: {
            successText:
              "Success! We have received your application. All that's left is to join Discord!",
            discordInfo: {
              text: 'Follow the link to Discord and read the channel',
              channel: '#how-to-play',
              textContinue: '. You will be added to the whitelist within 24 hours.',
              linkText: 'Join Discord',
            },
          },
        },
        buttons: {
          next: 'Next',
          submit: 'Submit whitelist application!',
        },
      },
    },
  },
  howToPlay: {
    title: 'How to Play?',
    greeting: 'Safe travels, Tavr!',
    intro:
      'The Chronicles of Elium is an RP project where thrilling adventures await you, every block holds a story, and every sunset promises new feats! You have stepped into a world full of mysteries, dangers, and boundless possibilities. Here your fate is in your hands, and your actions shape the future of this Plane.',
    serverAddress: 'Server IP Address',
    version: 'Version',
    links: {
      title: 'Links',
      discord: 'Our Discord server',
      telegram: 'We are on Telegram',
      creatorChannel: "BN's Channel",
      creatorDesc: "Creator's art channel",
    },
    howToStart: {
      title: 'How to Start Playing',
      step1: {
        title: 'Submit an Application',
        text: 'Write your nickname in the 🧩-whitelist channel on our Discord.',
      },
      step2: {
        title: 'Wait for a Response',
        text: 'An administrator will contact you to ask a couple of questions before adding you to the whitelist.',
      },
      step3: {
        title: 'Read the Rules',
        text: 'While you wait, familiarize yourself with the project and Discord server rules in the 💾-rules and 💾-role-rules channels.',
      },
    },
    importantNotes: {
      title: 'Important Notes',
      tlSkin: {
        title: 'We Do Not Use TL Skin Mod',
        text: 'After approval and receiving a checkmark next to your nickname, make sure there is NO TL Skin mod in your modpack.',
        tip: 'The server has a plugin for setting skins via the /skin (your skin link) command. This allows you to optimize the RP process without leaving the server to change skins.',
      },
      texturePack: {
        title: 'Texture Pack Not Loading?',
        text: 'Submit a ticket. Most often the issue is not on our end.',
      },
    },
    commandsTitle: 'Basic RP Commands',
    commands: {
      menu: 'Server menu — useful links, race features, walk/run toggle',
      name: "Change your character's name",
      chatLabel: '(text)',
      chat: 'Normal character speech (Cat: Meow meow)',
      sh: 'Character whisper (Cat whispers: Meow meow)',
      low: 'Character half-whisper (Tavr says quietly: Meow meow)',
      scr: 'Character shout (Cat shouts: Meow meow)',
      me: 'Character action (/me did a flip → "Cat did a flip")',
      do: 'Event description (/do The flip was unsuccessful → "The flip was unsuccessful")',
      try: 'Action attempt with a random outcome',
      dice: 'Dice, like in DnD — a roll from 1 to 20',
      sit: 'Sit down',
      lay: 'Lay on your back',
      nrpLabel: 'ooc (text)',
      nrp: 'Out-of-character communication (grey text in chat)',
      globalNrpLabel: '!ooc (text)',
      globalNrp: 'Global out-of-character',
    },
    ticketsSection: {
      title: 'Tickets',
      text: 'For all questions regarding mechanics and lore, create a ticket in the 🎫-tickets channel on Discord. Click "Create Ticket" and describe your question.',
    },
    usefulChannels: 'Also Interesting to Read',
    channels: {
      chronicle: {
        name: 'Chronicle',
        desc: 'Timeline of events that have happened and are happening in our Plane',
      },
      truths: {
        name: 'Bonds of Truth',
        desc: 'RP archive with additional lore information',
      },
      news: {
        name: 'News',
        desc: 'News channel with server-related events',
      },
      sneakPeeks: {
        name: 'Sneak Peeks',
        desc: 'Additions and changes to mechanics',
      },
      announcements: {
        name: 'Announcements',
        desc: 'RP bulletin board in Nekodil, where every Tavr can post their announcement',
      },
    },
    outro: {
      title: 'Elium Awaits You!',
      text1:
        'We believe that every player can create their own unique story in our world. May your adventures be full of danger, yet generously rewarded. May your friends be loyal and your enemies — worthy opponents.',
      text2:
        'Welcome to The Chronicles of Elium — a world where your legend is just beginning! Safe travels, Tavr! May the stars of Elium light your path!',
      creator: 'Creator and head of the server: Cefal | BN_1',
    },
  },
};

export default en;
