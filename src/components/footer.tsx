import styled from "styled-components";
import {LogoDark} from "./logo.tsx";
import {NavLink} from "react-router-dom";

const FooterWrapper = styled.div`
  display: flex;
  width: 57rem;
  margin: 5rem auto 0;
  justify-content: space-around;
  flex: 0 0 auto;


  @media(max-width:1024px ) {
   flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 1rem;
  }
`


const CustomNavLink = styled(NavLink)`
  color: gray;
  text-decoration: none;
`

const NavWrapper = styled.div`
display: flex;
justify-content: space-around;
gap: 1rem;
  
  @media(max-width:1024px ) {
    flex-direction: column;
    gap: 2rem;
    margin: 1rem;
  }

`

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