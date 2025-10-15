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
            returnToSettings: "Return to Program Settings",
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
            countdownDuration: "Pre-Broadcast Countdown (seconds)",
            fontSizeSettings: "Display Font Size Settings",
            overlayFontSizeLabel: "Instructions/Countdown",
            indicatorFontSizeLabel: "Ack/Response",
            fontSizeSmall: "Small",
            fontSizeMedium: "Medium",
            fontSizeLarge: "Large",
            fontSizeExtraLarge: "Extra Large",
            createCueSheet: "Create Cue Sheet",
            timeEntryModeIndividual: "Individual",
            timeEntryModeCumulative: "Cumulative",
            selectTemplate: "Select Template",
            load: "Load",
            save: "Save",
            overwrite: "Overwrite",
            cornerName: "Segment Name",
            minutes: "Min",
            seconds: "Sec",
            endTimeMinutes: "End(M)",
            endTimeSeconds: "End(S)",
            duration: "Duration",
            totalTime: "Total Time:",
            type: "Type",
            addRow: "Add Row",
            startProgramWithSettings: "Start Program with These Settings",
            presetSettings: "Preset Message Settings",
            presetSettingsDesc: "Enter messages separated by commas.",
            personalityPresetSettings: "Personality Preset Message Settings",
            saveBtn: "Save",
            cancel: "Cancel",
            ok: "OK",
            shortcutSettings: "Shortcut Key Settings",
            shortcutSettingsDesc: "Click the box for the item you want to set, then press the key or key combination (e.g., Ctrl + S).",
            saveSettings: "Save These Settings",
            // Dynamic Alerts & Text
            toast_templateSaved: (name) => `Template "${name}" saved.`,
            toast_templateOverwritten: (name) => `Template "${name}" has been overwritten.`,
            alert_connectionLost: "Connection to the server was lost. Returning to home screen.",
            alert_connectionFailed: "Could not connect to the server.",
            alert_enterIP: "Please enter the server PC's IP address.",
            alert_addCueItem: "Please add at least one item to the cue sheet.",
            alert_confirmEndProgram: "Are you sure you want to end the program?",
            alert_noLogToDownload: "There is no log to download.",
            alert_confirmDeleteTemplate: (name) => `Are you sure you want to delete the template "${name}"?`,
            alert_confirmOverwriteTemplate: (name) => `Are you sure you want to overwrite the template "${name}" with the current content?`,
            prompt_enterTemplateName: "Enter a name for the template",
            role_select: "Select Your Role",
            role_enterIP: "Enter Server PC's IP Address",
            serverStarting: "Starting server...",
            copyURL: "Copy URL",
            copied: "Copied!",
            countdownStandby: "STANDBY...",
            countdownStart: "START!",
            countdownMessage: (sec) => `ON AIR IN ${sec}s`,
            // Cue Sheet Types
            type_talk: "Talk",
            type_music: "Music",
            type_cm: "CM",
            type_other: "Other",
            // Shortcut Items
            shortcut_timer: "Timer Start / Stop",
            shortcut_preset: (name) => `Preset: ${name}`,
            shortcut_personality_preset: (name) => `Response: ${name}`,
            // Default Data
            defaultProgramTitle: "My Radio Program",
            defaultCueOpening: "Opening",
            defaultCueMusic1: "Music 1",
            defaultCueCM: "CM",
            defaultCueEnding: "Ending",
            defaultPresets: ['👍', 'OK!', 'Wrap it up!', 'Go to CM', '30s left'],
            defaultPersonalityPresets: ['👍', 'OK', 'Got it', 'Please repeat', 'Stand by'],
            // Update History is omitted for brevity but should be kept in your file
            updateHistoryContent: [
                { version: "Ver.2.6.0", note: "Added the ability to change the font size for Message from the Director,Response from the Personality,Acknowledgement Display, and Countdown." },
                { version: "Ver.2.5.0", note: "Added pre-show countdown" },
                { version: "Ver.2.4.2", note: "Fixed a critical bug where the program settings modal would not appear. Implemented a custom confirmation dialog to prevent inputs from becoming disabled in the app version." },
                { version: "Ver.2.4.1", note: "Fixed a bug that disabled inputs after loading or overwriting a template." },
                { version: "Ver.2.4.0", note: "Fixed a bug that disabled inputs after loading or overwriting a template." },
                { version: "Ver.2.3.9", note: "Fixed a bug that made all inputs in the program settings modal unusable." },
                { version: "Ver.2.3.8", note: "Added a pre-broadcast countdown feature." },
                { version: "Ver.2.3.7", note: "Fixed an issue where the total time was calculated incorrectly in cumulative mode." },
                { version: "Ver.2.3.6", note: "Added a total time display when in cumulative time entry mode." },
                { version: "Ver.2.3.5", note: "Added a setting to switch cue sheet time entry between individual and cumulative. Added 'Other' to the cue sheet item types." },
                { version: "Ver.2.3.4", note: "Prevented the program settings modal from closing on outside click. Templates now save and load the program title and duration. Cue sheet time entry is now cumulative." },
                { version: "Ver.2.3.3", note: "Added a feature to automatically change the handwriting pen color to white in dark mode." },
                { version: "Ver.2.3.2", note: "Added a feature to overwrite and save existing templates. Fixed an issue where the second window was always on top and did not appear in the taskbar." },
                { version: "Ver.2.3.1", note: "Fixed an issue where personality preset settings were not loading or saving correctly. Improved the behavior when closing the program settings modal." },
                { version: "Ver.2.3.0", note: "Fixed an issue where template inputs became disabled after saving. Added a 'Return to Settings' button after closing the initial setup. Implemented a settings feature for personality preset messages." },
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
            changeDisplaySize: "表示サイズの変更", display100: "表示: 100%", display90: "表示: 90%", display85: "表示: 85%", display75: "表示: 75%", display50: "表示: 50%", display30: "表示: 30%", shortcuts: "ショートカット", updateHistory: "更新履歴", startAsServer: "サーバーとして起動", joinAsClient: "クライアントとして参加", returnToSettings: "番組設定に戻る", waitingForClientsTitle: "クライアントの接続を待っています", waitingForClientsDesc: "他のPCやタブレットから、以下のQRコードまたはURLで接続してください。", openDirectorWindow: "ディレクター画面を開く", openPersonalityWindow: "パーソナリティ画面を開く", enterServerIP: "サーバーPCのIPアドレスを入力", joinAsDirector: "ディレクターとして参加", joinAsPersonality: "パーソナリティとして参加", cueSheet: "進行表", prev: "前へ", next: "次へ", saveLog: "ログ保存", programTimeRemaining: "番組残り時間", programTimeElapsed: "番組経過時間", segmentTimeRemaining: "コーナー残り時間", segmentTimeElapsed: "コーナー経過時間", timeDifference: "押し/巻き", fullscreen: "全画面表示", handwriting: "手書き指示", acknowledged: "了解！", clear: "消去", presetMessages: "プリセットメッセージ", settings: "設定", endProgram: "番組終了", instructions: "指示", waitingForInstructions: "指示を待っています...", acknowledge: "了解", programSettings: "番組設定", programTitle: "番組タイトル", programDuration: "番組全体の時間（分）", countdownDuration: "本番開始カウントダウン（秒）", fontSizeSettings: "表示フォントサイズ設定", overlayFontSizeLabel: "指示/カウントダウン", indicatorFontSizeLabel: "了解/応答", fontSizeSmall: "小", fontSizeMedium: "中", fontSizeLarge: "大", fontSizeExtraLarge: "特大", createCueSheet: "進行表の作成", timeEntryModeIndividual: "個別", timeEntryModeCumulative: "加算", selectTemplate: "テンプレートを選択", load: "読込", save: "保存", overwrite: "上書き保存",
            cornerName: "コーナー名", minutes: "分", seconds: "秒", endTimeMinutes: "終了(分)", endTimeSeconds: "終了(秒)", duration: "時間", totalTime: "合計時間:", type: "タイプ", addRow: "行を追加", startProgramWithSettings: "この内容で番組を開始", presetSettings: "プリセットメッセージ設定", presetSettingsDesc: "カンマ区切りでメッセージを入力してください。", personalityPresetSettings: "パーソナリティのプリセット設定", saveBtn: "保存する", cancel: "キャンセル", ok: "OK",
            shortcutSettings: "ショートカットキー設定",
            shortcutSettingsDesc: "設定したい項目のボックスをクリックしてから、割り当てたいキーまたはキーの組み合わせ（例: Ctrl + S）を押してください。",
            saveSettings: "この設定を保存",
            toast_templateSaved: (name) => `テンプレート「${name}」を保存しました。`,
            toast_templateOverwritten: (name) => `テンプレート「${name}」を上書き保存しました。`,
            alert_connectionLost: "サーバーとの接続が切れました。ホーム画面に戻ります。", alert_connectionFailed: "サーバーに接続できませんでした。", alert_enterIP: "サーバーPCのIPアドレスを入力してください。", alert_addCueItem: "進行表に項目を追加してください。", alert_confirmEndProgram: "本当に番組を終了しますか？", alert_noLogToDownload: "ダウンロードするログがありません。", alert_confirmDeleteTemplate: (name) => `テンプレート「${name}」を本当に削除しますか？`,
            alert_confirmOverwriteTemplate: (name) => `テンプレート「${name}」を現在の内容で上書きしますか？`,
            prompt_enterTemplateName: "テンプレート名を入力してください", role_select: "役割を選択してください", role_enterIP: "サーバーPCのIPアドレスを入力してください", serverStarting: "サーバーを起動中...", copyURL: "URLをコピー", copied: "コピーしました！", countdownStandby: "まもなく本番です...", countdownStart: "スタート！", countdownMessage: (sec) => `本番まであと ${sec} 秒`,
            type_talk: "トーク", type_music: "楽曲", type_cm: "CM", type_other: "その他",
            shortcut_timer: "タイマー開始 / 停止", shortcut_preset: (name) => `プリセット: ${name}`, shortcut_personality_preset: (name) => `応答: ${name}`,
            defaultProgramTitle: "マイラジオプログラム",
            defaultCueOpening: "オープニング",
            defaultCueMusic1: "楽曲1",
            defaultCueCM: "CM",
            defaultCueEnding: "エンディング",
            defaultPresets: ['👍', 'OK!', '巻いて！', 'CMへ', 'あと30秒'],
            defaultPersonalityPresets: ['👍', 'OK', '了解です', 'もう一度お願いします', '少し待ってください'],
            updateHistoryContent: [
                { version: "Ver.2.6.0", note: "「ディレクターからのメッセージ」「パーソナリティからの応答」「了解表示」「カウントダウン」のフォントサイズを変更できる機能を追加" },
                { version: "Ver.2.5.0", note: "本番前カウントダウンを追加" },
                { version: "Ver.2.4.2", note: "カスタム確認ダイアログを導入し、Electron環境でテンプレート上書き保存後に入力不可になる不具合を修正。番組設定が表示されない不具合を修正。" },
                { version: "Ver.2.4.1", note: "テンプレートの上書き保存・読込後に進行表が入力できなくなる不具合を修正。" },
                { version: "Ver.2.4.0", note: "テンプレートの読込・上書き保存後に進行表が入力できなくなる不具合を修正。" },
                { version: "Ver.2.3.9", note: "番組設定画面の全ての入力項目が操作不能になる不具合を修正。" },
                { version: "Ver.2.3.8", note: "本番開始前のカウントダウン機能を追加。" },
                { version: "Ver.2.3.7", note: "加算入力モードの合計時間の計算不具合を修正。" },
                { version: "Ver.2.3.6", note: "加算入力モードの際に合計時間を表示する機能を追加。" },
                { version: "Ver.2.3.5", note: "進行表の時間入力方式を個別・加算で切り替える設定を追加。「タイプ」に「その他」を追加。" },
                { version: "Ver.2.3.4", note: "番組設定画面が外側クリックで閉じないように修正。テンプレートに番組名と放送時間を保存・読込する機能を追加。進行表の時間入力を加算方式に変更。" },
                { version: "Ver.2.3.3", note: "ダークモード時に手書きの線の色を白に変更する機能を追加。" },
                { version: "Ver.2.3.2", note: "既存のテンプレートを上書き保存する機能を追加。2つ目のウィンドウが常に最前面に表示され、タスクバーに表示されない問題を修正。" },
                { version: "Ver.2.3.1", note: "パーソナリティのプリセット設定機能で、初期値の読み込みと保存が正しく行われるよう修正。番組設定モーダルを閉じる際の挙動を改善。" },
                { version: "Ver.2.3.0", note: "テンプレート保存後に入力不可になる不具合を修正。初期設定を閉じた際にホームへ戻り「設定に戻る」ボタンを表示するよう変更。パーソナリティ側のプリセット設定機能を追加。" },
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
    let clientSideCountdownValue = 0;

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('timeqLang', lang);
        document.documentElement.lang = lang;
        const t = translations[lang];
        document.querySelectorAll('[data-i18n-key]').forEach(el => {
            const key = el.dataset.i18nKey;
            if (t[key] && typeof t[key] === 'string') {
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

        if (document.getElementById('return-to-settings-btn')) {
            const span = document.querySelector('#return-to-settings-btn span');
            if (span) span.textContent = t.returnToSettings;
        }
        if (document.getElementById('personality-preset-settings-modal')) {
            document.querySelector('#personality-preset-settings-modal h2').textContent = t.personalityPresetSettings;
            document.querySelector('#personality-preset-settings-modal p').textContent = t.presetSettingsDesc;
            document.querySelector('#save-personality-preset-messages-btn span').textContent = t.saveBtn;
        }
        const pSettingsBtnSpan = document.querySelector('#open-personality-preset-settings-btn span');
        if (pSettingsBtnSpan) {
            pSettingsBtnSpan.textContent = t.settings;
        }

        プリセットメッセージを読み込む();
        loadPersonalityPresets();

        if (自分の役割 === 'director' && !ディレクター画面.classList.contains('hidden')) {
            プリセットボタンを描画する();
        }
        if (自分の役割 === 'personality' && !パーソナリティ画面.classList.contains('hidden')) {
            createPersonalityPresetButtons();
        }
    }

    // --- DOM要素の取得 ---
    const 全ての画面 = document.querySelectorAll('main > div, .modal');
    const 閉じるボタン群 = document.querySelectorAll('.modal .close-btn');
    const ホーム画面 = document.getElementById('home-screen');
    const ディレクター画面 = document.getElementById('director-screen');
    const パーソナリティ画面 = document.getElementById('personality-screen');
    const 番組設定モーダル = document.getElementById('program-settings-modal');
    const 更新履歴モーダル = document.getElementById('history-log-modal');
    const プリセット設定モーダル = document.getElementById('preset-settings-modal');
    const ショートカット設定モーダル = document.getElementById('shortcut-settings-modal');
    const personalityPresetModal = document.getElementById('personality-preset-settings-modal');
    const customPromptModal = document.getElementById('custom-prompt-modal');
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
    const countdownDurationInput = document.getElementById('countdown-duration');
    const mainCountdownOverlay = document.getElementById('main-countdown-overlay');
    const 番組開始ボタン = document.getElementById('start-program-btn');
    const プリセットメッセージ入力欄 = document.getElementById('preset-messages-input');
    const プリセット保存ボタン = document.getElementById('save-preset-messages-btn');
    const personalityPresetMessagesInput = document.getElementById('personality-preset-messages-input');
    const savePersonalityPresetMessagesBtn = document.getElementById('save-personality-preset-messages-btn');
    const 進行表行コンテナ = document.getElementById('cue-sheet-rows-container');
    const 行追加ボタン = document.getElementById('add-cue-row-btn');
    const テンプレート保存ボタン = document.getElementById('save-template-btn');
    const テンプレート選択 = document.getElementById('template-select');
    const テンプレート読込ボタン = document.getElementById('load-template-btn');
    const テンプレート削除ボタン = document.getElementById('delete-template-btn');
    const テンプレート上書き保存ボタン = document.getElementById('overwrite-template-btn');
    const テーマ切替ボタン = document.getElementById('theme-toggle-btn');
    const テーマアイコン = document.querySelector('#theme-toggle-btn i');
    const 全画面表示ボタン = document.getElementById('fullscreen-btn');
    const openPersonalityPresetSettingsBtn = document.getElementById('open-personality-preset-settings-btn');
    const timeEntryModeToggle = document.getElementById('time-entry-mode-toggle');
    const cueSheetHeader = document.querySelector('.cue-sheet-header');
    const totalTimeDisplay = document.getElementById('total-time-display');
    const totalTimeValue = document.getElementById('total-time-value');
    const overlayFontSizeInput = document.getElementById('overlay-font-size');
    const indicatorFontSizeInput = document.getElementById('indicator-font-size');

    let socket;
    let 自分の役割 = null;
    let animationFrameId = null;
    let timerMode = 'countdown';
    let 手書きパッド;
    let プリセットメッセージリスト = [];
    let personalityPresetMessagesList = [];
    let programLog = [];
    let currentProgramState = null;
    let shortcuts = {};
    const isElectron = !!window.electronAPI;
    let lastCanvasWidth = 1;
    let lastCanvasHeight = 1;
    let resizeTimer;
    let isCumulativeTimeMode = false;
    let countdownInterval = null;

    // --- 動的UI生成 ---
    const returnToSettingsBtn = document.createElement('button');
    if (electronホーム) {
        returnToSettingsBtn.innerHTML = `<i class="fas fa-cog"></i> <span data-i18n-key="returnToSettings">番組設定に戻る</span>`;
        returnToSettingsBtn.id = 'return-to-settings-btn';
        returnToSettingsBtn.classList.add('hidden');
        returnToSettingsBtn.style.marginTop = '1rem';
        electronホーム.appendChild(returnToSettingsBtn);
    }

    if (了解インジケーター) {
        了解インジケーター.style.padding = '1rem 2rem';
        // 了解インジケーター.style.fontSize = '1.25rem'; // CSS変数で管理するため削除
        了解インジケーター.style.top = '2.5rem';
        了解インジケーター.style.right = '2.5rem';
    }

    function initializePersonalityUI() {
        if (document.body.hasAttribute('data-personality-ui-initialized')) return;
        document.body.setAttribute('data-personality-ui-initialized', 'true');

        if (openPersonalityPresetSettingsBtn) {
            openPersonalityPresetSettingsBtn.onclick = () => {
                if (personalityPresetModal && personalityPresetMessagesInput) {
                    loadPersonalityPresets();
                    personalityPresetMessagesInput.value = personalityPresetMessagesList.join(',');
                    personalityPresetModal.classList.remove('hidden');
                }
            };
        }
        createPersonalityPresetButtons();
    }

    function createPersonalityPresetButtons() {
        const area = document.getElementById('personality-presets-area');
        if (!area) return;
        area.innerHTML = '';
        personalityPresetMessagesList.forEach(text => {
            const btn = document.createElement('button');
            btn.textContent = text;
            btn.className = 'icon-btn';
            btn.onclick = () => {
                sendData('personalityMessage', { text: text });
            };
            area.appendChild(btn);
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.backgroundColor = 'rgba(0,0,0,0.7)';
        toast.style.color = 'white';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '1001';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        document.body.appendChild(toast);
        setTimeout(() => toast.style.opacity = '1', 10);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function showCustomConfirm(message) {
        return new Promise(resolve => {
            const modal = document.getElementById('custom-prompt-modal');
            const titleEl = document.getElementById('prompt-title');
            const inputEl = document.getElementById('prompt-input');
            const okBtn = document.getElementById('prompt-ok-btn');
            const cancelBtn = document.getElementById('prompt-cancel-btn');
            const t = translations[currentLang];

            titleEl.textContent = message;
            inputEl.style.display = 'none';
            okBtn.textContent = t.ok;
            cancelBtn.textContent = t.cancel;

            modal.classList.remove('hidden');

            const cleanupAndResolve = (value) => {
                okBtn.onclick = null;
                cancelBtn.onclick = null;
                modal.classList.add('hidden');
                resolve(value);
            };

            okBtn.onclick = () => cleanupAndResolve(true);
            cancelBtn.onclick = () => cleanupAndResolve(false);
        });
    }

    function getTemplateNameFromModal() {
        return new Promise(resolve => {
            const modal = document.getElementById('custom-prompt-modal');
            const titleEl = document.getElementById('prompt-title');
            const inputEl = document.getElementById('prompt-input');
            const okBtn = document.getElementById('prompt-ok-btn');
            const cancelBtn = document.getElementById('prompt-cancel-btn');
            const t = translations[currentLang];

            titleEl.textContent = t.prompt_enterTemplateName;
            inputEl.style.display = 'block';
            inputEl.value = '';
            okBtn.textContent = t.ok;
            cancelBtn.textContent = t.cancel;

            modal.classList.remove('hidden');
            inputEl.focus();

            const cleanupAndResolve = (value) => {
                okBtn.onclick = null;
                cancelBtn.onclick = null;
                modal.classList.add('hidden');
                resolve(value);
            };

            okBtn.onclick = () => cleanupAndResolve(inputEl.value);
            cancelBtn.onclick = () => cleanupAndResolve(null);
        });
    }


    function 初期化手書きパッド() {
        if (!手書きキャンバス) return;
        if (手書きパッド) {
            手書きパッド.off();
        }
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        手書きキャンバス.width = 手書きキャンバス.offsetWidth * ratio;
        手書きキャンバス.height = 手書きキャンバス.offsetHeight * ratio;
        手書きキャンバス.getContext("2d").scale(ratio, ratio);

        const isDarkMode = document.body.classList.contains('dark-theme');
        const penColor = isDarkMode ? 'white' : 'black';

        手書きパッド = new SignaturePad(手書きキャンバス, {
            penColor: penColor
        });
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
        全ての画面.forEach(画面 => {
            if (!画面.classList.contains('modal')) {
                画面.classList.add('hidden');
            }
        });
        if (表示する画面) 表示する画面.classList.remove('hidden');
    }

    function connectToServer(ipAddress) {
        const t = translations[currentLang];
        socket = new WebSocket('ws://' + ipAddress + ':8080');
        socket.onopen = () => {
            console.log('サーバーに接続しました。');
            if (自分の役割 === 'director') {
                sendData('identify', { role: 'director' });
                // 初回接続時は設定モーダルを表示するが、再接続時はstateUpdateを待つ
                if (!currentProgramState) {
                    画面を表示する(ディレクター画面);
                    番組設定モーダルをリセットする();
                    番組設定モーダル.classList.remove('hidden');
                }
            } else {
                sendData('identify', { role: 'personality' });
                画面を表示する(パーソナリティ画面);
                initializePersonalityUI();
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

            if (state.programStatus === 'ready') {
                clientSideCountdownValue = state.countdown || 0;
            } else {
                clientSideCountdownValue = 0;
            }

            if (state.programStatus === 'standby') {
                return;
            }

            if (自分の役割 === 'director') {
                画面を表示する(ディレクター画面);
                if (state.programStatus === 'running') {
                    playPauseBtn.innerHTML = `<i class="fas fa-pause"></i> PAUSE`;
                    playPauseBtn.classList.add('paused');
                } else {
                    playPauseBtn.innerHTML = `<i class="fas fa-play"></i> START`;
                    playPauseBtn.classList.remove('paused');
                }
                // ★★★ 修正箇所: 後から参加したディレクターも手書き機能を初期化する ★★★
                if (!手書きパッド) {
                    プリセットボタンを描画する();
                    setTimeout(初期化手書きパッド, 100);
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
                const t = translations[currentLang];
                const overlay = プリセットメッセージ表示;

                if (!text) {
                    overlay.classList.add('hidden');
                    return;
                }

                overlay.textContent = text;
                overlay.classList.remove('hidden');

                setTimeout(() => {
                    overlay.classList.add('hidden');
                }, 5000);
            }
        }
        if (data.type === 'acknowledged') {
            if (自分の役割 === 'director') {
                了解インジケーター.textContent = t.acknowledged;
                了解インジケーター.classList.add('show');
                setTimeout(() => {
                    了解インジケーター.classList.remove('show');
                }, 2000);
            }
        }
        if (data.type === 'personalityMessage') {
            if (自分の役割 === 'director') {
                const { text } = data.payload;
                了解インジケーター.textContent = text;
                了解インジケーター.classList.add('show');
                setTimeout(() => {
                    了解インジケーター.classList.remove('show');
                    setTimeout(() => {
                        了解インジケーター.textContent = t.acknowledged;
                    }, 300);
                }, 3000);
            }
        }
        if (data.type === 'programEnded') {
            clientSideCountdownValue = 0;
            window.location.reload();
        }

        if (data.type === 'countdownTick') {
            const { text } = data.payload;
            const t = translations[currentLang];
            const overlay = (自分の役割 === 'director') ? mainCountdownOverlay : プリセットメッセージ表示;

            if (!text) {
                overlay.classList.add('hidden');
                return;
            }

            overlay.textContent = text;
            overlay.classList.remove('hidden');

            const isStart = text === t.countdownStart;
            const countdownBaseString = t.countdownMessage(0).split('0')[0];
            const isCountdown = text.startsWith(countdownBaseString);

            overlay.style.color = 'white'; // Default
            if (isStart) {
                overlay.style.color = '#2ecc71'; // Green
            } else if (isCountdown) {
                const match = text.match(/\d+/);
                if (match && parseInt(match[0], 10) <= 3) {
                    overlay.style.color = '#e74c3c'; // Red
                }
            }
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
        loadShortcuts();
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
        recalculateDurations();
        const 進行表データ = [];
        document.querySelectorAll('#cue-sheet-rows-container .cue-sheet-row').forEach((row, index) => {
            進行表データ.push({
                id: index,
                title: row.querySelector('.cue-title-input').value || 'Untitled',
                duration: parseInt(row.dataset.duration, 10) || 0,
                type: row.querySelector('.cue-type-select').value
            });
        });
        if (進行表データ.length === 0) {
            alert(t.alert_addCueItem);
            return;
        }

        const countdown = parseInt(countdownDurationInput.value, 10) || 0;
        clientSideCountdownValue = countdown;

        const 番組データ = {
            title: 番組タイトル入力欄.value,
            totalDuration: parseInt(番組時間入力欄.value, 10) * 60,
            cueSheet: 進行表データ,
            countdown: countdown
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

    function プリセットメッセージを読み込む() {
        const 保存されたメッセージ = localStorage.getItem(`timeqPresetMessages_${currentLang}`);
        if (保存されたメッセージ) {
            プリセットメッセージリスト = 保存されたメッセージ.split(',');
        } else {
            プリセットメッセージリスト = translations[currentLang].defaultPresets;
        }
    }

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

    function プリセットメッセージを保存する() {
        const messages = プリセットメッセージ入力欄.value.split(',').map(m => m.trim()).filter(m => m);
        プリセットメッセージリスト = messages;
        localStorage.setItem(`timeqPresetMessages_${currentLang}`, messages.join(','));
        プリセットボタンを描画する();
        プリセット設定モーダル.classList.add('hidden');
    }

    function loadPersonalityPresets() {
        const saved = localStorage.getItem(`timeqPersonalityPresets_${currentLang}`);
        if (saved !== null) {
            personalityPresetMessagesList = saved === '' ? [] : saved.split(',');
        } else {
            personalityPresetMessagesList = translations[currentLang].defaultPersonalityPresets;
        }
    }

    function savePersonalityPresets() {
        if (!personalityPresetMessagesInput) return;
        const messages = personalityPresetMessagesInput.value.split(',').map(m => m.trim()).filter(m => m);
        personalityPresetMessagesList = messages;
        localStorage.setItem(`timeqPersonalityPresets_${currentLang}`, messages.join(','));
        createPersonalityPresetButtons();
        if (personalityPresetModal) {
            personalityPresetModal.classList.add('hidden');
        }
    }

    function addCueRow(title = '', minutes = '', seconds = '', type = 'talk') {
        const t = translations[currentLang];
        const row = document.createElement('div');
        row.className = 'cue-sheet-row';
        row.classList.add(isCumulativeTimeMode ? 'cumulative-mode' : 'individual-mode');

        const typeOptions = `
            <option value="talk" ${type === 'talk' ? 'selected' : ''}>${t.type_talk}</option>
            <option value="music" ${type === 'music' ? 'selected' : ''}>${t.type_music}</option>
            <option value="cm" ${type === 'cm' ? 'selected' : ''}>${t.type_cm}</option>
            <option value="other" ${type === 'other' ? 'selected' : ''}>${t.type_other}</option>
        `;

        row.innerHTML = `
            <div class="col-title"><input type="text" class="cue-title-input" placeholder="${t.cornerName}" value="${title}"></div>
            <div class="col-time-min"><input type="number" class="cue-time-minutes-input" placeholder="${t.minutes}" value="${minutes}" min="0"></div>
            <div class="col-time-sec"><input type="number" class="cue-time-seconds-input" placeholder="${t.seconds}" value="${seconds}" min="0" max="59"></div>
            <div class="col-duration"><span class="cue-calculated-duration">0:00</span></div>
            <div class="col-type"><select class="cue-type-select">${typeOptions}</select></div>
            <div class="col-action"><button class="remove-cue-row-btn icon-btn danger-btn">×</button></div>`;

        進行表行コンテナ.appendChild(row);
        row.querySelector('.remove-cue-row-btn').addEventListener('click', () => {
            row.remove();
            recalculateDurations();
        });
    }

    function recalculateDurations() {
        let previousEndTimeSec = 0;
        let totalDurationSec = 0;
        const rows = document.querySelectorAll('#cue-sheet-rows-container .cue-sheet-row');
        rows.forEach(row => {
            const minInput = row.querySelector('.cue-time-minutes-input');
            const secInput = row.querySelector('.cue-time-seconds-input');
            let durationSec = 0;

            if (isCumulativeTimeMode) {
                const durationDisplay = row.querySelector('.cue-calculated-duration');
                const currentEndTimeSec = (parseInt(minInput.value, 10) || 0) * 60 + (parseInt(secInput.value, 10) || 0);
                durationSec = currentEndTimeSec - previousEndTimeSec;

                if (durationDisplay) {
                    const durationMin = Math.floor(Math.abs(durationSec) / 60);
                    const durationRemainingSec = Math.abs(durationSec) % 60;
                    durationDisplay.textContent = `${durationSec < 0 ? '-' : ''}${durationMin}:${String(durationRemainingSec).padStart(2, '0')}`;
                    durationDisplay.style.color = durationSec < 0 ? '#e74c3c' : '';
                }
                previousEndTimeSec = currentEndTimeSec;
            } else {
                durationSec = (parseInt(minInput.value, 10) || 0) * 60 + (parseInt(secInput.value, 10) || 0);
            }
            row.dataset.duration = durationSec;
            totalDurationSec += durationSec;
        });

        if (rows.length > 0) {
            const totalMinutes = Math.floor(totalDurationSec / 60);
            const totalSeconds = totalDurationSec % 60;
            totalTimeValue.textContent = `${totalMinutes}:${String(totalSeconds).padStart(2, '0')}`;
            totalTimeDisplay.classList.remove('hidden');
        } else {
            totalTimeDisplay.classList.add('hidden');
        }
    }

    function updateCueSheetLayout(isCumulative) {
        const t = translations[currentLang];
        isCumulativeTimeMode = isCumulative;

        const builder = document.getElementById('cue-sheet-builder');
        builder.classList.toggle('cumulative-mode', isCumulative);
        builder.classList.toggle('individual-mode', !isCumulative);

        const rows = Array.from(document.querySelectorAll('#cue-sheet-rows-container .cue-sheet-row'));

        let cumulativeTimeSec = 0;
        rows.forEach(row => {
            const minInput = row.querySelector('.cue-time-minutes-input');
            const secInput = row.querySelector('.cue-time-seconds-input');

            if (isCumulative) {
                const durationSec = parseInt(row.dataset.duration, 10) || 0;
                cumulativeTimeSec += durationSec;
                minInput.value = Math.floor(cumulativeTimeSec / 60);
                secInput.value = cumulativeTimeSec % 60;
            } else {
                const durationSec = parseInt(row.dataset.duration, 10) || 0;
                minInput.value = Math.floor(durationSec / 60);
                secInput.value = durationSec % 60;
            }
        });

        recalculateDurations();
    }

    function 番組設定モーダルをリセットする() {
        const t = translations[currentLang];
        番組タイトル入力欄.value = t.defaultProgramTitle;
        番組時間入力欄.value = '30';
        countdownDurationInput.value = '10';
        進行表行コンテナ.innerHTML = '';

        if (isCumulativeTimeMode) {
            addCueRow(t.defaultCueOpening, '5', '0', 'talk');
            addCueRow(t.defaultCueMusic1, '9', '0', 'music');
            addCueRow(t.defaultCueCM, '10', '0', 'cm');
            addCueRow(t.defaultCueEnding, '11', '0', 'talk');
        } else {
            addCueRow(t.defaultCueOpening, '5', '0', 'talk');
            addCueRow(t.defaultCueMusic1, '4', '0', 'music');
            addCueRow(t.defaultCueCM, '1', '0', 'cm');
            addCueRow(t.defaultCueEnding, '1', '0', 'talk');
        }
        recalculateDurations();
    }

    function eventToShortcutString(e) {
        const code = e.code;
        if (['ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'].includes(code)) {
            return null;
        }
        const parts = [];
        if (e.ctrlKey) parts.push('Ctrl');
        if (e.metaKey) parts.push('Meta');
        if (e.altKey) parts.push('Alt');
        if (e.shiftKey) parts.push('Shift');
        parts.push(code);
        return parts.join('+');
    }

    function formatShortcutString(shortcutString) {
        if (!shortcutString) return translations[currentLang].settings || 'Not Set';
        const parts = shortcutString.split('+');
        const formattedParts = parts.map(part => {
            let formatted = part;
            if (part.startsWith('Key')) {
                formatted = part.substring(3);
            } else if (part.startsWith('Digit')) {
                formatted = part.substring(5);
            } else if (part === 'Meta') {
                formatted = '⌘ / Win';
            }
            return formattedParts.join(' + ');
        });
        return formattedParts.join(' + ');
    }

    function loadShortcuts() {
        shortcuts = JSON.parse(localStorage.getItem(`timeqShortcuts_${自分の役割}`) || '{}');
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
        localStorage.setItem(`timeqShortcuts_${自分の役割}`, JSON.stringify(shortcuts));
        alert(translations[currentLang].saveSettings);
        ショートカット設定モーダル.classList.add('hidden');
    }

    function openShortcutSettingsModal() {
        const t = translations[currentLang];
        ショートカットリストコンテナ.innerHTML = '';

        if (自分の役割 === 'director') {
            createShortcutRow('togglePlayPause', t.shortcut_timer);
            プリセットメッセージリスト.forEach((msg, index) => {
                createShortcutRow(`preset_${index}`, t.shortcut_preset(msg));
            });
        } else if (自分の役割 === 'personality') {
            createShortcutRow('acknowledge', t.acknowledge);
            personalityPresetMessagesList.forEach((msg, index) => {
                createShortcutRow(`personality_preset_${index}`, t.shortcut_personality_preset(msg));
            });
        }
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
            if (自分の役割 === 'director') {
                if (action === 'togglePlayPause') {
                    playPauseBtn.click();
                } else if (action.startsWith('preset_')) {
                    const index = parseInt(action.split('_')[1], 10);
                    const presetButtons = プリセットボタンエリア.querySelectorAll('.preset-btn');
                    if (presetButtons[index]) {
                        presetButtons[index].click();
                    }
                }
            } else if (自分の役割 === 'personality') {
                if (action === 'acknowledge') {
                    了解ボタン.click();
                } else if (action.startsWith('personality_preset_')) {
                    const index = parseInt(action.split('_')[2], 10);
                    const presetButtons = document.querySelectorAll('#personality-presets-area button');
                    if (presetButtons[index]) {
                        presetButtons[index].click();
                    }
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

    function getTemplates() { return JSON.parse(localStorage.getItem('timeqCueTemplates') || '{}'); }
    function saveTemplates(templates) { localStorage.setItem('timeqCueTemplates', JSON.stringify(templates)); }

    function saveFontSizes() {
        const settings = {
            overlay: overlayFontSizeInput.value,
            indicator: indicatorFontSizeInput.value
        };
        localStorage.setItem('timeqFontSizes', JSON.stringify(settings));
    }

    function loadAndApplyFontSizes() {
        const savedSettings = localStorage.getItem('timeqFontSizes');
        const defaultSettings = { overlay: '2.25', indicator: '1.25' };
        const settings = savedSettings ? JSON.parse(savedSettings) : defaultSettings;

        overlayFontSizeInput.value = settings.overlay;
        indicatorFontSizeInput.value = settings.indicator;

        document.documentElement.style.setProperty('--overlay-font-size', settings.overlay + 'rem');
        document.documentElement.style.setProperty('--indicator-font-size', settings.indicator + 'rem');
    }

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
    進行表行コンテナ.addEventListener('input', (e) => {
        if (e.target.classList.contains('cue-time-minutes-input') || e.target.classList.contains('cue-time-seconds-input')) {
            recalculateDurations();
        }
    });

    if (overlayFontSizeInput && indicatorFontSizeInput) {
        overlayFontSizeInput.addEventListener('change', () => {
            document.documentElement.style.setProperty('--overlay-font-size', overlayFontSizeInput.value + 'rem');
            saveFontSizes();
        });

        indicatorFontSizeInput.addEventListener('change', () => {
            document.documentElement.style.setProperty('--indicator-font-size', indicatorFontSizeInput.value + 'rem');
            saveFontSizes();
        });
    }

    timeEntryModeToggle.addEventListener('change', () => {
        updateCueSheetLayout(timeEntryModeToggle.checked);
    });

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
    if (サーバー起動ボタン) {
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
    }
    if (openDirectorWindowBtn) {
        openDirectorWindowBtn.onclick = () => {
            window.electronAPI.openDirectorWindow();
        };
    }
    if (openPersonalityWindowBtn) {
        openPersonalityWindowBtn.onclick = () => {
            window.electronAPI.openPersonalityWindow();
        };
    }
    if (クライアントとして参加ボタン) {
        クライアントとして参加ボタン.onclick = () => {
            electronホーム.classList.add('hidden');
            browserホーム.classList.remove('hidden');
        };
    }
    returnToSettingsBtn.onclick = () => {
        画面を表示する(ディレクター画面);
        番組設定モーダル.classList.remove('hidden');
        returnToSettingsBtn.classList.add('hidden');
        if (isElectron) {
            const buttonGroup = electronホーム.querySelector('.button-group');
            if (buttonGroup) buttonGroup.classList.remove('hidden');
        }
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
    行追加ボタン.onclick = () => {
        const rows = document.querySelectorAll('#cue-sheet-rows-container .cue-sheet-row');
        if (isCumulativeTimeMode && rows.length > 0) {
            const lastRow = rows[rows.length - 1];
            const minInput = lastRow.querySelector('.cue-time-minutes-input');
            const secInput = lastRow.querySelector('.cue-time-seconds-input');
            const lastEndTime = (parseInt(minInput.value, 10) || 0) * 60 + (parseInt(secInput.value, 10) || 0);
            const newEndTime = lastEndTime + 60; // 最後に1分追加
            addCueRow('', Math.floor(newEndTime / 60), newEndTime % 60);
        } else {
            addCueRow('', '1', '0');
        }
        recalculateDurations();
    };

    playPauseBtn.onclick = () => {
        if (clientSideCountdownValue > 0) {
            let remaining = clientSideCountdownValue;
            const t = translations[currentLang];
            const initialMessage = t.countdownStandby;

            clientSideCountdownValue = 0;
            playPauseBtn.disabled = true;

            const directorOverlay = mainCountdownOverlay;

            directorOverlay.classList.remove('hidden');
            directorOverlay.textContent = initialMessage;
            directorOverlay.style.color = 'white';
            sendData('countdownTick', { text: initialMessage });

            setTimeout(() => {
                const localCountdownInterval = setInterval(() => {
                    if (remaining > 0) {
                        const message = t.countdownMessage(remaining);
                        directorOverlay.textContent = message;
                        sendData('countdownTick', { text: message });

                        if (remaining <= 3) directorOverlay.style.color = '#e74c3c';

                        remaining--;
                    } else {
                        clearInterval(localCountdownInterval);
                        const startMessage = t.countdownStart;
                        directorOverlay.textContent = startMessage;
                        directorOverlay.style.color = '#2ecc71';
                        sendData('countdownTick', { text: startMessage });

                        sendData('togglePlayPause');

                        setTimeout(() => {
                            directorOverlay.classList.add('hidden');
                            sendData('countdownTick', { text: '' });
                            playPauseBtn.disabled = false;
                        }, 1000);
                    }
                }, 1000);
            }, 500);
        } else {
            sendData('togglePlayPause');
        }
    };

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
    if (savePersonalityPresetMessagesBtn) {
        savePersonalityPresetMessagesBtn.onclick = savePersonalityPresets;
    }

    プリセットボタンエリア.addEventListener('click', (e) => {
        if (e.target.classList.contains('preset-btn')) {
            const message = e.target.dataset.message;
            sendData('presetMessage', { text: message });
        }
    });
    了解ボタン.onclick = () => { sendData('acknowledgement'); };

    テンプレート保存ボタン.onclick = async () => {
        const t = translations[currentLang];
        const name = await getTemplateNameFromModal();
        if (name === null || name.trim() === '') return;

        recalculateDurations();
        const templates = getTemplates();
        const rows = document.querySelectorAll('#cue-sheet-rows-container .cue-sheet-row');
        const templateData = {
            programTitle: 番組タイトル入力欄.value,
            programDuration: 番組時間入力欄.value,
            cueSheet: Array.from(rows).map(row => {
                const durationSec = parseInt(row.dataset.duration, 10) || 0;
                return {
                    title: row.querySelector('.cue-title-input').value,
                    minutes: String(Math.floor(durationSec / 60)),
                    seconds: String(durationSec % 60),
                    type: row.querySelector('.cue-type-select').value
                };
            })
        };
        templates[name] = templateData;
        saveTemplates(templates);
        テンプレートリストを更新();
        showToast(t.toast_templateSaved(name));
    };

    テンプレート読込ボタン.onclick = () => {
        const name = テンプレート選択.value;
        if (!name) return;
        const templates = getTemplates();
        const templateData = templates[name];
        if (templateData) {
            進行表行コンテナ.innerHTML = '';

            let cueSheetItems;
            if (Array.isArray(templateData)) {
                番組タイトル入力欄.value = translations[currentLang].defaultProgramTitle;
                番組時間入力欄.value = '30';
                cueSheetItems = templateData;
            } else {
                番組タイトル入力欄.value = templateData.programTitle || '';
                番組時間入力欄.value = templateData.programDuration || '30';
                cueSheetItems = templateData.cueSheet || [];
            }

            let cumulativeTimeSec = 0;
            cueSheetItems.forEach(item => {
                const durationSec = (parseInt(item.minutes, 10) || 0) * 60 + (parseInt(item.seconds, 10) || 0);
                if (isCumulativeTimeMode) {
                    cumulativeTimeSec += durationSec;
                    addCueRow(item.title, String(Math.floor(cumulativeTimeSec / 60)), String(cumulativeTimeSec % 60), item.type);
                } else {
                    addCueRow(item.title, item.minutes, item.seconds, item.type);
                }
            });

            recalculateDurations();

            テンプレート上書き保存ボタン.disabled = false;
        }
    };

    テンプレート上書き保存ボタン.onclick = async () => {
        const name = テンプレート選択.value;
        if (!name) return;

        const t = translations[currentLang];
        const confirmed = await showCustomConfirm(t.alert_confirmOverwriteTemplate(name));

        if (confirmed) {
            recalculateDurations();
            const templates = getTemplates();
            const rows = document.querySelectorAll('#cue-sheet-rows-container .cue-sheet-row');
            const templateData = {
                programTitle: 番組タイトル入力欄.value,
                programDuration: 番組時間入力欄.value,
                cueSheet: Array.from(rows).map(row => {
                    const durationSec = parseInt(row.dataset.duration, 10) || 0;
                    return {
                        title: row.querySelector('.cue-title-input').value,
                        minutes: String(Math.floor(durationSec / 60)),
                        seconds: String(durationSec % 60),
                        type: row.querySelector('.cue-type-select').value
                    };
                })
            };
            templates[name] = templateData;
            saveTemplates(templates);
            showToast(t.toast_templateOverwritten(name));
        }
    };

    テンプレート削除ボタン.onclick = async () => {
        const name = テンプレート選択.value;
        if (!name) return;
        const t = translations[currentLang];
        const confirmed = await showCustomConfirm(t.alert_confirmDeleteTemplate(name));
        if (confirmed) {
            const templates = getTemplates();
            delete templates[name];
            saveTemplates(templates);
            テンプレートリストを更新();
            テンプレート読込ボタン.disabled = true;
            テンプレート上書き保存ボタン.disabled = true;
            テンプレート削除ボタン.disabled = true;
        }
    };

    テンプレート選択.addEventListener('change', () => {
        const isTemplateSelected = テンプレート選択.value !== "";
        テンプレート読込ボタン.disabled = !isTemplateSelected;
        テンプレート上書き保存ボタン.disabled = !isTemplateSelected;
        テンプレート削除ボタン.disabled = !isTemplateSelected;
    });

    タイマー表示エリア.onclick = toggleTimerMode;
    if (タイマー表示エリア_パーソナリティ) {
        タイマー表示エリア_パーソナリティ.onclick = toggleTimerMode;
    }
    番組終了ボタン.onclick = async () => {
        const t = translations[currentLang];
        const confirmed = await showCustomConfirm(t.alert_confirmEndProgram);
        if (confirmed) {
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
        let newPenColor;
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            テーマアイコン.classList.remove('fa-moon');
            テーマアイコン.classList.add('fa-sun');
            newPenColor = 'white';
        } else {
            localStorage.setItem('theme', 'light');
            テーマアイコン.classList.remove('fa-sun');
            テーマアイコン.classList.add('fa-moon');
            newPenColor = 'black';
        }

        if (手書きパッド) {
            手書きパッド.penColor = newPenColor;
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

    閉じるボタン群.forEach(btn => {
        btn.onclick = () => {
            const modal = btn.closest('.modal');
            if (!modal) return;

            if (modal.id === 'program-settings-modal' && !currentProgramState) {
                modal.classList.add('hidden');
                画面を表示する(ホーム画面);
                if (isElectron) {
                    electronホーム.classList.remove('hidden');
                    const buttonGroup = electronホーム.querySelector('.button-group');
                    if (buttonGroup) {
                        buttonGroup.classList.add('hidden');
                    }
                    returnToSettingsBtn.classList.remove('hidden');
                }
            } else {
                modal.classList.add('hidden');
            }
        };
    });

    window.onclick = (e) => {
        if (e.target.classList.contains('modal')) {
            if (e.target.id !== 'program-settings-modal' && e.target.id !== 'custom-prompt-modal') {
                e.target.classList.add('hidden');
            }
        }
    };

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

    // --- 初期化処理 ---
    function 初期化() {
        setLanguage(localStorage.getItem('timeqLang') || 'ja');
        テンプレートリストを更新();
        loadDisplayScale();
        loadAndApplyFontSizes();
        window.addEventListener('keydown', handleGlobalKeyDown);

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            テーマアイコン.classList.remove('fa-moon');
            テーマアイコン.classList.add('fa-sun');
        }

        updateCueSheetLayout(timeEntryModeToggle.checked);

        const urlParams = new URLSearchParams(window.location.search);
        const role = urlParams.get('role');
        const ip = urlParams.get('ip');

        if (role && ip) {
            IP入力欄.value = ip;
            if (role === 'director') {
                参加する('director');
            } else if (role === 'personality') {
                参加する('personality');
            }
        } else {
            画面を表示する(ホーム画面);
            if (isElectron) {
                electronホーム.classList.remove('hidden');
            } else {
                browserホーム.classList.remove('hidden');
            }
        }
    }

    初期化();
});