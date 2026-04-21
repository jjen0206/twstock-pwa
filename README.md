# 台股智慧看盤 PWA · 手機安裝手把手

把這個資料夾上傳到 GitHub，3 分鐘後你的手機就會有一個「真的 APP」可以用，不用 App Store、不用 Google Play。

---

## 一、你會得到什麼

- 手機主畫面上有一個 📊 圖示（跟 Line、Chrome 旁邊一樣）
- 點開進入全螢幕，沒有網址列、沒有分頁列
- 可以離線看（開過一次之後，沒網路也能打開看歷史資料）
- 內建「🔄 一鍵更新」綠色按鈕，按下去就抓 FinMind 最新盤後資料

---

## 二、事前準備（只要 1 次）

**需要：** GitHub 帳號 1 組（免費）。沒有就去 https://github.com/signup 註冊，email 認證 30 秒搞定。

---

## 三、上傳檔案（桌機操作）

### 步驟 1：建一個新的 Repository

1. 登入 GitHub 後，右上角點 `+` → `New repository`
2. Repository name 填：`twstock` （或任何你喜歡的名字，全小寫英數）
3. 勾選 **Public**（一定要 Public，Pages 免費版只支援公開）
4. 下面的 Add README / .gitignore 全都**不要勾**
5. 按綠色按鈕 `Create repository`

### 步驟 2：拖檔案上去

1. 頁面會顯示 `uploading an existing file` 的藍色連結，點它
   （或網址列加 `/upload/main`）
2. 把 `github部署包/` 資料夾裡的**所有檔案**全選 → 拖進瀏覽器視窗
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon.svg`
   - `icon-192.png`
   - `icon-512.png`
   - `README.md`（這個檔案本身）
3. 等上傳進度條跑完，下方 Commit message 填 `init`，按綠色 `Commit changes`

### 步驟 3：開啟 GitHub Pages

1. 在 repo 頁面，點上方 `Settings`（右邊數來第二個）
2. 左邊側欄點 `Pages`
3. 在 `Branch` 這一欄：
   - 左邊下拉選 `main`
   - 右邊下拉選 `/ (root)`
   - 按 `Save`
4. 等 1–2 分鐘（GitHub 在幫你部署），然後**重新整理**這個頁面
5. 頁面上方會出現綠色方塊：`Your site is live at https://你的帳號.github.io/twstock/`
6. **記住這個網址！** 等一下手機要用

---

## 四、手機安裝（iPhone）

1. 打開 **Safari**（不能用 Chrome，iOS 限制）
2. 輸入你的 GitHub Pages 網址（例：`https://你的帳號.github.io/twstock/`）
3. 等畫面跑出來（頂端會看到綠色 bar：📦 真實資料 · 截至 YYYY-MM-DD）
4. 點下方中間的「分享」按鈕 🔗（方框+上箭頭）
5. 往下滑，找到 `加入主畫面 / Add to Home Screen`
6. 右上角按 `新增`
7. 主畫面多一個 📊「智慧看盤」圖示 → 點開就是全螢幕 APP

## 四、手機安裝（Android）

1. 打開 **Chrome**
2. 輸入你的 GitHub Pages 網址
3. 等畫面跑出來
4. 右上角三個點 ⋮ → `安裝應用程式 / Install app`
   - 或頁面下方會自動彈出橫幅「安裝智慧看盤」，按安裝
5. 主畫面多一個 📊 圖示 → 點開就是全螢幕 APP

---

## 五、日常使用

- **看最新資料：** 按頂端綠色「🔄 一鍵更新」按鈕
  - APP 會嘗試 3 個端點：直連 FinMind → corsproxy.io → allorigins.win
  - 成功後頂端日期會更新、下方「上次更新 HH:MM:SS」會顯示
- **離線看：** Service Worker 已快取，斷網也能開 APP（但按一鍵更新會失敗，顯示為嵌入資料）
- **收盤時間：** 台股盤後 14:30 左右 FinMind 才會有當日資料，14:35 之後按更新最準

---

## 六、要換股票清單 / 調整策略

直接在桌機改 `index.html`：

- **換股票：** 找 `const STOCKS = [` 這一段（大約第 590 行），改 id/name 即可
- **改策略：** 找 `function calc(`、`function calcAdd(`（獨孤求敗邏輯）
- 改完重新上傳 → GitHub Pages 自動重新部署（1 分鐘）
- 手機 APP 會自動抓到新版（Service Worker 會更新）

---

## 七、疑難排解

**Q: 網址進去白畫面？**
- 確認 repo 是 **Public**
- 確認 Settings → Pages 顯示 `Your site is live at ...` 綠框
- 清瀏覽器快取（iOS Safari：設定 → Safari → 清除瀏覽紀錄）

**Q: 一鍵更新按下去沒反應？**
- 確認你開的是 `https://...` 網址（不是 `file://` 本機檔）
- 開發者工具（桌機 F12 → Console）看錯誤訊息
- 三個端點有可能全被擋（FinMind 免費額度 600 次/日/IP），換網路試試

**Q: 手機上沒有「加到主畫面」選項？**
- iPhone 必須用 **Safari**，Chrome 不行
- Android 必須用 **Chrome**，有些預設瀏覽器不支援

**Q: 圖示是空白方框？**
- 檢查 repo 裡有沒有 `icon-192.png` 和 `icon-512.png`
- 有可能上傳時漏了，補上傳即可

---

## 八、檔案結構

```
twstock/
├─ index.html         ← 主程式（含嵌入的真實資料）
├─ manifest.json      ← PWA 設定（APP 名稱、圖示、啟動 URL）
├─ sw.js              ← Service Worker（離線快取 + 跨域放行）
├─ icon.svg           ← 向量圖示
├─ icon-192.png       ← 手機主畫面圖示
├─ icon-512.png       ← 大圖示（啟動畫面用）
└─ README.md          ← 本文件
```

---

**完成後傳張手機 APP 畫面截圖給 Claude 確認一下就 100% 完工 🎉**
