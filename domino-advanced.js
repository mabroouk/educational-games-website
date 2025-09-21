// === محرك الدومينو المتقدم ===

class DominoEngine {
    constructor() {
        this.reset();
        this.gameMode = 'computer'; // computer أو friend
        this.difficulty = 'medium'; // easy, medium, hard, expert
        this.gameStatus = 'playing'; // playing, finished
        this.soundEnabled = true;
    }

    reset() {
        this.tiles = this.createTiles();
        this.shuffleTiles();
        this.playerHand = [];
        this.computerHand = [];
        this.board = [];
        this.currentPlayer = 'player'; // player أو computer
        this.gameStatus = 'playing';
        this.winner = null;
        this.scores = { player: 0, computer: 0 };
        this.gameHistory = [];
        
        this.dealTiles();
        this.findStartingPlayer();
    }

    createTiles() {
        const tiles = [];
        for (let i = 0; i <= 6; i++) {
            for (let j = i; j <= 6; j++) {
                tiles.push({
                    left: i,
                    right: j,
                    id: `${i}-${j}`,
                    isDouble: i === j
                });
            }
        }
        return tiles;
    }

    shuffleTiles() {
        for (let i = this.tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
        }
    }

    dealTiles() {
        // كل لاعب يأخذ 7 قطع
        for (let i = 0; i < 7; i++) {
            this.playerHand.push(this.tiles.pop());
            this.computerHand.push(this.tiles.pop());
        }
    }

    findStartingPlayer() {
        // البحث عن أعلى دبل
        let highestDouble = -1;
        let startingPlayer = null;
        
        // فحص يد اللاعب
        for (const tile of this.playerHand) {
            if (tile.isDouble && tile.left > highestDouble) {
                highestDouble = tile.left;
                startingPlayer = 'player';
            }
        }
        
        // فحص يد الكمبيوتر
        for (const tile of this.computerHand) {
            if (tile.isDouble && tile.left > highestDouble) {
                highestDouble = tile.left;
                startingPlayer = 'computer';
            }
        }
        
        // إذا لم يوجد دبل، ابحث عن أعلى قطعة
        if (startingPlayer === null) {
            let highestSum = -1;
            
            for (const tile of this.playerHand) {
                const sum = tile.left + tile.right;
                if (sum > highestSum) {
                    highestSum = sum;
                    startingPlayer = 'player';
                }
            }
            
            for (const tile of this.computerHand) {
                const sum = tile.left + tile.right;
                if (sum > highestSum) {
                    highestSum = sum;
                    startingPlayer = 'computer';
                }
            }
        }
        
        this.currentPlayer = startingPlayer || 'player';
    }

    canPlayTile(tile, position = null) {
        if (this.board.length === 0) {
            return true; // أول قطعة
        }
        
        const leftEnd = this.board[0].left;
        const rightEnd = this.board[this.board.length - 1].right;
        
        if (position === 'left') {
            return tile.left === leftEnd || tile.right === leftEnd;
        } else if (position === 'right') {
            return tile.left === rightEnd || tile.right === rightEnd;
        } else {
            // فحص كلا الطرفين
            return tile.left === leftEnd || tile.right === leftEnd ||
                   tile.left === rightEnd || tile.right === rightEnd;
        }
    }

    getValidMoves(hand) {
        const validMoves = [];
        
        for (let i = 0; i < hand.length; i++) {
            const tile = hand[i];
            
            if (this.board.length === 0) {
                validMoves.push({
                    tileIndex: i,
                    tile: tile,
                    position: 'start',
                    needsFlip: false
                });
            } else {
                const leftEnd = this.board[0].left;
                const rightEnd = this.board[this.board.length - 1].right;
                
                // فحص الطرف الأيسر
                if (tile.right === leftEnd) {
                    validMoves.push({
                        tileIndex: i,
                        tile: tile,
                        position: 'left',
                        needsFlip: false
                    });
                } else if (tile.left === leftEnd) {
                    validMoves.push({
                        tileIndex: i,
                        tile: tile,
                        position: 'left',
                        needsFlip: true
                    });
                }
                
                // فحص الطرف الأيمن
                if (tile.left === rightEnd) {
                    validMoves.push({
                        tileIndex: i,
                        tile: tile,
                        position: 'right',
                        needsFlip: false
                    });
                } else if (tile.right === rightEnd) {
                    validMoves.push({
                        tileIndex: i,
                        tile: tile,
                        position: 'right',
                        needsFlip: true
                    });
                }
            }
        }
        
        return validMoves;
    }

