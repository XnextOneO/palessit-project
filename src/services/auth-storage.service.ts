import {Account} from "./auth.service.ts";

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

    static getAccount(): Account | undefined {
        const account = localStorage.getItem('account');
        if (!account) {
            return undefined;
        }

        return JSON.parse(account);
    }

    static setAccount(account: Partial<Account> | undefined): void {
        if (!account) {
            localStorage.removeItem('account');
            return;
        }

        localStorage.setItem('account', JSON.stringify(account));
    }

    static clear(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('account');
    }
}