import { useEffect, useState } from 'react';
import { AuthStorageService } from '../services/auth-storage.service.ts';



function Userpage() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = AuthStorageService.getToken();
        setToken(storedToken);
    }, []);

    return (
        <div>
            Token: {token}
        </div>
    );
}

export default Userpage;