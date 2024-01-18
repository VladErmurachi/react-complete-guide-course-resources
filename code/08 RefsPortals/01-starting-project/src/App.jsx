import Player from './components/Player.jsx';
import TimerChallenge from "./components/TimerChallange.jsx";

function App() {
    return (
        <>
            <Player/>
            <div id="challenges">
                <TimerChallenge title="Easy" targetTime={1}/>
                <TimerChallenge title="Not easy" targetTime={5}/>
                <TimerChallenge title="Getting tough" targetTime={10}/>
                <TimerChallenge title="Pros only" targetTime={20}/>
            </div>
        </>
    );
}

export default App;