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
    static async whoAmI(token: string): Promise<Account> {
        const response = await fetch(`https://63025c76c6dda4f287b8755e.mockapi.io/api/user/1`, {
            headers: {
                authorization: token
            }
        });
        return await response.json();
    }

    static async login(email: string, password: string): Promise<AuthResponse> {
        const token = Math.random().toString(36).substring(2);
        //fetch https://63025c76c6dda4f287b8755e.mockapi.io/api/user/1?login=asd&password=123454
        const response = await fetch(`https://63025c76c6dda4f287b8755e.mockapi.io/api/user/1?login=${email}&password=${password}`);
        const account = await response.json();
        return {token, account};
    }
}

