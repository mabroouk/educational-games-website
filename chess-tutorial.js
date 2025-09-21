// === نظام الدليل التعليمي للشطرنج ===

class ChessTutorial {
    constructor() {
        this.isActive = false;
        this.currentLesson = null;
        this.lessons = this.createLessons();
        this.hints = [];
        this.showHints = true;
        this.showSuggestions = true;
    }

    createLessons() {
        return {
            basics: {
                title: "أساسيات الشطرنج",
                description: "تعلم القطع وحركاتها الأساسية",
                steps: [
                    {
                        title: "البيدق ♙",
                        content: "البيدق يتحرك مربع واحد للأمام، أو مربعين في أول حركة. يأكل قطرياً.",
                        demo: "pawn-moves"
                    },
                    {
                        title: "الرخ ♖", 
                        content: "الرخ يتحرك أفقياً وعمودياً أي عدد من المربعات.",
                        demo: "rook-moves"
                    },
                    {
                        title: "الفيل ♗",
                        content: "الفيل يتحرك قطرياً أي عدد من المربعات.",
                        demo: "bishop-moves"
                    },
                    {
                        title: "الحصان ♘",
                        content: "الحصان يتحرك على شكل حرف L: مربعين في اتجاه ومربع في الاتجاه العمودي.",
                        demo: "knight-moves"
                    },
                    {
                        title: "الملكة ♕",
                        content: "الملكة تجمع حركات الرخ والفيل معاً.",
                        demo: "queen-moves"
                    },
                    {
                        title: "الملك ♔",
                        content: "الملك يتحرك مربع واحد في أي اتجاه. هدف اللعبة حمايته.",
                        demo: "king-moves"
                    }
                ]
            },
            special: {
                title: "الحركات الخاصة",
                description: "تعلم التبييت وEn Passant وترقية البيدق",
                steps: [
                    {
                        title: "التبييت",
                        content: "حركة خاصة لحماية الملك. يتحرك الملك مربعين نحو الرخ، والرخ يقفز فوقه.",
                        demo: "castling"
                    },
                    {
                        title: "En Passant",
                        content: "عندما يتحرك بيدق الخصم مربعين، يمكن أكله كأنه تحرك مربع واحد فقط.",
                        demo: "en-passant"
                    },
                    {
                        title: "ترقية البيدق",
                        content: "عندما يصل البيدق للصف الأخير، يتحول لأي قطعة تختارها (عادة ملكة).",
                        demo: "promotion"
                    }
                ]
            },
            strategy: {
                title: "الاستراتيجية الأساسية",
                description: "تعلم المبادئ الأساسية للعب الجيد",
                steps: [
                    {
                        title: "السيطرة على المركز",
                        content: "ضع البيادق والقطع في المربعات المركزية (e4, e5, d4, d5).",
                        demo: "center-control"
                    },
                    {
                        title: "تطوير القطع",
                        content: "أخرج الأحصنة والفيلة قبل الملكة. لا تحرك نفس القطعة مرتين في الافتتاح.",
                        demo: "piece-development"
                    },
                    {
                        title: "أمان الملك",
                        content: "قم بالتبييت مبكراً لحماية الملك.",
                        demo: "king-safety"
                    },
                    {
                        title: "قيمة القطع",
                        content: "بيدق=1، حصان/فيل=3، رخ=5، ملكة=9. لا تضحي بقطعة ثمينة مقابل رخيصة.",
                        demo: "piece-values"
                    }
                ]
            },
            tactics: {
                title: "التكتيكات الأساسية",
                description: "تعلم الحيل والخدع التكتيكية",
                steps: [
                    {
                        title: "الشوكة",
                        content: "مهاجمة قطعتين أو أكثر بحركة واحدة.",
                        demo: "fork"
                    },
                    {
                        title: "التسمير",
                        content: "منع قطعة من الحركة لأن ذلك سيعرض قطعة أهم للخطر.",
                        demo: "pin"
                    },
                    {
                        title: "الكشف المزدوج",
                        content: "كشف الملك من قطعتين في نفس الوقت.",
                        demo: "discovered-check"
                    },
                    {
                        title: "الإغراء",
                        content: "إجبار قطعة على الذهاب لمربع سيء.",
                        demo: "deflection"
                    }
                ]
            }
        };
    }

    showTutorial() {
        this.isActive = true;
        this.createTutorialUI();
    }

    hideTutorial() {
        this.isActive = false;
        const tutorialPanel = document.getElementById('chess-tutorial-panel');
        if (tutorialPanel) {
            tutorialPanel.remove();
        }
    }

