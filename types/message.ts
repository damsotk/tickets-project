export interface MessageAuthor {
  id: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

export interface Message {
  id: string;
  text: string;
  authorId: string;
  createdAt: string;
  author: MessageAuthor;
  isPending?: boolean;
}

export interface GetMessagesResponse {
  messages: Message[];
}

export interface SendMessageResponse {
  message: Message;
}
