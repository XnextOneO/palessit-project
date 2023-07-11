import {useEffect, useState} from 'react';

function Userpage() {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {

        fetch('https://63025c76c6dda4f287b8755e.mockapi.io/api/user/1')
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setEmail(data.email);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            Name: {name}
            <br/>
            Email: {email}
        </div>
    );
}

export default Userpage;