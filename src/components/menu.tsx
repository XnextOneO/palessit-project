import {IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import {useNavigate} from "react-router-dom";

export default function Menu() {
    const navigate = useNavigate();
    return (
        <MenuWrapper>
            <CustomIconButton color="primary" onClick={() => {
                navigate('/');
            }}>
                <HomeOutlinedIcon/>
                <CustomTypography variant="body1" align="center">Главная</CustomTypography>
            </CustomIconButton>
            <CustomIconButton color="primary" onClick={() => {
                navigate('/promotion');
            }}>
                <ShoppingCartOutlinedIcon/>
                <CustomTypography variant="body1" align="center">Акции</CustomTypography>
            </CustomIconButton>
            <CustomIconButton color="primary" onClick={() => {
                navigate('/calcPC');
            }}>
                <PercentOutlinedIcon/>
                <CustomTypography variant="body1" align="center">Калькулятор <br/>ПК</CustomTypography>
            </CustomIconButton>
            <CustomIconButton color="primary" onClick={() => {
                navigate('/none');
            }}>
                <CalculateOutlinedIcon/>
                <CustomTypography variant="body1" align="center">Корзина</CustomTypography>
            </CustomIconButton>
            <CustomIconButton color="primary" onClick={() => {
                navigate('/user');
            }}>
                <AccountCircleOutlinedIcon/>
                <CustomTypography variant="body1" align="center">Личный <br/>кабинет</CustomTypography>
            </CustomIconButton>
            <CustomIconButton color="primary" onClick={() => {
                navigate('/beerking');
            }}>
                <FolderOutlinedIcon/>
                <CustomTypography variant="body1" align="center">BeerKing</CustomTypography>
            </CustomIconButton>
        </MenuWrapper>


    );
}


const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 10.3rem;
  align-items: center;
  margin-right: 8.8rem;


  @media (max-width: 1024px) {
    margin-right: 1rem;
  }

  @media (max-width: 478px) {

    width: 6rem;
  }
`
const CustomTypography = styled(Typography)`
  display: inline;
`;
const CustomIconButton = styled(IconButton)`
  display: flex;
  flex-direction: column;
`