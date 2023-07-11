import Header from "./header.tsx";
import Footer from "./footer.tsx";
import Menu from "./menu.tsx";
import styled from "styled-components";

const MenuContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  flex-grow: 1;
`

const ChildMenuContentWrapper = styled.div`
  width: 120rem;
  display: flex;
  flex-direction: row;`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 8.8rem;
`


export function PageWrapper(props: {
    children: React.ReactNode,
    header?: boolean,
    footer?: boolean,
    menu?: boolean
}) {
    return (
        <>
            {props.header && <Header/>}

            {props.menu && <MenuContentWrapper><ChildMenuContentWrapper>
                <Menu/>
                <ContentWrapper>{props.children}</ContentWrapper>
            </ChildMenuContentWrapper>
            </MenuContentWrapper>}
            {!props.menu && props.children}

            {props.footer && <Footer/>}
        </>
    )
}