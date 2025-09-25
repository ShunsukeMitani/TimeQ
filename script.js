document.addEventListener('DOMContentLoaded', () => {
    // --- HTML要素の取得 ---
    const 全ての画面 = document.querySelectorAll('main > div, .modal');
    const ホーム画面 = document.getElementById('home-screen');
    const ディレクター画面 = document.getElementById('director-screen');
    const パーソナリティ画面 = document.getElementById('personality-screen');
    const 番組設定モーダル = document.getElementById('program-settings-modal');
    const 更新履歴モーダル = document.getElementById('history-log-modal');
    const プリセット設定モーダル = document.getElementById('preset-settings-modal');
    const ホームタイトル = document.getElementById('home-title');
    const electronホーム = document.getElementById('electron-home');
    const browserホーム = document.getElementById('browser-home');
    const ルーム作成ボタン = document.getElementById('create-room-btn');
    const director参加ボタン = document.getElementById('join-director-btn');
    const personality参加ボタン = document.getElementById('join-personality-btn');
    const IP入力欄 = document.getElementById('ip-input');
    const 手動接続ボタン = document.getElementById('manual-join-btn');
    const ルーム情報表示 = document.getElementById('room-info-display');
    const ルームIDテキスト = document.getElementById('room-id-text');
    const 閉じるボタン群 = document.querySelectorAll('.close-btn');
    const 更新履歴ボタン = document.getElementById('history-log-btn');
    const 更新履歴リスト = document.getElementById('history-log-list');
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
    const 手書きラッパー = document.getElementById('handwriting-wrapper');
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
    const 接続URLテキスト = document.getElementById('connection-url-text');
    const QRコード画像 = document.getElementById('qr-code-image');

    const 更新履歴 = [
        { version: "Ver.1.1", note: "iPadでもディレクター側できるように修正。" },
        { version: "Ver.1.0", note: "オフライン版として初回リリース。ウェブ版の全機能に加え、IPアドレス・QRコードによる簡単接続、双方向通信などを実装。" },
        { version: "Ver.0.06", note: "メニューバーを非表示にし、最終的な調整を実施。" },
        { version: "Ver.0.05", note: "IPアドレスの自動表示機能、テンプレート保存機能、ログダウンロード機能などを追加。" },
        { version: "Ver.0.04", note: "手書き指示とプリセットメッセージのリアルタイム同期機能を追加。" },
        { version: "Ver.0.03", note: "タイマーの再生/停止、進行表の次へ/前へ機能の同期を実装。" },
        { version: "Ver.0.02", note: "WebSocketによるローカルサーバー機能を実装。" },
        { version: "Ver.0.01", note: "オフライン版開発プロジェクトを開始。Electronの基本構造を構築。" },
    ];

    // --- アプリの状態管理 ---
    let socket;
    let 自分の役割 = null;
    let animationFrameId = null;
    let timerMode = 'countdown';
    let 手書きパッド;
    let myIpAddress = '取得中...';
    let プリセットメッセージリスト = [];
    let programLog = [];
    let currentProgramState = null;

    const isElectron = !!window.electronAPI;

    if (isElectron) {
        window.electronAPI.onConnectionInfo((info) => {
            myIpAddress = info.ip;
            接続URLテキスト.textContent = info.url;
            QRコード画像.src = info.qr;
            if (自分の役割 === 'director') {
                ルーム情報表示.classList.remove('hidden');
                ルームIDテキスト.textContent = `IP: ${myIpAddress}`;
            }
        });
    }

    // --- ヘルパー関数 ---
    function showCustomPrompt(title) {
        return new Promise((resolve) => {
            プロンプトタイトル.textContent = title;
            プロンプト入力欄.value = '';
            カスタムプロンプトモーダル.classList.remove('hidden');
            プロンプト入力欄.focus();
            const onOk = () => {
                cleanup();
                resolve(プロンプト入力欄.value);
            };
            const onCancel = () => {
                cleanup();
                resolve(null);
            };
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
    const 手書き更新処理 = throttle(() => {
        if (自分の役割 === 'director' && 手書きパッド) {
            const データURL = 手書きパッド.isEmpty() ? '' : 手書きパッド.toDataURL();
            sendData('handwritingUpdate', { dataURL: データURL });
        }
    }, 100);

    function formatLogTime(ms) {
        if (isNaN(ms) || ms < 0) ms = 0;
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `[${[hours, minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':')}]`;
    }

    // --- WebSocket通信機能 ---
    function connectToServer(ipAddress) {
        socket = new WebSocket('ws://' + ipAddress + ':8080');
        socket.onopen = () => {
            console.log('サーバーに接続しました。');
            if (自分の役割 === 'director') {
                if (isElectron) {
                    sendData('identify', { role: 'director' });
                    番組設定モーダルをリセットする();
                    番組設定モーダル.classList.remove('hidden');
                } else {
                    画面を表示する(ディレクター画面);
                    setTimeout(初期化手書きパッド, 100);
                }
            } else {
                画面を表示する(パーソナリティ画面);
                パーソナリティ進行表.innerHTML = `<h2>ディレクターの操作を待っています...</h2>`;
            }
        };
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            handleServerMessage(data);
        };
        socket.onclose = () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            alert('サーバーとの接続が切れました。ホーム画面に戻ります。');
            window.location.reload();
        };
        socket.onerror = (error) => {
            console.error('WebSocketエラー:', error);
            alert('サーバーに接続できませんでした。');
        };
    }

    function handleServerMessage(data) {
        if (data.type === 'stateUpdate') {
            const prevState = currentProgramState;
            currentProgramState = data.payload;
            const state = currentProgramState;
            if (!state) return;
            if (自分の役割 === 'director') {
                画面を表示する(ディレクター画面);
                if (state.programStatus === 'running') {
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> PAUSE';
                    playPauseBtn.classList.add('paused');
                } else {
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i> START';
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
                programLog.push(`${formatLogTime(totalElapsedMs)} - コーナー開始: ${newCue.title}`);
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
                    指示表示エリア.innerHTML = `<img src="${dataURL}" alt="手書き指示">`;
                } else {
                    指示表示エリア.innerHTML = '<p>指示を待っています...</p>';
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
            alert('番組が終了しました。');
            window.location.reload();
        }
    }

    function sendData(type, payload) {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type, payload }));
        }
    }

    // --- メイン機能 ---
    function サーバーを起動する() {
        自分の役割 = 'director';
        ルーム情報表示.classList.remove('hidden');
        ルームIDテキスト.textContent = `IP: ${myIpAddress}`;
        プリセットボタンを描画する();
        テンプレートリストを更新();
        connectToServer('localhost');
    }
    function 参加する(role, ipAddress) {
        自分の役割 = role;
        if (!ipAddress) {
            alert('サーバーPCのIPアドレスを入力してください。');
            return;
        }
        connectToServer(ipAddress);
    }
    function 番組を開始する() {
        const 進行表データ = [];
        document.querySelectorAll('#cue-sheet-rows-container .cue-sheet-row').forEach((row, index) => {
            進行表データ.push({
                id: index,
                title: row.querySelector('.cue-title-input').value || '無題',
                duration: (parseInt(row.querySelector('.cue-minutes-input').value, 10) || 0) * 60 + (parseInt(row.querySelector('.cue-seconds-input').value, 10) || 0),
                type: row.querySelector('.cue-type-select').value
            });
        });
        if (進行表データ.length === 0) return alert('進行表に項目を追加してください。');
        const 番組データ = {
            title: 番組タイトル入力欄.value,
            totalDuration: parseInt(番組時間入力欄.value, 10) * 60,
            cueSheet: 進行表データ,
        };
        programLog = [`[00:00:00] - 番組開始: ${番組データ.title}`];
        sendData('startProgram', 番組データ);
        番組設定モーダル.classList.add('hidden');
        if (!isElectron) {
            画面を表示する(ディレクター画面);
            setTimeout(初期化手書きパッド, 100);
        }
    }

    // --- UIヘルパー関数 ---
    function getTemplates() { return JSON.parse(localStorage.getItem('timeqCueTemplates') || '{}'); }
    function saveTemplates(templates) { localStorage.setItem('timeqCueTemplates', JSON.stringify(templates)); }
    function テンプレートリストを更新() {
        const templates = getTemplates();
        テンプレート選択.innerHTML = '<option value="">テンプレートを読込</option>';
        for (const name in templates) {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            テンプレート選択.appendChild(option);
        }
    }
    function プリセットメッセージを読み込む() {
        const 保存されたメッセージ = localStorage.getItem('timeqPresetMessages');
        if (保存されたメッセージ) {
            プリセットメッセージリスト = 保存されたメッセージ.split(',');
        } else {
            プリセットメッセージリスト = ['👍', 'OK!', '巻いて！', 'CMへ', 'あと30秒'];
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
        localStorage.setItem('timeqPresetMessages', messages.join(','));
        プリセットボタンを描画する();
        プリセット設定モーダル.classList.add('hidden');
    }
    function 初期化手書きパッド() {
        if (!手書きキャンバス) return;
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        手書きキャンバス.width = 手書きキャンバス.offsetWidth * ratio;
        手書きキャンバス.height = 手書きキャンバス.offsetHeight * ratio;
        手書きキャンバス.getContext("2d").scale(ratio, ratio);
        手書きパッド = new SignaturePad(手書きキャンバス);
        手書きパッド.addEventListener("afterUpdateStroke", 手書き更新処理);
    }
    function 画面を表示する(表示する画面) {
        全ての画面.forEach(画面 => 画面.classList.add('hidden'));
        if (表示する画面) 表示する画面.classList.remove('hidden');
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
        let totalElapsedSeconds = state.totalElapsedTime / 1000;
        if (state.programStatus === 'running') {
            totalElapsedSeconds += (Date.now() - state.lastStartTime) / 1000;
        }
        const currentCueItem = state.cueSheet[state.currentItemIndex];
        let segmentElapsedSeconds = 0;
        if (state.currentItemStartTime > 0) {
            if (state.programStatus === 'running') {
                segmentElapsedSeconds = (Date.now() - state.currentItemStartTime) / 1000;
            } else {
                segmentElapsedSeconds = (state.lastPauseTime > state.currentItemStartTime) ? (state.lastPauseTime - state.currentItemStartTime) / 1000 : 0;
            }
        }
        const segmentRemainingSeconds = currentCueItem.duration - segmentElapsedSeconds;
        const programClock = (自分の役割 === 'director') ? 番組タイマー表示 : 番組タイマー表示_パーソナリティ;
        const programLabel = (自分の役割 === 'director') ? 番組タイマーラベル : 番組タイマーラベル_パーソナリティ;
        const segmentClock = (自分の役割 === 'director') ? セグメントタイマー表示 : セグメントタイマー表示_パーソナリティ;
        const segmentLabel = (自分の役割 === 'director') ? セグメントタイマーラベル : セグメントタイマーラベル_パーソナリティ;
        programLabel.textContent = (timerMode === 'countup') ? '番組経過時間' : '番組残り時間';
        const programDisplaySeconds = (timerMode === 'countup') ? totalElapsedSeconds : state.totalDuration - totalElapsedSeconds;
        programClock.textContent = formatTime(programDisplaySeconds, true).substring(1);
        segmentLabel.textContent = (timerMode === 'countup') ? 'コーナー経過時間' : 'コーナー残り時間';
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
    function addCueRow(title = '', minutes = '', seconds = '', type = 'talk') {
        const row = document.createElement('div');
        row.className = 'cue-sheet-row';
        row.innerHTML = `<div class="col-title"><input type="text" class="cue-title-input" placeholder="コーナー名" value="${title}"></div><div class="col-min"><input type="number" class="cue-minutes-input" placeholder="分" value="${minutes}" min="0"></div><div class="col-sec"><input type="number" class="cue-seconds-input" placeholder="秒" value="${seconds}" min="0" max="59"></div><div class="col-type"><select class="cue-type-select"><option value="talk" ${type === 'talk' ? 'selected' : ''}>トーク</option><option value="music" ${type === 'music' ? 'selected' : ''}>楽曲</option><option value="cm" ${type === 'cm' ? 'selected' : ''}>CM</option></select></div><div class="col-action"><button class="remove-cue-row-btn icon-btn danger-btn">×</button></div>`;
        進行表行コンテナ.appendChild(row);
        row.querySelector('.remove-cue-row-btn').addEventListener('click', () => row.remove());
    }
    function 番組設定モーダルをリセットする() {
        番組タイトル入力欄.value = 'マイラジオプログラム';
        番組時間入力欄.value = '30';
        進行表行コンテナ.innerHTML = '';
        addCueRow('オープニング', '5', '0', 'talk');
        addCueRow('楽曲1', '4', '0', 'music');
        addCueRow('CM', '1', '0', 'cm');
        addCueRow('エンディング', '1', '0', 'talk');
    }

    // --- イベントリスナー設定 ---
    ルーム作成ボタン.onclick = サーバーを起動する;
    director参加ボタン.onclick = () => 参加する('director', IP入力欄.value.trim());
    personality参加ボタン.onclick = () => 参加する('personality', IP入力欄.value.trim());
    手動接続ボタン.onclick = () => {
        if (!自分の役割) {
            alert('まず役割を選択してください。');
            return;
        }
        参加する(自分の役割, IP入力欄.value.trim());
    };
    番組開始ボタン.onclick = 番組を開始する;
    更新履歴ボタン.onclick = () => {
        更新履歴リスト.innerHTML = '';
        更新履歴.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${item.version}</strong> ${item.note}`;
            更新履歴リスト.appendChild(li);
        });
        更新履歴モーダル.classList.remove('hidden');
    };
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
    了解ボタン.onclick = () => {
        sendData('acknowledgement');
    };
    テンプレート保存ボタン.onclick = async () => {
        const name = await showCustomPrompt('テンプレート名を入力してください');
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
        alert(`「${name}」という名前でテンプレートを保存しました。`);
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
        if (confirm(`テンプレート「${name}」を本当に削除しますか？`)) {
            const templates = getTemplates();
            delete templates[name];
            saveTemplates(templates);
            テンプレートリストを更新();
        }
    };
    function toggleTimerMode() {
        timerMode = (timerMode === 'countdown') ? 'countup' : 'countdown';
        if (currentProgramState) {
            updateAllTimers(currentProgramState);
        }
    }
    タイマー表示エリア.onclick = toggleTimerMode;
    タイマー表示エリア_パーソナリティ.onclick = toggleTimerMode;
    番組終了ボタン.onclick = () => {
        if (confirm('本当に番組を終了しますか？')) {
            sendData('endProgram');
        }
    };
    ログダウンロードボタン.onclick = () => {
        if (programLog.length === 0) return alert('ダウンロードするログがありません。');
        let totalElapsedMs = 0;
        if (currentProgramState) {
            totalElapsedMs = currentProgramState.totalElapsedTime;
            if (currentProgramState.programStatus === 'running') {
                totalElapsedMs += Date.now() - currentProgramState.lastStartTime;
            }
        }
        const finalLog = [...programLog, `${formatLogTime(totalElapsedMs)} - ログをダウンロード`];
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
    閉じるボタン群.forEach(btn => btn.onclick = () => btn.closest('.modal').classList.add('hidden'));
    window.onclick = (e) => { if (e.target.classList.contains('modal')) e.target.classList.add('hidden'); };

    // --- 初期化 ---
    function 初期化() {
        プリセットメッセージを読み込む();
        テンプレートリストを更新();
        画面を表示する(ホーム画面);

        if (isElectron) {
            electronホーム.classList.remove('hidden');
        } else {
            browserホーム.classList.remove('hidden');
            const urlParams = new URLSearchParams(window.location.search);
            const directorIP = urlParams.get('directorIP');

            if (directorIP) {
                ホームタイトル.textContent = '役割を選択してください';
                IP入力欄.value = directorIP;
            } else {
                ホームタイトル.textContent = 'サーバーPCのIPアドレスを入力してください';
            }
        }
    }
    初期化();
});