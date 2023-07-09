import {IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  width: 20%;
`


function Menu() {
    return (

        <MenuWrapper>
            <IconButton color="primary">
                <HomeOutlinedIcon/>
                <Typography variant="body1" align="center">Главная</Typography>
            </IconButton>
            <IconButton color="primary">
                <ThumbUpOutlinedIcon/>
                <Typography variant="body1" align="center">Популярное</Typography>
            </IconButton>
            <IconButton color="primary">
                <ShoppingCartOutlinedIcon/>
                <Typography variant="body1" align="center">Акции</Typography>
            </IconButton>
            <IconButton color="primary">
                <PercentOutlinedIcon/>
                <Typography variant="body1" align="center">Калькулятор ПК</Typography>
            </IconButton>
            <IconButton color="primary">
                <CalculateOutlinedIcon/>
                <Typography variant="body1" align="center">Корзина</Typography>
            </IconButton>
            <IconButton color="primary">
                <AccountCircleOutlinedIcon/>
                <Typography variant="body1" align="center">Личный кабинет</Typography>
            </IconButton>
            <IconButton color="primary">
                <FolderOutlinedIcon/>
                <Typography variant="body1" align="center">Категории</Typography>
            </IconButton>
        </MenuWrapper>


    );
}

export default Menu;