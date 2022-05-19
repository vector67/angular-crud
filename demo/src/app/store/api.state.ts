export interface ApiState {
  loggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  expires: number;
  user?: {
    attributes: any;
    id?: string;
    tncsConsent: boolean;
  };
}
