/**
 * FITFLOW REDESIGN — APPLICATION ENGINE & ARCHITECTURE RUNTIME
 * Features:
 *  - Active Workout Companion & Web Speech API Voice Coach
 *  - Real-Time Rest Timer with Web Audio Synthesizer Beeps
 *  - Smart Nutrition & Dynamic Calorie/Macro Aggregation
 *  - AI Microservice Simulator (FastAPI Recommendation Logic)
 *  - Biometrics Canvas Progress Visualizer
 *  - Live Community Social Feed & Leaderboard
 *  - Interactive System Architecture Node Explorer & Weighted Matrix Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // ==========================================
  // 1. STATE STORE & DATA MODELS
  // ==========================================
  const state = {
    user: {
      name: 'Jordan Sterling',
      goal: 'Hypertrophy Pro',
      weightKg: 78.5,
      targetWeightKg: 75.0,
      heightCm: 182,
      dailyCaloriesTarget: 2450,
      proteinTarget: 165,
      carbsTarget: 245,
      fatsTarget: 70,
      waterTargetLiters: 3.5,
      waterLoggedLiters: 2.25,
      recoveryScore: 94,
      streakDays: 14,
    },
    audioCoachEnabled: true,
    activeTab: 'dashboard',
    
    // Workout Session State
    workoutSession: {
      isRunning: false,
      secondsElapsed: 0,
      timerInterval: null,
      currentRoutineId: 'push',
      currentExerciseIdx: 0,
      totalVolumeMovedKg: 14200,
      totalCaloriesBurned: 460,
    },

    // Nutrition Logs
    nutritionLogs: [
      { id: '1', type: 'BREAKFAST', name: 'Egg White Scramble, Avocado & Oatmeal', calories: 520, p: 42, c: 55, f: 14 },
      { id: '2', type: 'LUNCH', name: 'Grilled Salmon Quinoa Bowl & Steamed Broccoli', calories: 680, p: 48, c: 65, f: 24 },
      { id: '3', type: 'SNACK', name: 'Whey Isolate Shake & Rice Cakes', calories: 310, p: 32, c: 40, f: 4 },
    ],

    // Social Feed
    socialFeed: [
      {
        id: 'post-1',
        author: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120',
        content: 'Crushed a heavy Deadlift PR: 160kg x 3 reps! Progressive overload wave on point.',
        metrics: '52m • 510 kcal • 18,600 kg Volume',
        badge: '👑 Heavyweight Titan',
        likes: 48,
        liked: false,
        time: '18m ago',
      },
      {
        id: 'post-2',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
        content: '10km Tempo run in 42:15. Zone 4 aerobic threshold feeling smooth and easy.',
        metrics: '42:15 • 710 kcal • 4:13/km pace',
        badge: '⚡ Speed Demon',
        likes: 35,
        liked: false,
        time: '1h ago',
      },
      {
        id: 'post-3',
        author: 'Kai Tanaka',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120',
        content: 'Morning mobility flow & Bulgarian split squats. Glutes and quads on fire!',
        metrics: '40m • 380 kcal • 9,400 kg Volume',
        badge: '🔥 Leg Day Warrior',
        likes: 29,
        liked: false,
        time: '3h ago',
      },
    ],

    // Routines Library
    routines: {
      push: {
        title: 'Hypertrophy Alpha: Chest & Deltoids',
        exercises: [
          {
            name: 'Incline Barbell Bench Press',
            muscle: 'Upper Pectorals & Front Delts',
            sets: [
              { prev: '80kg x 10', kg: 80, reps: 10, rpe: 8, done: true },
              { prev: '80kg x 10', kg: 80, reps: 10, rpe: 8.5, done: true },
              { prev: '80kg x 8', kg: 82.5, reps: 8, rpe: 9, done: false },
              { prev: '75kg x 10', kg: 75, reps: 10, rpe: 9, done: false },
            ],
            coachTip: 'Set your shoulder blades back and down. Control the descent for 3 seconds, then press with maximum power.',
          },
          {
            name: 'Cable High-to-Low Chest Flyes',
            muscle: 'Lower Pectoralis Squeeze',
            sets: [
              { prev: '25kg x 12', kg: 25, reps: 12, rpe: 8, done: false },
              { prev: '25kg x 12', kg: 25, reps: 12, rpe: 8.5, done: false },
              { prev: '27.5kg x 10', kg: 27.5, reps: 10, rpe: 9, done: false },
            ],
            coachTip: 'Maintain a slight bend in your elbows and squeeze your inner chest with a 2-second isometric peak hold.',
          },
          {
            name: 'Standing Dumbbell Lateral Raises',
            muscle: 'Lateral Deltoids',
            sets: [
              { prev: '14kg x 15', kg: 14, reps: 15, rpe: 8.5, done: false },
              { prev: '14kg x 15', kg: 14, reps: 15, rpe: 9, done: false },
              { prev: '16kg x 12', kg: 16, reps: 12, rpe: 9.5, done: false },
            ],
            coachTip: 'Lead with your elbows and slightly rotate your thumbs down to fully isolate the lateral head.',
          },
          {
            name: 'Overhead Cable Tricep Extension',
            muscle: 'Triceps Long Head',
            sets: [
              { prev: '32kg x 12', kg: 32, reps: 12, rpe: 8, done: false },
              { prev: '32kg x 12', kg: 32, reps: 12, rpe: 9, done: false },
              { prev: '35kg x 10', kg: 35, reps: 10, rpe: 9.5, done: false },
            ],
            coachTip: 'Keep your elbows glued in position overhead to stretch the triceps long head completely.',
          },
        ],
      },
      pull: {
        title: 'Power Pull Alpha: Lats & Biceps',
        exercises: [
          {
            name: 'Weighted Pull-Ups',
            muscle: 'Latissimus Dorsi',
            sets: [
              { prev: '+10kg x 8', kg: 10, reps: 8, rpe: 8, done: false },
              { prev: '+10kg x 8', kg: 10, reps: 8, rpe: 8.5, done: false },
              { prev: '+12.5kg x 6', kg: 12.5, reps: 6, rpe: 9, done: false },
            ],
            coachTip: 'Drive elbows down to your hips, pull all the way until chin clears the bar smoothly.',
          },
          {
            name: 'Barbell Bent-Over Row',
            muscle: 'Rhomboids & Mid-Back',
            sets: [
              { prev: '75kg x 10', kg: 75, reps: 10, rpe: 8, done: false },
              { prev: '75kg x 10', kg: 75, reps: 10, rpe: 8.5, done: false },
              { prev: '80kg x 8', kg: 80, reps: 8, rpe: 9, done: false },
            ],
            coachTip: 'Maintain a 45-degree torso angle, brace core, and pull bar straight toward your navel.',
          },
        ],
      },
      legs: {
        title: 'Quadriceps & Posterior Chain',
        exercises: [
          {
            name: 'Barbell Back Squat (High Bar)',
            muscle: 'Quadriceps & Glutes',
            sets: [
              { prev: '120kg x 6', kg: 120, reps: 6, rpe: 8, done: false },
              { prev: '120kg x 6', kg: 120, reps: 6, rpe: 8.5, done: false },
              { prev: '125kg x 5', kg: 125, reps: 5, rpe: 9, done: false },
            ],
            coachTip: 'Brace your abdominal wall, break at hips and knees simultaneously, hit full depth.',
          },
          {
            name: 'Romanian Deadlift (Dumbbell)',
            muscle: 'Hamstrings & Posterior Chain',
            sets: [
              { prev: '36kg x 10', kg: 36, reps: 10, rpe: 8, done: false },
              { prev: '36kg x 10', kg: 36, reps: 10, rpe: 8.5, done: false },
            ],
            coachTip: 'Push hips straight back with soft knees, feel deep hamstring stretch before driving up.',
          },
        ],
      },
      'ai-custom': {
        title: 'AI Tailored Periodization Split',
        exercises: [
          {
            name: 'Dumbbell Incline Hex Press',
            muscle: 'Pectoralis Major Clavicular',
            sets: [
              { prev: '30kg x 12', kg: 30, reps: 12, rpe: 8, done: false },
              { prev: '32kg x 10', kg: 32, reps: 10, rpe: 8.5, done: false },
            ],
            coachTip: 'Squeeze the dumbbells together continuously throughout the entire range of motion.',
          },
          {
            name: 'Cable Rope Face Pulls',
            muscle: 'Rear Deltoids & Rotators',
            sets: [
              { prev: '20kg x 15', kg: 20, reps: 15, rpe: 8, done: false },
              { prev: '22.5kg x 15', kg: 22.5, reps: 15, rpe: 8.5, done: false },
            ],
            coachTip: 'Pull toward eyes, rotate wrists outward to externally rotate the shoulder joint.',
          },
        ],
      },
    },

    // Architecture Nodes Information
    architectureNodes: {
      flutter: {
        title: 'Flutter Client (Mobile & Web)',
        protocol: 'Protocol: HTTPS / WSS / WebAssembly',
        desc: 'Universal reactive frontend compiled to iOS, Android, and Web with 60 FPS Skia/Impeller rendering. Houses client state, audio voice coach synthesizer, and offline-first workout cache.',
      },
      nestjs: {
        title: 'NestJS Enterprise API Gateway',
        protocol: 'Protocol: REST API & Socket.io WebSockets',
        desc: 'Modular TypeScript backend orchestrating authentication, workouts, nutrition telemetry, real-time community feeds, and communicating with the Python AI microservice.',
      },
      supabase: {
        title: 'Supabase Auth & Identity',
        protocol: 'Protocol: OAuth2 / OIDC & JWT Claims',
        desc: 'Secure authentication layer integrated with PostgreSQL Row-Level Security (RLS) to enforce strict athlete data privacy.',
      },
      fastapi: {
        title: 'Python 3.11 FastAPI AI Microservice',
        protocol: 'Protocol: High-Throughput REST / gRPC',
        desc: 'Dedicated machine learning microservice for automated workout generation, progressive overload volume budgeting, and metabolic BMR/TDEE calculations.',
      },
      postgres: {
        title: 'PostgreSQL Relational Storage (Prisma ORM)',
        protocol: 'Protocol: PostgreSQL 16 Connection Pooling',
        desc: 'ACID-compliant primary database storing user profiles, sets/reps telemetry, nutrition logs, biometrics, and social interactions with JSONB support.',
      },
      redis: {
        title: 'Redis 7.x In-Memory Caching Tier',
        protocol: 'Protocol: RESP3 / Low-Latency In-Memory',
        desc: 'Sub-millisecond caching for hot workout routines, active live session tracking, real-time community leaderboard sorted sets, and rate-limiting keys.',
      },
    },
  };

  // ==========================================
  // 2. AUDIO SYNTHESIZER & VOICE COACH
  // ==========================================
  const audioCtx = window.AudioContext || window.webkitAudioContext ? new (window.AudioContext || window.webkitAudioContext)() : null;

  function playTone(freq, type, duration) {
    if (!audioCtx || !state.audioCoachEnabled) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq || 440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio tone error', e);
    }
  }

  function speakCoachTip(text) {
    if (!state.audioCoachEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  // ==========================================
  // 3. NAVIGATION & TABS
  // ==========================================
  const navItems = document.querySelectorAll('.nav-item');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const pageHeading = document.getElementById('pageHeading');
  const pageSubheading = document.getElementById('pageSubheading');

  const tabHeadings = {
    dashboard: { title: 'Athlete Overview', sub: 'Today is Friday • High Energy Micro-Cycle' },
    workout: { title: 'Active Trainer & Voice Coach', sub: 'Real-time telemetry and interval tracker' },
    nutrition: { title: 'Smart Nutrition & Macro Journal', sub: 'Dynamic metabolic caloric budgeting' },
    'ai-coach': { title: 'AI Microservice & Program Engine', sub: 'Automated progressive overload generator' },
    analytics: { title: 'Biometrics & Progression Analytics', sub: 'Track lean muscle mass & 1RM records' },
    social: { title: 'Community Feed & Leaderboard', sub: 'Live athlete rankings & milestone cheers' },
    architecture: { title: 'System Architecture & Tech Matrices', sub: 'Interactive specifications and decision matrices' },
    settings: { title: 'Athlete Profile & Biometric Settings', sub: 'Configure goals and algorithm parameters' },
  };

  function switchTab(tabId) {
    state.activeTab = tabId;
    navItems.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    tabPanes.forEach((pane) => {
      pane.classList.toggle('active', pane.id === `tab-${tabId}`);
    });

    if (tabHeadings[tabId]) {
      pageHeading.textContent = tabHeadings[tabId].title;
      pageSubheading.textContent = tabHeadings[tabId].sub;
    }

    if (tabId === 'analytics') {
      renderProgressChart();
    }
    if (tabId === 'workout') {
      renderCurrentExercise();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('startWorkoutFromDashBtn')?.addEventListener('click', () => {
    switchTab('workout');
    if (!state.workoutSession.isRunning) {
      toggleWorkoutTimer();
    }
  });

  document.getElementById('openAiCustomizerBtn')?.addEventListener('click', () => switchTab('ai-coach'));
  document.getElementById('goToNutritionTabBtn')?.addEventListener('click', () => switchTab('nutrition'));
  document.getElementById('viewAllFeedBtn')?.addEventListener('click', () => switchTab('social'));

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('sidebar');
  mobileMenuToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Audio Toggle
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  audioToggleBtn?.addEventListener('click', () => {
    state.audioCoachEnabled = !state.audioCoachEnabled;
    audioToggleBtn.classList.toggle('active', state.audioCoachEnabled);
    audioToggleBtn.querySelector('.voice-status').textContent = state.audioCoachEnabled ? 'Voice ON' : 'Voice OFF';
    playTone(state.audioCoachEnabled ? 660 : 330, 'sine', 0.15);
  });

  // Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  themeToggleBtn?.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', isLight ? 'moon' : 'sun');
      if (window.lucide) window.lucide.createIcons();
    }
  });

  // Quick Water Logging
  const quickAddWaterBtn = document.getElementById('quickAddWaterBtn');
  quickAddWaterBtn?.addEventListener('click', () => {
    state.user.waterLoggedLiters = Math.min(6.0, Number((state.user.waterLoggedLiters + 0.25).toFixed(2)));
    updateNutritionUI();
    playTone(520, 'triangle', 0.12);
  });

  // ==========================================
  // 4. ACTIVE WORKOUT & LIVE TRAINER
  // ==========================================
  const toggleWorkoutTimerBtn = document.getElementById('toggleWorkoutTimerBtn');
  const timerPlayText = document.getElementById('timerPlayText');
  const timerPlayIcon = document.getElementById('timerPlayIcon');
  const workoutMainTimer = document.getElementById('workoutMainTimer');
  const workoutStatusLabel = document.getElementById('workoutStatusLabel');
  const setsListContainer = document.getElementById('setsListContainer');
  const nextExerciseBtn = document.getElementById('nextExerciseBtn');
  const triggerRestTimerBtn = document.getElementById('triggerRestTimerBtn');
  const finishWorkoutBtn = document.getElementById('finishWorkoutBtn');

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function toggleWorkoutTimer() {
    state.workoutSession.isRunning = !state.workoutSession.isRunning;
    if (state.workoutSession.isRunning) {
      timerPlayText.textContent = 'Pause Workout';
      timerPlayIcon.setAttribute('data-lucide', 'pause');
      workoutStatusLabel.textContent = 'SESSION IN PROGRESS';
      playTone(587, 'sine', 0.2);

      state.workoutSession.timerInterval = setInterval(() => {
        state.workoutSession.secondsElapsed++;
        workoutMainTimer.textContent = formatTime(state.workoutSession.secondsElapsed);
      }, 1000);

      const routine = state.routines[state.workoutSession.currentRoutineId];
      const ex = routine.exercises[state.workoutSession.currentExerciseIdx];
      speakCoachTip(`Workout started. First exercise is ${ex.name}. ${ex.coachTip}`);
    } else {
      timerPlayText.textContent = 'Resume Workout';
      timerPlayIcon.setAttribute('data-lucide', 'play');
      workoutStatusLabel.textContent = 'SESSION PAUSED';
      clearInterval(state.workoutSession.timerInterval);
    }
    if (window.lucide) window.lucide.createIcons();
  }

  toggleWorkoutTimerBtn?.addEventListener('click', toggleWorkoutTimer);

  function renderCurrentExercise() {
    const routine = state.routines[state.workoutSession.currentRoutineId] || state.routines.push;
    const exIdx = state.workoutSession.currentExerciseIdx;
    const ex = routine.exercises[exIdx] || routine.exercises[0];

    document.getElementById('currentMuscleTag').textContent = ex.muscle;
    document.getElementById('currentExerciseIndex').textContent = `Exercise ${exIdx + 1} of ${routine.exercises.length}`;
    document.getElementById('currentExerciseName').textContent = ex.name;
    document.getElementById('coachVoiceText').textContent = `"${ex.coachTip}"`;

    // Render Sets
    setsListContainer.innerHTML = '';
    ex.sets.forEach((s, idx) => {
      const row = document.createElement('div');
      row.className = 'set-row';
      row.innerHTML = `
        <span>SET ${idx + 1}</span>
        <span>${s.prev}</span>
        <div><input type="number" class="set-input set-kg" value="${s.kg}" /></div>
        <div><input type="number" class="set-input set-reps" value="${s.reps}" /></div>
        <div><input type="number" step="0.5" class="set-input set-rpe" value="${s.rpe}" /></div>
        <div>
          <button class="set-check-btn ${s.done ? 'checked' : ''}" data-idx="${idx}">
            ${s.done ? '<i data-lucide="check"></i> Done' : 'Complete'}
          </button>
        </div>
      `;
      setsListContainer.appendChild(row);
    });

    if (window.lucide) window.lucide.createIcons();

    // Attach Set Completion Handlers
    setsListContainer.querySelectorAll('.set-check-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        ex.sets[idx].done = !ex.sets[idx].done;
        btn.classList.toggle('checked', ex.sets[idx].done);
        btn.innerHTML = ex.sets[idx].done ? '<i data-lucide="check"></i> Done' : 'Complete';
        if (window.lucide) window.lucide.createIcons();

        if (ex.sets[idx].done) {
          playTone(880, 'sine', 0.18);
          startRestInterval(60);
        }
      });
    });
  }

  // Routine Switcher
  document.querySelectorAll('.routine-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.routine-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.workoutSession.currentRoutineId = btn.dataset.routine;
      state.workoutSession.currentExerciseIdx = 0;
      renderCurrentExercise();
      playTone(440, 'triangle', 0.1);
    });
  });

  // Next Exercise
  nextExerciseBtn?.addEventListener('click', () => {
    const routine = state.routines[state.workoutSession.currentRoutineId];
    if (state.workoutSession.currentExerciseIdx < routine.exercises.length - 1) {
      state.workoutSession.currentExerciseIdx++;
      renderCurrentExercise();
      const nextEx = routine.exercises[state.workoutSession.currentExerciseIdx];
      speakCoachTip(`Moving to exercise ${state.workoutSession.currentExerciseIdx + 1}: ${nextEx.name}. ${nextEx.coachTip}`);
    } else {
      finishWorkoutSession();
    }
  });

  // Rest Timer Modal
  let restIntervalTimer = null;
  const restModal = document.getElementById('restModal');
  const restCountdownNumber = document.getElementById('restCountdownNumber');
  const skipRestBtn = document.getElementById('skipRestBtn');

  function startRestInterval(seconds = 60) {
    let remaining = seconds;
    restModal.classList.add('active');
    restCountdownNumber.textContent = remaining;
    speakCoachTip(`Rest timer started. Take ${seconds} seconds recovery.`);

    clearInterval(restIntervalTimer);
    restIntervalTimer = setInterval(() => {
      remaining--;
      restCountdownNumber.textContent = remaining;

      if (remaining <= 3 && remaining > 0) {
        playTone(600, 'sine', 0.1);
      } else if (remaining === 0) {
        clearInterval(restIntervalTimer);
        playTone(880, 'sine', 0.35);
        restModal.classList.remove('active');
        speakCoachTip(`Rest complete! Get ready for your next set.`);
      }
    }, 1000);
  }

  triggerRestTimerBtn?.addEventListener('click', () => startRestInterval(60));
  skipRestBtn?.addEventListener('click', () => {
    clearInterval(restIntervalTimer);
    restModal.classList.remove('active');
  });

  // Finish Workout
  function finishWorkoutSession() {
    clearInterval(state.workoutSession.timerInterval);
    state.workoutSession.isRunning = false;
    timerPlayText.textContent = 'Start Workout';
    timerPlayIcon.setAttribute('data-lucide', 'play');
    workoutStatusLabel.textContent = 'WORKOUT COMPLETED';

    const finishModal = document.getElementById('finishModal');
    const mins = Math.max(1, Math.floor(state.workoutSession.secondsElapsed / 60));
    const calories = Math.round(mins * 9.5);
    document.getElementById('finishSummaryText').textContent = `Session finished in ${mins}m. Estimated ${calories} kcal burned with progressive overload achieved!`;
    finishModal.classList.add('active');
    playTone(987, 'sine', 0.4);
    speakCoachTip('Great work! Session finished. Progressive overload volume recorded to your database.');
  }

  finishWorkoutBtn?.addEventListener('click', finishWorkoutSession);
  document.getElementById('closeFinishModalBtn')?.addEventListener('click', () => {
    document.getElementById('finishModal').classList.remove('active');
    switchTab('dashboard');
  });

  // ==========================================
  // 5. SMART NUTRITION & MACROS ENGINE
  // ==========================================
  const mealLogForm = document.getElementById('mealLogForm');
  const mealsTimelineList = document.getElementById('mealsTimelineList');
  const mealNameInput = document.getElementById('mealNameInput');
  const mealCaloriesInput = document.getElementById('mealCaloriesInput');
  const mealProteinInput = document.getElementById('mealProteinInput');
  const mealCarbsInput = document.getElementById('mealCarbsInput');
  const mealFatsInput = document.getElementById('mealFatsInput');
  const mealTypeInput = document.getElementById('mealTypeInput');

  function updateNutritionUI() {
    let totalC = 0, totalP = 0, totalCarbs = 0, totalF = 0;
    state.nutritionLogs.forEach((m) => {
      totalC += m.calories;
      totalP += m.p;
      totalCarbs += m.c;
      totalF += m.f;
    });

    // Update Dashboard Displays
    document.getElementById('dashCaloriesLogged').textContent = totalC.toLocaleString();
    document.getElementById('quickWaterDisplay').textContent = `${state.user.waterLoggedLiters} / ${state.user.waterTargetLiters} L`;

    // Update Nutrition Tab Displays
    document.getElementById('nutProteinVal').textContent = `${totalP}g`;
    document.getElementById('nutCarbsVal').textContent = `${totalCarbs}g`;
    document.getElementById('nutFatsVal').textContent = `${totalF}g`;
    document.getElementById('nutWaterVal').textContent = `${state.user.waterLoggedLiters} L`;
    document.getElementById('totalMealsCountBadge').textContent = `${state.nutritionLogs.length} Meals Logged`;

    // Render Meals Timeline
    mealsTimelineList.innerHTML = '';
    state.nutritionLogs.forEach((item) => {
      const el = document.createElement('div');
      el.className = 'meal-entry-item';
      el.innerHTML = `
        <div class="meal-entry-left">
          <span class="meal-type-badge">${item.type}</span>
          <div class="meal-title-group">
            <strong>${item.name}</strong>
            <span>${item.p}g P • ${item.c}g C • ${item.f}g F</span>
          </div>
        </div>
        <span class="meal-cal-val">${item.calories} kcal</span>
      `;
      mealsTimelineList.appendChild(el);
    });
  }

  // Quick Preset Chips
  document.querySelectorAll('.preset-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      mealNameInput.value = chip.dataset.name;
      mealCaloriesInput.value = chip.dataset.c;
      mealProteinInput.value = chip.dataset.p;
      mealCarbsInput.value = chip.dataset.ch;
      mealFatsInput.value = chip.dataset.f;
      playTone(480, 'sine', 0.1);
    });
  });

  mealLogForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newMeal = {
      id: `meal-${Date.now()}`,
      type: mealTypeInput.value,
      name: mealNameInput.value,
      calories: parseInt(mealCaloriesInput.value),
      p: parseInt(mealProteinInput.value),
      c: parseInt(mealCarbsInput.value),
      f: parseInt(mealFatsInput.value),
    };
    state.nutritionLogs.unshift(newMeal);
    updateNutritionUI();
    mealLogForm.reset();
    playTone(660, 'sine', 0.15);
  });

  updateNutritionUI();

  // ==========================================
  // 6. AI MICROSERVICE GENERATOR
  // ==========================================
  const aiGenerateForm = document.getElementById('aiGenerateForm');
  const aiPlanTableBody = document.getElementById('aiPlanTableBody');
  const aiGeneratedTitle = document.getElementById('aiGeneratedTitle');
  const aiRationaleText = document.getElementById('aiRationaleText');

  const aiProgramTemplates = {
    'Muscle Hypertrophy': [
      { name: 'Incline Barbell Bench Press', target: 'Upper Chest', sets: '4', reps: '8-10', rest: '90s', rpe: '8.5', cue: 'Control 3-second descent' },
      { name: 'Weighted Neutral Chin-ups', target: 'Latissimus', sets: '4', reps: '8', rest: '90s', rpe: '8', cue: 'Full dead-hang stretch' },
      { name: 'Dumbbell Romanian Deadlift', target: 'Hamstrings', sets: '3', reps: '10-12', rest: '75s', rpe: '8.5', cue: 'Deep hip hinge tension' },
      { name: 'Standing Cable Lateral Raises', target: 'Side Delts', sets: '4', reps: '15', rest: '45s', rpe: '9', cue: 'Peak contraction 1s pause' },
    ],
    'Maximum Strength & Power': [
      { name: 'Barbell High Bar Squat', target: 'Quad Dominance', sets: '5', reps: '3-5', rest: '180s', rpe: '8.5', cue: 'Explosive drive out of hole' },
      { name: 'Barbell Flat Bench Press', target: 'Pectoralis Core', sets: '5', reps: '3-5', rest: '180s', rpe: '9', cue: 'Leg drive locked into floor' },
      { name: 'Conventional Deadlift', target: 'Posterior Power', sets: '3', reps: '3', rest: '240s', rpe: '8.5', cue: 'Neutral spine, pull slack first' },
    ],
    'Metabolic Fat Loss': [
      { name: 'Barbell Thrusters', target: 'Full Body Metabolic', sets: '4', reps: '12-15', rest: '60s', rpe: '9', cue: 'Continuous fluid tempo' },
      { name: 'Kettlebell Swings (Russian)', target: 'Posterior Hips', sets: '4', reps: '20', rest: '45s', rpe: '8.5', cue: 'Snap hips with power' },
      { name: 'Renegade Rows to Push-up', target: 'Core & Upper Body', sets: '3', reps: '10 /side', rest: '60s', rpe: '9', cue: 'Keep hips square to ground' },
    ],
    'Athletic Performance': [
      { name: 'Power Cleans (Hang)', target: 'Triple Extension', sets: '4', reps: '4', rest: '120s', rpe: '8', cue: 'Violent hip extension' },
      { name: 'Bulgarian Split Squats (Plyo)', target: 'Unilateral Power', sets: '3', reps: '8 /leg', rest: '90s', rpe: '8.5', cue: 'Drive explosively upward' },
      { name: 'Medicine Ball Rotational Slams', target: 'Transverse Core', sets: '4', reps: '10 /side', rest: '45s', rpe: '9', cue: 'Full rotational velocity' },
    ],
  };

  function renderAiPlan(goal, duration) {
    const list = aiProgramTemplates[goal] || aiProgramTemplates['Muscle Hypertrophy'];
    aiGeneratedTitle.textContent = `AI Adaptive: ${goal} (${duration}m Density)`;
    aiRationaleText.textContent = `"Generated customized stimulus matrix for ${state.user.name}. Selected ${list.length} progressive overload movements engineered for ${goal}."`;

    aiPlanTableBody.innerHTML = '';
    list.forEach((item) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${item.name}</strong></td>
        <td><span class="tag-muscle">${item.target}</span></td>
        <td>${item.sets}</td>
        <td>${item.reps}</td>
        <td>${item.rest}</td>
        <td><strong>${item.rpe}</strong></td>
        <td><em>${item.cue}</em></td>
      `;
      aiPlanTableBody.appendChild(tr);
    });
  }

  aiGenerateForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const goal = document.getElementById('aiGoalSelect').value;
    const duration = document.getElementById('aiDurationSelect').value;
    const btn = document.getElementById('generateAiPlanBtn');
    btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Computing ML Inference...';

    setTimeout(() => {
      renderAiPlan(goal, duration);
      btn.innerHTML = '<i data-lucide="sparkles"></i> <span>Run AI Microservice Inference</span>';
      if (window.lucide) window.lucide.createIcons();
      playTone(784, 'sine', 0.2);
    }, 450);
  });

  renderAiPlan('Muscle Hypertrophy', 45);

  document.getElementById('loadAiPlanToTrainerBtn')?.addEventListener('click', () => {
    switchTab('workout');
    document.querySelector('.routine-btn[data-routine="ai-custom"]')?.click();
  });

  // ==========================================
  // 7. BIOMETRICS CANVAS PROGRESS CHART
  // ==========================================
  function renderProgressChart(metric = 'weight') {
    const canvas = document.getElementById('progressCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let y = 30; y < height; y += 45) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
    }

    // Data points (30 days)
    const weightData = [80.2, 79.9, 79.8, 79.5, 79.4, 79.1, 78.9, 78.8, 78.6, 78.5];
    const volumeData = [12.4, 13.1, 13.5, 14.0, 14.8, 15.2, 15.6, 16.0, 16.2, 16.4];
    const data = metric === 'weight' ? weightData : volumeData;

    const min = Math.min(...data) * 0.98;
    const max = Math.max(...data) * 1.02;
    const stepX = (width - 80) / (data.length - 1);

    // Gradient Fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    if (metric === 'weight') {
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
      gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
    } else {
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
    }

    // Path
    ctx.beginPath();
    data.forEach((val, i) => {
      const x = 50 + i * stepX;
      const y = height - 40 - ((val - min) / (max - min)) * (height - 80);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = metric === 'weight' ? '#10B981' : '#06B6D4';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Fill under line
    ctx.lineTo(50 + (data.length - 1) * stepX, height - 30);
    ctx.lineTo(50, height - 30);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw Data Point Circles
    data.forEach((val, i) => {
      const x = 50 + i * stepX;
      const y = height - 40 - ((val - min) / (max - min)) * (height - 80);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = metric === 'weight' ? '#10B981' : '#06B6D4';
      ctx.fill();
      ctx.strokeStyle = '#080C14';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  document.querySelectorAll('.chart-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chart-toggle').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderProgressChart(btn.dataset.metric);
    });
  });

  // ==========================================
  // 8. SOCIAL FEED & LEADERBOARD
  // ==========================================
  const feedStreamContainer = document.getElementById('feedStreamContainer');
  const postContentInput = document.getElementById('postContentInput');
  const publishPostBtn = document.getElementById('publishPostBtn');

  function renderFeed() {
    feedStreamContainer.innerHTML = '';
    state.socialFeed.forEach((p) => {
      const card = document.createElement('div');
      card.className = 'social-post-card';
      card.innerHTML = `
        <div class="post-header-flex">
          <img src="${p.avatar}" class="mini-avatar" alt="${p.author}" />
          <div class="post-user-info">
            <strong>${p.author}</strong>
            <span>${p.time} • ${p.badge || 'Athlete'}</span>
          </div>
        </div>
        <p class="post-content-body">${p.content}</p>
        <span class="post-metrics-pill"><i data-lucide="activity"></i> ${p.metrics}</span>
        <div class="post-footer-actions">
          <button class="cheer-btn ${p.liked ? 'cheered' : ''}" data-id="${p.id}">
            <i data-lucide="flame"></i>
            <span>${p.likes} Cheers</span>
          </button>
          <span class="arch-badge">Verified Telemetry</span>
        </div>
      `;
      feedStreamContainer.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();

    feedStreamContainer.querySelectorAll('.cheer-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const post = state.socialFeed.find((p) => p.id === btn.dataset.id);
        if (post) {
          post.liked = !post.liked;
          post.likes += post.liked ? 1 : -1;
          renderFeed();
          playTone(550, 'sine', 0.1);
        }
      });
    });
  }

  publishPostBtn?.addEventListener('click', () => {
    const text = postContentInput.value.trim();
    if (!text) return;
    state.socialFeed.unshift({
      id: `post-${Date.now()}`,
      author: `${state.user.name} (You)`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
      content: text,
      metrics: 'Session completed • 48m • 460 kcal',
      badge: '🔥 14-Day Consistency Master',
      likes: 1,
      liked: true,
      time: 'Just now',
    });
    postContentInput.value = '';
    renderFeed();
    playTone(700, 'sine', 0.15);
  });

  renderFeed();

  // ==========================================
  // 9. ARCHITECTURE EXPLORER & MATRIX SIMULATOR
  // ==========================================
  const archNodes = document.querySelectorAll('.arch-node-item');
  const inspectorNodeTitle = document.getElementById('inspectorNodeTitle');
  const inspectorNodeProtocol = document.getElementById('inspectorNodeProtocol');
  const inspectorNodeDesc = document.getElementById('inspectorNodeDesc');

  archNodes.forEach((node) => {
    node.addEventListener('click', () => {
      archNodes.forEach((n) => n.classList.remove('active'));
      node.classList.add('active');

      const info = state.architectureNodes[node.dataset.node];
      if (info) {
        inspectorNodeTitle.textContent = info.title;
        inspectorNodeProtocol.textContent = info.protocol;
        inspectorNodeDesc.textContent = info.desc;
        playTone(520, 'triangle', 0.12);
      }
    });
  });

  // Decision Matrix Recalculator
  const sliderPerf = document.getElementById('sliderPerf');
  const sliderCross = document.getElementById('sliderCross');
  const sliderVel = document.getElementById('sliderVel');
  const sliderMaint = document.getElementById('sliderMaint');

  function calculateMatrix() {
    const wPerf = parseInt(sliderPerf.value);
    const wCross = parseInt(sliderCross.value);
    const wVel = parseInt(sliderVel.value);
    const wMaint = parseInt(sliderMaint.value);
    const totalWeight = wPerf + wCross + wVel + wMaint;

    document.getElementById('wPerfDisplay').textContent = `${Math.round((wPerf / totalWeight) * 100)}%`;
    document.getElementById('wCrossDisplay').textContent = `${Math.round((wCross / totalWeight) * 100)}%`;
    document.getElementById('wVelDisplay').textContent = `${Math.round((wVel / totalWeight) * 100)}%`;
    document.getElementById('wMaintDisplay').textContent = `${Math.round((wMaint / totalWeight) * 100)}%`;

    // Framework base scores out of 5: [Perf, Cross, Vel, Maint]
    const flutterScores = [5.0, 5.0, 4.8, 4.8];
    const rnScores = [4.0, 4.5, 4.2, 4.0];
    const kmpScores = [4.8, 3.8, 3.2, 3.5];

    function calcWeighted(scores) {
      const sum = (scores[0] * wPerf + scores[1] * wCross + scores[2] * wVel + scores[3] * wMaint) / totalWeight;
      return sum.toFixed(2);
    }

    const fScore = calcWeighted(flutterScores);
    const rnScore = calcWeighted(rnScores);
    const kmpScore = calcWeighted(kmpScores);

    document.getElementById('flutterScoreText').textContent = `${fScore} / 5.0`;
    document.getElementById('rnScoreText').textContent = `${rnScore} / 5.0`;
    document.getElementById('kmpScoreText').textContent = `${kmpScore} / 5.0`;

    document.getElementById('flutterScoreBar').style.width = `${(fScore / 5) * 100}%`;
    document.getElementById('rnScoreBar').style.width = `${(rnScore / 5) * 100}%`;
    document.getElementById('kmpScoreBar').style.width = `${(kmpScore / 5) * 100}%`;
  }

  [sliderPerf, sliderCross, sliderVel, sliderMaint].forEach((s) => {
    s?.addEventListener('input', calculateMatrix);
  });

  document.getElementById('resetWeightsBtn')?.addEventListener('click', () => {
    sliderPerf.value = 20;
    sliderCross.value = 20;
    sliderVel.value = 30;
    sliderMaint.value = 30;
    calculateMatrix();
  });

  // ==========================================
  // 10. CUSTOM ATHLETE PROFILE FORM
  // ==========================================
  const profileSettingsForm = document.getElementById('profileSettingsForm');
  profileSettingsForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.user.name = document.getElementById('settingNameInput').value;
    state.user.goal = document.getElementById('settingGoalInput').value;
    state.user.weightKg = parseFloat(document.getElementById('settingWeightInput').value);
    state.user.targetWeightKg = parseFloat(document.getElementById('settingTargetWeightInput').value);
    state.user.heightCm = parseFloat(document.getElementById('settingHeightInput').value);
    state.user.dailyCaloriesTarget = parseInt(document.getElementById('settingCaloriesInput').value);
    state.user.waterTargetLiters = parseFloat(document.getElementById('settingWaterInput').value);

    document.getElementById('userDisplayName').textContent = state.user.name;
    document.getElementById('userGoalTag').textContent = `🔥 ${state.user.goal}`;

    updateNutritionUI();
    playTone(600, 'sine', 0.2);
    alert('Athlete profile successfully updated across the FitFlow ecosystem!');
    switchTab('dashboard');
  });
});
