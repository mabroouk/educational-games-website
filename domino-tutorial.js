// === نظام الدليل التعليمي للدومينو ===

class DominoTutorial {
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
                title: "أساسيات الدومينو",
                description: "تعلم قواعد اللعبة الأساسية",
                steps: [
                    {
                        title: "هدف اللعبة",
                        content: "الهدف هو التخلص من جميع قطع الدومينو في يدك قبل خصمك. كل قطعة تحتوي على رقمين من 0 إلى 6.",
                        demo: "game-objective"
                    },
                    {
                        title: "قطع الدومينو",
                        content: "مجموعة الدومينو تحتوي على 28 قطعة. كل قطعة لها جانبان بأرقام من 0-6. القطع المتشابهة تسمى 'دبل'.",
                        demo: "domino-pieces"
                    },
                    {
                        title: "بداية اللعبة",
                        content: "كل لاعب يأخذ 7 قطع. اللاعب الذي لديه أعلى دبل يبدأ اللعب. إذا لم يوجد دبل، يبدأ صاحب أعلى مجموع.",
                        demo: "game-start"
                    },
                    {
                        title: "وضع القطع",
                        content: "القطع توضع في خط مستقيم. كل قطعة جديدة يجب أن تلامس قطعة موجودة بنفس الرقم.",
                        demo: "placing-tiles"
                    },
                    {
                        title: "سحب القطع",
                        content: "إذا لم تستطع اللعب، اسحب قطعة من المخزون. إذا لم توجد قطع، مرر دورك.",
                        demo: "drawing-tiles"
                    }
                ]
            },
            rules: {
                title: "القوانين المتقدمة",
                description: "تعلم القوانين الخاصة والمعقدة",
                steps: [
                    {
                        title: "قانون الدبل",
                        content: "القطع المزدوجة (الدبل) توضع عمودياً وتعتبر نقطة تفرع. يمكن اللعب على جانبيها.",
                        demo: "double-rule"
                    },
                    {
                        title: "الحصار",
                        content: "إذا لم يستطع أي لاعب اللعب ولم توجد قطع للسحب، تنتهي اللعبة. الفائز هو صاحب أقل نقاط.",
                        demo: "blocking"
                    },
                    {
                        title: "حساب النقاط",
                        content: "عند انتهاء اللعبة، اجمع نقاط القطع المتبقية في يد الخاسر. هذه نقاط الفائز.",
                        demo: "scoring"
                    },
                    {
                        title: "الدومينو المغلق",
                        content: "عندما تصبح نهايتا الخط بنفس الرقم ولا توجد قطع أخرى بهذا الرقم، يحدث إغلاق.",
                        demo: "closed-domino"
                    },
                    {
                        title: "استراتيجية الأرقام",
                        content: "احتفظ بتنوع الأرقام في يدك. تجنب التخلص من جميع قطع رقم معين مبكراً.",
                        demo: "number-strategy"
                    }
                ]
            },
            strategy: {
                title: "الاستراتيجية الأساسية",
                description: "تعلم التكتيكات والاستراتيجيات الفعالة",
                steps: [
                    {
                        title: "اللعب الهجومي",
                        content: "العب القطع الثقيلة (ذات النقاط العالية) أولاً للتخلص منها. ركز على إنهاء يدك بسرعة.",
                        demo: "offensive-play"
                    },
                    {
                        title: "اللعب الدفاعي",
                        content: "راقب قطع الخصم وحاول منعه من اللعب. العب الأرقام التي لا يملكها.",
                        demo: "defensive-play"
                    },
                    {
                        title: "إدارة الدبل",
                        content: "استخدم الدبل بحكمة. يمكن أن تفتح إمكانيات جديدة أو تحصر الخصم.",
                        demo: "double-management"
                    },
                    {
                        title: "مراقبة الخصم",
                        content: "انتبه لما يلعبه الخصم وما يمرره. هذا يعطيك فكرة عن قطعه.",
                        demo: "opponent-watching"
                    },
                    {
                        title: "التحكم في النهايات",
                        content: "حاول السيطرة على نهايتي الخط بأرقام تملك منها قطعاً كثيرة.",
                        demo: "end-control"
                    }
                ]
            },
            advanced: {
                title: "التكتيكات المتقدمة",
                description: "استراتيجيات الخبراء والمحترفين",
                steps: [
                    {
                        title: "حساب القطع",
                        content: "احتفظ بحساب القطع المُلعبة لكل رقم. هذا يساعدك في التنبؤ بقطع الخصم.",
                        demo: "tile-counting"
                    },
                    {
                        title: "الفخاخ الاستراتيجية",
                        content: "أنشئ مواقف تجبر الخصم على اللعب بطريقة تخدم استراتيجيتك.",
                        demo: "strategic-traps"
                    },
                    {
                        title: "إدارة المخاطر",
                        content: "وازن بين المخاطرة والأمان. أحياناً المخاطرة المحسوبة تؤدي للفوز.",
                        demo: "risk-management"
                    },
                    {
                        title: "اللعب النفسي",
                        content: "استخدم التوقيت والتردد لإرباك الخصم. لكن لا تفرط في ذلك.",
                        demo: "psychological-play"
                    },
                    {
                        title: "التكيف مع الموقف",
                        content: "غير استراتيجيتك حسب تطور اللعبة. المرونة مفتاح النجاح.",
                        demo: "situational-adaptation"
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
        const tutorialPanel = document.getElementById('domino-tutorial-panel');
        if (tutorialPanel) {
            tutorialPanel.remove();
        }
    }

    createTutorialUI() {
        const existingPanel = document.getElementById('domino-tutorial-panel');
        if (existingPanel) {
            existingPanel.remove();
        }

        const panel = document.createElement('div');
        panel.id = 'domino-tutorial-panel';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 900px;
            max-height: 80vh;
            background: linear-gradient(145deg, rgba(34, 34, 34, 0.95), rgba(68, 68, 68, 0.95));
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
                <h2 style="margin: 0; color: #FFD700; font-size: 2rem;">🎯 دليل تعلم الدومينو</h2>
                <button onclick="dominoTutorial.hideTutorial()" style="
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
                    <div class="tutorial-category" onclick="dominoTutorial.showLesson('${key}')" style="
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
                        <input type="checkbox" ${this.showHints ? 'checked' : ''} onchange="dominoTutorial.toggleHints(this.checked)" style="transform: scale(1.2);">
                        <span>إظهار النصائح أثناء اللعب</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input type="checkbox" ${this.showSuggestions ? 'checked' : ''} onchange="dominoTutorial.toggleSuggestions(this.checked)" style="transform: scale(1.2);">
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
        
        const panel = document.getElementById('domino-tutorial-panel');
        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <button onclick="dominoTutorial.showTutorial()" style="
                    background: #4ECDC4; 
                    border: none; 
                    color: white; 
                    padding: 10px 15px; 
                    border-radius: 10px; 
                    cursor: pointer; 
                    font-family: 'Cairo', sans-serif;
                    font-weight: 600;
                ">← العودة للقائمة</button>
                <h2 style="margin: 0; color: #FFD700; font-size: 1.8rem;">${lesson.title}</h2>
                <button onclick="dominoTutorial.hideTutorial()" style="
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
                <button onclick="dominoTutorial.previousStep()" ${this.currentLesson.stepIndex === 0 ? 'disabled' : ''} style="
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
                
                <button onclick="dominoTutorial.nextStep()" ${this.currentLesson.stepIndex === lesson.steps.length - 1 ? 'disabled' : ''} style="
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
                    <h4 style="margin: 0 0 15px 0; color: #4ECDC4;">🎯 مثال توضيحي:</h4>
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
                        <div style="background: white; width: 40px; height: 20px; border-radius: 3px; display: flex; align-items: center; justify-content: center; color: #333; font-size: 0.8rem; border: 1px solid #333;">3|5</div>
                        <div style="background: white; width: 40px; height: 20px; border-radius: 3px; display: flex; align-items: center; justify-content: center; color: #333; font-size: 0.8rem; border: 1px solid #333;">2|4</div>
                        <span style="color: #FFD700;">→</span>
                        <div style="background: #333; width: 40px; height: 20px; border-radius: 3px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem;">✓</div>
                    </div>
                    <p style="margin: 10px 0; color: #4ECDC4;">تخلص من جميع قطعك قبل الخصم</p>
                </div>
            `,
            'domino-pieces': `
                <div style="margin: 20px 0;">
                    <div style="display: flex; justify-content: center; gap: 5px; margin: 15px 0; flex-wrap: wrap;">
                        <div style="background: white; width: 35px; height: 18px; border-radius: 3px; display: flex; align-items: center; justify-content: center; color: #333; font-size: 0.7rem; border: 1px solid #333;">0|0</div>
                        <div style="background: white; width: 35px; height: 18px; border-radius: 3px; display: flex; align-items: center; justify-content: center; color: #333; font-size: 0.7rem; border: 1px solid #333;">1|1</div>
                        <div style="background: white; width: 35px; height: 18px; border-radius: 3px; display: flex; align-items: center; justify-content: center; color: #333; font-size: 0.7rem; border: 1px solid #333;">2|2</div>
                        <div style="background: white; width: 35px; height: 18px; border-radius: 3px; display: flex; align-items: center; justify-content: center; color: #333; font-size: 0.7rem; border: 1px solid #333;">3|3</div>
                    </div>
                    <p style="margin: 10px 0; color: #4ECDC4;">قطع الدبل (الأرقام المتشابهة)</p>
                </div>
            `,
            'placing-tiles': `
                <div style="margin: 20px 0;">
                    <div style="display: flex; justify-content: center; align-items: center; gap: 2px; margin: 15px 0;">
                        <div style="background: white; width: 35px; height: 18px; border-radius: 3px; display: flex; align-items: center; justify-content: center; color: #333; font-size: 0.7rem; border: 1px solid #333;">3|5</div>
                        <div style="background: white; width: 35px; height: 18px; border-radius: 3px; display: flex; align-items: center; justify-content: center; color: #333; font-size: 0.7rem; border: 1px solid #333;">5|2</div>
                        <div style="background: white; width: 35px; height: 18px; border-radius: 3px; display: flex; align-items: center; justify-content: center; color: #333; font-size: 0.7rem; border: 1px solid #333;">2|6</div>
                    </div>
                    <p style="margin: 10px 0; color: #4ECDC4;">الأرقام المتلامسة يجب أن تتطابق</p>
                </div>
            `
        };
        
        return demos[demoType] || '<p style="color: #4ECDC4;">مثال توضيحي قادم...</p>';
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
    getSmartHint(dominoEngine) {
        if (!this.showHints) return null;

        const hints = [];
        const validMoves = dominoEngine.getValidMoves(dominoEngine.playerHand);
        
        // نصائح حسب حالة اللعبة
        if (dominoEngine.playerHand.length <= 3) {
            hints.push("🎯 أنت قريب من الفوز! ركز على إنهاء قطعك");
        }
        
        if (validMoves.length === 0) {
            if (dominoEngine.tiles.length > 0) {
                hints.push("🎲 لا توجد حركات صالحة - اسحب قطعة من المخزون");
            } else {
                hints.push("⏸️ لا توجد حركات صالحة - سيتم تمرير دورك");
            }
        }
        
        // نصائح الاستراتيجية
        const heavyTiles = dominoEngine.playerHand.filter(tile => (tile.left + tile.right) >= 10);
        if (heavyTiles.length > 0) {
            hints.push("⚡ لديك قطع ثقيلة - حاول التخلص منها أولاً");
        }
        
        const doubles = dominoEngine.playerHand.filter(tile => tile.isDouble);
        if (doubles.length > 0) {
            hints.push("🎯 لديك قطع دبل - استخدمها لفتح إمكانيات جديدة");
        }
        
        // نصائح حسب طول اللوحة
        if (dominoEngine.board.length > 10) {
            hints.push("📏 اللوحة طويلة - انتبه للأرقام المتاحة في النهايات");
        }
        
        return hints.length > 0 ? hints[Math.floor(Math.random() * hints.length)] : null;
    }

    // اقتراحات الحركات الذكية
    getSuggestedMoves(dominoEngine) {
        if (!this.showSuggestions) return [];

        const validMoves = dominoEngine.getValidMoves(dominoEngine.playerHand);
        const suggestions = [];
        
        validMoves.forEach(move => {
            let priority = 0;
            let reason = "";
            const tile = move.tile;
            
            // تقييم الحركة
            const tileValue = tile.left + tile.right;
            
            // تفضيل القطع الثقيلة
            if (tileValue >= 10) {
                priority += 30;
                reason = "قطعة ثقيلة - تخلص منها";
            } else if (tileValue <= 3) {
                priority += 10;
                reason = "قطعة خفيفة - احتفظ بها للنهاية";
            }
            
            // تفضيل الدبل
            if (tile.isDouble) {
                priority += 25;
                reason = "دبل - يفتح إمكانيات جديدة";
            }
            
            // تفضيل القطع التي تفتح أرقام متنوعة
            const playerNumbers = this.getPlayerNumbers(dominoEngine.playerHand);
            const newNumber = move.position === 'left' ? 
                (move.needsFlip ? tile.left : tile.right) :
                (move.needsFlip ? tile.right : tile.left);
            
            const numberCount = playerNumbers[newNumber] || 0;
            if (numberCount > 1) {
                priority += numberCount * 5;
                reason = `لديك ${numberCount} قطع بالرقم ${newNumber}`;
            }
            
            // تجنب الأرقام النادرة
            if (numberCount === 0) {
                priority -= 15;
                reason = "قد يحصرك - ليس لديك قطع أخرى بهذا الرقم";
            }
            
            // إنهاء اللعبة
            if (dominoEngine.playerHand.length === 1) {
                priority += 50;
                reason = "حركة الفوز!";
            }
            
            suggestions.push({
                move: move,
                priority: priority,
                reason: reason || "حركة عادية",
                tile: tile
            });
        });
        
        return suggestions.sort((a, b) => b.priority - a.priority);
    }

    getPlayerNumbers(hand) {
        const numbers = {};
        hand.forEach(tile => {
            numbers[tile.left] = (numbers[tile.left] || 0) + 1;
            if (tile.left !== tile.right) {
                numbers[tile.right] = (numbers[tile.right] || 0) + 1;
            }
        });
        return numbers;
    }
}

// إنشاء مثيل عام للدليل التعليمي
const dominoTutorial = new DominoTutorial();