    createTutorialUI() {
        const existingPanel = document.getElementById('chess-tutorial-panel');
        if (existingPanel) {
            existingPanel.remove();
        }

        const panel = document.createElement('div');
        panel.id = 'chess-tutorial-panel';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 800px;
            max-height: 80vh;
            background: linear-gradient(145deg, rgba(30, 60, 114, 0.95), rgba(42, 82, 152, 0.95));
            border-radius: 20px;
            padding: 30px;
            color: white;
            font-family: 'Cairo', sans-serif;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            z-index: 1000;
            overflow-y: auto;
        `;

        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h2 style="margin: 0; color: #FFD700; font-size: 2rem;">📚 دليل تعلم الشطرنج</h2>
                <button onclick="chessTutorial.hideTutorial()" style="
                    background: #FF4757; 
                    border: none; 
                    color: white; 
                    padding: 10px 15px; 
                    border-radius: 50%; 
                    cursor: pointer; 
                    font-size: 1.2rem;
                    font-weight: bold;
                ">✕</button>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                ${Object.entries(this.lessons).map(([key, lesson]) => `
                    <div class="tutorial-category" onclick="chessTutorial.showLesson('${key}')" style="
                        background: rgba(255,255,255,0.1);
                        border-radius: 15px;
                        padding: 20px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        border: 1px solid rgba(255,255,255,0.2);
                    " onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                        <h3 style="margin: 0 0 10px 0; color: #FFD700; font-size: 1.3rem;">${lesson.title}</h3>
                        <p style="margin: 0; opacity: 0.9; line-height: 1.6;">${lesson.description}</p>
                        <div style="margin-top: 15px; color: #4ECDC4; font-weight: 600;">
                            ${lesson.steps.length} درس →
                        </div>
                    </div>
                `).join('')}
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
                <h3 style="color: #FFD700; margin-bottom: 15px;">⚙️ إعدادات المساعدة</h3>
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input type="checkbox" ${this.showHints ? 'checked' : ''} onchange="chessTutorial.toggleHints(this.checked)" style="transform: scale(1.2);">
                        <span>إظهار النصائح أثناء اللعب</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input type="checkbox" ${this.showSuggestions ? 'checked' : ''} onchange="chessTutorial.toggleSuggestions(this.checked)" style="transform: scale(1.2);">
                        <span>إظهار الحركات المقترحة</span>
                    </label>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
    }

    showLesson(categoryKey) {
        const lesson = this.lessons[categoryKey];
        this.currentLesson = { category: categoryKey, stepIndex: 0 };
        
        const panel = document.getElementById('chess-tutorial-panel');
        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <button onclick="chessTutorial.showTutorial()" style="
                    background: #4ECDC4; 
                    border: none; 
                    color: white; 
                    padding: 10px 15px; 
                    border-radius: 10px; 
                    cursor: pointer; 
                    font-family: 'Cairo', sans-serif;
                ">← العودة للقائمة</button>
                <h2 style="margin: 0; color: #FFD700; font-size: 1.8rem;">${lesson.title}</h2>
                <button onclick="chessTutorial.hideTutorial()" style="
                    background: #FF4757; 
                    border: none; 
                    color: white; 
                    padding: 10px 15px; 
                    border-radius: 50%; 
                    cursor: pointer; 
                    font-size: 1.2rem;
                    font-weight: bold;
                ">✕</button>
            </div>

            <div id="lesson-content">
                ${this.renderLessonStep(lesson, 0)}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
                <button onclick="chessTutorial.previousStep()" ${this.currentLesson.stepIndex === 0 ? 'disabled' : ''} style="
                    background: ${this.currentLesson.stepIndex === 0 ? '#666' : '#FF6B6B'}; 
                    border: none; 
                    color: white; 
                    padding: 12px 20px; 
                    border-radius: 10px; 
                    cursor: ${this.currentLesson.stepIndex === 0 ? 'not-allowed' : 'pointer'}; 
                    font-family: 'Cairo', sans-serif;
                    font-weight: 600;
                ">← السابق</button>
                
                <div style="color: #FFD700; font-weight: 600;">
                    ${this.currentLesson.stepIndex + 1} من ${lesson.steps.length}
                </div>
                
                <button onclick="chessTutorial.nextStep()" ${this.currentLesson.stepIndex === lesson.steps.length - 1 ? 'disabled' : ''} style="
                    background: ${this.currentLesson.stepIndex === lesson.steps.length - 1 ? '#666' : '#4ECDC4'}; 
                    border: none; 
                    color: white; 
                    padding: 12px 20px; 
                    border-radius: 10px; 
                    cursor: ${this.currentLesson.stepIndex === lesson.steps.length - 1 ? 'not-allowed' : 'pointer'}; 
                    font-family: 'Cairo', sans-serif;
                    font-weight: 600;
                ">التالي →</button>
            </div>
        `;
    }

