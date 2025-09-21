// === محرك الشطرنج الاحترافي ===

class ChessEngine {
    constructor() {
        this.board = this.createInitialBoard();
        this.isWhiteTurn = true;
        this.selectedSquare = null;
        this.gameMode = 'computer'; // computer, friend
        this.aiLevel = 'medium'; // easy, medium, hard, expert
        this.gameStatus = 'playing'; // playing, check, checkmate, stalemate, draw
        this.moveHistory = [];
        this.capturedPieces = { white: [], black: [] };
        this.enPassantTarget = null;
        this.castlingRights = {
            whiteKingSide: true,
            whiteQueenSide: true,
            blackKingSide: true,
            blackQueenSide: true
        };
        this.halfMoveClock = 0;
        this.fullMoveNumber = 1;
        this.positionHistory = [];
        this.isAiThinking = false;
    }

    createInitialBoard() {
        const board = Array(8).fill().map(() => Array(8).fill(null));
        
        // القطع السوداء
        board[0] = [
            {type: 'rook', color: 'black', symbol: '♜'},
            {type: 'knight', color: 'black', symbol: '♞'},
            {type: 'bishop', color: 'black', symbol: '♝'},
            {type: 'queen', color: 'black', symbol: '♛'},
            {type: 'king', color: 'black', symbol: '♚'},
            {type: 'bishop', color: 'black', symbol: '♝'},
            {type: 'knight', color: 'black', symbol: '♞'},
            {type: 'rook', color: 'black', symbol: '♜'}
        ];
        
        for (let i = 0; i < 8; i++) {
            board[1][i] = {type: 'pawn', color: 'black', symbol: '♟'};
            board[6][i] = {type: 'pawn', color: 'white', symbol: '♙'};
        }
        
        // القطع البيضاء
        board[7] = [
            {type: 'rook', color: 'white', symbol: '♖'},
            {type: 'knight', color: 'white', symbol: '♘'},
            {type: 'bishop', color: 'white', symbol: '♗'},
            {type: 'queen', color: 'white', symbol: '♕'},
            {type: 'king', color: 'white', symbol: '♔'},
            {type: 'bishop', color: 'white', symbol: '♗'},
            {type: 'knight', color: 'white', symbol: '♘'},
            {type: 'rook', color: 'white', symbol: '♖'}
        ];
        
        return board;
    }

