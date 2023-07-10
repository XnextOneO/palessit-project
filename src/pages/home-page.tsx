import Body from "../components/body.tsx"
import styled from "styled-components";


const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;`

function HomePage() {
    return (

        <PageWrapper>
            <Body/>
        </PageWrapper>

    );
}

export default HomePage;

