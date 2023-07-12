import {useEffect, useState} from 'react';
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


const DeliverAddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 23.3rem;
  gap: 0.625rem;
`

const UserDataWrapper = styled.div`
  display: flex;
  gap: 12.688rem`

const HouseApartmentFloorWrapper = styled.div`
  display: flex;
  gap: 0.5rem; `

const ContactUserData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`


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
        <UserDataWrapper>


            <DeliverAddressWrapper>
                <Typography variant="h4" color="#0F56B3">
                    Данные доставки
                </Typography>
                <TextField id="outlined-basic" label="Населённый пункт" variant="outlined" sx={{width: '12.9rem'}}/>
                <TextField id="outlined-basic" label="Улица" variant="outlined" sx={{width: '12.9rem'}}/>
                <HouseApartmentFloorWrapper>
                    <TextField id="outlined-basic" label="Дом" variant="outlined" sx={{width: '4.1rem'}}/>
                    <TextField id="outlined-basic" label="Квартира" variant="outlined" sx={{width: '6.5rem'}}/>
                    <TextField id="outlined-basic" label="Этаж" variant="outlined" sx={{width: '5rem'}}/>
                </HouseApartmentFloorWrapper>
                <TextField
                    id="outlined-basic"
                    label="Комментарий к заказу"
                    multiline
                    rows={5}
                    variant="outlined"
                />

            </DeliverAddressWrapper>
            <ContactUserData>
                <Typography variant="h4" color="#0F56B3">
                    Контактные данные
                </Typography>
                <div>
                    Name: {name}
                    <br/>
                    Email: {email}
                </div>
                <TextField id="outlined-basic" label="Телефон (+375...)" variant="outlined" sx={{width: '15rem'}}/>
                <Button variant="contained">Сохранить</Button>
            </ContactUserData>

        </UserDataWrapper>
    );
}

export default Userpage;