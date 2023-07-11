import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {InputAdornment} from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import {ApiClient} from "../services/api-client.ts";
import {AuthStorageService} from "../services/auth-storage.service.ts";
import {useNavigate} from "react-router-dom";
import {Logo} from "./logo.tsx"
import {useQuery} from "react-query";


const HeaderWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 6rem;
  justify-content: space-around;
  align-items: center;
  background: #EEEEEE;`

const ChildHeaderWrapper = styled.div`
  width: 111rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const TwoButtonsHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

function Header() {
    const navigate = useNavigate();
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

    if (query.isLoading) return <div>Loading...</div>;

    return (
        <HeaderWrapper>
            <ChildHeaderWrapper><a href="/"><Logo/></a>
                <TextField sx={{width: '30rem'}} id="filled-basic" label="Например: “Процессор Intel”" variant="filled"
                           size="small" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon></SearchIcon>
                        </InputAdornment>
                    ), endAdornment: (
                        <InputAdornment position="end">
                            <MicIcon/>
                        </InputAdornment>)
                }}/>
                {
                    query.data ?
                        <div>
                            <div>Вы вошли как: {query.data.email}</div>
                            <Button variant="outlined" size="small" onClick={async () => {
                                AuthStorageService.clear();
                                await query.refetch();
                            }}>Выход</Button>
                        </div>
                        :
                        <Button variant="outlined" size="large"
                                onClick={() => {
                                    navigate('/login');
                                }}
                        >Вход</Button>
                }
                <TwoButtonsHeaderWrapper>
                    <Button variant="outlined" size="small" endIcon={<BarChartIcon/>}>Сравнение товаров</Button>
                    <Button variant="outlined" size="small" endIcon={<LocalGroceryStoreOutlinedIcon/>}>Корзина</Button>
                </TwoButtonsHeaderWrapper></ChildHeaderWrapper>
        </HeaderWrapper>

    )
}


export default Header;