// === محرك الطاولة الاحترافي ===

class BackgammonEngine {
    constructor() {
        this.board = this.createInitialBoard();
        this.isWhiteTurn = true;
        this.gameMode = 'computer'; // computer, friend
        this.aiLevel = 'medium'; // easy, medium, hard, expert
        this.gameStatus = 'playing'; // playing, finished
        this.dice = [0, 0];
        this.availableMoves = [];
        this.selectedPoint = null;
        this.moveHistory = [];
        this.capturedPieces = { white: 0, black: 0 };
        this.isAiThinking = false;
        this.doubleOffered = false;
        this.gameValue = 1;
        this.canDouble = { white: true, black: true };
    }

    createInitialBoard() {
        // 24 نقطة + نقطتان للقطع المأسورة + نقطتان للقطع المنزلة
        const board = Array(28).fill().map(() => ({ pieces: 0, color: null }));
        
        // الترتيب الابتدائي للطاولة
        board[1] = { pieces: 2, color: 'white' };   // نقطة 1
        board[12] = { pieces: 5, color: 'white' };  // نقطة 12
        board[17] = { pieces: 3, color: 'white' };  // نقطة 17
        board[19] = { pieces: 5, color: 'white' };  // نقطة 19
        
        board[6] = { pieces: 5, color: 'black' };   // نقطة 6
        board[8] = { pieces: 3, color: 'black' };   // نقطة 8
        board[13] = { pieces: 5, color: 'black' };  // نقطة 13
        board[24] = { pieces: 2, color: 'black' };  // نقطة 24
        
        // النقاط الخاصة:
        // 25 = قطع بيضاء مأسورة
        // 26 = قطع سوداء مأسورة  
        // 27 = قطع منزلة (خارج اللوحة)
        
        return board;
    }

    rollDice() {
        this.dice = [
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1
        ];
        
        this.availableMoves = this.dice[0] === this.dice[1] 
            ? [this.dice[0], this.dice[0], this.dice[0], this.dice[0]]  // دبل
            : [...this.dice];
        
        return this.dice;
    }

    getPossibleMoves(point) {
        if (!this.availableMoves.length) return [];
        
        const moves = [];
        const currentColor = this.isWhiteTurn ? 'white' : 'black';
        const pointData = this.board[point];
        
        // التحقق من وجود قطع للاعب الحالي في هذه النقطة
        if (!pointData || pointData.color !== currentColor || pointData.pieces === 0) {
            return [];
        }

        // إذا كان لدى اللاعب قطع مأسورة، يجب إدخالها أولاً
        const capturedPoint = currentColor === 'white' ? 25 : 26;
        if (this.board[capturedPoint].pieces > 0 && point !== capturedPoint) {
            return [];
        }

        for (let diceValue of this.availableMoves) {
            const targetPoint = this.calculateTargetPoint(point, diceValue, currentColor);
            
            if (this.isValidMove(point, targetPoint, currentColor)) {
                moves.push({
                    from: point,
                    to: targetPoint,
                    dice: diceValue,
                    type: this.getMoveType(point, targetPoint, currentColor)
                });
            }
        }

        return moves;
    }

    calculateTargetPoint(fromPoint, diceValue, color) {
        if (color === 'white') {
            // القطع البيضاء تتحرك من 1 إلى 24
            if (fromPoint === 25) { // قطعة مأسورة
                return diceValue;
            }
            const target = fromPoint + diceValue;
            return target > 24 ? 27 : target; // 27 = خارج اللوحة
        } else {
            // القطع السوداء تتحرك من 24 إلى 1
            if (fromPoint === 26) { // قطعة مأسورة
                return 25 - diceValue;
            }
            const target = fromPoint - diceValue;
            return target < 1 ? 27 : target; // 27 = خارج اللوحة
        }
    }

    isValidMove(fromPoint, toPoint, color) {
        // التحقق من الحدود
        if (toPoint < 1 || toPoint > 27) return false;
        
        // التحقق من إمكانية الإنزال
        if (toPoint === 27) {
            return this.canBearOff(fromPoint, color);
        }

        const targetPoint = this.board[toPoint];
        
        // لا يمكن الحركة إلى نقطة يسيطر عليها الخصم (أكثر من قطعة واحدة)
        if (targetPoint.color && targetPoint.color !== color && targetPoint.pieces > 1) {
            return false;
        }

        return true;
    }

