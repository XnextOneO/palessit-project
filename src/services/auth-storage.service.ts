export class AuthStorageService {
    static getToken(): string | undefined {
        const token = localStorage.getItem('token');
        return token || undefined;
    }

    static setToken(token: string | undefined): void {
        if (!token) {
            localStorage.removeItem('token');
            return;
        }

        localStorage.setItem('token', token);
    }


    static clear(): void {
        localStorage.removeItem('token');
    }
}