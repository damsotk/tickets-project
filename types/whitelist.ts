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
