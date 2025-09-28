document.addEventListener('DOMContentLoaded', () => {
    // --- 多言語対応用のテキストデータ ---
    const translations = {
        en: {
            // Header
            changeDisplaySize: "Change Display Size",
            display100: "Display: 100%",
            display90: "Display: 90%",
            display85: "Display: 85%",
            display75: "Display: 75%",
            display50: "Display: 50%",
            display30: "Display: 30%",
            shortcuts: "Shortcuts",
            updateHistory: "Update History",
            // Home Screen
            startAsServer: "Start as Server",
            joinAsClient: "Join as Client",
            waitingForClientsTitle: "Waiting for Client Connections",
            waitingForClientsDesc: "Connect from other PCs or tablets using the QR code or URL below.",
            openDirectorWindow: "Open Director Window",
            openPersonalityWindow: "Open Personality Window",
            enterServerIP: "Enter Server PC's IP Address",
            joinAsDirector: "Join as Director",
            joinAsPersonality: "Join as Personality",
            // Director & Personality Screens
            cueSheet: "Cue Sheet",
            prev: "Prev",
            next: "Next",
            saveLog: "Save Log",
            programTimeRemaining: "Program Time Remaining",
            programTimeElapsed: "Program Time Elapsed",
            segmentTimeRemaining: "Segment Time Remaining",
            segmentTimeElapsed: "Segment Time Elapsed",
            timeDifference: "Time Diff.",
            fullscreen: "Fullscreen",
            handwriting: "Handwriting Instructions",
            acknowledged: "OK!",
            clear: "Clear",
            presetMessages: "Preset Messages",
            settings: "Settings",
            endProgram: "End Program",
            instructions: "Instructions",
            waitingForInstructions: "Waiting for instructions...",
            acknowledge: "Acknowledge",
            // Modals
            programSettings: "Program Settings",
            programTitle: "Program Title",
            programDuration: "Total Program Duration (minutes)",
            createCueSheet: "Create Cue Sheet",
            selectTemplate: "Select Template",
            load: "Load",
            save: "Save",
            cornerName: "Segment Name",
            minutes: "Min",
            seconds: "Sec",
            type: "Type",
            addRow: "Add Row",
            startProgramWithSettings: "Start Program with These Settings",
            presetSettings: "Preset Message Settings",
            presetSettingsDesc: "Enter messages separated by commas.",
            saveBtn: "Save",
            cancel: "Cancel",
            shortcutSettings: "Shortcut Key Settings",
            shortcutSettingsDesc: "Click the box for the item you want to set, then press the key or key combination (e.g., Ctrl + S).",
            saveSettings: "Save These Settings",
            // Dynamic Alerts & Text
            alert_connectionLost: "Connection to the server was lost. Returning to home screen.",
            alert_connectionFailed: "Could not connect to the server.",
            alert_enterIP: "Please enter the server PC's IP address.",
            alert_addCueItem: "Please add at least one item to the cue sheet.",
            alert_confirmEndProgram: "Are you sure you want to end the program?",
            alert_noLogToDownload: "There is no log to download.",
            alert_templateSaved: (name) => `Template saved as "${name}".`,
            alert_confirmDeleteTemplate: (name) => `Are you sure you want to delete the template "${name}"?`,
            prompt_enterTemplateName: "Enter a name for the template",
            role_select: "Select Your Role",
            role_enterIP: "Enter Server PC's IP Address",
            serverStarting: "Starting server...",
            copyURL: "Copy URL",
            copied: "Copied!",
            // Cue Sheet Types
            type_talk: "Talk",
            type_music: "Music",
            type_cm: "CM",
            // Shortcut Items
            shortcut_timer: "Timer Start / Stop",
            shortcut_preset: (name) => `Preset: ${name}`,
            // Default Data
            defaultProgramTitle: "My Radio Program",
            defaultCueOpening: "Opening",
            defaultCueMusic1: "Music 1",
            defaultCueCM: "CM",
            defaultCueEnding: "Ending",
            // ★★★ 修正点: プリセットメッセージを英語に修正 ★★★
            defaultPresets: ['👍', 'OK!', 'Wrap it up!', 'Go to CM', '30s left'],
            // Update History
            updateHistoryContent: [
                { version: "Ver.2.2.1", note: "Minor corrections" },
                { version: "Ver.2.2.0", note: "Added the ability to set multi-key combinations (e.g., Ctrl + S) for shortcuts." },
                { version: "Ver.2.1.3", note: "Fixed a bug where preset messages sent from the director were not displayed on the personality's screen." },
                { version: "Ver.2.1.2", note: "Added a button to copy the server URL. Fixed a bug where text would duplicate when switching languages." },
                { version: "Ver.2.1.1", note: "Fixed a bug that caused text to duplicate when switching languages." },
                { version: "Ver.2.1.0", note: "Added a language switching feature (Japanese/English)." },
                { version: "Ver.2.0.1", note: "Improved the design of the shortcut key settings screen." },
                { version: "Ver.2.0.0", note: "Added a feature to open a Personality window from the server screen, in addition to the Director window." },
                { version: "Ver.1.9.3", note: "Fixed a bug where the display scaling feature was not working." },
                { version: "Ver.1.9.2", note: "Fixed multiple bugs including display scaling, UI for multi-window startup, and handwriting coordinate drift in fullscreen." },
                { version: "Ver.1.9.1", note: "Fixed a bug where the home screen would not appear on launch." },
                { version: "Ver.1.9", note: "Changed to a two-window system to run server and client from one app, resolving port conflicts." },
                { version: "Ver.1.8", note: "Fixed multiple bugs including dark mode, layout issues, button placement, and the Acknowledge button." },
                { version: "Ver.1.7", note: "Fixed an issue where entering fullscreen would be cancelled when changing display scale. Fundamentally resolved layout collapse and coordinate drift on scaling." },
                { version: "Ver.1.6", note: "Fixed a layout bug (right-side margin) and a handwriting coordinate drift issue when changing display scale." },
                { version: "Ver.1.5.1", note: "Fixed an issue where the handwriting area became too small on tablets with small screens." },
                { version: "Ver.1.5", note: "Added a feature to assign shortcut keys to start/stop the timer and for each preset message." },
                { version: "Ver.1.4", note: "Overhauled the PC version layout, resolving display issues on iPad. Fixed a bug causing double lines on the handwriting canvas. Removed PWA features." },
                { version: "Ver.1.3", note: "Enhanced fullscreen functionality via 'Add to Home Screen' to replace PWA installation. Fixed a QR code display bug on server startup." },
                { version: "Ver.1.2.3", note: "Fixed an issue where preset messages would not load on the initial display of the director screen." },
                { version: "Ver.1.2.2", note: "Fixed a bug where a swipe after drawing would erase the canvas." },
                { version: "Ver.1.2.1", note: "Fixed a bug causing time difference miscalculations when using cue sheet next/prev buttons. Improved time calculation accuracy during pause." },
                { version: "Ver.1.2", note: "Enabled role selection (server/client) in the PC/Mac app. Added dark mode. Fixed a time difference calculation bug." },
                { version: "Ver.1.1", note: "Added functionality to use an iPad as a director terminal." },
                { version: "Ver.1.0", note: "First release as an offline version. Implemented all web version features plus easy connection via IP/QR code and two-way communication." },
                { version: "Ver.0.9", note: "Supported 'minutes:seconds' format for cue sheet time input." },
                { version: "Ver.0.8", note: "Added a feature to automatically calculate and display the total program time difference ('push/pull')." },
                { version: "Ver.0.7", note: "Added a feature to specify and color-code cue sheet item types (talk, music, cm, etc.)." },
                { version: "Ver.0.6", note: "Added a feature to save, load, and delete cue sheets as templates." },
                { version: "Ver.0.5", note: "Added an 'Acknowledge' button from the personality for two-way communication." },
                { version: "Ver.0.4", note: "Added a remaining time timer for each segment." },
                { version: "Ver.0.3", note: "Added a feature for users to freely change and save preset messages to the browser." },
                { version: "Ver.0.2", note: "Added timekeeper functionality." },
                { version: "Ver.0.1", note: "Initial release of basic features." }
            ]
        },
        ja: {
            changeDisplaySize: "表示サイズの変更", display100: "表示: 100%", display90: "表示: 90%", display85: "表示: 85%", display75: "表示: 75%", display50: "表示: 50%", display30: "表示: 30%", shortcuts: "ショートカット", updateHistory: "更新履歴", startAsServer: "サーバーとして起動", joinAsClient: "クライアントとして参加", waitingForClientsTitle: "クライアントの接続を待っています", waitingForClientsDesc: "他のPCやタブレットから、以下のQRコードまたはURLで接続してください。", openDirectorWindow: "ディレクター画面を開く", openPersonalityWindow: "パーソナリティ画面を開く", enterServerIP: "サーバーPCのIPアドレスを入力", joinAsDirector: "ディレクターとして参加", joinAsPersonality: "パーソナリティとして参加", cueSheet: "進行表", prev: "前へ", next: "次へ", saveLog: "ログ保存", programTimeRemaining: "番組残り時間", programTimeElapsed: "番組経過時間", segmentTimeRemaining: "コーナー残り時間", segmentTimeElapsed: "コーナー経過時間", timeDifference: "押し/巻き", fullscreen: "全画面表示", handwriting: "手書き指示", acknowledged: "了解！", clear: "消去", presetMessages: "プリセットメッセージ", settings: "設定", endProgram: "番組終了", instructions: "指示", waitingForInstructions: "指示を待っています...", acknowledge: "了解", programSettings: "番組設定", programTitle: "番組タイトル", programDuration: "番組全体の時間（分）", createCueSheet: "進行表の作成", selectTemplate: "テンプレートを選択", load: "読込", save: "保存", cornerName: "コーナー名", minutes: "分", seconds: "秒", type: "タイプ", addRow: "行を追加", startProgramWithSettings: "この内容で番組を開始", presetSettings: "プリセットメッセージ設定", presetSettingsDesc: "カンマ区切りでメッセージを入力してください。", saveBtn: "保存する", cancel: "キャンセル", shortcutSettings: "ショートカットキー設定",
            shortcutSettingsDesc: "設定したい項目のボックスをクリックしてから、割り当てたいキーまたはキーの組み合わせ（例: Ctrl + S）を押してください。",
            saveSettings: "この設定を保存", alert_connectionLost: "サーバーとの接続が切れました。ホーム画面に戻ります。", alert_connectionFailed: "サーバーに接続できませんでした。", alert_enterIP: "サーバーPCのIPアドレスを入力してください。", alert_addCueItem: "進行表に項目を追加してください。", alert_confirmEndProgram: "本当に番組を終了しますか？", alert_noLogToDownload: "ダウンロードするログがありません。", alert_templateSaved: (name) => `「${name}」という名前でテンプレートを保存しました。`, alert_confirmDeleteTemplate: (name) => `テンプレート「${name}」を本当に削除しますか？`, prompt_enterTemplateName: "テンプレート名を入力してください", role_select: "役割を選択してください", role_enterIP: "サーバーPCのIPアドレスを入力してください", serverStarting: "サーバーを起動中...", copyURL: "URLをコピー", copied: "コピーしました！", type_talk: "トーク", type_music: "楽曲", type_cm: "CM", shortcut_timer: "タイマー開始 / 停止", shortcut_preset: (name) => `プリセット: ${name}`,
            defaultProgramTitle: "マイラジオプログラム",
            defaultCueOpening: "オープニング",
            defaultCueMusic1: "楽曲1",
            defaultCueCM: "CM",
            defaultCueEnding: "エンディング",
            defaultPresets: ['👍', 'OK!', '巻いて！', 'CMへ', 'あと30秒'],
            updateHistoryContent: [
                { version: "Ver.2.2.1", note: "軽度な修正" },
                { version: "Ver.2.2.0", note: "ショートカットキーにCtrlやShiftなどを組み合わせた複数キーを設定できる機能を追加。" },
                { version: "Ver.2.1.3", note: "ディレクターから送信されたプリセットメッセージがパーソナリティに表示されない不具合を修正。" },
                { version: "Ver.2.1.2", note: "サーバーURLをコピーするボタンを追加。言語切替時にテキストが二重表示される不具合を修正。" },
                { version: "Ver.2.1.1", note: "言語を切り替える際にテキストが二重に表示される不具合を修正。" },
                { version: "Ver.2.1.0", note: "言語切替機能（日本語/英語）を追加。" },
                { version: "Ver.2.0.1", note: "ショートカットキー設定画面のデザインを改善。" },
                { version: "Ver.2.0.0", note: "サーバー画面からディレクター画面だけでなく、パーソナリティ画面も別ウィンドウで開ける機能を追加。" },
                { version: "Ver.1.9.3", note: "拡大縮小機能が動作しない不具合を修正。" },
                { version: "Ver.1.9.2", note: "拡大縮小機能、複数ウィンドウ起動時のUI、全画面表示時の手書き座標ずれなど、複数の不具合を修正。" },
                { version: "Ver.1.9.1", note: "起動時にホーム画面が表示されない不具合を修正。" },
                { version: "Ver.1.9", note: "サーバーとクライアントを1つのアプリから2つのウィンドウで起動する方式に変更。複数起動時のポート競合エラーを解消し、同一PCでの利用を簡素化。" },
                { version: "Ver.1.8", note: "ダークモード、進行表設定画面のレイアウト、ボタン配置、iPadでの全画面維持、了解ボタンの動作と表示など、複数の不具合を修正。" },
                { version: "Ver.1.7", note: "表示スケール変更時に全画面が解除される不具合を修正。また、スケール変更時のレイアウト崩れと手書き座標のずれを根本的に解決。" },
                { version: "Ver.1.6", note: "表示スケール変更時に発生するレイアウトの崩れ（右側の余白）と、手書きキャンバスの座標がずれる不具合を修正。" },
                { version: "Ver.1.5.1", note: "画面が小さいタブレットでも手書き入力が小さくなる問題を修正。" },
                { version: "Ver.1.5", note: "タイマーの開始/停止、各プリセットメッセージにショートカットキーを割り当てられる機能を追加。" },
                { version: "Ver.1.4", note: "PC版のレイアウトを大幅に刷新。iPadでの表示崩れを全面的に解消し、スクロールせずに全要素が表示されるように改善。手書きキャンバスで線が二重になる不具合を修正。PWA機能を廃止。" },
                { version: "Ver.1.3", note: "PWAのインストール機能に代わり、「ホーム画面に追加」による全画面表示機能を強化。サーバー起動時のQRコード表示に関する不具合を修正。" },
                { version: "Ver.1.2.3", note: "ディレクター画面の初回表示時にプリセットメッセージが読み込まれない問題を修正。" },
                { version: "Ver.1.2.2", note: "手書きキャンバスで、書き終えた後にスワイプすると描画が消える問題を修正。" },
                { version: "Ver.1.2.1", note: "進行表の次へ/前へボタン操作時に押し巻き時間がずれるバグを修正。一時停止時の時間計算精度を向上。" },
                { version: "Ver.1.2", note: "PC/Macアプリでサーバー/クライアントの役割を選択可能に。ダークモードを追加。押し巻き時間の計算バグを修正。" },
                { version: "Ver.1.1", note: "iPadをディレクター端末として使用する機能を追加。" },
                { version: "Ver.1.0", note: "オフライン版として初回リリース。ウェブ版の全機能に加え、IPアドレス・QRコードによる簡単接続、双方向通信などを実装。" },
                { version: "Ver.0.9", note: "進行表の時間入力を「分:秒」形式に対応。" },
                { version: "Ver.0.8", note: "番組全体の時間の「押し/巻き」を自動計算して表示する機能を追加。" },
                { version: "Ver.0.7", note: "進行表にタイプ（talk, music, cmなど）を指定し、色分け表示する機能を追加。" },
                { version: "Ver.0.6", note: "進行表をテンプレートとして保存・読込・削除できる機能を追加。" },
                { version: "Ver.0.5", note: "パーソナリティからの『了解』ボタンを追加し、双方向のコミュニケーションを可能に。" },
                { version: "Ver.0.4", note: "コーナーごとの残り時間タイマー機能を追加。" },
                { version: "Ver.0.3", note: "プリセットメッセージをユーザーが自由に変更し、ブラウザに保存できる機能を追加。" },
                { version: "Ver.0.2", note: "タイムキーパー機能を追加。" },
                { version: "Ver.0.1", note: "基本機能をリリース。" }
            ]
        }
    };

    let currentLang = localStorage.getItem('timeqLang') || 'ja';

    // ★★★ ここから修正 ★★★
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('timeqLang', lang);
        document.documentElement.lang = lang;
        const t = translations[lang];
        document.querySelectorAll('[data-i18n-key]').forEach(el => {
            const key = el.dataset.i18nKey;
            if (t[key]) {
                el.innerHTML = t[key];
            }
        });
        document.querySelectorAll('[data-i18n-placeholder-key]').forEach(el => {
            const key = el.dataset.i18nPlaceholderKey;
            if (t[key]) {
                el.placeholder = t[key];
            }
        });
        document.querySelectorAll('[data-i18n-title-key]').forEach(el => {
            const key = el.dataset.i18nTitleKey;
            if (t[key]) {
                el.title = t[key];
            }
        });
        document.getElementById('language-select').value = lang;

        // 言語に連動する動的コンテンツを再読み込み
        プリセットメッセージを読み込む();
        // ディレクター画面が表示されている場合、プリセットボタンも再描画する
        if (!ディレクター画面.classList.contains('hidden')) {
            プリセットボタンを描画する();
        }
    }
    // ★★★ ここまで修正 ★★★

    const 全ての画面 = document.querySelectorAll('main > div, .modal');
    const ホーム画面 = document.getElementById('home-screen');
    const ディレクター画面 = document.getElementById('director-screen');
    const パーソナリティ画面 = document.getElementById('personality-screen');
    const 番組設定モーダル = document.getElementById('program-settings-modal');
    const 更新履歴モーダル = document.getElementById('history-log-modal');
    const プリセット設定モーダル = document.getElementById('preset-settings-modal');
    const ショートカット設定モーダル = document.getElementById('shortcut-settings-modal');
    const ホームタイトル = document.getElementById('home-title');
    const electronホーム = document.getElementById('electron-home');
    const browserホーム = document.getElementById('browser-home');
    const サーバー起動ボタン = document.getElementById('start-server-btn');
    const クライアントとして参加ボタン = document.getElementById('join-as-client-btn');
    const director参加ボタン = document.getElementById('join-director-btn');
    const personality参加ボタン = document.getElementById('join-personality-btn');
    const IP入力欄 = document.getElementById('ip-input');
    const サーバー情報 = document.getElementById('server-info');
    const サーバーQRコード画像 = document.getElementById('server-qr-code-image');
    const サーバーURLテキスト = document.getElementById('server-url-text');
    const openDirectorWindowBtn = document.getElementById('open-director-window-btn');
    const openPersonalityWindowBtn = document.getElementById('open-personality-window-btn');
    const copyUrlBtn = document.getElementById('copy-url-btn');
    const 閉じるボタン群 = document.querySelectorAll('.close-btn');
    const 更新履歴ボタン = document.getElementById('history-log-btn');
    const 更新履歴リスト = document.getElementById('history-log-list');
    const ショートカット設定ボタン = document.getElementById('shortcut-settings-btn');
    const ショートカットリストコンテナ = document.getElementById('shortcut-list-container');
    const ショートカット保存ボタン = document.getElementById('save-shortcuts-btn');
    const 表示サイズ選択 = document.getElementById('display-scale-select');
    const 言語選択 = document.getElementById('language-select');
    const ディレクター進行表 = document.getElementById('director-cue-sheet');
    const 前へボタン = document.getElementById('prev-item-btn');
    const 次へボタン = document.getElementById('next-item-btn');
    const タイマー表示エリア = document.getElementById('timer-display');
    const 番組タイマー表示 = document.getElementById('program-timer');
    const セグメントタイマー表示 = document.getElementById('segment-timer');
    const 番組タイマーラベル = document.getElementById('program-timer-label');
    const セグメントタイマーラベル = document.getElementById('segment-timer-label');
    const 時間差表示 = document.getElementById('time-diff');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const 手書きキャンバス = document.getElementById('handwriting-canvas');
    const キャンバス消去ボタン = document.getElementById('clear-canvas-btn');
    const 番組終了ボタン = document.getElementById('end-program-btn');
    const プリセットボタンエリア = document.getElementById('preset-buttons-area');
    const プリセット設定ボタン = document.getElementById('open-preset-settings-btn');
    const 了解インジケーター = document.getElementById('ack-indicator');
    const ログダウンロードボタン = document.getElementById('download-log-btn');
    const パーソナリティ進行表 = document.getElementById('personality-cue-sheet');
    const タイマー表示エリア_パーソナリティ = document.getElementById('timer-display-personality');
    const 番組タイマー表示_パーソナリティ = document.getElementById('program-timer-personality');
    const セグメントタイマー表示_パーソナリティ = document.getElementById('segment-timer-personality');
    const 番組タイマーラベル_パーソナリティ = document.getElementById('program-timer-label-personality');
    const セグメントタイマーラベル_パーソナリティ = document.getElementById('segment-timer-label-personality');
    const 時間差表示_パーソナリティ = document.getElementById('time-diff-personality');
    const 指示表示エリア = document.getElementById('instruction-display-area');
    const プリセットメッセージ表示 = document.getElementById('preset-message-display');
    const 了解ボタン = document.getElementById('ack-btn');
    const 番組タイトル入力欄 = document.getElementById('program-title');
    const 番組時間入力欄 = document.getElementById('program-duration');
    const 番組開始ボタン = document.getElementById('start-program-btn');
    const プリセットメッセージ入力欄 = document.getElementById('preset-messages-input');
    const プリセット保存ボタン = document.getElementById('save-preset-messages-btn');
    const 進行表行コンテナ = document.getElementById('cue-sheet-rows-container');
    const 行追加ボタン = document.getElementById('add-cue-row-btn');
    const テンプレート保存ボタン = document.getElementById('save-template-btn');
    const テンプレート選択 = document.getElementById('template-select');
    const テンプレート読込ボタン = document.getElementById('load-template-btn');
    const テンプレート削除ボタン = document.getElementById('delete-template-btn');
    const カスタムプロンプトモーダル = document.getElementById('custom-prompt-modal');
    const プロンプトタイトル = document.getElementById('prompt-title');
    const プロンプト入力欄 = document.getElementById('prompt-input');
    const プロンプトOKボタン = document.getElementById('prompt-ok-btn');
    const プロンプトキャンセルボタン = document.getElementById('prompt-cancel-btn');
    const テーマ切替ボタン = document.getElementById('theme-toggle-btn');
    const テーマアイコン = document.querySelector('#theme-toggle-btn i');
    const 全画面表示ボタン = document.getElementById('fullscreen-btn');

    let socket;
    let 自分の役割 = null;
    let animationFrameId = null;
    let timerMode = 'countdown';
    let 手書きパッド;
    let プリセットメッセージリスト = [];
    let programLog = [];
    let currentProgramState = null;
    let shortcuts = {};
    const isElectron = !!window.electronAPI;
    let lastCanvasWidth = 1;
    let lastCanvasHeight = 1;
    let resizeTimer;

    function 初期化手書きパッド() {
        if (!手書きキャンバス) return;
        if (手書きパッド) {
            手書きパッド.off();
        }
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        手書きキャンバス.width = 手書きキャンバス.offsetWidth * ratio;
        手書きキャンバス.height = 手書きキャンバス.offsetHeight * ratio;
        手書きキャンバス.getContext("2d").scale(ratio, ratio);
        手書きパッド = new SignaturePad(手書きキャンバス);
        lastCanvasWidth = 手書きキャンバス.offsetWidth;
        lastCanvasHeight = 手書きキャンバス.offsetHeight;
        手書きパッド.addEventListener("afterUpdateStroke", 手書き更新処理);
    }

    function handleCanvasResize() {
        if (自分の役割 !== 'director' || !手書きパッド) return;
        const data = 手書きパッド.toData();
        const oldWidth = lastCanvasWidth;
        const oldHeight = lastCanvasHeight;
        初期化手書きパッド();
        const newWidth = lastCanvasWidth;
        const newHeight = lastCanvasHeight;
        if (data.length > 0 && oldWidth > 0 && oldHeight > 0) {
            const scaleX = newWidth / oldWidth;
            const scaleY = newHeight / oldHeight;
            if (scaleX === 1 && scaleY === 1) return;
            const scaledData = data.map(group => ({
                ...group,
                points: group.points.map(point => ({ ...point, x: point.x * scaleX, y: point.y * scaleY }))
            }));
            手書きパッド.fromData(scaledData);
        }
    }

    function applyDisplayScale(scale) {
        const baseFontSize = 16;
        document.documentElement.style.fontSize = `${baseFontSize * scale}px`;
    }

    function loadDisplayScale() {
        const savedScale = localStorage.getItem('timeqDisplayScale') || 1;
        表示サイズ選択.value = savedScale;
        applyDisplayScale(savedScale);
    }

    const 手書き更新処理 = throttle(() => {
        if (自分の役割 === 'director' && 手書きパッド) {
            const データURL = 手書きパッド.isEmpty() ? '' : 手書きパッド.toDataURL();
            sendData('handwritingUpdate', { dataURL: データURL });
        }
    }, 100);

    function 画面を表示する(表示する画面) {
        全ての画面.forEach(画面 => 画面.classList.add('hidden'));
        if (表示する画面) 表示する画面.classList.remove('hidden');
    }

    function connectToServer(ipAddress) {
        const t = translations[currentLang];
        socket = new WebSocket('ws://' + ipAddress + ':8080');
        socket.onopen = () => {
            console.log('サーバーに接続しました。');
            if (自分の役割 === 'director') {
                sendData('identify', { role: 'director' });
                番組設定モーダルをリセットする();
                番組設定モーダル.classList.remove('hidden');
            } else {
                画面を表示する(パーソナリティ画面);
            }
        };
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            handleServerMessage(data);
        };
        socket.onclose = () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            alert(t.alert_connectionLost);
            window.location.reload();
        };
        socket.onerror = (error) => {
            console.error('WebSocketエラー:', error);
            alert(t.alert_connectionFailed);
        };
    }

    function handleServerMessage(data) {
        const t = translations[currentLang];
        if (data.type === 'stateUpdate') {
            const prevState = currentProgramState;
            currentProgramState = data.payload;
            const state = currentProgramState;
            if (!state) return;
            if (自分の役割 === 'director') {
                画面を表示する(ディレクター画面);
                if (state.programStatus === 'running') {
                    playPauseBtn.innerHTML = `<i class="fas fa-pause"></i> PAUSE`;
                    playPauseBtn.classList.add('paused');
                } else {
                    playPauseBtn.innerHTML = `<i class="fas fa-play"></i> START`;
                    playPauseBtn.classList.remove('paused');
                }
            } else {
                画面を表示する(パーソナリティ画面);
            }
            if (prevState && state.currentItemIndex !== prevState.currentItemIndex) {
                const newCue = state.cueSheet[state.currentItemIndex];
                let totalElapsedMs = state.totalElapsedTime;
                if (state.programStatus === 'running') {
                    totalElapsedMs += Date.now() - state.lastStartTime;
                }
                programLog.push(`${formatLogTime(totalElapsedMs)} - Segment Start: ${newCue.title}`);
            }
            進行表を描画する(state.cueSheet, state.currentItemIndex);
            押し巻き時間を描画する(state.timeDifference);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (state.programStatus === 'running') {
                const loop = () => {
                    updateAllTimers(state);
                    animationFrameId = requestAnimationFrame(loop);
                };
                animationFrameId = requestAnimationFrame(loop);
            } else {
                updateAllTimers(state);
            }
        }
        if (data.type === 'handwritingUpdate') {
            if (自分の役割 === 'personality') {
                const { dataURL } = data.payload;
                if (dataURL) {
                    指示表示エリア.innerHTML = `<img src="${dataURL}" alt="Handwritten instruction">`;
                } else {
                    指示表示エリア.innerHTML = `<p>${t.waitingForInstructions}</p>`;
                }
            }
        }
        if (data.type === 'presetMessage') {
            if (自分の役割 === 'personality') {
                const { text } = data.payload;
                プリセットメッセージ表示.textContent = text;
                プリセットメッセージ表示.classList.remove('hidden');
                setTimeout(() => プリセットメッセージ表示.classList.add('hidden'), 5000);
            }
        }
        if (data.type === 'acknowledged') {
            if (自分の役割 === 'director') {
                了解インジケーター.classList.add('show');
                setTimeout(() => {
                    了解インジケーター.classList.remove('show');
                }, 2000);
            }
        }
        if (data.type === 'programEnded') {
            alert(t.alert_confirmEndProgram);
            window.location.reload();
        }
    }

    function sendData(type, payload) {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type, payload }));
        }
    }

    function 参加する(role) {
        const t = translations[currentLang];
        自分の役割 = role;
        const ipAddress = IP入力欄.value.trim();
        if (!ipAddress) {
            alert(t.alert_enterIP);
            return;
        }
        connectToServer(ipAddress);
    }

    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    function 進行表を描画する(進行表データ, 現在のインデックス) {
        if (!進行表データ) return;
        const 描画先 = (自分の役割 === 'director') ? ディレクター進行表 : パーソナリティ進行表;
        描画先.innerHTML = '';
        進行表データ.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = `cue-item type-${item.type || 'talk'}`;
            if (index === 現在のインデックス) div.classList.add('current');
            div.innerHTML = `<span class="cue-title">${item.title}</span><span class="cue-duration">${formatTime(item.duration).substring(1)}</span>`;
            描画先.appendChild(div);
        });
        const 現在の項目 = 描画先.querySelector('.current');
        if (現在の項目) 現在の項目.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function updateAllTimers(state) {
        const t = translations[currentLang];
        let totalElapsedSeconds = state.totalElapsedTime / 1000;
        if (state.programStatus === 'running') {
            totalElapsedSeconds += (Date.now() - state.lastStartTime) / 1000;
        }
        const currentCueItem = state.cueSheet[state.currentItemIndex];
        let segmentElapsedSeconds = 0;
        if (state.currentItemStartTime > 0) {
            const runningTime = Date.now() - state.currentItemStartTime;
            segmentElapsedSeconds = (state.programStatus === 'running') ? runningTime / 1000 : (state.lastPauseTime - state.currentItemStartTime) / 1000;
        }
        const segmentRemainingSeconds = currentCueItem.duration - segmentElapsedSeconds;
        const programClock = (自分の役割 === 'director') ? 番組タイマー表示 : 番組タイマー表示_パーソナリティ;
        const programLabel = (自分の役割 === 'director') ? 番組タイマーラベル : 番組タイマーラベル_パーソナリティ;
        const segmentClock = (自分の役割 === 'director') ? セグメントタイマー表示 : セグメントタイマー表示_パーソナリティ;
        const segmentLabel = (自分の役割 === 'director') ? セグメントタイマーラベル : セグメントタイマーラベル_パーソナリティ;
        programLabel.textContent = (timerMode === 'countup') ? t.programTimeElapsed : t.programTimeRemaining;
        const programDisplaySeconds = (timerMode === 'countup') ? totalElapsedSeconds : state.totalDuration - totalElapsedSeconds;
        programClock.textContent = formatTime(programDisplaySeconds, true).substring(1);
        segmentLabel.textContent = (timerMode === 'countup') ? t.segmentTimeElapsed : t.segmentTimeRemaining;
        const segmentDisplaySeconds = (timerMode === 'countup') ? segmentElapsedSeconds : segmentRemainingSeconds;
        segmentClock.textContent = formatTime(segmentDisplaySeconds).substring(1);
        segmentClock.style.color = segmentRemainingSeconds < 0 ? '#e74c3c' : '#1abc9c';
    }

    function 押し巻き時間を描画する(timeDifference) {
        const targetElement = (自分の役割 === 'director') ? 時間差表示 : 時間差表示_パーソナリティ;
        targetElement.textContent = formatTime(timeDifference);
        targetElement.classList.remove('over', 'under');
        if (timeDifference > 5) {
            targetElement.classList.add('over');
        } else if (timeDifference < -5) {
            targetElement.classList.add('under');
        }
    }

    function formatTime(totalSeconds, showHours = false) {
        if (isNaN(totalSeconds)) totalSeconds = 0;
        const sign = totalSeconds < 0 ? "-" : "+";
        const absSeconds = Math.abs(totalSeconds);
        const hours = Math.floor(absSeconds / 3600);
        const minutes = Math.floor((absSeconds % 3600) / 60);
        const seconds = Math.floor(absSeconds % 60);
        if (showHours) {
            return [hours, minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':');
        }
        return sign + [minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':');
    }

    function formatLogTime(totalMilliseconds) {
        if (isNaN(totalMilliseconds)) totalMilliseconds = 0;
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return [hours, minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':');
    }

    function 番組を開始する() {
        const t = translations[currentLang];
        const 進行表データ = [];
        document.querySelectorAll('#cue-sheet-rows-container .cue-sheet-row').forEach((row, index) => {
            進行表データ.push({
                id: index,
                title: row.querySelector('.cue-title-input').value || 'Untitled',
                duration: (parseInt(row.querySelector('.cue-minutes-input').value, 10) || 0) * 60 + (parseInt(row.querySelector('.cue-seconds-input').value, 10) || 0),
                type: row.querySelector('.cue-type-select').value
            });
        });
        if (進行表データ.length === 0) {
            alert(t.alert_addCueItem);
            return;
        }

        const 番組データ = {
            title: 番組タイトル入力欄.value,
            totalDuration: parseInt(番組時間入力欄.value, 10) * 60,
            cueSheet: 進行表データ,
        };
        programLog = [`[00:00:00] - Program Start: ${番組データ.title}`];
        sendData('startProgram', 番組データ);
        番組設定モーダル.classList.add('hidden');
        if (!isElectron || 自分の役割 === 'director') {
            画面を表示する(ディレクター画面);
            プリセットボタンを描画する();
            setTimeout(初期化手書きパッド, 100);
        }
    }

    // ★★★ ここから修正 ★★★
    function プリセットメッセージを読み込む() {
        // 現在の言語設定に応じたキーでlocalStorageから読み込む
        const 保存されたメッセージ = localStorage.getItem(`timeqPresetMessages_${currentLang}`);
        if (保存されたメッセージ) {
            プリセットメッセージリスト = 保存されたメッセージ.split(',');
        } else {
            // 保存されたものがなければ、現在の言語のデフォルト値を使用
            プリセットメッセージリスト = translations[currentLang].defaultPresets;
        }
    }
    // ★★★ ここまで修正 ★★★

    function プリセットボタンを描画する() {
        プリセットボタンエリア.innerHTML = '';
        プリセットメッセージリスト.forEach(msg => {
            const button = document.createElement('button');
            button.className = 'preset-btn';
            button.dataset.message = msg;
            button.textContent = msg;
            プリセットボタンエリア.appendChild(button);
        });
    }

    // ★★★ ここから修正 ★★★
    function プリセットメッセージを保存する() {
        const messages = プリセットメッセージ入力欄.value.split(',').map(m => m.trim()).filter(m => m);
        プリセットメッセージリスト = messages;
        // 現在の言語設定に応じたキーでlocalStorageに保存する
        localStorage.setItem(`timeqPresetMessages_${currentLang}`, messages.join(','));
        プリセットボタンを描画する();
        プリセット設定モーダル.classList.add('hidden');
    }
    // ★★★ ここまで修正 ★★★

    function addCueRow(title = '', minutes = '', seconds = '', type = 'talk') {
        const t = translations[currentLang];
        const row = document.createElement('div');
        row.className = 'cue-sheet-row';
        row.innerHTML = `<div class="col-title"><input type="text" class="cue-title-input" placeholder="${t.cornerName}" value="${title}"></div><div class="col-min"><input type="number" class="cue-minutes-input" placeholder="${t.minutes}" value="${minutes}" min="0"></div><div class="col-sec"><input type="number" class="cue-seconds-input" placeholder="${t.seconds}" value="${seconds}" min="0" max="59"></div><div class="col-type"><select class="cue-type-select"><option value="talk" ${type === 'talk' ? 'selected' : ''}>${t.type_talk}</option><option value="music" ${type === 'music' ? 'selected' : ''}>${t.type_music}</option><option value="cm" ${type === 'cm' ? 'selected' : ''}>${t.type_cm}</option></select></div><div class="col-action"><button class="remove-cue-row-btn icon-btn danger-btn">×</button></div>`;
        進行表行コンテナ.appendChild(row);
        row.querySelector('.remove-cue-row-btn').addEventListener('click', () => row.remove());
    }

    function 番組設定モーダルをリセットする() {
        const t = translations[currentLang];
        番組タイトル入力欄.value = t.defaultProgramTitle;
        番組時間入力欄.value = '30';
        進行表行コンテナ.innerHTML = '';
        addCueRow(t.defaultCueOpening, '5', '0', 'talk');
        addCueRow(t.defaultCueMusic1, '4', '0', 'music');
        addCueRow(t.defaultCueCM, '1', '0', 'cm');
        addCueRow(t.defaultCueEnding, '1', '0', 'talk');
    }

    // キーイベントからショートカット文字列を生成するヘルパー関数
    function eventToShortcutString(e) {
        const code = e.code;
        // 修飾キー（Ctrl, Shiftなど）単体での押下は無視する
        if (['ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'].includes(code)) {
            return null;
        }

        const parts = [];
        if (e.ctrlKey) parts.push('Ctrl');
        if (e.metaKey) parts.push('Meta'); // MacのCmdキー、WindowsのWinキー
        if (e.altKey) parts.push('Alt');
        if (e.shiftKey) parts.push('Shift');

        parts.push(code);

        return parts.join('+');
    }

    // 保存されたショートカット文字列を画面表示用にフォーマットする関数
    function formatShortcutString(shortcutString) {
        if (!shortcutString) return translations[currentLang].settings || 'Not Set';

        const parts = shortcutString.split('+');
        const formattedParts = parts.map(part => {
            let formatted = part;
            // KeyA -> A, Digit1 -> 1 のように整形
            if (part.startsWith('Key')) {
                formatted = part.substring(3);
            } else if (part.startsWith('Digit')) {
                formatted = part.substring(5);
            } else if (part === 'Meta') {
                formatted = '⌘ / Win'; // Mac / Windows での表示を考慮
            }
            return formatted;
        });

        return formattedParts.join(' + ');
    }

    function loadShortcuts() {
        shortcuts = JSON.parse(localStorage.getItem('timeqShortcuts') || '{}');
    }

    function saveShortcuts() {
        const newShortcuts = {};
        document.querySelectorAll('.shortcut-row').forEach(row => {
            const action = row.dataset.action;
            const keyInput = row.querySelector('.shortcut-key-input');
            const key = keyInput.dataset.key;
            if (action && key) {
                newShortcuts[action] = key;
            }
        });
        shortcuts = newShortcuts;
        localStorage.setItem('timeqShortcuts', JSON.stringify(shortcuts));
        alert(translations[currentLang].saveSettings);
        ショートカット設定モーダル.classList.add('hidden');
    }

    function openShortcutSettingsModal() {
        const t = translations[currentLang];
        ショートカットリストコンテナ.innerHTML = '';
        createShortcutRow('togglePlayPause', t.shortcut_timer);
        プリセットメッセージリスト.forEach((msg, index) => {
            createShortcutRow(`preset_${index}`, t.shortcut_preset(msg));
        });
        ショートカット設定モーダル.classList.remove('hidden');
    }

    function createShortcutRow(action, label) {
        const row = document.createElement('div');
        row.className = 'shortcut-row';
        row.dataset.action = action;
        const labelEl = document.createElement('div');
        labelEl.className = 'shortcut-label';
        labelEl.textContent = label;
        const keyInputEl = document.createElement('div');
        keyInputEl.className = 'shortcut-key-input';
        keyInputEl.textContent = formatShortcutString(shortcuts[action]);
        keyInputEl.dataset.key = shortcuts[action] || '';
        keyInputEl.addEventListener('click', () => listenForKey(keyInputEl));
        row.appendChild(labelEl);
        row.appendChild(keyInputEl);
        ショートカットリストコンテナ.appendChild(row);
    }

    function listenForKey(targetElement) {
        document.querySelectorAll('.shortcut-key-input.recording').forEach(el => {
            el.classList.remove('recording');
            el.textContent = formatShortcutString(el.dataset.key);
        });
        targetElement.classList.add('recording');
        targetElement.textContent = '...';

        const keydownHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const shortcutString = eventToShortcutString(e);

            // 修飾キー単体でない、有効な組み合わせの場合のみ設定
            if (shortcutString) {
                targetElement.textContent = formatShortcutString(shortcutString);
                targetElement.dataset.key = shortcutString;
                targetElement.classList.remove('recording');
                window.removeEventListener('keydown', keydownHandler, { capture: true });
            }
        };
        window.addEventListener('keydown', keydownHandler, { capture: true });
    }

    function handleGlobalKeyDown(e) {
        const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
        const isModalOpen = !!document.querySelector('.modal:not(.hidden)');
        if (isTyping || isModalOpen) return;

        const currentShortcut = eventToShortcutString(e);
        if (!currentShortcut) return;

        const action = Object.keys(shortcuts).find(act => shortcuts[act] === currentShortcut);

        if (action) {
            e.preventDefault();
            if (action === 'togglePlayPause') {
                playPauseBtn.click();
            } else if (action.startsWith('preset_')) {
                const index = parseInt(action.split('_')[1], 10);
                const presetButtons = プリセットボタンエリア.querySelectorAll('.preset-btn');
                if (presetButtons[index]) {
                    presetButtons[index].click();
                }
            }
        }
    }

    function toggleTimerMode() {
        timerMode = (timerMode === 'countdown') ? 'countup' : 'countdown';
        if (currentProgramState) {
            updateAllTimers(currentProgramState);
        }
    }

    function showCustomPrompt(title) {
        return new Promise((resolve) => {
            プロンプトタイトル.textContent = title;
            プロンプト入力欄.value = '';
            カスタムプロンプトモーダル.classList.remove('hidden');
            プロンプト入力欄.focus();
            const onOk = () => { cleanup(); resolve(プロンプト入力欄.value); };
            const onCancel = () => { cleanup(); resolve(null); };
            const onKeyDown = (e) => {
                if (e.key === 'Enter') onOk();
                if (e.key === 'Escape') onCancel();
            };
            プロンプトOKボタン.onclick = onOk;
            プロンプトキャンセルボタン.onclick = onCancel;
            プロンプト入力欄.addEventListener('keydown', onKeyDown);
            function cleanup() {
                プロンプトOKボタン.onclick = null;
                プロンプトキャンセルボタン.onclick = null;
                プロンプト入力欄.removeEventListener('keydown', onKeyDown);
                カスタムプロンプトモーダル.classList.add('hidden');
            }
        });
    }

    function getTemplates() { return JSON.parse(localStorage.getItem('timeqCueTemplates') || '{}'); }
    function saveTemplates(templates) { localStorage.setItem('timeqCueTemplates', JSON.stringify(templates)); }
    function テンプレートリストを更新() {
        const templates = getTemplates();
        const t = translations[currentLang];
        テンプレート選択.innerHTML = `<option value="">${t.selectTemplate}</option>`;
        for (const name in templates) {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            テンプレート選択.appendChild(option);
        }
    }

    // --- イベントリスナー設定 ---
    言語選択.addEventListener('change', (e) => setLanguage(e.target.value));
    表示サイズ選択.addEventListener('change', (e) => {
        const newScale = e.target.value;
        localStorage.setItem('timeqDisplayScale', newScale);
        applyDisplayScale(newScale);
        setTimeout(handleCanvasResize, 100);
    });
    window.onresize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleCanvasResize, 250);
    };
    document.addEventListener('fullscreenchange', () => {
        setTimeout(handleCanvasResize, 250);
    });
    サーバー起動ボタン.onclick = async () => {
        サーバー起動ボタン.disabled = true;
        サーバー起動ボタン.textContent = translations[currentLang].serverStarting;
        const result = await window.electronAPI.startServer();
        if (result.error) {
            alert(`${translations[currentLang].alert_connectionFailed}: ${result.error}`);
            サーバー起動ボタン.disabled = false;
            サーバー起動ボタン.innerHTML = `<i class="fas fa-server"></i> <span data-i18n-key="startAsServer">${translations[currentLang].startAsServer}</span>`;
            return;
        }
        サーバーURLテキスト.textContent = result.url;
        サーバーQRコード画像.src = result.qr;
        サーバー情報.classList.remove('hidden');
        electronホーム.classList.add('hidden');
    };
    openDirectorWindowBtn.onclick = () => {
        window.electronAPI.openDirectorWindow();
    };
    openPersonalityWindowBtn.onclick = () => {
        window.electronAPI.openPersonalityWindow();
    };
    クライアントとして参加ボタン.onclick = () => {
        electronホーム.classList.add('hidden');
        browserホーム.classList.remove('hidden');
    };
    director参加ボタン.onclick = () => 参加する('director');
    personality参加ボタン.onclick = () => 参加する('personality');
    番組開始ボタン.onclick = 番組を開始する;
    更新履歴ボタン.onclick = () => {
        const t = translations[currentLang];
        更新履歴リスト.innerHTML = '';
        t.updateHistoryContent.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${item.version}</strong> ${item.note}`;
            更新履歴リスト.appendChild(li);
        });
        更新履歴モーダル.classList.remove('hidden');
    };
    ショートカット設定ボタン.onclick = openShortcutSettingsModal;
    ショートカット保存ボタン.onclick = saveShortcuts;
    行追加ボタン.onclick = () => addCueRow();
    playPauseBtn.onclick = () => sendData('togglePlayPause');
    次へボタン.onclick = () => sendData('nextItem');
    前へボタン.onclick = () => sendData('prevItem');
    キャンバス消去ボタン.onclick = () => {
        if (手書きパッド) {
            手書きパッド.clear();
            手書き更新処理();
        }
    };
    プリセット設定ボタン.onclick = () => {
        プリセットメッセージ入力欄.value = プリセットメッセージリスト.join(',');
        プリセット設定モーダル.classList.remove('hidden');
    };
    プリセット保存ボタン.onclick = プリセットメッセージを保存する;
    プリセットボタンエリア.addEventListener('click', (e) => {
        if (e.target.classList.contains('preset-btn')) {
            const message = e.target.dataset.message;
            sendData('presetMessage', { text: message });
        }
    });
    了解ボタン.onclick = () => { sendData('acknowledgement'); };
    テンプレート保存ボタン.onclick = async () => {
        const t = translations[currentLang];
        const name = await showCustomPrompt(t.prompt_enterTemplateName);
        if (!name) return;
        const templates = getTemplates();
        const rows = document.querySelectorAll('#cue-sheet-rows-container .cue-sheet-row');
        const templateData = Array.from(rows).map(row => ({
            title: row.querySelector('.cue-title-input').value,
            minutes: row.querySelector('.cue-minutes-input').value,
            seconds: row.querySelector('.cue-seconds-input').value,
            type: row.querySelector('.cue-type-select').value
        }));
        templates[name] = templateData;
        saveTemplates(templates);
        テンプレートリストを更新();
        alert(t.alert_templateSaved(name));
    };
    テンプレート読込ボタン.onclick = () => {
        const name = テンプレート選択.value;
        if (!name) return;
        const templates = getTemplates();
        const templateData = templates[name];
        if (templateData) {
            進行表行コンテナ.innerHTML = '';
            templateData.forEach(item => addCueRow(item.title, item.minutes, item.seconds, item.type));
        }
    };
    テンプレート削除ボタン.onclick = () => {
        const name = テンプレート選択.value;
        if (!name) return;
        const t = translations[currentLang];
        if (confirm(t.alert_confirmDeleteTemplate(name))) {
            const templates = getTemplates();
            delete templates[name];
            saveTemplates(templates);
            テンプレートリストを更新();
        }
    };
    タイマー表示エリア.onclick = toggleTimerMode;
    タイマー表示エリア_パーソナリティ.onclick = toggleTimerMode;
    番組終了ボタン.onclick = () => {
        if (confirm(translations[currentLang].alert_confirmEndProgram)) {
            sendData('endProgram');
        }
    };
    ログダウンロードボタン.onclick = () => {
        const t = translations[currentLang];
        if (programLog.length === 0) {
            alert(t.alert_noLogToDownload);
            return;
        }
        let totalElapsedMs = 0;
        if (currentProgramState) {
            totalElapsedMs = currentProgramState.totalElapsedTime;
            if (currentProgramState.programStatus === 'running') {
                totalElapsedMs += Date.now() - currentProgramState.lastStartTime;
            }
        }
        const finalLog = [...programLog, `${formatLogTime(totalElapsedMs)} - Log downloaded`];
        const logContent = finalLog.join('\r\n');
        const blob = new Blob([logContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const safeTitle = (currentProgramState?.title || 'program').replace(/[^a-z0-9]/gi, '_').toLowerCase();
        a.download = `log_${safeTitle}_${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    テーマ切替ボタン.onclick = () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            テーマアイコン.classList.remove('fa-moon');
            テーマアイコン.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            テーマアイコン.classList.remove('fa-sun');
            テーマアイコン.classList.add('fa-moon');
        }
    };
    copyUrlBtn.onclick = () => {
        const urlToCopy = サーバーURLテキスト.textContent;
        if (!urlToCopy || copyUrlBtn.disabled) return;

        navigator.clipboard.writeText(urlToCopy).then(() => {
            const t = translations[currentLang];
            const originalIcon = '<i class="fas fa-copy"></i>';
            copyUrlBtn.innerHTML = `<i class="fas fa-check"></i> ${t.copied}`;
            copyUrlBtn.disabled = true;

            setTimeout(() => {
                copyUrlBtn.innerHTML = originalIcon;
                copyUrlBtn.disabled = false;
            }, 2000);
        }).catch(err => {
            console.error('URLのコピーに失敗しました: ', err);
        });
    };
    閉じるボタン群.forEach(btn => btn.onclick = () => btn.closest('.modal').classList.add('hidden'));
    window.onclick = (e) => { if (e.target.classList.contains('modal')) e.target.classList.add('hidden'); };
    if (全画面表示ボタン) {
        全画面表示ボタン.onclick = () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen().catch(err => {
                    alert(`Fullscreen failed: ${err.message}`);
                });
            }
        };
    }

    // --- 初期化 ---
    function 初期化() {
        setLanguage(localStorage.getItem('timeqLang') || 'ja');

        プリセットメッセージを読み込む();
        テンプレートリストを更新();
        loadShortcuts();
        loadDisplayScale();
        window.addEventListener('keydown', handleGlobalKeyDown);

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            テーマアイコン.classList.remove('fa-moon');
            テーマアイコン.classList.add('fa-sun');
        }

        const urlParams = new URLSearchParams(window.location.search);
        const role = urlParams.get('role');
        const ip = urlParams.get('ip');

        if (role) {
            IP入力欄.value = ip;
            if (role === 'director') {
                参加する('director'); // ボタンクリックの代わりに直接関数を呼ぶ
            } else if (role === 'personality') {
                参加する('personality'); // ★★★ こちらも直接関数を呼ぶように変更 ★★★
            }
        } else {
            画面を表示する(ホーム画面);
            if (isElectron) {
                electronホーム.classList.remove('hidden');
            } else {
                browserホーム.classList.remove('hidden');
                const urlParamsFromBrowser = new URLSearchParams(window.location.search);
                const directorIP = urlParamsFromBrowser.get('directorIP');
                if (directorIP) {
                    IP入力欄.value = directorIP;
                }
            }
        }
    }

    初期化();
});