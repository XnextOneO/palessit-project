import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useQuery} from "react-query";
import {AuthStorageService} from "../services/auth-storage.service.ts";
import {ApiClient} from "../services/api-client.ts";


export default function Userpage() {

    const query = useQuery(
        'whoAmI',
        async () => {
            const token = AuthStorageService.getToken();
            if (token) {
                return await ApiClient.whoAmI(token);
            } else {
                return Promise.resolve(undefined);
            }
        });


    return (
        <UserDataWrapper>
            {
                query.data ?

                    <UserDataWrapper><DeliverAddressWrapper>
                        <Typography variant="h4" color="#0F56B3">
                            Данные доставки
                        </Typography>
                        <TextField id="outlined-basic" label="Населённый пункт" variant="outlined"
                                   sx={{width: '12.9rem'}}/>
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
                            sx={{width: '16.6rem'}}
                        />

                    </DeliverAddressWrapper>
                        <ContactUserData>
                            <Typography variant="h4" color="#0F56B3">
                                Контактные данные
                            </Typography>
                            <div>
                                Name: {query.data.email}
                                <br/>
                                Email: {query.data.name}
                            </div>
                            <TextField id="outlined-basic" label="Телефон (+375...)" variant="outlined"
                                       sx={{width: '15rem'}}/>
                            <Button variant="contained">Сохранить</Button>
                        </ContactUserData></UserDataWrapper>

                    :
                    <div>Войдите в аккаунт</div>
            }
        </UserDataWrapper>
    );
}


const DeliverAddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 23.3rem;
  gap: 0.625rem;
`

const UserDataWrapper = styled.div`
  display: flex;
  gap: 12.688rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    width: 10rem;
  }
`

const HouseApartmentFloorWrapper = styled.div`
  display: flex;
  gap: 0.5rem; `

const ContactUserData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`