    playTile(tileIndex, position, player = 'player') {
        const hand = player === 'player' ? this.playerHand : this.computerHand;
        const tile = hand[tileIndex];
        
        if (!this.canPlayTile(tile, position)) {
            return false;
        }
        
        // إزالة القطعة من اليد
        hand.splice(tileIndex, 1);
        
        // إضافة القطعة للوحة
        let placedTile = { ...tile };
        
        if (this.board.length === 0) {
            // أول قطعة
            this.board.push(placedTile);
        } else {
            const leftEnd = this.board[0].left;
            const rightEnd = this.board[this.board.length - 1].right;
            
            if (position === 'left') {
                if (tile.right === leftEnd) {
                    this.board.unshift(placedTile);
                } else if (tile.left === leftEnd) {
                    placedTile = { left: tile.right, right: tile.left, id: tile.id, isDouble: tile.isDouble };
                    this.board.unshift(placedTile);
                }
            } else if (position === 'right') {
                if (tile.left === rightEnd) {
                    this.board.push(placedTile);
                } else if (tile.right === rightEnd) {
                    placedTile = { left: tile.right, right: tile.left, id: tile.id, isDouble: tile.isDouble };
                    this.board.push(placedTile);
                }
            }
        }
        
        // تسجيل الحركة
        this.gameHistory.push({
            player: player,
            tile: tile,
            position: position,
            boardState: [...this.board]
        });
        
        // فحص انتهاء اللعبة
        this.checkGameEnd();
        
        // تبديل الدور
        if (this.gameStatus === 'playing') {
            this.currentPlayer = this.currentPlayer === 'player' ? 'computer' : 'player';
        }
        
        return true;
    }

    drawTile(player = 'player') {
        if (this.tiles.length === 0) {
            return false;
        }
        
        const hand = player === 'player' ? this.playerHand : this.computerHand;
        hand.push(this.tiles.pop());
        return true;
    }

    checkGameEnd() {
        // فحص إذا انتهت قطع أحد اللاعبين
        if (this.playerHand.length === 0) {
            this.gameStatus = 'finished';
            this.winner = 'player';
            this.calculateScores();
            return;
        }
        
        if (this.computerHand.length === 0) {
            this.gameStatus = 'finished';
            this.winner = 'computer';
            this.calculateScores();
            return;
        }
        
        // فحص الحصار (لا يمكن لأي لاعب اللعب)
        const playerMoves = this.getValidMoves(this.playerHand);
        const computerMoves = this.getValidMoves(this.computerHand);
        
        if (playerMoves.length === 0 && computerMoves.length === 0 && this.tiles.length === 0) {
            this.gameStatus = 'finished';
            this.winner = this.getWinnerByPoints();
            this.calculateScores();
        }
    }

    getWinnerByPoints() {
        const playerPoints = this.playerHand.reduce((sum, tile) => sum + tile.left + tile.right, 0);
        const computerPoints = this.computerHand.reduce((sum, tile) => sum + tile.left + tile.right, 0);
        
        if (playerPoints < computerPoints) {
            return 'player';
        } else if (computerPoints < playerPoints) {
            return 'computer';
        } else {
            return 'tie';
        }
    }

    calculateScores() {
        const playerPoints = this.playerHand.reduce((sum, tile) => sum + tile.left + tile.right, 0);
        const computerPoints = this.computerHand.reduce((sum, tile) => sum + tile.left + tile.right, 0);
        
        if (this.winner === 'player') {
            this.scores.player += computerPoints;
        } else if (this.winner === 'computer') {
            this.scores.computer += playerPoints;
        }
    }