    renderLessonStep(lesson, stepIndex) {
        const step = lesson.steps[stepIndex];
        return `
            <div style="background: rgba(255,255,255,0.1); border-radius: 15px; padding: 25px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #FFD700; font-size: 1.5rem;">${step.title}</h3>
                <p style="margin: 0 0 20px 0; line-height: 1.8; font-size: 1.1rem;">${step.content}</p>
                
                <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 20px; margin-top: 20px;">
                    <h4 style="margin: 0 0 15px 0; color: #4ECDC4;">🎯 تطبيق عملي:</h4>
                    <div id="demo-area-${step.demo}" style="text-align: center;">
                        ${this.getDemoContent(step.demo)}
                    </div>
                </div>
            </div>
        `;
    }

    getDemoContent(demoType) {
        const demos = {
            'pawn-moves': `
                <div style="margin: 20px 0;">
                    <div style="display: inline-block; background: #F0D9B5; width: 40px; height: 40px; margin: 2px; border-radius: 5px; display: flex; align-items: center; justify-content: center;">♙</div>
                    <p style="margin: 10px 0; color: #FFD700;">البيدق يتحرك للأمام فقط، ويأكل قطرياً</p>
                </div>
            `,
            'rook-moves': `
                <div style="margin: 20px 0;">
                    <div style="display: inline-block; background: #B58863; width: 40px; height: 40px; margin: 2px; border-radius: 5px; display: flex; align-items: center; justify-content: center;">♖</div>
                    <p style="margin: 10px 0; color: #FFD700;">الرخ يتحرك أفقياً وعمودياً</p>
                </div>
            `,
            'bishop-moves': `
                <div style="margin: 20px 0;">
                    <div style="display: inline-block; background: #F0D9B5; width: 40px; height: 40px; margin: 2px; border-radius: 5px; display: flex; align-items: center; justify-content: center;">♗</div>
                    <p style="margin: 10px 0; color: #FFD700;">الفيل يتحرك قطرياً فقط</p>
                </div>
            `,
            'knight-moves': `
                <div style="margin: 20px 0;">
                    <div style="display: inline-block; background: #B58863; width: 40px; height: 40px; margin: 2px; border-radius: 5px; display: flex; align-items: center; justify-content: center;">♘</div>
                    <p style="margin: 10px 0; color: #FFD700;">الحصان يتحرك على شكل L</p>
                </div>
            `,
            'queen-moves': `
                <div style="margin: 20px 0;">
                    <div style="display: inline-block; background: #F0D9B5; width: 40px; height: 40px; margin: 2px; border-radius: 5px; display: flex; align-items: center; justify-content: center;">♕</div>
                    <p style="margin: 10px 0; color: #FFD700;">الملكة تجمع حركات الرخ والفيل</p>
                </div>
            `,
            'king-moves': `
                <div style="margin: 20px 0;">
                    <div style="display: inline-block; background: #B58863; width: 40px; height: 40px; margin: 2px; border-radius: 5px; display: flex; align-items: center; justify-content: center;">♔</div>
                    <p style="margin: 10px 0; color: #FFD700;">الملك يتحرك مربع واحد في أي اتجاه</p>
                </div>
            `
        };
        
        return demos[demoType] || '<p style="color: #FFD700;">تطبيق عملي قادم...</p>';
    }

    nextStep() {
        if (this.currentLesson && this.currentLesson.stepIndex < this.lessons[this.currentLesson.category].steps.length - 1) {
            this.currentLesson.stepIndex++;
            this.showLesson(this.currentLesson.category);
        }
    }

    previousStep() {
        if (this.currentLesson && this.currentLesson.stepIndex > 0) {
            this.currentLesson.stepIndex--;
            this.showLesson(this.currentLesson.category);
        }
    }

    toggleHints(enabled) {
        this.showHints = enabled;
    }

    toggleSuggestions(enabled) {
        this.showSuggestions = enabled;
    }

