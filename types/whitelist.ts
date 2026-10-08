export interface ApplicationUser {
  id: string;
  name: string;
  avatar: string | null;
}

export interface Application {
  id: string;
  source: string;
  rpExperience: string;
  plans: string | null;
  minecraftNick: string;
  discordNick: string;
  status: string;
  createdAt: string;
  user: ApplicationUser;
}

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface MyApplication {
  id: string;
  status: ApplicationStatus;
  reviewComment?: string | null;
}

export interface MyApplicationResponse {
  application: MyApplication | null;
}

export interface WhitelistResponse {
  players: string[];
  state: boolean;
}

export interface ToggleResponse {
  message: string;
}

export interface AddPlayerResponse {
  message: string;
}

export interface ApplicationsResponse {
  applications: Application[];
}

export interface ApplicationActionResponse {
  message: string;
}

export interface StatusMessage {
  type: 'success' | 'error';
  message: string;
}
