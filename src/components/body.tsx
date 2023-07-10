import Menu from "../components/menu.tsx"
import Content from "./content.tsx";
import styled from "styled-components";

const BodyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
`

function Body() {
    return (
        <BodyWrapper>
            <Menu/>
            <Content/>
        </BodyWrapper>
    )
}

export default Body;