    // ذكاء اصطناعي متقدم
    async makeAIMove() {
        if (this.currentPlayer !== 'computer' || this.gameStatus !== 'playing') {
            return null;
        }
        
        const validMoves = this.getValidMoves(this.computerHand);
        
        if (validMoves.length === 0) {
            // محاولة سحب قطعة
            if (this.drawTile('computer')) {
                const newMoves = this.getValidMoves(this.computerHand);
                if (newMoves.length > 0) {
                    return this.selectBestMove(newMoves);
                }
            }
            
            // تمرير الدور
            this.currentPlayer = 'player';
            return { action: 'pass' };
        }
        
        return this.selectBestMove(validMoves);
    }

    selectBestMove(validMoves) {
        let bestMove = null;
        let bestScore = -Infinity;
        
        for (const move of validMoves) {
            let score = this.evaluateMove(move);
            
            // تعديل النتيجة حسب مستوى الصعوبة
            switch (this.difficulty) {
                case 'easy':
                    score += Math.random() * 20 - 10; // عشوائية عالية
                    break;
                case 'medium':
                    score += Math.random() * 10 - 5; // عشوائية متوسطة
                    break;
                case 'hard':
                    score += Math.random() * 4 - 2; // عشوائية قليلة
                    break;
                case 'expert':
                    // لا عشوائية - أفضل حركة دائماً
                    break;
            }
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        
        // تنفيذ الحركة
        const success = this.playTile(bestMove.tileIndex, bestMove.position, 'computer');
        
        return success ? {
            action: 'play',
            move: bestMove,
            tile: bestMove.tile,
            position: bestMove.position
        } : null;
    }

    evaluateMove(move) {
        let score = 0;
        const tile = move.tile;
        
        // تفضيل القطع الثقيلة (نقاط أكثر)
        score += (tile.left + tile.right) * 2;
        
        // تفضيل الدبل
        if (tile.isDouble) {
            score += 15;
        }
        
        // تفضيل القطع التي تفتح إمكانيات أكثر
        const leftEnd = this.board.length > 0 ? this.board[0].left : null;
        const rightEnd = this.board.length > 0 ? this.board[this.board.length - 1].right : null;
        
        if (move.position === 'left' || move.position === 'start') {
            const newEnd = move.needsFlip ? tile.left : tile.right;
            score += this.countTilesWithNumber(newEnd, this.computerHand) * 3;
        }
        
        if (move.position === 'right' || move.position === 'start') {
            const newEnd = move.needsFlip ? tile.right : tile.left;
            score += this.countTilesWithNumber(newEnd, this.computerHand) * 3;
        }
        
        // تجنب ترك أرقام نادرة للخصم
        const opponentTileCount = this.countTilesWithNumber(tile.left, this.playerHand) + 
                                 this.countTilesWithNumber(tile.right, this.playerHand);
        score -= opponentTileCount * 2;
        
        // تفضيل إنهاء اللعبة
        if (this.computerHand.length === 1) {
            score += 50;
        }
        
        return score;
    }

    countTilesWithNumber(number, hand) {
        return hand.filter(tile => tile.left === number || tile.right === number).length;
    }

    // وضع اللعب مع صديق
    switchToFriendMode() {
        this.gameMode = 'friend';
        this.currentPlayer = 'player'; // اللاعب الأول دائماً يبدأ
    }

    switchToComputerMode() {
        this.gameMode = 'computer';
    }

    // إحصائيات اللعبة
    getGameStats() {
        return {
            playerTiles: this.playerHand.length,
            computerTiles: this.computerHand.length,
            boardTiles: this.board.length,
            remainingTiles: this.tiles.length,
            currentPlayer: this.currentPlayer,
            gameStatus: this.gameStatus,
            winner: this.winner,
            scores: this.scores,
            movesPlayed: this.gameHistory.length
        };
    }

    // حفظ واستعادة حالة اللعبة
    saveGame() {
        return {
            tiles: this.tiles,
            playerHand: this.playerHand,
            computerHand: this.computerHand,
            board: this.board,
            currentPlayer: this.currentPlayer,
            gameStatus: this.gameStatus,
            winner: this.winner,
            scores: this.scores,
            gameHistory: this.gameHistory,
            gameMode: this.gameMode,
            difficulty: this.difficulty
        };
    }

    loadGame(gameState) {
        Object.assign(this, gameState);
    }
}

// إنشاء مثيل عام لمحرك الدومينو
const dominoEngine = new DominoEngine();
