import React, { useState } from 'react';
import './App.css';

const TestnetBaccarat = () => {
    // Web3 & Wallet State
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('0');
    const [isConnected, setIsConnected] = useState(false);
    const [network, setNetwork] = useState('');
    const [isTestnet, setIsTestnet] = useState(false);

    // Game State
    const [currentRoom, setCurrentRoom] = useState(null);
    const [playerCards, setPlayerCards] = useState([]);
    const [bankerCards, setBankerCards] = useState([]);
    const [gameState, setGameState] = useState('lobby');
    const [result, setResult] = useState('');
    const [playerScore, setPlayerScore] = useState(0);
    const [bankerScore, setBankerScore] = useState(0);
    const [showCards, setShowCards] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Room Creation
    const [newRoomBet, setNewRoomBet] = useState('0.01');
    const [myBet, setMyBet] = useState({ side: '', amount: 0 });

    // Testnet Constants
    const TESTNET_ENTRY_FEE = 0.001;
    const WIN_FEE_PERCENT = 2;

    // Supported Testnets
    const TESTNETS = {
        '0xaa36a7': { name: 'Sepolia', symbol: 'SepoliaETH', faucet: 'https://sepoliafaucet.com' },
        '0x5': { name: 'Goerli', symbol: 'GoerliETH', faucet: 'https://goerlifaucet.com' },
        '0x13881': { name: 'Mumbai', symbol: 'MATIC', faucet: 'https://faucet.polygon.technology' }
    };

    // Sound Effects
    const playSound = (frequency, duration, type = 'sine') => {
        if (!soundEnabled) return;
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (error) {
            console.log('Audio not supported');
        }
    };

    const playConnectSound = () => playSound(800, 0.3);

    // Web3 Functions
    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });

                const balance = await window.ethereum.request({
                    method: 'eth_getBalance',
                    params: [accounts[0], 'latest']
                });

                const chainId = await window.ethereum.request({
                    method: 'eth_chainId'
                });

                const testnetInfo = TESTNETS[chainId];
                const isTestnetConnection = !!testnetInfo;

                setAccount(accounts[0]);
                setBalance((parseInt(balance, 16) / 1e18).toFixed(4));
                setIsConnected(true);
                setNetwork(testnetInfo ? testnetInfo.name : 'Unknown Network');
                setIsTestnet(isTestnetConnection);

                if (isTestnetConnection) {
                    playConnectSound();
                }

                // Listen for account/network changes
                window.ethereum.on('accountsChanged', (accounts) => {
                    if (accounts.length === 0) {
                        disconnectWallet();
                    } else {
                        setAccount(accounts[0]);
                    }
                });

                window.ethereum.on('chainChanged', () => {
                    window.location.reload();
                });

            } catch (error) {
                console.error('Error connecting wallet:', error);
                alert('Failed to connect wallet!');
            }
        } else {
            alert('Please install MetaMask! Visit https://metamask.io');
        }
    };

    const switchToTestnet = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xaa36a7' }], // Sepolia
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0xaa36a7',
                            chainName: 'Sepolia Test Network',
                            nativeCurrency: {
                                name: 'SepoliaETH',
                                symbol: 'SepoliaETH',
                                decimals: 18
                            },
                            rpcUrls: ['https://sepolia.infura.io/v3/'],
                            blockExplorerUrls: ['https://sepolia.etherscan.io/']
                        }]
                    });
                } catch (addError) {
                    console.error('Error adding network:', addError);
                }
            }
        }
    };

    const disconnectWallet = () => {
        setAccount('');
        setBalance('0');
        setIsConnected(false);
        setNetwork('');
        setIsTestnet(false);
        setGameState('lobby');
        setCurrentRoom(null);
    };

    // Game Logic
    const suits = ['♠', '♣', '♥', '♦'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    const getCardValue = (rank) => {
        if (rank === 'A') return 1;
        if (['J', 'Q', 'K'].includes(rank)) return 0;
        return parseInt(rank);
    };

    const calculateScore = (cards) => {
        const total = cards.reduce((sum, card) => sum + getCardValue(card.rank), 0);
        return total % 10;
    };

    const createDeck = () => {
        const deck = [];
        for (let suit of suits) {
            for (let rank of ranks) {
                deck.push({ suit, rank, id: Math.random() });
            }
        }
        return deck.sort(() => Math.random() - 0.5);
    };

    // Basic game functions for testing
    const createRoom = () => {
        if (!isConnected || !isTestnet) {
            alert('Please connect to a testnet first!');
            return;
        }

        const betAmount = parseFloat(newRoomBet);
        if (betAmount < 0.001) {
            alert('Minimum bet is 0.001 ETH');
            return;
        }

        if (parseFloat(balance) < betAmount + TESTNET_ENTRY_FEE) {
            alert('Insufficient balance! Get more test ETH from faucet.');
            return;
        }

        const room = {
            id: Date.now(),
            creator: account,
            betAmount: betAmount,
            entryFee: TESTNET_ENTRY_FEE,
            players: [],
            maxPlayers: 6,
            status: 'waiting'
        };

        setCurrentRoom(room);
        setGameState('waiting');
        playSound(600, 0.2);
    };

    const placeBet = (side) => {
        if (!currentRoom) return;

        setMyBet({ side, amount: currentRoom.betAmount });
        playSound(800, 0.2);

        // Quick demo game start
        setTimeout(() => {
            startDemoGame();
        }, 1000);
    };

    const startDemoGame = () => {
        setGameState('playing');
        setShowCards(false);

        const deck = createDeck();
        const newPlayerCards = [deck[0], deck[2]];
        const newBankerCards = [deck[1], deck[3]];

        setPlayerCards(newPlayerCards);
        setBankerCards(newBankerCards);

        setTimeout(() => {
            setShowCards(true);
            const playerScore = calculateScore(newPlayerCards);
            const bankerScore = calculateScore(newBankerCards);
            setPlayerScore(playerScore);
            setBankerScore(bankerScore);

            const winner = playerScore > bankerScore ? 'Player' : bankerScore > playerScore ? 'Banker' : 'Tie';
            setResult(winner);

            setTimeout(() => {
                setGameState('result');
            }, 1000);
        }, 1500);
    };

    const newGame = () => {
        setGameState('lobby');
        setCurrentRoom(null);
        setResult('');
        setPlayerCards([]);
        setBankerCards([]);
        setPlayerScore(0);
        setBankerScore(0);
        setShowCards(false);
        setMyBet({ side: '', amount: 0 });
    };

    // Components
    const Card = ({ card, hidden = false }) => (
        <div className={`w-14 h-20 rounded-lg border-2 border-yellow-400 bg-white shadow-lg flex flex-col items-center justify-center text-sm font-bold transform transition-all duration-500 ${hidden ? 'scale-0' : 'scale-100'}`}>
            {!hidden && (
                <>
                    <div className={`${card.suit === '♥' || card.suit === '♦' ? 'text-red-600' : 'text-black'}`}>
                        {card.rank}
                    </div>
                    <div className={`text-xl ${card.suit === '♥' || card.suit === '♦' ? 'text-red-600' : 'text-black'}`}>
                        {card.suit}
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-900 to-black text-white p-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-yellow-400 mb-4">🧪 TESTNET BACCARAT 🧪</h1>

                {!isConnected ? (
                    <div>
                        <div className="text-lg text-green-300 mb-4">Safe Testing Environment - No Real Money!</div>
                        <button
                            onClick={connectWallet}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
                        >
                            🦊 Connect MetaMask
                        </button>
                        <div className="text-sm text-gray-400 mt-2">
                            Don't have MetaMask? <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-blue-400">Install here</a>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-xl p-4 max-w-md mx-auto">
                        <div className="text-yellow-400 font-bold mb-2">Connected Wallet</div>
                        <div className="text-sm text-gray-300 mb-2">
                            {account.slice(0, 6)}...{account.slice(-4)}
                        </div>
                        <div className="text-xl text-white mb-2">{balance} ETH</div>
                        <div className="text-sm text-gray-400 mb-4">{network}</div>
                        <div className="flex gap-2 justify-center">
                            <button
                                onClick={() => setSoundEnabled(!soundEnabled)}
                                className={`px-3 py-1 rounded text-sm ${soundEnabled ? 'bg-green-600' : 'bg-gray-600'}`}
                            >
                                🔊 {soundEnabled ? 'ON' : 'OFF'}
                            </button>
                            <button
                                onClick={disconnectWallet}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                            >
                                Disconnect
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {isConnected && (
                <>
                    {/* Network Status */}
                    {isTestnet ? (
                        <div className="bg-orange-600 border-2 border-orange-400 rounded-xl p-4 mb-6 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-2xl mb-2">⚠️ TESTNET MODE ⚠️</div>
                                <div className="text-white font-bold mb-2">You're using TEST ETH - No real money!</div>
                                <div className="text-orange-200 text-sm">
                                    Perfect for testing. Get free test ETH from faucets.
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-red-600 border-2 border-red-400 rounded-xl p-4 mb-6 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-2xl mb-2">🚨 MAINNET DETECTED 🚨</div>
                                <div className="text-white font-bold mb-4">You're connected to mainnet with REAL ETH!</div>
                                <button
                                    onClick={switchToTestnet}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg"
                                >
                                    Switch to Sepolia Testnet
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Faucet Info */}
                    {isTestnet && (
                        <div className="bg-blue-800 rounded-xl p-4 mb-6 max-w-2xl mx-auto text-center">
                            <div className="text-blue-200 font-bold mb-2">💰 Need More Test ETH?</div>
                            <div className="text-blue-100 text-sm mb-3">
                                Get free test ETH from faucets to continue playing
                            </div>
                            <a
                                href={TESTNETS[window.ethereum?.chainId]?.faucet}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-block"
                            >
                                🚰 Get Test ETH
                            </a>
                        </div>
                    )}

                    {/* Game continues only on testnet */}
                    {isTestnet && (
                        <>
                            {/* Fee Structure */}
                            <div className="bg-gray-800 rounded-xl p-4 mb-6 max-w-2xl mx-auto">
                                <h3 className="text-yellow-400 font-bold mb-2 text-center">💰 Testnet Fee Structure</h3>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-white font-bold">Entry Fee</div>
                                        <div className="text-yellow-400">{TESTNET_ENTRY_FEE} ETH per game</div>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold">Win Fee</div>
                                        <div className="text-yellow-400">{WIN_FEE_PERCENT}% of winnings</div>
                                    </div>
                                </div>
                                <div className="text-center text-gray-400 text-sm mt-2">
                                    ⚡ Lower fees for testing purposes
                                </div>
                            </div>

                            {/* Game Logic */}
                            {gameState === 'lobby' && (
                                <div className="max-w-4xl mx-auto">
                                    <div className="bg-gray-800 rounded-xl p-6 mb-6">
                                        <h3 className="text-yellow-400 font-bold text-xl mb-4 text-center">🎮 Create Test Room</h3>
                                        <div className="flex gap-4 items-center justify-center">
                                            <div>
                                                <label className="block text-white mb-2">Bet Amount (Test ETH)</label>
                                                <input
                                                    type="number"
                                                    step="0.001"
                                                    min="0.001"
                                                    value={newRoomBet}
                                                    onChange={(e) => setNewRoomBet(e.target.value)}
                                                    className="bg-gray-700 text-white px-3 py-2 rounded-lg w-32"
                                                    placeholder="0.01"
                                                />
                                            </div>
                                            <button
                                                onClick={createRoom}
                                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg mt-6"
                                            >
                                                🎲 Start Demo Game
                                            </button>
                                        </div>
                                        <div className="text-center text-gray-400 mt-2">
                                            Total cost: {(parseFloat(newRoomBet) + TESTNET_ENTRY_FEE).toFixed(3)} Test ETH
                                        </div>
                                    </div>
                                </div>
                            )}

                            {gameState === 'waiting' && currentRoom && (
                                <div className="max-w-2xl mx-auto text-center">
                                    <div className="bg-gray-800 rounded-xl p-6 mb-6">
                                        <h3 className="text-yellow-400 font-bold text-xl mb-4">🎯 Choose Your Bet</h3>
                                        <div className="text-white mb-4">Bet Amount: {currentRoom.betAmount} Test ETH</div>
                                        <div className="text-white mb-6">Choose your side:</div>

                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            <button
                                                onClick={() => placeBet('Player')}
                                                className={`py-4 px-4 rounded-xl font-bold transition-colors ${myBet.side === 'Player'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                                    }`}
                                            >
                                                PLAYER<br />
                                                <span className="text-sm">Pays 1:1</span>
                                            </button>

                                            <button
                                                onClick={() => placeBet('Tie')}
                                                className={`py-4 px-4 rounded-xl font-bold transition-colors ${myBet.side === 'Tie'
                                                        ? 'bg-purple-600 text-white'
                                                        : 'bg-purple-500 hover:bg-purple-600 text-white'
                                                    }`}
                                            >
                                                TIE<br />
                                                <span className="text-sm">Pays 8:1</span>
                                            </button>

                                            <button
                                                onClick={() => placeBet('Banker')}
                                                className={`py-4 px-4 rounded-xl font-bold transition-colors ${myBet.side === 'Banker'
                                                        ? 'bg-red-600 text-white'
                                                        : 'bg-red-500 hover:bg-red-600 text-white'
                                                    }`}
                                            >
                                                BANKER<br />
                                                <span className="text-sm">Pays 0.95:1</span>
                                            </button>
                                        </div>

                                        {myBet.side && (
                                            <div className="text-yellow-400 font-bold">
                                                You bet {myBet.amount} Test ETH on {myBet.side}
                                                <div className="text-white text-sm mt-2">⚡ Game starting in 1 second...</div>
                                            </div>
                                        )}

                                        <button
                                            onClick={newGame}
                                            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                                        >
                                            ← Back to Lobby
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Game playing and result screens */}
                            {(gameState === 'playing' || gameState === 'result') && (
                                <div className="max-w-4xl mx-auto">
                                    <div className="bg-green-700 rounded-3xl border-8 border-yellow-400 p-8 shadow-2xl">

                                        {/* Cards Area */}
                                        <div className="flex justify-around mb-8">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-yellow-400 mb-4">PLAYER</div>
                                                <div className="flex gap-2 justify-center mb-4">
                                                    {playerCards.map((card, index) => (
                                                        <Card key={index} card={card} hidden={!showCards} />
                                                    ))}
                                                </div>
                                                <div className="text-3xl font-bold text-white">
                                                    {showCards ? playerScore : '-'}
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <div className="text-4xl font-bold text-yellow-400">VS</div>
                                            </div>

                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-yellow-400 mb-4">BANKER</div>
                                                <div className="flex gap-2 justify-center mb-4">
                                                    {bankerCards.map((card, index) => (
                                                        <Card key={index} card={card} hidden={!showCards} />
                                                    ))}
                                                </div>
                                                <div className="text-3xl font-bold text-white">
                                                    {showCards ? bankerScore : '-'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center mb-6">
                                            <div className="bg-black bg-opacity-50 rounded-xl p-4 inline-block">
                                                <div className="text-yellow-400 font-bold">Your Test Bet</div>
                                                <div className="text-white text-xl">{myBet.amount} Test ETH on {myBet.side}</div>
                                            </div>
                                        </div>

                                        {result && gameState === 'result' && (
                                            <div className="text-center mb-6">
                                                <div className="text-4xl font-bold text-yellow-400 mb-4">
                                                    🎉 {result} WINS! 🎉
                                                </div>
                                                <div className="text-xl text-white mb-4">
                                                    Player: {playerScore} | Banker: {bankerScore}
                                                </div>

                                                {((myBet.side === result) || (result === 'Tie' && myBet.side !== '')) && (
                                                    <div className="bg-green-600 rounded-xl p-4 mb-4">
                                                        <div className="text-2xl font-bold text-white">🎊 YOU WON! 🎊</div>
                                                        <div className="text-yellow-400">
                                                            Test winnings calculated (fees deducted in real version)
                                                        </div>
                                                    </div>
                                                )}

                                                <button
                                                    onClick={newGame}
                                                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg text-xl"
                                                >
                                                    🎮 Play Again
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <TestnetBaccarat />
        </div>
    );
}

export default App;