    canBearOff(fromPoint, color) {
        // التحقق من أن جميع القطع في المنطقة الداخلية
        const homeBoard = color === 'white' ? [19, 20, 21, 22, 23, 24] : [1, 2, 3, 4, 5, 6];
        
        for (let i = 1; i <= 24; i++) {
            const point = this.board[i];
            if (point.color === color && point.pieces > 0) {
                if (!homeBoard.includes(i)) {
                    return false;
                }
            }
        }

        // التحقق من عدم وجود قطع مأسورة
        const capturedPoint = color === 'white' ? 25 : 26;
        if (this.board[capturedPoint].pieces > 0) {
            return false;
        }

        return true;
    }

    getMoveType(fromPoint, toPoint, color) {
        if (toPoint === 27) return 'bear-off';
        
        const targetPoint = this.board[toPoint];
        if (targetPoint.color && targetPoint.color !== color && targetPoint.pieces === 1) {
            return 'hit';
        }
        
        if (fromPoint === (color === 'white' ? 25 : 26)) {
            return 'enter';
        }
        
        return 'normal';
    }

    makeMove(fromPoint, toPoint, diceValue) {
        const currentColor = this.isWhiteTurn ? 'white' : 'black';
        const moveType = this.getMoveType(fromPoint, toPoint, currentColor);
        
        // حفظ الحركة
        const move = {
            from: fromPoint,
            to: toPoint,
            dice: diceValue,
            type: moveType,
            player: currentColor
        };

        // تنفيذ الحركة
        this.board[fromPoint].pieces--;
        if (this.board[fromPoint].pieces === 0) {
            this.board[fromPoint].color = null;
        }

        // معالجة الحركات الخاصة
        if (moveType === 'hit') {
            // أسر قطعة الخصم
            const opponentColor = currentColor === 'white' ? 'black' : 'white';
            const capturedPoint = opponentColor === 'white' ? 25 : 26;
            
            this.board[capturedPoint].pieces++;
            this.board[capturedPoint].color = opponentColor;
            this.capturedPieces[opponentColor]++;
            
            this.board[toPoint] = { pieces: 1, color: currentColor };
        } else if (moveType === 'bear-off') {
            // إنزال قطعة
            // لا نحتاج لفعل شيء إضافي
        } else {
            // حركة عادية
            if (this.board[toPoint].color === currentColor) {
                this.board[toPoint].pieces++;
            } else {
                this.board[toPoint] = { pieces: 1, color: currentColor };
            }
        }

        // إزالة قيمة النرد المستخدمة
        const diceIndex = this.availableMoves.indexOf(diceValue);
        if (diceIndex > -1) {
            this.availableMoves.splice(diceIndex, 1);
        }

        this.moveHistory.push(move);
        
        // التحقق من انتهاء الدور
        if (this.availableMoves.length === 0 || !this.hasValidMoves()) {
            this.endTurn();
        }

        return move;
    }

    hasValidMoves() {
        const currentColor = this.isWhiteTurn ? 'white' : 'black';
        
        for (let point = 1; point <= 26; point++) {
            const pointData = this.board[point];
            if (pointData.color === currentColor && pointData.pieces > 0) {
                if (this.getPossibleMoves(point).length > 0) {
                    return true;
                }
            }
        }
        
        return false;
    }

    endTurn() {
        this.selectedPoint = null;
        this.availableMoves = [];
        this.isWhiteTurn = !this.isWhiteTurn;
        
        // التحقق من انتهاء اللعبة
        this.checkGameEnd();
    }

    checkGameEnd() {
        const whitePieces = this.countPieces('white');
        const blackPieces = this.countPieces('black');
        
        if (whitePieces === 0) {
            this.gameStatus = 'white-wins';
            this.calculateGameValue('white');
        } else if (blackPieces === 0) {
            this.gameStatus = 'black-wins';
            this.calculateGameValue('black');
        }
    }

    countPieces(color) {
        let count = 0;
        for (let i = 1; i <= 26; i++) {
            const point = this.board[i];
            if (point.color === color) {
                count += point.pieces;
            }
        }
        return count;
    }

    calculateGameValue(winner) {
        const loser = winner === 'white' ? 'black' : 'white';
        const loserPieces = this.countPieces(loser);
        const loserCaptured = this.board[loser === 'white' ? 25 : 26].pieces;
        const loserInHomeBoard = this.countPiecesInHomeBoard(loser);
        
        if (loserPieces === 15) {
            // Backgammon (الخصم لم يُنزل أي قطعة ولديه قطع مأسورة أو في منطقة الخصم)
            this.gameValue *= 3;
        } else if (loserInHomeBoard === loserPieces) {
            // Gammon (الخصم لم يُنزل أي قطعة)
            this.gameValue *= 2;
        }
        // Single game (عادي) = قيمة اللعبة الحالية
    }