    // الحصول على جميع الحركات الممكنة لقطعة
    getPossibleMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece || piece.color !== (this.isWhiteTurn ? 'white' : 'black')) {
            return [];
        }

        let moves = [];
        
        switch (piece.type) {
            case 'pawn':
                moves = this.getPawnMoves(row, col);
                break;
            case 'rook':
                moves = this.getRookMoves(row, col);
                break;
            case 'knight':
                moves = this.getKnightMoves(row, col);
                break;
            case 'bishop':
                moves = this.getBishopMoves(row, col);
                break;
            case 'queen':
                moves = this.getQueenMoves(row, col);
                break;
            case 'king':
                moves = this.getKingMoves(row, col);
                break;
        }

        // تصفية الحركات التي تعرض الملك للخطر
        return moves.filter(move => !this.wouldExposeKing(row, col, move.row, move.col));
    }

    getPawnMoves(row, col) {
        const moves = [];
        const piece = this.board[row][col];
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;

        // حركة للأمام
        if (this.isValidSquare(row + direction, col) && !this.board[row + direction][col]) {
            moves.push({row: row + direction, col: col, type: 'normal'});
            
            // حركة مزدوجة من البداية
            if (row === startRow && !this.board[row + 2 * direction][col]) {
                moves.push({row: row + 2 * direction, col: col, type: 'double'});
            }
        }

        // الأكل قطرياً
        [-1, 1].forEach(dc => {
            const newRow = row + direction;
            const newCol = col + dc;
            
            if (this.isValidSquare(newRow, newCol)) {
                const target = this.board[newRow][newCol];
                if (target && target.color !== piece.color) {
                    moves.push({row: newRow, col: newCol, type: 'capture'});
                }
                
                // En passant
                if (this.enPassantTarget && 
                    this.enPassantTarget.row === newRow && 
                    this.enPassantTarget.col === newCol) {
                    moves.push({row: newRow, col: newCol, type: 'enpassant'});
                }
            }
        });

        return moves;
    }

    getRookMoves(row, col) {
        const moves = [];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        
        directions.forEach(([dr, dc]) => {
            for (let i = 1; i < 8; i++) {
                const newRow = row + dr * i;
                const newCol = col + dc * i;
                
                if (!this.isValidSquare(newRow, newCol)) break;
                
                const target = this.board[newRow][newCol];
                if (!target) {
                    moves.push({row: newRow, col: newCol, type: 'normal'});
                } else {
                    if (target.color !== this.board[row][col].color) {
                        moves.push({row: newRow, col: newCol, type: 'capture'});
                    }
                    break;
                }
            }
        });
        
        return moves;
    }

    getKnightMoves(row, col) {
        const moves = [];
        const knightMoves = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1]
        ];
        
        knightMoves.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (this.isValidSquare(newRow, newCol)) {
                const target = this.board[newRow][newCol];
                if (!target) {
                    moves.push({row: newRow, col: newCol, type: 'normal'});
                } else if (target.color !== this.board[row][col].color) {
                    moves.push({row: newRow, col: newCol, type: 'capture'});
                }
            }
        });
        
        return moves;
    }

    getBishopMoves(row, col) {
        const moves = [];
        const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        
        directions.forEach(([dr, dc]) => {
            for (let i = 1; i < 8; i++) {
                const newRow = row + dr * i;
                const newCol = col + dc * i;
                
                if (!this.isValidSquare(newRow, newCol)) break;
                
                const target = this.board[newRow][newCol];
                if (!target) {
                    moves.push({row: newRow, col: newCol, type: 'normal'});
                } else {
                    if (target.color !== this.board[row][col].color) {
                        moves.push({row: newRow, col: newCol, type: 'capture'});
                    }
                    break;
                }
            }
        });
        
        return moves;
    }

    getQueenMoves(row, col) {
        return [...this.getRookMoves(row, col), ...this.getBishopMoves(row, col)];
    }

    getKingMoves(row, col) {
        const moves = [];
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        
        directions.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (this.isValidSquare(newRow, newCol)) {
                const target = this.board[newRow][newCol];
                if (!target) {
                    moves.push({row: newRow, col: newCol, type: 'normal'});
                } else if (target.color !== this.board[row][col].color) {
                    moves.push({row: newRow, col: newCol, type: 'capture'});
                }
            }
        });

        // التبييت
        if (this.canCastle(row, col, 'kingside')) {
            moves.push({row: row, col: col + 2, type: 'castle-kingside'});
        }
        if (this.canCastle(row, col, 'queenside')) {
            moves.push({row: row, col: col - 2, type: 'castle-queenside'});
        }
        
        return moves;
    }

    canCastle(row, col, side) {
        const piece = this.board[row][col];
        if (piece.type !== 'king') return false;
        
        const color = piece.color;
        const isWhite = color === 'white';
        
        // التحقق من حقوق التبييت
        if (side === 'kingside') {
            if (isWhite && !this.castlingRights.whiteKingSide) return false;
            if (!isWhite && !this.castlingRights.blackKingSide) return false;
        } else {
            if (isWhite && !this.castlingRights.whiteQueenSide) return false;
            if (!isWhite && !this.castlingRights.blackQueenSide) return false;
        }

        // التحقق من خلو المربعات
        const rookCol = side === 'kingside' ? 7 : 0;
        const direction = side === 'kingside' ? 1 : -1;
        const squares = side === 'kingside' ? [col + 1, col + 2] : [col - 1, col - 2, col - 3];
        
        for (let c of squares) {
            if (this.board[row][c]) return false;
        }

        // التحقق من عدم تهديد الملك
        if (this.isSquareUnderAttack(row, col, !isWhite)) return false;
        if (this.isSquareUnderAttack(row, col + direction, !isWhite)) return false;
        if (this.isSquareUnderAttack(row, col + 2 * direction, !isWhite)) return false;

        return true;
    }

    isValidSquare(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    wouldExposeKing(fromRow, fromCol, toRow, toCol) {
        // محاكاة الحركة
        const originalPiece = this.board[toRow][toCol];
        this.board[toRow][toCol] = this.board[fromRow][fromCol];
        this.board[fromRow][fromCol] = null;

        // البحث عن الملك
        const kingColor = this.isWhiteTurn ? 'white' : 'black';
        let kingPos = this.findKing(kingColor);
        
        // إذا تم تحريك الملك، استخدم الموضع الجديد
        if (this.board[toRow][toCol] && this.board[toRow][toCol].type === 'king') {
            kingPos = {row: toRow, col: toCol};
        }

        const exposed = this.isSquareUnderAttack(kingPos.row, kingPos.col, kingColor === 'white');

        // إعادة الحالة الأصلية
        this.board[fromRow][fromCol] = this.board[toRow][toCol];
        this.board[toRow][toCol] = originalPiece;

        return exposed;
    }

    findKing(color) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.type === 'king' && piece.color === color) {
                    return {row, col};
                }
            }
        }
        return null;
    }

    isSquareUnderAttack(row, col, byWhite) {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = this.board[r][c];
                if (piece && piece.color === (byWhite ? 'white' : 'black')) {
                    const moves = this.getPossibleMovesForPiece(r, c, piece, false);
                    if (moves.some(move => move.row === row && move.col === col)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    getPossibleMovesForPiece(row, col, piece, checkKingSafety = true) {
        // نسخة مبسطة لفحص التهديدات
        let moves = [];
        
        switch (piece.type) {
            case 'pawn':
                const direction = piece.color === 'white' ? -1 : 1;
                // فقط حركات الأكل للبيدق
                [-1, 1].forEach(dc => {
                    const newRow = row + direction;
                    const newCol = col + dc;
                    if (this.isValidSquare(newRow, newCol)) {
                        moves.push({row: newRow, col: newCol});
                    }
                });
                break;
            case 'rook':
                moves = this.getRookMoves(row, col);
                break;
            case 'knight':
                moves = this.getKnightMoves(row, col);
                break;
            case 'bishop':
                moves = this.getBishopMoves(row, col);
                break;
            case 'queen':
                moves = [...this.getRookMoves(row, col), ...this.getBishopMoves(row, col)];
                break;
            case 'king':
                const directions = [
                    [-1, -1], [-1, 0], [-1, 1],
                    [0, -1], [0, 1],
                    [1, -1], [1, 0], [1, 1]
                ];
                directions.forEach(([dr, dc]) => {
                    const newRow = row + dr;
                    const newCol = col + dc;
                    if (this.isValidSquare(newRow, newCol)) {
                        moves.push({row: newRow, col: newCol});
                    }
                });
                break;
        }

        return moves;
    }

    makeMove(fromRow, fromCol, toRow, toCol) {
        const piece = this.board[fromRow][fromCol];
        const capturedPiece = this.board[toRow][toCol];
        const moveType = this.getMoveType(fromRow, fromCol, toRow, toCol);

        // حفظ الحركة في التاريخ
        const move = {
            from: {row: fromRow, col: fromCol},
            to: {row: toRow, col: toCol},
            piece: piece,
            captured: capturedPiece,
            moveType: moveType,
            castlingRights: {...this.castlingRights},
            enPassantTarget: this.enPassantTarget,
            halfMoveClock: this.halfMoveClock
        };

        this.moveHistory.push(move);

        // تنفيذ الحركة
        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;

        // معالجة الحركات الخاصة
        this.handleSpecialMoves(move);

        // تحديث حقوق التبييت
        this.updateCastlingRights(move);

        // تحديث En Passant
        this.updateEnPassant(move);

        // تحديث عدادات الحركات
        this.updateMoveCounts(move);

        // إضافة القطعة المأسورة
        if (capturedPiece) {
            this.capturedPieces[capturedPiece.color].push(capturedPiece);
        }

        // تبديل الدور
        this.isWhiteTurn = !this.isWhiteTurn;
        if (this.isWhiteTurn) {
            this.fullMoveNumber++;
        }

        // فحص حالة اللعبة
        this.updateGameStatus();

        return move;
    }

    getMoveType(fromRow, fromCol, toRow, toCol) {
        const piece = this.board[fromRow][fromCol];
        const target = this.board[toRow][toCol];

        if (target) return 'capture';
        
        if (piece.type === 'king' && Math.abs(toCol - fromCol) === 2) {
            return toCol > fromCol ? 'castle-kingside' : 'castle-queenside';
        }
        
        if (piece.type === 'pawn') {
            if (Math.abs(toRow - fromRow) === 2) return 'double-pawn';
            if (Math.abs(toCol - fromCol) === 1 && !target) return 'enpassant';
        }

        return 'normal';
    }

    handleSpecialMoves(move) {
        const {from, to, moveType} = move;

        switch (moveType) {
            case 'castle-kingside':
                // تحريك الرخ
                this.board[to.row][5] = this.board[to.row][7];
                this.board[to.row][7] = null;
                break;
            case 'castle-queenside':
                // تحريك الرخ
                this.board[to.row][3] = this.board[to.row][0];
                this.board[to.row][0] = null;
                break;
            case 'enpassant':
                // إزالة البيدق المأسور
                const capturedRow = this.isWhiteTurn ? to.row + 1 : to.row - 1;
                const capturedPawn = this.board[capturedRow][to.col];
                this.capturedPieces[capturedPawn.color].push(capturedPawn);
                this.board[capturedRow][to.col] = null;
                break;
        }

        // ترقية البيدق
        if (move.piece.type === 'pawn' && (to.row === 0 || to.row === 7)) {
            this.board[to.row][to.col] = {
                type: 'queen',
                color: move.piece.color,
                symbol: move.piece.color === 'white' ? '♕' : '♛'
            };
        }
    }

    updateCastlingRights(move) {
        const {from, piece} = move;

        if (piece.type === 'king') {
            if (piece.color === 'white') {
                this.castlingRights.whiteKingSide = false;
                this.castlingRights.whiteQueenSide = false;
            } else {
                this.castlingRights.blackKingSide = false;
                this.castlingRights.blackQueenSide = false;
            }
        }

        if (piece.type === 'rook') {
            if (piece.color === 'white') {
                if (from.col === 0) this.castlingRights.whiteQueenSide = false;
                if (from.col === 7) this.castlingRights.whiteKingSide = false;
            } else {
                if (from.col === 0) this.castlingRights.blackQueenSide = false;
                if (from.col === 7) this.castlingRights.blackKingSide = false;
            }
        }
    }

    updateEnPassant(move) {
        this.enPassantTarget = null;
        
        if (move.piece.type === 'pawn' && Math.abs(move.to.row - move.from.row) === 2) {
            this.enPassantTarget = {
                row: (move.from.row + move.to.row) / 2,
                col: move.to.col
            };
        }
    }

    updateMoveCounts(move) {
        if (move.piece.type === 'pawn' || move.captured) {
            this.halfMoveClock = 0;
        } else {
            this.halfMoveClock++;
        }
    }

    updateGameStatus() {
        const currentColor = this.isWhiteTurn ? 'white' : 'black';
        const kingPos = this.findKing(currentColor);
        const isInCheck = this.isSquareUnderAttack(kingPos.row, kingPos.col, !this.isWhiteTurn);
        
        // الحصول على جميع الحركات الممكنة
        const allMoves = this.getAllPossibleMoves(currentColor);
        
        if (allMoves.length === 0) {
            if (isInCheck) {
                this.gameStatus = 'checkmate';
            } else {
                this.gameStatus = 'stalemate';
            }
        } else if (isInCheck) {
            this.gameStatus = 'check';
        } else if (this.halfMoveClock >= 100) {
            this.gameStatus = 'draw-50-moves';
        } else if (this.isInsufficientMaterial()) {
            this.gameStatus = 'draw-insufficient-material';
        } else {
            this.gameStatus = 'playing';
        }
    }

    getAllPossibleMoves(color) {
        const moves = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === color) {
                    const pieceMoves = this.getPossibleMoves(row, col);
                    moves.push(...pieceMoves.map(move => ({
                        from: {row, col},
                        to: move,
                        piece
                    })));
                }
            }
        }
        return moves;
    }

    isInsufficientMaterial() {
        const pieces = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.board[row][col]) {
                    pieces.push(this.board[row][col].type);
                }
            }
        }

        // ملك ضد ملك
        if (pieces.length === 2) return true;
        
        // ملك وفيل/حصان ضد ملك
        if (pieces.length === 3) {
            return pieces.includes('bishop') || pieces.includes('knight');
        }

        return false;
    }

    // === الذكاء الاصطناعي ===

    async makeAIMove() {
        if (this.gameStatus !== 'playing' || this.isAiThinking) return null;
        
        this.isAiThinking = true;
        
        try {
            const move = await this.getBestMove();
            if (move) {
                return this.makeMove(move.from.row, move.from.col, move.to.row, move.to.col);
            }
        } finally {
            this.isAiThinking = false;
        }
        
        return null;
    }

    async getBestMove() {
        const depth = this.getSearchDepth();
        const color = this.isWhiteTurn ? 'white' : 'black';
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const result = this.minimax(depth, -Infinity, Infinity, color === 'white');
                resolve(result.move);
            }, 100); // محاكاة وقت التفكير
        });
    }

    getSearchDepth() {
        switch (this.aiLevel) {
            case 'easy': return 2;
            case 'medium': return 3;
            case 'hard': return 4;
            case 'expert': return 5;
            default: return 3;
        }
    }

    minimax(depth, alpha, beta, maximizingPlayer) {
        if (depth === 0 || this.gameStatus !== 'playing') {
            return {
                score: this.evaluatePosition(),
                move: null
            };
        }

        const color = maximizingPlayer ? 'white' : 'black';
        const moves = this.getAllPossibleMoves(color);
        
        if (moves.length === 0) {
            return {
                score: maximizingPlayer ? -10000 : 10000,
                move: null
            };
        }

        let bestMove = null;

        if (maximizingPlayer) {
            let maxEval = -Infinity;
            
            for (let move of moves) {
                // تنفيذ الحركة
                const originalState = this.saveState();
                this.makeMove(move.from.row, move.from.col, move.to.row, move.to.col);
                
                const eval_result = this.minimax(depth - 1, alpha, beta, false);
                
                // إعادة الحالة
                this.restoreState(originalState);
                
                if (eval_result.score > maxEval) {
                    maxEval = eval_result.score;
                    bestMove = move;
                }
                
                alpha = Math.max(alpha, eval_result.score);
                if (beta <= alpha) break; // Alpha-beta pruning
            }
            
            return {score: maxEval, move: bestMove};
        } else {
            let minEval = Infinity;
            
            for (let move of moves) {
                // تنفيذ الحركة
                const originalState = this.saveState();
                this.makeMove(move.from.row, move.from.col, move.to.row, move.to.col);
                
                const eval_result = this.minimax(depth - 1, alpha, beta, true);
                
                // إعادة الحالة
                this.restoreState(originalState);
                
                if (eval_result.score < minEval) {
                    minEval = eval_result.score;
                    bestMove = move;
                }
                
                beta = Math.min(beta, eval_result.score);
                if (beta <= alpha) break; // Alpha-beta pruning
            }
            
            return {score: minEval, move: bestMove};
        }
    }

    evaluatePosition() {
        let score = 0;

        // قيم القطع
        const pieceValues = {
            'pawn': 100,
            'knight': 320,
            'bishop': 330,
            'rook': 500,
            'queen': 900,
            'king': 20000
        };

        // تقييم المواد
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece) {
                    const value = pieceValues[piece.type];
                    const positionBonus = this.getPositionBonus(piece.type, row, col, piece.color);
                    
                    if (piece.color === 'white') {
                        score += value + positionBonus;
                    } else {
                        score -= value + positionBonus;
                    }
                }
            }
        }

        // تقييم إضافي للحركة والأمان
        score += this.evaluateMobility();
        score += this.evaluateKingSafety();

        return score;
    }

    getPositionBonus(pieceType, row, col, color) {
        // جداول المواضع المفضلة لكل قطعة
        const pawnTable = [
            [0,  0,  0,  0,  0,  0,  0,  0],
            [50, 50, 50, 50, 50, 50, 50, 50],
            [10, 10, 20, 30, 30, 20, 10, 10],
            [5,  5, 10, 25, 25, 10,  5,  5],
            [0,  0,  0, 20, 20,  0,  0,  0],
            [5, -5,-10,  0,  0,-10, -5,  5],
            [5, 10, 10,-20,-20, 10, 10,  5],
            [0,  0,  0,  0,  0,  0,  0,  0]
        ];

        const knightTable = [
            [-50,-40,-30,-30,-30,-30,-40,-50],
            [-40,-20,  0,  0,  0,  0,-20,-40],
            [-30,  0, 10, 15, 15, 10,  0,-30],
            [-30,  5, 15, 20, 20, 15,  5,-30],
            [-30,  0, 15, 20, 20, 15,  0,-30],
            [-30,  5, 10, 15, 15, 10,  5,-30],
            [-40,-20,  0,  5,  5,  0,-20,-40],
            [-50,-40,-30,-30,-30,-30,-40,-50]
        ];

        let table;
        switch (pieceType) {
            case 'pawn': table = pawnTable; break;
            case 'knight': table = knightTable; break;
            default: return 0;
        }

        const adjustedRow = color === 'white' ? 7 - row : row;
        return table[adjustedRow][col] / 10;
    }

    evaluateMobility() {
        const whiteMoves = this.getAllPossibleMoves('white').length;
        const blackMoves = this.getAllPossibleMoves('black').length;
        return (whiteMoves - blackMoves) * 2;
    }

    evaluateKingSafety() {
        let score = 0;
        
        const whiteKing = this.findKing('white');
        const blackKing = this.findKing('black');
        
        if (this.isSquareUnderAttack(whiteKing.row, whiteKing.col, false)) {
            score -= 50;
        }
        
        if (this.isSquareUnderAttack(blackKing.row, blackKing.col, true)) {
            score += 50;
        }
        
        return score;
    }

    saveState() {
        return {
            board: this.board.map(row => row.map(piece => piece ? {...piece} : null)),
            isWhiteTurn: this.isWhiteTurn,
            gameStatus: this.gameStatus,
            castlingRights: {...this.castlingRights},
            enPassantTarget: this.enPassantTarget ? {...this.enPassantTarget} : null,
            halfMoveClock: this.halfMoveClock,
            fullMoveNumber: this.fullMoveNumber
        };
    }

    restoreState(state) {
        this.board = state.board;
        this.isWhiteTurn = state.isWhiteTurn;
        this.gameStatus = state.gameStatus;
        this.castlingRights = state.castlingRights;
        this.enPassantTarget = state.enPassantTarget;
        this.halfMoveClock = state.halfMoveClock;
        this.fullMoveNumber = state.fullMoveNumber;
    }

    reset() {
        this.board = this.createInitialBoard();
        this.isWhiteTurn = true;
        this.selectedSquare = null;
        this.gameStatus = 'playing';
        this.moveHistory = [];
        this.capturedPieces = { white: [], black: [] };
        this.enPassantTarget = null;
        this.castlingRights = {
            whiteKingSide: true,
            whiteQueenSide: true,
            blackKingSide: true,
            blackQueenSide: true
        };
        this.halfMoveClock = 0;
        this.fullMoveNumber = 1;
        this.positionHistory = [];
        this.isAiThinking = false;
    }
}
