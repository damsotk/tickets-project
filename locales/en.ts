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
};

export default en;
