// === نظام الدليل التعليمي للطاولة ===

class BackgammonTutorial {
    constructor() {
        this.isActive = false;
        this.currentLesson = null;
        this.lessons = this.createLessons();
        this.showHints = true;
        this.showSuggestions = true;
    }

    createLessons() {
        return {
            basics: {
                title: "أساسيات الطاولة",
                description: "تعلم قواعد اللعبة الأساسية",
                steps: [
                    {
                        title: "هدف اللعبة",
                        content: "الهدف هو نقل جميع قطعك الـ15 إلى الربع الأخير ثم إنزالها من اللوحة قبل خصمك.",
                        demo: "game-objective"
                    },
                    {
                        title: "ترقيم النقاط",
                        content: "اللوحة تحتوي على 24 نقطة مرقمة من 1-24. كل لاعب يبدأ من جهة مختلفة.",
                        demo: "board-numbering"
                    },
                    {
                        title: "الوضعية الابتدائية",
                        content: "كل لاعب يبدأ بـ15 قطعة موزعة على النقاط: 2 في النقطة 24، 5 في النقطة 13، 3 في النقطة 8، 5 في النقطة 6.",
                        demo: "starting-position"
                    },
                    {
                        title: "رمي النرد",
                        content: "كل لاعب يرمي نردين. الأرقام تحدد عدد النقاط التي يمكن تحريك القطع إليها.",
                        demo: "dice-rolling"
                    },
                    {
                        title: "تحريك القطع",
                        content: "تتحرك القطع في اتجاه واحد فقط نحو منطقة الإنزال. يمكن تحريك قطعة واحدة بمجموع النردين أو قطعتين منفصلتين.",
                        demo: "piece-movement"
                    }
                ]
            },
            rules: {
                title: "القوانين المتقدمة",
                description: "تعلم القوانين الخاصة والمعقدة",
                steps: [
                    {
                        title: "الأسر (Hitting)",
                        content: "إذا هبطت على نقطة تحتوي على قطعة واحدة للخصم، تُأسر قطعته وتذهب للشريط الأوسط.",
                        demo: "hitting"
                    },
                    {
                        title: "الدخول من الشريط",
                        content: "القطع المأسورة يجب إدخالها من منطقة الخصم (النقاط 1-6 أو 19-24) قبل تحريك أي قطعة أخرى.",
                        demo: "entering"
                    },
                    {
                        title: "الحماية",
                        content: "النقطة التي تحتوي على قطعتين أو أكثر محمية ولا يمكن للخصم الهبوط عليها.",
                        demo: "blocking"
                    },
                    {
                        title: "الدبل (Doubles)",
                        content: "عندما يظهر رقم متشابه على النردين، تلعب 4 حركات بدلاً من 2.",
                        demo: "doubles"
                    },
                    {
                        title: "الإنزال (Bearing Off)",
                        content: "عندما تصل جميع قطعك للربع الأخير، يمكنك البدء في إنزالها من اللوحة.",
                        demo: "bearing-off"
                    }
                ]
            },
            strategy: {
                title: "الاستراتيجية الأساسية",
                description: "تعلم التكتيكات والاستراتيجيات الفعالة",
                steps: [
                    {
                        title: "السباق (Racing)",
                        content: "عندما لا توجد قطع متلامسة، ركز على تحريك قطعك بأسرع ما يمكن.",
                        demo: "racing"
                    },
                    {
                        title: "بناء الحواجز",
                        content: "أنشئ نقاط محمية متتالية لمنع قطع الخصم من المرور.",
                        demo: "priming"
                    },
                    {
                        title: "الهجوم",
                        content: "اترك قطع الخصم مكشوفة واضربها عندما تستطيع.",
                        demo: "attacking"
                    },
                    {
                        title: "الدفاع",
                        content: "احم قطعك من الأسر وتجنب ترك قطع مكشوفة.",
                        demo: "defending"
                    },
                    {
                        title: "إدارة الإنزال",
                        content: "في مرحلة الإنزال، رتب قطعك لتقليل الهدر في النرد.",
                        demo: "bearoff-strategy"
                    }
                ]
            },
            scoring: {
                title: "نظام النقاط",
                description: "تعلم كيفية حساب النقاط والفوز",
                steps: [
                    {
                        title: "الفوز العادي",
                        content: "إذا أنزل الخصم قطعة واحدة على الأقل، تحصل على نقطة واحدة.",
                        demo: "normal-win"
                    },
                    {
                        title: "الجامون (Gammon)",
                        content: "إذا لم ينزل الخصم أي قطعة، تحصل على نقطتين.",
                        demo: "gammon"
                    },
                    {
                        title: "الباك جامون (Backgammon)",
                        content: "إذا لم ينزل الخصم أي قطعة وله قطع في منطقتك أو مأسورة، تحصل على 3 نقاط.",
                        demo: "backgammon"
                    },
                    {
                        title: "مضاعف الرهان",
                        content: "يمكن مضاعفة قيمة اللعبة باستخدام مكعب المضاعفة.",
                        demo: "doubling-cube"
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
        const tutorialPanel = document.getElementById('backgammon-tutorial-panel');
        if (tutorialPanel) {
            tutorialPanel.remove();
        }
    }

    createTutorialUI() {
        const existingPanel = document.getElementById('backgammon-tutorial-panel');
        if (existingPanel) {
            existingPanel.remove();
        }

        const panel = document.createElement('div');
        panel.id = 'backgammon-tutorial-panel';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 900px;
            max-height: 80vh;
            background: linear-gradient(145deg, rgba(139, 69, 19, 0.95), rgba(160, 82, 45, 0.95));
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
                <h2 style="margin: 0; color: #FFD700; font-size: 2rem;">🎲 دليل تعلم الطاولة</h2>
                <button onclick="backgammonTutorial.hideTutorial()" style="
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
                    <div class="tutorial-category" onclick="backgammonTutorial.showLesson('${key}')" style="
                        background: rgba(255,255,255,0.1);
                        border-radius: 15px;
                        padding: 20px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        border: 1px solid rgba(255,255,255,0.2);
                    " onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                        <h3 style="margin: 0 0 10px 0; color: #FFD700; font-size: 1.3rem;">${lesson.title}</h3>
                        <p style="margin: 0; opacity: 0.9; line-height: 1.6;">${lesson.description}</p>
                        <div style="margin-top: 15px; color: #F0D9B5; font-weight: 600;">
                            ${lesson.steps.length} درس →
                        </div>
                    </div>
                `).join('')}
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
                <h3 style="color: #FFD700; margin-bottom: 15px;">⚙️ إعدادات المساعدة</h3>
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input type="checkbox" ${this.showHints ? 'checked' : ''} onchange="backgammonTutorial.toggleHints(this.checked)" style="transform: scale(1.2);">
                        <span>إظهار النصائح أثناء اللعب</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input type="checkbox" ${this.showSuggestions ? 'checked' : ''} onchange="backgammonTutorial.toggleSuggestions(this.checked)" style="transform: scale(1.2);">
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
        
        const panel = document.getElementById('backgammon-tutorial-panel');
        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <button onclick="backgammonTutorial.showTutorial()" style="
                    background: #F0D9B5; 
                    border: none; 
                    color: #8B4513; 
                    padding: 10px 15px; 
                    border-radius: 10px; 
                    cursor: pointer; 
                    font-family: 'Cairo', sans-serif;
                    font-weight: 600;
                ">← العودة للقائمة</button>
                <h2 style="margin: 0; color: #FFD700; font-size: 1.8rem;">${lesson.title}</h2>
                <button onclick="backgammonTutorial.hideTutorial()" style="
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
                <button onclick="backgammonTutorial.previousStep()" ${this.currentLesson.stepIndex === 0 ? 'disabled' : ''} style="
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
                
                <button onclick="backgammonTutorial.nextStep()" ${this.currentLesson.stepIndex === lesson.steps.length - 1 ? 'disabled' : ''} style="
                    background: ${this.currentLesson.stepIndex === lesson.steps.length - 1 ? '#666' : '#F0D9B5'}; 
                    border: none; 
                    color: #8B4513; 
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
                    <h4 style="margin: 0 0 15px 0; color: #F0D9B5;">🎯 مثال توضيحي:</h4>
                    <div id="demo-area-${step.demo}" style="text-align: center;">
                        ${this.getDemoContent(step.demo)}
                    </div>
                </div>
            </div>
        `;
    }

    getDemoContent(demoType) {
        const demos = {
            'game-objective': `
                <div style="margin: 20px 0;">
                    <div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
                        <div style="background: #F0F0F0; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #333;">⚪</div>
                        <span style="color: #FFD700;">→</span>
                        <div style="background: #F0F0F0; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #333;">⚪</div>
                        <span style="color: #FFD700;">→</span>
                        <div style="background: #333; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">✓</div>
                    </div>
                    <p style="margin: 10px 0; color: #F0D9B5;">انقل جميع قطعك إلى الربع الأخير ثم أنزلها</p>
                </div>
            `,
            'board-numbering': `
                <div style="margin: 20px 0;">
                    <div style="display: grid; grid-template-columns: repeat(6, 30px); gap: 2px; margin: 15px auto; width: fit-content;">
                        ${Array.from({length: 6}, (_, i) => `
                            <div style="background: ${i % 2 === 0 ? '#F0D9B5' : '#B58863'}; width: 30px; height: 40px; border-radius: 0 0 15px 15px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #333;">${24-i}</div>
                        `).join('')}
                    </div>
                    <p style="margin: 10px 0; color: #F0D9B5;">النقاط مرقمة من 1-24</p>
                </div>
            `,
            'starting-position': `
                <div style="margin: 20px 0;">
                    <div style="display: flex; justify-content: center; gap: 5px; margin: 15px 0;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div style="background: #F0F0F0; width: 20px; height: 20px; border-radius: 50%; margin: 1px;"></div>
                            <div style="background: #F0F0F0; width: 20px; height: 20px; border-radius: 50%; margin: 1px;"></div>
                            <small style="color: #F0D9B5;">24</small>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div style="background: #F0F0F0; width: 20px; height: 20px; border-radius: 50%; margin: 1px;"></div>
                            <div style="background: #F0F0F0; width: 20px; height: 20px; border-radius: 50%; margin: 1px;"></div>
                            <div style="background: #F0F0F0; width: 20px; height: 20px; border-radius: 50%; margin: 1px;"></div>
                            <div style="background: #F0F0F0; width: 20px; height: 20px; border-radius: 50%; margin: 1px;"></div>
                            <div style="background: #F0F0F0; width: 20px; height: 20px; border-radius: 50%; margin: 1px;"></div>
                            <small style="color: #F0D9B5;">13</small>
                        </div>
                    </div>
                    <p style="margin: 10px 0; color: #F0D9B5;">الوضعية الابتدائية للقطع</p>
                </div>
            `,
            'dice-rolling': `
                <div style="margin: 20px 0;">
                    <div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
                        <div style="background: white; width: 40px; height: 40px; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: #333; font-weight: bold; border: 2px solid #333;">3</div>
                        <div style="background: white; width: 40px; height: 40px; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: #333; font-weight: bold; border: 2px solid #333;">5</div>
                    </div>
                    <p style="margin: 10px 0; color: #F0D9B5;">يمكن تحريك قطعة 3 نقاط وأخرى 5 نقاط</p>
                </div>
            `,
            'piece-movement': `
                <div style="margin: 20px 0;">
                    <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin: 15px 0;">
                        <div style="background: #F0F0F0; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #333;">⚪</div>
                        <span style="color: #FFD700;">→</span>
                        <div style="background: #F0F0F0; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #333;">⚪</div>
                    </div>
                    <p style="margin: 10px 0; color: #F0D9B5;">القطع تتحرك في اتجاه واحد نحو الهدف</p>
                </div>
            `
        };
        
        return demos[demoType] || '<p style="color: #F0D9B5;">مثال توضيحي قادم...</p>';
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
    getSmartHint(backgammonEngine, dice) {
        if (!this.showHints) return null;

        const hints = [];
        const currentPlayer = backgammonEngine.isWhiteTurn ? 'white' : 'black';
        
        // نصائح خاصة بحالة النرد
        if (dice && dice.length === 2) {
            if (dice[0] === dice[1]) {
                hints.push(`🎲 دبل ${dice[0]}! يمكنك لعب 4 حركات`);
            }
            
            if (dice.includes(6)) {
                hints.push("⚡ رقم 6 ممتاز للهروب من منطقة الخصم");
            }
            
            if (dice[0] + dice[1] >= 8) {
                hints.push("🏃 مجموع عالي - فرصة جيدة للتقدم السريع");
            }
        }
        
        // نصائح حسب حالة اللعبة
        const capturedPieces = backgammonEngine.board[currentPlayer === 'white' ? 25 : 26].pieces;
        if (capturedPieces > 0) {
            hints.push("🚨 لديك قطع مأسورة - يجب إدخالها أولاً");
        }
        
        // فحص إمكانية الأسر
        const vulnerablePieces = this.findVulnerablePieces(backgammonEngine, currentPlayer);
        if (vulnerablePieces.length > 0) {
            hints.push(`⚔️ يمكنك أسر ${vulnerablePieces.length} قطعة للخصم`);
        }
        
        // نصائح الإنزال
        if (this.canStartBearingOff(backgammonEngine, currentPlayer)) {
            hints.push("🎯 جميع قطعك في الربع الأخير - يمكنك البدء في الإنزال");
        }
        
        // نصائح الدفاع
        const exposedPieces = this.findExposedPieces(backgammonEngine, currentPlayer);
        if (exposedPieces.length > 0) {
            hints.push("🛡️ احذر! لديك قطع مكشوفة قابلة للأسر");
        }
        
        return hints.length > 0 ? hints[Math.floor(Math.random() * hints.length)] : null;
    }

    // اقتراحات الحركات الذكية
    getSuggestedMoves(backgammonEngine, pointNumber, dice) {
        if (!this.showSuggestions || !dice || dice.length === 0) return [];

        const suggestions = [];
        const currentPlayer = backgammonEngine.isWhiteTurn ? 'white' : 'black';
        
        dice.forEach(diceValue => {
            const targetPoint = currentPlayer === 'white' ? 
                pointNumber - diceValue : pointNumber + diceValue;
            
            if (this.isValidMove(backgammonEngine, pointNumber, targetPoint, currentPlayer)) {
                let priority = 0;
                let reason = "";
                
                // تقييم الحركة
                const targetPointData = backgammonEngine.board[targetPoint];
                
                // أسر قطعة الخصم
                if (targetPointData && targetPointData.pieces === 1 && 
                    targetPointData.color !== currentPlayer) {
                    priority += 50;
                    reason = "أسر قطعة الخصم";
                }
                
                // بناء نقطة محمية
                if (targetPointData && targetPointData.color === currentPlayer && 
                    targetPointData.pieces === 1) {
                    priority += 30;
                    reason = "بناء نقطة محمية";
                }
                
                // الهروب من منطقة الخصم
                if (this.isInOpponentHome(pointNumber, currentPlayer)) {
                    priority += 25;
                    reason = "الهروب من منطقة الخصم";
                }
                
                // التقدم نحو الهدف
                if (this.isProgressingToHome(pointNumber, targetPoint, currentPlayer)) {
                    priority += 15;
                    reason = "التقدم نحو الهدف";
                }
                
                // الإنزال
                if (this.isBearingOffMove(targetPoint, currentPlayer)) {
                    priority += 40;
                    reason = "إنزال قطعة";
                }
                
                suggestions.push({
                    from: pointNumber,
                    to: targetPoint,
                    dice: diceValue,
                    priority: priority,
                    reason: reason || "حركة عادية"
                });
            }
        });
        
        return suggestions.sort((a, b) => b.priority - a.priority);
    }

    findVulnerablePieces(backgammonEngine, currentPlayer) {
        const vulnerable = [];
        const opponentColor = currentPlayer === 'white' ? 'black' : 'white';
        
        for (let point = 1; point <= 24; point++) {
            const pointData = backgammonEngine.board[point];
            if (pointData && pointData.color === opponentColor && pointData.pieces === 1) {
                // فحص إمكانية الوصول لهذه النقطة
                if (this.canReachPoint(backgammonEngine, point, currentPlayer)) {
                    vulnerable.push(point);
                }
            }
        }
        
        return vulnerable;
    }

    findExposedPieces(backgammonEngine, currentPlayer) {
        const exposed = [];
        
        for (let point = 1; point <= 24; point++) {
            const pointData = backgammonEngine.board[point];
            if (pointData && pointData.color === currentPlayer && pointData.pieces === 1) {
                exposed.push(point);
            }
        }
        
        return exposed;
    }

    canStartBearingOff(backgammonEngine, currentPlayer) {
        const homeStart = currentPlayer === 'white' ? 1 : 19;
        const homeEnd = currentPlayer === 'white' ? 6 : 24;
        
        for (let point = 1; point <= 24; point++) {
            if (point < homeStart || point > homeEnd) {
                const pointData = backgammonEngine.board[point];
                if (pointData && pointData.color === currentPlayer && pointData.pieces > 0) {
                    return false;
                }
            }
        }
        
        return true;
    }

    isValidMove(backgammonEngine, from, to, currentPlayer) {
        if (to < 1 || to > 24) return false;
        
        const targetPoint = backgammonEngine.board[to];
        if (targetPoint && targetPoint.color !== currentPlayer && targetPoint.pieces > 1) {
            return false;
        }
        
        return true;
    }

    isInOpponentHome(point, currentPlayer) {
        if (currentPlayer === 'white') {
            return point >= 19 && point <= 24;
        } else {
            return point >= 1 && point <= 6;
        }
    }

    isProgressingToHome(from, to, currentPlayer) {
        if (currentPlayer === 'white') {
            return to < from;
        } else {
            return to > from;
        }
    }

    isBearingOffMove(targetPoint, currentPlayer) {
        return targetPoint < 1 || targetPoint > 24;
    }

    canReachPoint(backgammonEngine, targetPoint, currentPlayer) {
        // تحقق مبسط - يمكن تحسينه
        return true;
    }
}

// إنشاء مثيل عام للدليل التعليمي
const backgammonTutorial = new BackgammonTutorial();
