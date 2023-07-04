import {useState} from 'react'
import './App.css'
import {useTwoStore} from "./stores/second.store.ts";

function One() {
    const [state, setState] = useState('one state')
    const {setNewText} = useTwoStore();
    return (
        <div style={{backgroundColor: '#ce50e8'}}>
            One sate: {state}
            <button onClick={() => {
                setState('Changed one, time: ' + new Date().toISOString())
            }}>
                Update current state
            </button>

            <button onClick={() => {
                setNewText(Math.random().toString());
            }}>
                Update remote state
            </button>
        </div>
    )
}

function Two() {
    const [state, setState] = useState('two state');
    const {text} = useTwoStore();
    return (
        <div style={{backgroundColor: '#13867e'}}>
            Two sate: {state}
            <button onClick={() => {
                setState('Changed two, time: ' + new Date().toISOString())
            }}>
                Update current state
            </button>
            <br/>
            State manager data: {text}
        </div>
    )
}

function App() {
    return (
        <div>
            <One/>
            <Two/>
        </div>
    )
}

export default App
