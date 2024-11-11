export interface ILanguage {
    name: string;
    code: string;
}

export interface ILoginResponse {
    isAuthenticated: boolean;
    token: string;
    email: string;
    userName: string;
    expiresOn: string;
    roles: string[];
    userId: string;
    supportedLanguages: ILanguage[];
}
