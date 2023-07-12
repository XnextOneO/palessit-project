import styled from "styled-components";
import {LogoDark} from "./logo.tsx";
import {NavLink} from "react-router-dom";

const FooterWrapper = styled.div`
  display: flex;
  width: 57rem;
  margin: 5rem auto 0;
  justify-content: space-around;
  flex: 0 0 auto;
`


const CustomNavLink = styled(NavLink)`
  color: gray;
  text-decoration: none;
`

const NavWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
gap: 1rem`

function Footer() {
    return (

        <FooterWrapper>
            <LogoDark/>
            <NavWrapper>
                <CustomNavLink to="/">Компания</CustomNavLink>
                <CustomNavLink to="/catalog">Покупателям</CustomNavLink>
                <CustomNavLink to="/*">Помощь</CustomNavLink>
                <CustomNavLink to="/*">Оставайтесь на связи</CustomNavLink>
            </NavWrapper>
        </FooterWrapper>

    )
}

export default Footer;