    countPiecesInHomeBoard(color) {
        const homeBoard = color === 'white' ? [19, 20, 21, 22, 23, 24] : [1, 2, 3, 4, 5, 6];
        let count = 0;
        
        for (let point of homeBoard) {
            if (this.board[point].color === color) {
                count += this.board[point].pieces;
            }
        }
        
        return count;
    }

    // === الذكاء الاصطناعي ===

    async makeAIMove() {
        if (this.gameStatus !== 'playing' || this.isAiThinking || this.availableMoves.length === 0) {
            return null;
        }
        
        this.isAiThinking = true;
        
        try {
            const moves = await this.getBestMoves();
            
            // تنفيذ الحركات
            for (let move of moves) {
                this.makeMove(move.from, move.to, move.dice);
                await this.delay(500); // تأخير لإظهار الحركات
            }
            
            return moves;
        } finally {
            this.isAiThinking = false;
        }
    }

    async getBestMoves() {
        const depth = this.getSearchDepth();
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const allPossibleMoveSequences = this.generateAllMoveSequences();
                let bestSequence = null;
                let bestScore = -Infinity;
                
                for (let sequence of allPossibleMoveSequences) {
                    const score = this.evaluateMoveSequence(sequence);
                    if (score > bestScore) {
                        bestScore = score;
                        bestSequence = sequence;
                    }
                }
                
                resolve(bestSequence || []);
            }, 200);
        });
    }

    generateAllMoveSequences() {
        const sequences = [];
        const currentColor = this.isWhiteTurn ? 'white' : 'black';
        
        this.generateSequencesRecursive([], [...this.availableMoves], sequences);
        
        return sequences;
    }

    generateSequencesRecursive(currentSequence, remainingDice, allSequences) {
        if (remainingDice.length === 0) {
            if (currentSequence.length > 0) {
                allSequences.push([...currentSequence]);
            }
            return;
        }

        let foundValidMove = false;
        
        for (let point = 1; point <= 26; point++) {
            const possibleMoves = this.getPossibleMoves(point);
            
            for (let move of possibleMoves) {
                if (remainingDice.includes(move.dice)) {
                    foundValidMove = true;
                    
                    // محاكاة الحركة
                    const originalState = this.saveState();
                    this.makeMove(move.from, move.to, move.dice);
                    
                    // إزالة النرد المستخدم
                    const newRemainingDice = [...remainingDice];
                    const diceIndex = newRemainingDice.indexOf(move.dice);
                    newRemainingDice.splice(diceIndex, 1);
                    
                    // متابعة البحث
                    this.generateSequencesRecursive(
                        [...currentSequence, move], 
                        newRemainingDice, 
                        allSequences
                    );
                    
                    // إعادة الحالة
                    this.restoreState(originalState);
                }
            }
        }

        // إذا لم توجد حركات صالحة، أضف التسلسل الحالي
        if (!foundValidMove && currentSequence.length > 0) {
            allSequences.push([...currentSequence]);
        }
    }

    evaluateMoveSequence(sequence) {
        // محاكاة تنفيذ التسلسل
        const originalState = this.saveState();
        
        for (let move of sequence) {
            this.makeMove(move.from, move.to, move.dice);
        }
        
        const score = this.evaluatePosition();
        
        // إعادة الحالة
        this.restoreState(originalState);
        
        return score;
    }

    evaluatePosition() {
        const currentColor = this.isWhiteTurn ? 'black' : 'white'; // لأننا نقيم بعد الحركة
        let score = 0;

        // تقييم التقدم في اللعبة
        score += this.evaluateRacePosition(currentColor);
        
        // تقييم الأمان
        score += this.evaluateSafety(currentColor);
        
        // تقييم الهجوم
        score += this.evaluateAttack(currentColor);
        
        // تقييم التحكم في النقاط المهمة
        score += this.evaluateKeyPoints(currentColor);

        return score;
    }

    evaluateRacePosition(color) {
        let score = 0;
        const opponentColor = color === 'white' ? 'black' : 'white';
        
        // حساب المسافة المتبقية لكل لاعب
        const myDistance = this.calculateRemainingDistance(color);
        const opponentDistance = this.calculateRemainingDistance(opponentColor);
        
        // كلما قلت المسافة، كان أفضل
        score += (opponentDistance - myDistance) * 2;
        
        return score;
    }

    calculateRemainingDistance(color) {
        let totalDistance = 0;
        
        for (let point = 1; point <= 26; point++) {
            const pointData = this.board[point];
            if (pointData.color === color && pointData.pieces > 0) {
                let distance;
                if (color === 'white') {
                    distance = point <= 24 ? (25 - point) : 0;
                } else {
                    distance = point >= 1 && point <= 24 ? point : 0;
                }
                totalDistance += distance * pointData.pieces;
            }
        }
        
        return totalDistance;
    }

    evaluateSafety(color) {
        let score = 0;
        
        // عقاب القطع المعرضة للخطر
        for (let point = 1; point <= 24; point++) {
            const pointData = this.board[point];
            if (pointData.color === color && pointData.pieces === 1) {
                if (this.isBlotVulnerable(point, color)) {
                    score -= 30; // عقاب القطع المعرضة
                }
            }
        }
        
        // مكافأة النقاط المحمية
        for (let point = 1; point <= 24; point++) {
            const pointData = this.board[point];
            if (pointData.color === color && pointData.pieces >= 2) {
                score += 10; // مكافأة النقاط المحمية
            }
        }
        
        return score;
    }

    isBlotVulnerable(point, color) {
        const opponentColor = color === 'white' ? 'black' : 'white';
        
        // فحص إمكانية ضرب هذه القطعة من قبل الخصم
        for (let enemyPoint = 1; point <= 24; enemyPoint++) {
            const enemyPointData = this.board[enemyPoint];
            if (enemyPointData.color === opponentColor && enemyPointData.pieces > 0) {
                for (let dice = 1; dice <= 6; dice++) {
                    const targetPoint = this.calculateTargetPoint(enemyPoint, dice, opponentColor);
                    if (targetPoint === point) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }

    evaluateAttack(color) {
        let score = 0;
        const opponentColor = color === 'white' ? 'black' : 'white';
        
        // مكافأة ضرب قطع الخصم
        const opponentCaptured = this.board[opponentColor === 'white' ? 25 : 26].pieces;
        score += opponentCaptured * 50;
        
        return score;
    }

    evaluateKeyPoints(color) {
        let score = 0;
        
        // النقاط المهمة في الطاولة
        const keyPoints = color === 'white' ? [7, 8, 9, 10, 11, 12] : [13, 14, 15, 16, 17, 18];
        
        for (let point of keyPoints) {
            const pointData = this.board[point];
            if (pointData.color === color && pointData.pieces >= 2) {
                score += 15; // مكافأة السيطرة على النقاط المهمة
            }
        }
        
        return score;
    }

    getSearchDepth() {
        switch (this.aiLevel) {
            case 'easy': return 1;
            case 'medium': return 2;
            case 'hard': return 3;
            case 'expert': return 4;
            default: return 2;
        }
    }

    saveState() {
        return {
            board: this.board.map(point => ({...point})),
            isWhiteTurn: this.isWhiteTurn,
            availableMoves: [...this.availableMoves],
            capturedPieces: {...this.capturedPieces}
        };
    }

    restoreState(state) {
        this.board = state.board;
        this.isWhiteTurn = state.isWhiteTurn;
        this.availableMoves = state.availableMoves;
        this.capturedPieces = state.capturedPieces;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // === وظائف المضاعفة ===

    offerDouble() {
        if (!this.canDouble[this.isWhiteTurn ? 'white' : 'black']) {
            return false;
        }
        
        this.doubleOffered = true;
        return true;
    }

    acceptDouble() {
        if (!this.doubleOffered) return false;
        
        this.gameValue *= 2;
        this.doubleOffered = false;
        
        // تبديل حقوق المضاعفة
        const currentPlayer = this.isWhiteTurn ? 'white' : 'black';
        const opponent = currentPlayer === 'white' ? 'black' : 'white';
        
        this.canDouble[currentPlayer] = false;
        this.canDouble[opponent] = true;
        
        return true;
    }

    rejectDouble() {
        if (!this.doubleOffered) return false;
        
        this.doubleOffered = false;
        this.gameStatus = this.isWhiteTurn ? 'black-wins' : 'white-wins';
        
        return true;
    }

    reset() {
        this.board = this.createInitialBoard();
        this.isWhiteTurn = true;
        this.gameStatus = 'playing';
        this.dice = [0, 0];
        this.availableMoves = [];
        this.selectedPoint = null;
        this.moveHistory = [];
        this.capturedPieces = { white: 0, black: 0 };
        this.isAiThinking = false;
        this.doubleOffered = false;
        this.gameValue = 1;
        this.canDouble = { white: true, black: true };
    }
}
