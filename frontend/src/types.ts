export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

/** The structure of a user */
export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  likes: number[];
};

/** The structure of the response from the getUser API call */
export type GetUserResponse = {
  authenticated: boolean;
  user: User;
};
/** The structure of the login credentials */
export type LoginCredentials = {
  username: string;
  password: string;
};

/** Data supplied for password recovery */
export type ForgotPassword = {
  email: string;
};

/** Data required for user registration */
export type RegisterData = LoginCredentials & {
  email: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
};

/** The structure of the response from the register API call */
export type RegisterResponse = {
  message: string;
  user: User;
  success: boolean;
};

/** Structure of the authentication context */
export type AuthContextType = {
  // State
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (data: ForgotPassword) => Promise<boolean>;
  getProfile: () => Promise<User | null>;
  updateProfile: (data: Partial<User>) => Promise<Partial<User> | null>;
  changePassword: (data: ChangePasswordData) => Promise<boolean>;
};

/** The structure of a photo */
export interface Photo {
  id: number;
  photographer: Photographer;
  width: number;
  height: number;
  url: string;
  alt: string;
  avg_color: string;
  src_original: string;
  src_large2x: string;
  src_large: string;
  src_medium: string;
  src_small: string;
  src_portrait: string;
  src_landscape: string;
  src_tiny: string;
  is_liked: boolean;
}

/** The structure of a photographer */
export interface Photographer {
  id: number;
  name: string;
  url: string;
  pexels_id: number;
  photo_count: number;
  created_at: Date;
  updated_at: Date;
}

export type ChangePasswordData = {
  old_password: string;
  new_password: string;
};

export type ProtectedRouteProps = {
  children?: React.ReactNode;
  redirectTo?: string;
};

export type PhotoResponse = {
  count: number;
  next: null;
  previous: null;
  results: Photo[];
};
