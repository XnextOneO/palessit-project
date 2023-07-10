import styled from "styled-components";
import {LogoDark} from "./logo.tsx";

const FooterWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 57rem;
  margin-top: auto;`


function Footer() {
    return (

        <FooterWrapper>
            <LogoDark/>
        </FooterWrapper>

    )
}

export default Footer;