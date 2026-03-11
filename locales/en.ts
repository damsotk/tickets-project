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
      title: 'Ellium tickets',
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
};

export default en;
