import { useState, useRef } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { InputAdornment } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import BarChartIcon from "@mui/icons-material/BarChart";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { ApiClient } from "../services/api-client.ts";
import { AuthStorageService } from "../services/auth-storage.service.ts";
import { useNavigate } from "react-router-dom";
import { Logo } from "./logo.tsx";
import { useQuery } from "react-query";

export default function Header() {
    const navigate = useNavigate();
    const query = useQuery(
        "whoAmI",
        async () => {
            const token = AuthStorageService.getToken();
            if (token) {
                return await ApiClient.whoAmI(token);
            } else {
                return Promise.resolve(undefined);
            }
        }
    );

    const [isListening, setIsListening] = useState(false);
    const [voiceInput, setVoiceInput] = useState("");
    const recognitionRef = useRef(null);

    const handleRecognitionStart = () => {
        setIsListening(true);
    };

    const handleRecognitionEnd = () => {
        setIsListening(false);
    };

    const handleRecognitionResult = (event) => {
        const result = event.results[event.results.length - 1][0].transcript;
        setVoiceInput(result);
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            recognitionRef.current = new window.webkitSpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = "ru-RU";
            recognitionRef.current.onresult = handleRecognitionResult;
            recognitionRef.current.onstart = handleRecognitionStart;
            recognitionRef.current.onend = handleRecognitionEnd;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    if (query.isLoading) return <div>Loading...</div>;

    return (
        <HeaderWrapper>
            <ChildHeaderWrapper>
                <a href="/">
                    <Logo />
                </a>
                <TextField
                    sx={{ width: "16rem" }}
                    id="filled-basic"
                    label="Например: “Процессор Intel”"
                    variant="filled"
                    size="small"
                    value={voiceInput}
                    onChange={(e) => setVoiceInput(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <MicIcon onClick={toggleListening} color={isListening ? "secondary" : "inherit"} />
                            </InputAdornment>
                        ),
                    }}
                />
                {query.data ? (
                    <LoginLogoutWrapper>
                        <div>Вы вошли как: {query.data.email}</div>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={async () => {
                                AuthStorageService.clear();
                                await query.refetch();
                            }}
                        >
                            Выход
                        </Button>
                    </LoginLogoutWrapper>
                ) : (
                    <Button
                        variant="outlined"
                        size="small"
                        style={{ margin: "1rem" }}
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Вход
                    </Button>
                )}
                <TwoButtonsHeaderWrapper>
                    <Button variant="outlined" size="small" endIcon={<BarChartIcon />}>
                        Сравнение товаров
                    </Button>
                    <Button variant="outlined" size="small" endIcon={<LocalGroceryStoreOutlinedIcon />}>
                        Корзина
                    </Button>
                </TwoButtonsHeaderWrapper>
            </ChildHeaderWrapper>
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.div`
  display: flex;
  height: 6rem;
  justify-content: space-around;
  align-items: center;
  background: #eeeeee;
  flex: 0 0 auto;
  width: 100%;

  @media (max-width: 1024px) {
    height: 14rem;
  }
`;

const ChildHeaderWrapper = styled.div`
  width: 111rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const TwoButtonsHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    display: none;
  }
`;

const LoginLogoutWrapper = styled.div`
  margin: 0.5rem;
`;