    // نصائح ذكية أثناء اللعب
    getSmartHint(chessEngine, selectedSquare) {
        if (!this.showHints) return null;

        const hints = [];
        
        if (selectedSquare) {
            const piece = chessEngine.board[selectedSquare[0]][selectedSquare[1]];
            const possibleMoves = chessEngine.getPossibleMoves(selectedSquare[0], selectedSquare[1]);
            
            if (piece) {
                // نصائح خاصة بكل قطعة
                switch (piece.type) {
                    case 'pawn':
                        if (selectedSquare[0] === (piece.color === 'white' ? 6 : 1)) {
                            hints.push("💡 يمكن للبيدق التحرك مربعين في أول حركة");
                        }
                        if (selectedSquare[0] === (piece.color === 'white' ? 1 : 6)) {
                            hints.push("👑 البيدق سيترقى عند الوصول للصف الأخير!");
                        }
                        break;
                        
                    case 'king':
                        if (chessEngine.canCastle(selectedSquare[0], selectedSquare[1], 'kingside') || 
                            chessEngine.canCastle(selectedSquare[0], selectedSquare[1], 'queenside')) {
                            hints.push("🏰 يمكنك القيام بالتبييت لحماية الملك");
                        }
                        break;
                        
                    case 'knight':
                        hints.push("🐎 الحصان الوحيد الذي يقفز فوق القطع الأخرى");
                        break;
                }
                
                // تحليل الحركات الممكنة
                const captureMoves = possibleMoves.filter(move => {
                    const target = chessEngine.board[move.row][move.col];
                    return target && target.color !== piece.color;
                });
                
                if (captureMoves.length > 0) {
                    hints.push(`⚔️ يمكن أكل ${captureMoves.length} قطعة`);
                }
                
                // فحص التهديدات
                if (this.isPieceUnderAttack(chessEngine, selectedSquare[0], selectedSquare[1])) {
                    hints.push("⚠️ هذه القطعة مهددة! فكر في حمايتها أو تحريكها");
                }
            }
        }
        
        // نصائح عامة
        if (chessEngine.gameStatus === 'check') {
            hints.push("🚨 الملك في خطر! يجب حمايته فوراً");
        }
        
        return hints.length > 0 ? hints[Math.floor(Math.random() * hints.length)] : null;
    }

    // اقتراحات الحركات الذكية
    getSuggestedMoves(chessEngine, selectedSquare) {
        if (!this.showSuggestions || !selectedSquare) return [];

        const piece = chessEngine.board[selectedSquare[0]][selectedSquare[1]];
        if (!piece) return [];

        const possibleMoves = chessEngine.getPossibleMoves(selectedSquare[0], selectedSquare[1]);
        const suggestions = [];

        possibleMoves.forEach(move => {
            const target = chessEngine.board[move.row][move.col];
            let priority = 0;
            let reason = "";

            // تقييم الحركة
            if (target && target.color !== piece.color) {
                priority += this.getPieceValue(target.type) * 10;
                reason = `أكل ${this.getPieceNameArabic(target.type)}`;
            }

            // حماية الملك
            if (chessEngine.gameStatus === 'check') {
                priority += 100;
                reason = "حماية الملك";
            }

            // السيطرة على المركز
            if (this.isCenterSquare(move.row, move.col)) {
                priority += 5;
                reason = reason || "السيطرة على المركز";
            }

            // تطوير القطع
            if (piece.type !== 'pawn' && this.isGoodDevelopmentSquare(move.row, move.col, piece.color)) {
                priority += 3;
                reason = reason || "تطوير القطعة";
            }

            suggestions.push({
                move: move,
                priority: priority,
                reason: reason || "حركة عادية"
            });
        });

        // ترتيب الاقتراحات حسب الأولوية
        return suggestions.sort((a, b) => b.priority - a.priority).slice(0, 3);
    }

    isPieceUnderAttack(chessEngine, row, col) {
        const piece = chessEngine.board[row][col];
        if (!piece) return false;
        
        return chessEngine.isSquareUnderAttack(row, col, piece.color === 'white');
    }

    getPieceValue(type) {
        const values = {
            'pawn': 1, 'knight': 3, 'bishop': 3, 
            'rook': 5, 'queen': 9, 'king': 100
        };
        return values[type] || 0;
    }

    getPieceNameArabic(type) {
        const names = {
            'pawn': 'بيدق', 'knight': 'حصان', 'bishop': 'فيل',
            'rook': 'رخ', 'queen': 'ملكة', 'king': 'ملك'
        };
        return names[type] || type;
    }

    isCenterSquare(row, col) {
        return (row >= 3 && row <= 4) && (col >= 3 && col <= 4);
    }

    isGoodDevelopmentSquare(row, col, color) {
        if (color === 'white') {
            return row <= 5; // تطوير للأمام
        } else {
            return row >= 2; // تطوير للأمام
        }
    }
}

// إنشاء مثيل عام للدليل التعليمي
const chessTutorial = new ChessTutorial();
