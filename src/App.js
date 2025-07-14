<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-gray-800 rounded-xl p-6 border border-yellow-400/30">
                    <div className="text-3xl mb-3">🎯</div>
                    <h3 className="text-yellow-400 font-bold mb-2">Professional</h3>
                    <p className="text-gray-300 text-sm">Authentic Baccarat Experience</p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-6 border border-yellow-400/30">
                    <div className="text-3xl mb-3">🔒</div>
                    <h3 className="text-yellow-400 font-bold mb-2">100% Safe</h3>
                    <p className="text-gray-300 text-sm">Testnet Environment Only</p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-6 border border-yellow-400/30">
                    <div className="text-3xl mb-3">💎</div>
                    <h3 className="text-yellow-400 font-bold mb-2">Luxury</h3>
                    <p className="text-gray-300 text-sm">Premium Casino Atmosphere</p>
                  </div>
                </div>
                
                <button
                  onClick={connectWallet}
                  className="group relative inline-flex items-center justify-center px-10 py-5 text-2xl font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center space-x-3">
                    <span>🦊</span>
                    <span>Connect MetaMask</span>
                    <span className="text-lg">✨</span>
                  </span>
                </button>
                
                <p className="text-gray-400 mt-6 text-lg">
                  Don't have MetaMask? <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline font-semibold">Install here</a>
                </p>
              </div >
            </div >
          </div >
        ) : (
    <>
        {/* Wallet Info with Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
            {/* Wallet Info */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-400 rounded-2xl p-6 shadow-xl">
                <div className="text-center">
                    <div className="text-yellow-400 font-bold text-lg mb-2">🏦 Connected Wallet</div>
                    <div className="text-gray-300 mb-2 font-mono">
                        {account.slice(0, 6)}...{account.slice(-4)}
                    </div>
                    <div className="text-2xl text-white mb-2 font-bold">{balance} ETH</div>
                    <div className="text-yellow-300 text-sm mb-4">{network}</div>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={async () => {
                                setSoundEnabled(!soundEnabled);
                                if (!soundEnabled) {
                                    await initializeAudio();
                                    // Play test sound when enabling
                                    setTimeout(() => playSound(800, 0.2), 100);
                                }
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${soundEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
                                }`}
                        >
                            {soundEnabled ? '🔊 ON' : '🔇 OFF'}
                            {audioInitialized && soundEnabled && <span className="ml-1">✓</span>}
                        </button>
                        <button
                            onClick={disconnectWallet}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition-colors"
                        >
                            Disconnect
                        </button>
                    </div>
                </div>
            </div>

            {/* Live Statistics */}
            <div className="bg-gradient-to-r from-purple-800 to-purple-900 border border-purple-400 rounded-2xl p-6 shadow-xl">
                <div className="text-center">
                    <div className="text-purple-200 font-bold text-lg mb-4">📊 Your Statistics</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <div className="text-purple-100">Games Played</div>
                            <div className="text-2xl font-bold text-purple-200">{gameStats.totalGames}</div>
                        </div>
                        <div>
                            <div className="text-purple-100">Win Rate</div>
                            <div className="text-2xl font-bold text-green-400">
                                {gameStats.totalGames > 0 ? Math.round((gameStats.wins / gameStats.totalGames) * 100) : 0}%
                            </div>
                        </div>
                        <div>
                            <div className="text-purple-100">Win Streak</div>
                            <div className="text-xl font-bold text-yellow-400">{gameStats.winStreak}</div>
                        </div>
                        <div>
                            <div className="text-purple-100">Total Wagered</div>
                            <div className="text-xl font-bold text-blue-400">{gameStats.totalWagered.toFixed(3)} ETH</div>
                        </div>
                    </div>

                    {/* Win Distribution */}
                    <div className="mt-4 text-xs">
                        <div className="text-purple-100 mb-2">Favorite Bets</div>
                        <div className="flex justify-around">
                            <div className="text-center">
                                <div className="text-blue-400">👤 {gameStats.playerWins}</div>
                                <div className="text-purple-200">Player</div>
                            </div>
                            <div className="text-center">
                                <div className="text-red-400">🏦 {gameStats.bankerWins}</div>
                                <div className="text-purple-200">Banker</div>
                            </div>
                            <div className="text-center">
                                <div className="text-purple-400">🤝 {gameStats.tieWins}</div>
                                <div className="text-purple-200">Tie</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Network Status */}
        {isTestnet ? (
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 border border-orange-400 rounded-2xl p-6 mb-8 max-w-3xl mx-auto shadow-xl">
                <div className="text-center">
                    <div className="text-3xl mb-3">⚠️ TESTNET MODE ⚠️</div>
                    <div className="text-white font-bold text-lg mb-2">You're using TEST ETH - No real money!</div>
                    <div className="text-orange-100">
                        Perfect for testing. Get free test ETH from faucets to continue playing.
                    </div>
                </div>
            </div>
        ) : (
            <div className="bg-gradient-to-r from-red-600 to-red-700 border border-red-400 rounded-2xl p-6 mb-8 max-w-3xl mx-auto shadow-xl">
                <div className="text-center">
                    <div className="text-3xl mb-3">🚨 MAINNET DETECTED 🚨</div>
                    <div className="text-white font-bold text-lg mb-4">You're connected to mainnet with REAL ETH!</div>
                    <button
                        onClick={switchToTestnet}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                    >
                        Switch to Sepolia Testnet
                    </button>
                </div>
            </div>
        )}

        {/* Game Content */}
        {isTestnet && (
            <>
                {/* Faucet Info */}
                <div className="bg-gradient-to-r from-blue-800 to-blue-900 border border-blue-400 rounded-2xl p-6 mb-8 max-w-3xl mx-auto shadow-xl">
                    <div className="text-center">
                        <div className="text-blue-200 font-bold text-lg mb-2">💰 Need More Test ETH?</div>
                        <div className="text-blue-100 mb-4">
                            Get free test ETH from faucets to continue your royal gaming experience
                        </div>
                        <a
                            href={TESTNETS[window.ethereum?.chainId]?.faucet}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                        >
                            🚰 Get Test ETH
                        </a>
                    </div>
                </div>

                {/* Fee Structure */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-400 rounded-2xl p-6 mb-8 max-w-3xl mx-auto shadow-xl">
                    <h3 className="text-yellow-400 font-bold text-xl mb-4 text-center">💰 Royal Fee Structure</h3>
                    <div className="grid grid-cols-2 gap-6 text-center">
                        <div>
                            <div className="text-white font-bold text-lg">Entry Fee</div>
                            <div className="text-yellow-400 text-xl">{TESTNET_ENTRY_FEE} ETH</div>
                            <div className="text-gray-400 text-sm">per game</div>
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg">Win Fee</div>
                            <div className="text-yellow-400 text-xl">{WIN_FEE_PERCENT}%</div>
                            <div className="text-gray-400 text-sm">of winnings</div>
                        </div>
                    </div>
                    <div className="text-center text-gray-400 text-sm mt-4">
                        ⚡ Reduced rates for testing purposes
                    </div>
                </div>

                {/* Game States */}
                {gameState === 'lobby' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-yellow-400 rounded-3xl p-8 shadow-2xl">
                            <h3 className="text-yellow-400 font-bold text-2xl mb-6 text-center">🎮 Create Royal Game Room</h3>

                            <div className="flex flex-col items-center space-y-6">
                                <div className="text-center">
                                    <label className="block text-white font-semibold text-lg mb-3">Bet Amount (Test ETH)</label>
                                    <input
                                        type="number"
                                        step="0.001"
                                        min="0.001"
                                        value={newRoomBet}
                                        onChange={(e) => setNewRoomBet(e.target.value)}
                                        className="bg-gray-700 border border-yellow-400 text-white text-center px-4 py-3 rounded-xl w-40 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        placeholder="0.01"
                                    />
                                </div>

                                <button
                                    onClick={createRoom}
                                    className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                                >
                                    <span className="flex items-center">
                                        🎲 Start Royal Game
                                    </span>
                                </button>

                                <div className="text-center text-gray-400">
                                    <div className="text-lg">Total cost: <span className="text-yellow-400 font-bold">{(parseFloat(newRoomBet) + TESTNET_ENTRY_FEE).toFixed(3)} Test ETH</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {gameState === 'waiting' && currentRoom && (
                    <div className="max-w-4xl mx-auto relative">
                        {/* Animated Chips */}
                        {chipAnimation && (
                            <>
                                <AnimatedChip value="10" color="bg-red-500" position={{ x: '20%', y: '50%' }} delay={0} />
                                <AnimatedChip value="25" color="bg-green-500" position={{ x: '40%', y: '40%' }} delay={200} />
                                <AnimatedChip value="50" color="bg-blue-500" position={{ x: '60%', y: '60%' }} delay={400} />
                            </>
                        )}

                        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-yellow-400 rounded-3xl p-8 shadow-2xl">
                            <h3 className="text-yellow-400 font-bold text-2xl mb-6 text-center">🎯 Place Your Royal Bet</h3>

                            <div className="text-center mb-8">
                                <div className="text-white text-lg mb-2">Bet Amount: <span className="text-yellow-400 font-bold">{currentRoom.betAmount} Test ETH</span></div>
                                <div className="text-gray-300 text-lg">Choose your side wisely:</div>
                            </div>

                            <div className="grid grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
                                <button
                                    onClick={() => placeBet('Player')}
                                    className={`group relative py-6 px-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${myBet.side === 'Player'
                                            ? 'bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-lg animate-pulse'
                                            : 'bg-gradient-to-b from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">👤</div>
                                    <div>PLAYER</div>
                                    <div className="text-sm opacity-80">Pays 1:1</div>
                                    {myBet.side === 'Player' && <div className="absolute inset-0 bg-white opacity-20 rounded-2xl animate-pulse"></div>}
                                </button>

                                <button
                                    onClick={() => placeBet('Tie')}
                                    className={`group relative py-6 px-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${myBet.side === 'Tie'
                                            ? 'bg-gradient-to-b from-purple-500 to-purple-700 text-white shadow-lg animate-pulse'
                                            : 'bg-gradient-to-b from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">🤝</div>
                                    <div>TIE</div>
                                    <div className="text-sm opacity-80">Pays 8:1</div>
                                    {myBet.side === 'Tie' && <div className="absolute inset-0 bg-white opacity-20 rounded-2xl animate-pulse"></div>}
                                </button>

                                <button
                                    onClick={() => placeBet('Banker')}
                                    className={`group relative py-6 px-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${myBet.side === 'Banker'
                                            ? 'bg-gradient-to-b from-red-500 to-red-700 text-white shadow-lg animate-pulse'
                                            : 'bg-gradient-to-b from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">🏦</div>
                                    <div>BANKER</div>
                                    <div className="text-sm opacity-80">Pays 0.95:1</div>
                                    {myBet.side === 'Banker' && <div className="absolute inset-0 bg-white opacity-20 rounded-2xl animate-pulse"></div>}
                                </button>
                            </div>

                            {myBet.side && (
                                <div className="text-center mb-6">
                                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-bold py-3 px-6 rounded-xl inline-block animate-bounce">
                                        You bet {myBet.amount} Test ETH on {myBet.side}
                                    </div>
                                    <div className="text-white text-sm mt-2 animate-pulse">⚡ Game starting in 1 second...</div>
                                </div>
                            )}

                            <div className="text-center">
                                <button
                                    onClick={newGame}
                                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                                >
                                    ← Back to Lobby
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Game Playing and Result */}
                {(gameState === 'playing' || gameState === 'result') && (
                    <div className="max-w-6xl mx-auto">
                        {/* Casino Table */}
                        <div className="relative bg-gradient-to-br from-green-800 via-green-900 to-green-800 rounded-3xl border-8 border-yellow-400 p-8 shadow-2xl overflow-hidden">
                            {/* Table Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-4 border-4 border-dashed border-yellow-400 rounded-2xl"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-yellow-400 animate-spin-slow">♠♥♣♦</div>
                            </div>

                            <div className="relative z-10">
                                {/* Table Header */}
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-yellow-400 mb-2 animate-pulse">🎰 ROYAL BACCARAT TABLE 🎰</h2>
                                    <div className="text-lg text-yellow-300">High Stakes - High Rewards</div>
                                </div>

                                {/* Cards Area */}
                                <div className="flex justify-around items-center mb-12">
                                    {/* Player Side */}
                                    <div className="text-center bg-blue-900/30 rounded-2xl p-6 border-2 border-blue-400 transform transition-all duration-500 hover:scale-105">
                                        <div className="text-2xl font-bold text-blue-300 mb-4 flex items-center justify-center animate-bounce">
                                            👤 PLAYER
                                        </div>
                                        <div className="flex gap-3 justify-center mb-6 min-h-[112px] items-center">
                                            {playerCards.length > 0 ? (
                                                playerCards.map((card, index) => (
                                                    <Card key={index} card={card} hidden={!showCards} isDealing={!showCards} />
                                                ))
                                            ) : (
                                                <div className="flex gap-3">
                                                    <Card hidden={true} />
                                                    <Card hidden={true} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="bg-blue-600 text-white rounded-xl py-3 px-6 text-3xl font-bold min-w-[80px] mx-auto transform transition-all duration-300 hover:scale-110">
                                            {showCards ? playerScore : '?'}
                                        </div>
                                    </div>

                                    {/* VS Divider */}
                                    <div className="text-center">
                                        <div className="text-6xl font-bold text-yellow-400 mb-4 animate-pulse">VS</div>
                                        <div className="text-yellow-300 text-lg animate-bounce">May the best hand win!</div>
                                    </div>

                                    {/* Banker Side */}
                                    <div className="text-center bg-red-900/30 rounded-2xl p-6 border-2 border-red-400 transform transition-all duration-500 hover:scale-105">
                                        <div className="text-2xl font-bold text-red-300 mb-4 flex items-center justify-center animate-bounce">
                                            🏦 BANKER
                                        </div>
                                        <div className="flex gap-3 justify-center mb-6 min-h-[112px] items-center">
                                            {bankerCards.length > 0 ? (
                                                bankerCards.map((card, index) => (
                                                    <Card key={index} card={card} hidden={!showCards} isDealing={!showCards} />
                                                ))
                                            ) : (
                                                <div className="flex gap-3">
                                                    <Card hidden={true} />
                                                    <Card hidden={true} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="bg-red-600 text-white rounded-xl py-3 px-6 text-3xl font-bold min-w-[80px] mx-auto transform transition-all duration-300 hover:scale-110">
                                            {showCards ? bankerScore : '?'}
                                        </div>
                                    </div>
                                </div>

                                {/* Your Bet Display */}
                                <div className="text-center mb-8">
                                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-yellow-400 rounded-2xl p-6 inline-block animate-pulse">
                                        <div className="text-yellow-400 font-bold text-lg mb-2">💰 Your Royal Bet</div>
                                        <div className="text-white text-2xl font-bold">{myBet.amount} Test ETH on {myBet.side}</div>
                                        <div className="text-gray-300 text-sm mt-1">Potential winnings calculated after fees</div>
                                    </div>
                                </div>

                                {/* Game Status */}
                                {gameState === 'playing' && !result && (
                                    <div className="text-center">
                                        <div className="text-2xl text-yellow-400 font-bold animate-pulse">
                                            🎲 Cards are being dealt... 🎲
                                        </div>
                                        <div className="text-gray-300 mt-2 animate-bounce">The fate of your bet is being decided!</div>
                                    </div>
                                )}

                                {/* Result Display */}
                                {result && gameState === 'result' && (
                                    <div className="text-center">
                                        <div className="mb-6">
                                            <div className="text-5xl font-bold text-yellow-400 mb-4 animate-bounce">
                                                🎉 {result} WINS! 🎉
                                            </div>
                                            <div className="text-2xl text-white mb-4">
                                                Player: {playerScore} | Banker: {bankerScore}
                                            </div>
                                        </div>

                                        {/* Win/Loss Notification - FIXED LOGIC */}
                                        {(() => {
                                            // Same win logic as sound logic
                                            let isWin = false;
                                            if (myBet.side === 'Player' && result === 'Player') isWin = true;
                                            else if (myBet.side === 'Banker' && result === 'Banker') isWin = true;
                                            else if (myBet.side === 'Tie' && result === 'Tie') isWin = true;

                                            return isWin ? (
                                                <div className="bg-gradient-to-r from-green-600 to-green-700 border-2 border-green-400 rounded-2xl p-6 mb-6 shadow-xl animate-pulse">
                                                    <div className="text-3xl font-bold text-white mb-2">🎊 CONGRATULATIONS! 🎊</div>
                                                    <div className="text-green-100 text-lg mb-2">You won this round!</div>
                                                    <div className="text-yellow-300 font-semibold animate-bounce">
                                                        Test winnings calculated (5% platform fee applies in real version)
                                                    </div>

                                                    {/* Streak Display */}
                                                    {gameStats.currentStreak > 1 && (
                                                        <div className="mt-4 text-yellow-200">
                                                            🔥 Win Streak: {gameStats.currentStreak} 🔥
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="bg-gradient-to-r from-red-600 to-red-700 border-2 border-red-400 rounded-2xl p-6 mb-6 shadow-xl animate-pulse">
                                                    <div className="text-3xl font-bold text-white mb-2">💔 DISAPPOINTING LOSS! 💔</div>
                                                    <div className="text-red-100 text-lg mb-2">
                                                        {result === 'Tie' && myBet.side !== 'Tie'
                                                            ? "Unexpected tie broke your winning chances!"
                                                            : "The house wins this round!"}
                                                    </div>
                                                    <div className="text-red-200">
                                                        Better luck next time - the cards weren't in your favor! 😞
                                                    </div>

                                                    {/* Losing streak warning */}
                                                    {gameStats.currentStreak === 0 && gameStats.totalGames > 2 && (
                                                        <div className="mt-4 text-red-300 text-sm">
                                                            💡 Tip: Try switching your betting strategy!
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })()}

                                        {/* Action Buttons */}
                                        <div className="flex gap-4 justify-center">
                                            <button
                                                onClick={newGame}
                                                className="group bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black font-bold py-4 px-8 rounded-xl text-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                                            >
                                                <span className="flex items-center">
                                                    🎮 Play Another Round
                                                </span>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setGameState('waiting');
                                                    setResult('');
                                                    setPlayerCards([]);
                                                    setBankerCards([]);
                                                    setPlayerScore(0);
                                                    setBankerScore(0);
                                                    setShowCards(false);
                                                    setMyBet({ side: '', amount: 0 });
                                                }}
                                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                                            >
                                                🎯 New Bet
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Detailed Game Statistics */}
                        <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-400 rounded-2xl p-6">
                            <h4 className="text-yellow-400 font-bold text-lg mb-4 text-center">📊 Detailed Game Statistics</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div className="bg-gray-700 rounded-xl p-4">
                                    <div className="text-3xl mb-2">💰</div>
                                    <div className="text-white font-semibold">Total Wagered</div>
                                    <div className="text-yellow-400 text-lg font-bold">{gameStats.totalWagered.toFixed(3)} ETH</div>
                                </div>
                                <div className="bg-gray-700 rounded-xl p-4">
                                    <div className="text-3xl mb-2">🎲</div>
                                    <div className="text-white font-semibold">Games Played</div>
                                    <div className="text-blue-400 text-xl font-bold">{gameStats.totalGames}</div>
                                </div>
                                <div className="bg-gray-700 rounded-xl p-4">
                                    <div className="text-3xl mb-2">🔥</div>
                                    <div className="text-white font-semibold">Best Streak</div>
                                    <div className="text-red-400 text-xl font-bold">{gameStats.winStreak}</div>
                                </div>
                            </div>

                            {/* Reset Stats Button */}
                            <div className="text-center mt-4">
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to reset all statistics?')) {
                                            setGameStats({
                                                totalGames: 0,
                                                wins: 0,
                                                losses: 0,
                                                totalWagered: 0,
                                                biggestWin: 0,
                                                winStreak: 0,
                                                currentStreak: 0,
                                                playerWins: 0,
                                                bankerWins: 0,
                                                tieWins: 0
                                            });
                                        }
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                                >
                                    🗑️ Reset Statistics
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )}
    </>
)}
      </div >

    {/* Footer */ }
    < div className = "relative z-10 text-center py-8 mt-12" >
        <div className="text-gray-400 text-sm">
            <div className="mb-2">🔒 Secure • 🧪 Testnet Only • 🌟 Premium Experience</div>
            <div>Built with ❤️ for the crypto community</div>
        </div>
      </div >

    {/* Custom CSS for additional animations */ }
    < style jsx > {`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style >
    </div >
  );
};

export default LuxuryCasinoBaccarat; rounded - xl p - 4">
    < div className = "text-3xl mb-2" >🏆</div >
                          <div className="text-white font-semibold">Win Rate</div>
                          <div className="text-green-400 text-xl font-bold">
                            {gameStats.totalGames > 0 ? Math.round((gameStats.wins / gameStats.totalGames) * 100) : 0}%
                          </div>
                        </div >
    <div className="bg-gray-700import React, { useState, useEffect } from 'react';

const LuxuryCasinoBaccarat = () => {
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

  // Animation States
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [chipAnimation, setChipAnimation] = useState(false);
  const [particles, setParticles] = useState([]);

  // Audio Context State
  const [audioContext, setAudioContext] = useState(null);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Statistics
  const [gameStats, setGameStats] = useState(() => {
    const saved = localStorage.getItem('baccaratStats');
    return saved ? JSON.parse(saved) : {
      totalGames: 0,
      wins: 0,
      losses: 0,
      totalWagered: 0,
      biggestWin: 0,
      winStreak: 0,
      currentStreak: 0,
      playerWins: 0,
      bankerWins: 0,
      tieWins: 0
    };
  });

  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('baccaratStats', JSON.stringify(gameStats));
  }, [gameStats]);

  // Testnet Constants
  const TESTNET_ENTRY_FEE = 0.001;
  const WIN_FEE_PERCENT = 5; // Increased from 2% to 5%
  
  // Supported Testnets
  const TESTNETS = {
    '0xaa36a7': { name: 'Sepolia', symbol: 'SepoliaETH', faucet: 'https://sepoliafaucet.com' },
    '0x5': { name: 'Goerli', symbol: 'GoerliETH', faucet: 'https://goerlifaucet.com' },
    '0x13881': { name: 'Mumbai', symbol: 'MATIC', faucet: 'https://faucet.polygon.technology' }
  };

  // Create particles for celebration
  const createParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight,
        vx: (Math.random() - 0.5) * 10,
        vy: -(Math.random() * 15 + 10),
        color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 6)],
        size: Math.random() * 8 + 4,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.01
      });
    }
    setParticles(newParticles);
  };

  // Animate particles
  useEffect(() => {
    if (!showParticles) return;
    
    const interval = setInterval(() => {
      setParticles(prev => {
        const updated = prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.5, // gravity
          life: particle.life - particle.decay
        })).filter(particle => particle.life > 0 && particle.y < window.innerHeight + 100);
        
        if (updated.length === 0) {
          setShowParticles(false);
        }
        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [showParticles]);

  // Initialize audio context on first user interaction
  const initializeAudio = async () => {
    if (!audioInitialized && soundEnabled) {
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        
        // Resume context if suspended (required for autoplay policy)
        if (context.state === 'suspended') {
          await context.resume();
        }
        
        setAudioContext(context);
        setAudioInitialized(true);
        console.log('Audio initialized successfully!');
        
        // Play a test sound to confirm
        playTestSound(context);
      } catch (error) {
        console.error('Failed to initialize audio:', error);
      }
    }
  };

  const playTestSound = (context) => {
    try {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.1, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
      
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.1);
    } catch (error) {
      console.error('Test sound failed:', error);
    }
  };

  // Enhanced Sound Effects
  const playSound = async (frequency, duration, type = 'sine') => {
    if (!soundEnabled) return;
    
    // Initialize audio if not done yet
    if (!audioInitialized) {
      await initializeAudio();
      return;
    }
    
    try {
      const context = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      
      // Resume context if suspended
      if (context.state === 'suspended') {
        await context.resume();
      }
      
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      gainNode.gain.setValueAtTime(0.2, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
      
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration);
      
      console.log(`Playing sound: ${frequency}Hz for ${duration}s`);
    } catch (error) {
      console.error('Sound playback failed:', error);
    }
  };

  const playConnectSound = async () => {
    await initializeAudio();
    setTimeout(() => playSound(800, 0.3), 100);
    setTimeout(() => playSound(1000, 0.2), 400);
  };

  const playCardSound = () => {
    playSound(600, 0.15, 'square');
  };
  
  const playChipSound = () => {
    console.log('🪙 Playing chip sound!');
    // Enhanced chip stacking sound
    playSound(1200, 0.15, 'triangle');
    setTimeout(() => playSound(900, 0.15, 'triangle'), 80);
    setTimeout(() => playSound(1500, 0.15, 'triangle'), 160);
    setTimeout(() => playSound(800, 0.2, 'square'), 240); // Final chip clink
  };

  const playChipDrop = () => {
    console.log('🪙 Playing chip drop sound!');
    // Sound of chips being dropped/bet
    const chipSounds = [1000, 850, 1100, 950, 1200];
    chipSounds.forEach((freq, i) => {
      setTimeout(() => {
        playSound(freq, 0.1, 'triangle');
      }, i * 50);
    });
  };

  const playWinSound = () => {
    console.log('🎵 Playing win sound!');
    const notes = [523, 659, 784, 1047, 1319]; // C-E-G-C-E
    notes.forEach((note, i) => {
      setTimeout(() => {
        console.log(`Playing note ${i + 1}: ${note}Hz`);
        playSound(note, 0.4);
      }, i * 200);
    });
  };

  const playBigWinSound = () => {
    console.log('🎵 Playing BIG WIN sound!');
    // Epic win sound sequence
    const melody = [523, 659, 784, 1047, 1319, 1568, 2093]; // C major scale up
    melody.forEach((note, i) => {
      setTimeout(() => {
        console.log(`Playing big win note ${i + 1}: ${note}Hz`);
        playSound(note, 0.6);
      }, i * 150);
    });
  };

  const playLoseSound = () => {
    console.log('😞 Playing disappointing lose sound!');
    // Very disappointing descending sound sequence
    const sadNotes = [400, 350, 300, 250, 200, 150]; // Descending sad notes
    sadNotes.forEach((note, i) => {
      setTimeout(() => {
        console.log(`Playing sad note ${i + 1}: ${note}Hz`);
        playSound(note, 0.8, 'sawtooth'); // Sawtooth wave sounds more harsh/disappointing
      }, i * 300);
    });
    
    // Add a final "thud" sound
setTimeout(() => {
    console.log('Playing final disappointment thud');
    playSound(80, 1.0, 'square'); // Very low, harsh thud
}, sadNotes.length * 300);
  };

const playTieSound = () => {
    console.log('🤝 Playing tie sound!');
    // Neutral tie sound - neither happy nor sad
    playSound(330, 0.5); // E note
    setTimeout(() => playSound(330, 0.5), 200);
    setTimeout(() => playSound(330, 0.5), 400);
};

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
            params: [{ chainId: '0xaa36a7' }],
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

// Update game statistics
const updateStats = (won, betAmount, winAmount = 0) => {
    setGameStats(prev => {
        const newStats = {
            ...prev,
            totalGames: prev.totalGames + 1,
            totalWagered: prev.totalWagered + betAmount
        };

        if (won) {
            newStats.wins = prev.wins + 1;
            newStats.currentStreak = prev.currentStreak + 1;
            newStats.winStreak = Math.max(prev.winStreak, newStats.currentStreak);
            if (winAmount > prev.biggestWin) {
                newStats.biggestWin = winAmount;
            }

            // Track win types
            if (myBet.side === 'Player') newStats.playerWins = prev.playerWins + 1;
            else if (myBet.side === 'Banker') newStats.bankerWins = prev.bankerWins + 1;
            else if (myBet.side === 'Tie') newStats.tieWins = prev.tieWins + 1;
        } else {
            newStats.losses = prev.losses + 1;
            newStats.currentStreak = 0;
        }

        return newStats;
    });
};

// Game functions
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

    // Play chip sound when creating room (entering the game)
    playChipSound();
};

const placeBet = async (side) => {
    if (!currentRoom) return;

    // Initialize audio on first user interaction
    await initializeAudio();

    // Play enhanced chip sound immediately when betting
    playChipDrop();

    // Chip animation
    setChipAnimation(true);
    setTimeout(() => setChipAnimation(false), 1000);

    setMyBet({ side, amount: currentRoom.betAmount });

    // Additional chip sound after animation starts
    setTimeout(() => playChipSound(), 300);

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

    // Card dealing animation with sounds
    setTimeout(() => {
        playCardSound();
        setShowCards(true);
        setTimeout(() => {
            playCardSound();
            const playerScore = calculateScore(newPlayerCards);
            const bankerScore = calculateScore(newBankerCards);
            setPlayerScore(playerScore);
            setBankerScore(bankerScore);

            const winner = playerScore > bankerScore ? 'Player' : bankerScore > playerScore ? 'Banker' : 'Tie';
            setResult(winner);

            // Check if user won - FIXED LOGIC
            let userWon = false;

            // Clear win conditions
            if (myBet.side === 'Player' && winner === 'Player') {
                userWon = true;
            } else if (myBet.side === 'Banker' && winner === 'Banker') {
                userWon = true;
            } else if (myBet.side === 'Tie' && winner === 'Tie') {
                userWon = true;
            }

            let winAmount = 0;

            console.log(`🎲 Game Result: ${winner} wins!`);
            console.log(`👤 Your bet: ${myBet.side}`);
            console.log(`🏆 Did you win? ${userWon}`);

            if (userWon) {
                if (myBet.side === 'Player') winAmount = myBet.amount * 2;
                else if (myBet.side === 'Banker') winAmount = myBet.amount * 1.95;
                else if (myBet.side === 'Tie') winAmount = myBet.amount * 9;

                console.log(`💰 Win amount: ${winAmount} ETH`);
                console.log('🎉 PLAYING WIN SOUND!');

                // Big win detection
                if (winAmount >= myBet.amount * 5) {
                    console.log('🎉 BIG WIN detected!');
                    playBigWinSound();
                    setShowWinAnimation(true);
                    setShowParticles(true);
                    createParticles();
                    setTimeout(() => setShowWinAnimation(false), 3000);
                } else {
                    console.log('🎉 Regular WIN detected!');
                    playWinSound();
                    setShowWinAnimation(true);
                    setTimeout(() => setShowWinAnimation(false), 2000);
                }
            } else {
                console.log('💔 LOSS detected - PLAYING LOSE SOUND!');
                // User lost - play disappointing sound
                if (winner === 'Tie' && myBet.side !== 'Tie') {
                    console.log('🤝 Unexpected tie - playing neutral sound');
                    playTieSound(); // Neutral sound for unexpected tie
                } else {
                    console.log('😞 Clear loss - playing disappointing sound');
                    playLoseSound(); // Very disappointing sound for clear loss
                }
            }

            // Update statistics
            updateStats(userWon, myBet.amount, winAmount);

            setTimeout(() => {
                setGameState('result');
            }, 1000);
        }, 800);
    }, 1000);
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
    setShowWinAnimation(false);
    setShowParticles(false);
    setParticles([]);
};

// Enhanced Card Component with realistic design
const Card = ({ card, hidden = false, isDealing = false }) => {
    const suitColor = card && (card.suit === '♥' || card.suit === '♦') ? 'text-red-500' : 'text-gray-800';

    return (
        <div className={`relative w-20 h-28 transition-all duration-700 transform ${hidden ? 'scale-0 rotate-180' : 'scale-100 rotate-0'} ${isDealing ? 'animate-pulse' : ''}`}>
            {/* Card Shadow */}
            <div className="absolute inset-0 bg-gray-900 rounded-xl transform translate-x-1 translate-y-1"></div>

            {/* Main Card */}
            <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-300 shadow-xl overflow-hidden">
                {!hidden && card ? (
                    <div className="w-full h-full p-1.5 flex flex-col justify-between">
                        {/* Top Left */}
                        <div className={`text-xs font-bold ${suitColor} leading-tight`}>
                            <div className="text-sm">{card.rank}</div>
                            <div className="text-sm -mt-1">{card.suit}</div>
                        </div>

                        {/* Center */}
                        <div className={`text-2xl ${suitColor} text-center flex-1 flex items-center justify-center`}>
                            {card.suit}
                        </div>

                        {/* Bottom Right (rotated) */}
                        <div className={`text-xs font-bold ${suitColor} leading-tight text-right transform rotate-180 self-end`}>
                            <div className="text-sm">{card.rank}</div>
                            <div className="text-sm -mt-1">{card.suit}</div>
                        </div>
                    </div>
                ) : (
                    /* Card Back Design */
                    <div className="w-full h-full bg-gradient-to-br from-blue-800 via-blue-900 to-purple-900 rounded-lg flex items-center justify-center">
                        <div className="text-yellow-400 text-lg font-bold">♠♥♣♦</div>
                    </div>
                )}
            </div>

            {/* Card Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20 rounded-xl pointer-events-none"></div>
        </div>
    );
};

// Animated Chip Component
const AnimatedChip = ({ value, color, position, delay = 0 }) => (
    <div
        className={`absolute w-12 h-12 rounded-full ${color} border-4 border-white shadow-lg transform transition-all duration-1000 ${chipAnimation ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}
        style={{
            left: position.x,
            top: position.y,
            transitionDelay: `${delay}ms`,
            zIndex: 50
        }}
    >
        <div className="w-full h-full rounded-full bg-gradient-to-b from-white to-gray-200 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-800">${value}</span>
        </div>
    </div>
);

// Particle Component
const Particle = ({ particle }) => (
    <div
        className="absolute w-2 h-2 rounded-full pointer-events-none"
        style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            opacity: particle.life,
            transform: `scale(${particle.life})`,
            zIndex: 100
        }}
    />
);

// Win Animation Component
const WinAnimation = () => (
    <div className={`fixed inset-0 pointer-events-none z-50 flex items-center justify-center transition-all duration-1000 ${showWinAnimation ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center">
            <div className="text-8xl font-bold text-yellow-400 animate-bounce mb-4 drop-shadow-lg">
                🎉 WIN! 🎉
            </div>
            <div className="text-4xl font-bold text-white animate-pulse">
                CONGRATULATIONS!
            </div>
        </div>

        {/* Shooting stars */}
        <div className="absolute top-10 left-10 text-6xl animate-ping">⭐</div>
        <div className="absolute top-20 right-10 text-4xl animate-ping animation-delay-200">✨</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-ping animation-delay-400">💫</div>
        <div className="absolute bottom-10 right-20 text-6xl animate-ping animation-delay-600">🌟</div>
    </div>
);

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white relative overflow-hidden">
        {/* Particles */}
        {showParticles && particles.map(particle => (
            <Particle key={particle.id} particle={particle} />
        ))}

        {/* Win Animation Overlay */}
        <WinAnimation />

        {/* Casino Background Pattern */}
        <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
        </div>

        {/* Header */}
        <div className="relative z-10 text-center py-8">
            <div className="relative inline-block">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                    💎 ROYAL BACCARAT 💎
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg blur opacity-30"></div>
            </div>
            <div className="text-xl text-yellow-300 mt-2 font-semibold tracking-wide">
                ✨ EXCLUSIVE TESTNET CASINO ✨
            </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-4">
            {!isConnected ? (
                /* Clean Welcome Screen */
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-yellow-400 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"></div>

                        <div className="relative z-10 text-center">
                            <div className="text-6xl mb-6 animate-bounce">🎰</div>
                            <h2 className="text-5xl font-bold text-yellow-400 mb-6 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                Welcome to Royal Baccarat
                            </h2>
                            <p className="text-gray-300 mb-8 text-xl leading-relaxed max-w-2xl mx-auto">
                                Experience the ultimate luxury casino with zero risk.<br />
                                <span className="text-green-400 font-semibold">Test ETH only - No real money involved!</span>
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <div className="bg-gray-800 rounded-xl p-6 border border-