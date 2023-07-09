export interface Account {
    id: string;
    email: string;
    firstName: string;
}

export interface AuthResponse {
    token: string;
    account: Account;
}

export class AuthService {
    static async login(email: string, password: string): Promise<AuthResponse> {
        console.log('Implement real login: ', email, password);
        return {
            token: '123', account: {
                id: '123',
                email,
                firstName: '123',
            }
        };
    }
}