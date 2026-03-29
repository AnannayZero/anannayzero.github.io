<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ibucatto Comparator v3.6</title>
    <style>
        :root { --bg: #050505; --neon: #39ff14; --glass: rgba(57, 255, 20, 0.03); --card: #0d0d11; --border: #1f1f26; --vs: #ff0055; }
        body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--bg); color: #e0e0e0; margin: 0; padding: 20px; line-height: 1.5; }
        .container { max-width: 1200px; margin: 0 auto; }
        
        /* Header */
        .header { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid #222; margin-bottom: 30px; }
        .title { font-size: 1.5rem; font-weight: 900; letter-spacing: 3px; color: #fff; text-transform: uppercase; }
        .title span { color: var(--neon); text-shadow: 0 0 10px rgba(57, 255, 20, 0.3); }
        .api-area { font-size: 10px; color: #444; }

        /* Use Case */
        .use-case-box { background: var(--card); border: 1px solid var(--border); border-left: 4px solid var(--neon); padding: 15px; border-radius: 8px; margin-bottom: 30px; }
        .label { font-size: 0.7rem; text-transform: uppercase; color: #666; letter-spacing: 1px; display: block; margin-bottom: 8px; }
        .use-case-input { background: #000; border: 1px solid #222; color: #fff; width: 100%; padding: 12px; border-radius: 6px; box-sizing: border-box; font-size: 1rem; }

        /* Grid System */
        .battle-arena { display: grid; grid-template-columns: 1fr 60px 1fr; gap: 20px; align-items: start; }
        .vs-sign { display: flex; align-items: center; justify-content: center; height: 400px; font-weight: 900; font-size: 1.5rem; color: var(--vs); opacity: 0.5; }

        /* Slot Card */
        .slot { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 25px; position: relative; transition: 0.4s; }
        .slot.winner { border-color: var(--neon); box-shadow: 0 0 30px rgba(57, 255, 20, 0.1); }
        .slot.winner::before { content: "RANK: ALPHA UNIT"; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--neon); color: #000; padding: 2px 12px; font-size: 0.7rem; font-weight: 900; border-radius: 4px; }

        .input-group { display: flex; gap: 8px; margin-bottom: 20px; }
        .model-input { flex-grow: 1; background: #000; border: 1px solid #333; color: #fff; padding: 12px; border-radius: 6px; outline: none; }
        .model-input:focus { border-color: var(--neon); }
        
        .scan-btn { background: var(--neon); color: #000; border: none; padding: 0 20px; border-radius: 6px; font-weight: 900; cursor: pointer; text-transform: uppercase; font-size: 0.8rem; }
        .scan-btn:disabled { background: #222; color: #444; cursor: not-allowed; }

        .score { font-size: 4rem; font-weight: 900; text-align: center; margin: 10px 0; font-family: monospace; color: #1a1a1f; }
        .has-data .score { color: var(--neon); }

        /* Specs */
        .spec-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #1a1a1f; font-size: 0.85rem; }
        .spec-n { color: #555; text-transform: uppercase; font-size: 0.7rem; }
        .spec-v { color: #ccc; font-family: monospace; text-align: right; max-width: 60%; }

        .analysis { margin-top: 20px; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; font-size: 0.8rem; color: #888; }
        .analysis ul { padding-left: 15px; margin: 0; }
        .analysis li { margin-bottom: 5px; }

        /* Loading Animation */
        .loader { display: none; text-align: center; color: var(--neon); font-size: 0.7rem; letter-spacing: 2px; margin-bottom: 10px; }
        .loading .loader { display: block; animation: blink 1s infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        @media (max-width: 850px) {
            .battle-arena { grid-template-columns: 1fr; }
            .vs-sign { height: 50px; transform: rotate(90deg); }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <div class="title">IBUCATTO <span>COMPARATOR</span></div>
        <div class="api-area">ENCRYPTED LINK ACTIVE</div>
    </div>

    <div class="use-case-box">
        <span class="label">Deployment Parameters (Use Case)</span>
        <input type="text" id="mainUseCase" class="use-case-input" placeholder="e.g. 4K Video Editing, Heavy Gaming, Engineering Software...">
    </div>

    <div class="battle-arena">
        <!-- Laptop 1 -->
        <div class="slot" id="slot1">
            <div class="loader">UPLINKING...</div>
            <div class="input-group">
                <input type="text" id="query1" class="model-input" placeholder="Model name...">
                <button class="scan-btn" id="btn1" onclick="runScan(1)">Scan</button>
            </div>
            <div class="score" id="score1">00</div>
            <div class="specs">
                <div class="spec-row"><span class="spec-n">CPU</span><span class="spec-v" id="cpu1">--</span></div>
                <div class="spec-row"><span class="spec-n">GPU</span><span class="spec-v" id="gpu1">--</span></div>
                <div class="spec-row"><span class="spec-n">RAM</span><span class="spec-v" id="ram1">--</span></div>
                <div class="spec-row"><span class="spec-n">Display</span><span class="spec-v" id="screen1">--</span></div>
                <div class="spec-row"><span class="spec-n">Battery/Power</span><span class="spec-v" id="bat1">--</span></div>
                <div class="spec-row"><span class="spec-n">Est. Price</span><span class="spec-v" id="price1">--</span></div>
            </div>
            <div class="analysis"><ul id="sum1"></ul></div>
        </div>

        <div class="vs-sign">VS</div>

        <!-- Laptop 2 -->
        <div class="slot" id="slot2">
            <div class="loader">UPLINKING...</div>
            <div class="input-group">
                <input type="text" id="query2" class="model-input" placeholder="Model name...">
                <button class="scan-btn" id="btn2" onclick="runScan(2)">Scan</button>
            </div>
            <div class="score" id="score2">00</div>
            <div class="specs">
                <div class="spec-row"><span class="spec-n">CPU</span><span class="spec-v" id="cpu2">--</span></div>
                <div class="spec-row"><span class="spec-n">GPU</span><span class="spec-v" id="gpu2">--</span></div>
                <div class="spec-row"><span class="spec-n">RAM</span><span class="spec-v" id="ram2">--</span></div>
                <div class="spec-row"><span class="spec-n">Display</span><span class="spec-v" id="screen2">--</span></div>
                <div class="spec-row"><span class="spec-n">Battery/Power</span><span class="spec-v" id="bat2">--</span></div>
                <div class="spec-row"><span class="spec-n">Est. Price</span><span class="spec-v" id="price2">--</span></div>
            </div>
            <div class="analysis"><ul id="sum2"></ul></div>
        </div>
    </div>
</div>

<script>
    // HARDCODED CONFIG
    const API_KEY = "AIzaSyC3Mwun5oDx1l3wi1tU4RT9tkqzZh346NY";
    const scores = { 1: 0, 2: 0 };

    async function runScan(slotId) {
        const query = document.getElementById(`query${slotId}`).value;
        const useCase = document.getElementById('mainUseCase').value || "General Use";
        
        if (!query) return alert("Enter a model name");

        const slotEl = document.getElementById(`slot${slotId}`);
        const btn = document.getElementById(`btn${slotId}`);
        
        slotEl.classList.add('loading');
        slotEl.classList.remove('winner', 'has-data');
        btn.disabled = true;

        const prompt = `Research the laptop "${query}" for this use case: "${useCase}". 
        Return ONLY a JSON object exactly like this:
        {
          "cpu": "model",
          "gpu": "model + tgp",
          "ram": "size + type",
          "display": "specs",
          "battery": "Wh and estimated hours",
          "price": "approx price",
          "score": 1-100,
          "points": ["point 1", "point 2"]
        }`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    tools: [{ google_search_retrieval: {} }]
                })
            });

            const result = await response.json();
            
            if (result.error) {
                throw new Error(result.error.message);
            }

            const rawText = result.candidates[0].content.parts[0].text;
            
            // IMPROVED JSON EXTRACTION: Finds the first { and last }
            const start = rawText.indexOf('{');
            const end = rawText.lastIndexOf('}') + 1;
            const jsonStr = rawText.substring(start, end);
            const data = JSON.parse(jsonStr);

            // Update UI
            scores[slotId] = data.score;
            document.getElementById(`score${slotId}`).innerText = data.score;
            document.getElementById(`cpu${slotId}`).innerText = data.cpu;
            document.getElementById(`gpu${slotId}`).innerText = data.gpu;
            document.getElementById(`ram${slotId}`).innerText = data.ram;
            document.getElementById(`screen${slotId}`).innerText = data.display;
            document.getElementById(`bat${slotId}`).innerText = data.battery;
            document.getElementById(`price${slotId}`).innerText = data.price;
            
            document.getElementById(`sum${slotId}`).innerHTML = 
                data.points.map(p => `<li>${p}</li>`).join('');

            slotEl.classList.add('has-data');
            calculateWinner();

        } catch (e) {
            console.error(e);
            alert("SCAN ERROR: " + e.message);
        } finally {
            slotEl.classList.remove('loading');
            btn.disabled = false;
        }
    }

    function calculateWinner() {
        if (scores[1] > 0 && scores[2] > 0) {
            document.getElementById('slot1').classList.remove('winner');
            document.getElementById('slot2').classList.remove('winner');
            
            if (scores[1] > scores[2]) document.getElementById('slot1').classList.add('winner');
            else if (scores[2] > scores[1]) document.getElementById('slot2').classList.add('winner');
        }
    }
</script>

</body>
</html>        .title span { color: var(--neon); text-shadow: 0 0 10px rgba(57, 255, 20, 0.5); }
        .api-key-area { display: flex; gap: 10px; align-items: center; opacity: 0.6; transition: 0.3s; }
        .api-key-area:hover { opacity: 1; }
        .api-key-input { background: #111; border: 1px solid #333; color: var(--neon); padding: 10px; border-radius: 6px; width: 280px; font-family: monospace; font-size: 0.8rem; }
        
        /* Use Case Bar */
        .use-case-bar { background: var(--card); border: 1px solid #222; border-radius: 12px; padding: 20px; margin-bottom: 40px; position: relative; overflow: hidden; }
        .use-case-bar::before { content: ""; position: absolute; left: 0; top: 0; height: 100%; width: 4px; background: var(--neon); }
        .use-case-label { font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; display: block; }
        .use-case-input { background: #000; border: 1px solid #333; color: #fff; padding: 15px; border-radius: 8px; font-size: 1.1rem; width: 100%; box-sizing: border-box; resize: none; transition: 0.3s; }
        .use-case-input:focus { border-color: var(--neon); outline: none; box-shadow: 0 0 15px rgba(57, 255, 20, 0.1); }
        
        /* The Battle Grid */
        .battle-grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: 20px; align-items: start; }
        .vs-divider { display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 2rem; color: var(--vs); height: 500px; text-shadow: 0 0 10px var(--vs); }
        
        .slot { background: var(--card); border: 1px solid #2a2a30; border-radius: 20px; padding: 30px; position: relative; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .slot.winner { border-color: var(--neon); box-shadow: 0 0 50px rgba(57, 255, 20, 0.2); transform: translateY(-10px); }
        .slot.winner::after { content: "SUPERIOR UNIT"; position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: var(--neon); color: #000; padding: 5px 20px; font-weight: 900; border-radius: 20px; font-size: 0.7rem; letter-spacing: 1px; }
        
        .model-input-area { display: flex; gap: 10px; margin-bottom: 20px; }
        .model-input { flex-grow: 1; padding: 15px; background: #000; border: 1px solid #444; color: #fff; border-radius: 10px; font-size: 1.1rem; }
        
        .fetch-btn { background: var(--neon); color: #000; border: none; padding: 0 25px; font-weight: 800; cursor: pointer; border-radius: 10px; text-transform: uppercase; transition: 0.2s; }
        .fetch-btn:hover { background: #fff; filter: drop-shadow(0 0 10px #fff); }
        .fetch-btn:disabled { background: #333; color: #666; cursor: wait; }
        
        .score-display { font-size: 5rem; font-weight: 950; color: #222; text-align: center; margin: 10px 0; font-family: 'Arial Black', sans-serif; line-height: 1; transition: 0.5s; }
        .has-data .score-display { color: var(--neon); text-shadow: 0 0 20px rgba(57, 255, 20, 0.3); }

        /* Spec Table */
        .spec-list { margin-top: 25px; border-top: 1px solid #222; }
        .spec-item { display: flex; flex-direction: column; padding: 12px 0; border-bottom: 1px solid #222; }
        .spec-label { color: #555; text-transform: uppercase; font-size: 0.65rem; letter-spacing: 1px; margin-bottom: 4px; }
        .spec-value { font-family: 'Courier New', monospace; font-size: 0.95rem; color: #ddd; }
        
        /* Analysis Area */
        .summary-area { margin-top: 25px; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px; min-height: 120px; }
        .summary-list { list-style: none; padding: 0; margin: 0; font-size: 0.85rem; color: #aaa; line-height: 1.6; }
        .summary-list li { margin-bottom: 8px; padding-left: 18px; position: relative; }
        .summary-list li::before { content: ">"; color: var(--neon); position: absolute; left: 0; }
        
        .loading-overlay { display: none; position: absolute; inset: 0; background: rgba(0,0,0,0.8); border-radius: 20px; z-index: 10; align-items: center; justify-content: center; flex-direction: column; }
        .loading .loading-overlay { display: flex; }
        .loader-bar { width: 100px; height: 2px; background: #222; margin-top: 10px; position: relative; overflow: hidden; }
        .loader-bar::after { content: ""; position: absolute; width: 40px; height: 100%; background: var(--neon); animation: slide 1s infinite linear; }
        @keyframes slide { from { left: -40px; } to { left: 100px; } }

        @media (max-width: 900px) {
            .battle-grid { grid-template-columns: 1fr; }
            .vs-divider { height: auto; padding: 20px; transform: rotate(90deg); }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <div class="title">IBUCATTO <span>COMPARATOR</span> v3.5</div>
        <div class="api-key-area">
            <input type="text" id="currencySign" placeholder="$" value="$" style="width: 40px; background: #111; border: 1px solid #333; color: #fff; padding: 10px; border-radius: 6px; text-align: center;">
            <input type="password" id="apiKey" class="api-key-input" value="AIzaSyC3Mwun5oDx1l3wi1tU4RT9tkqzZh346NY">
        </div>
    </div>

    <div class="use-case-bar">
        <span class="use-case-label">Tactical Use Case (Performance Context)</span>
        <textarea id="mainUseCase" class="use-case-input" placeholder="e.g. Professional 3D Rendering, Competitive 240Hz Gaming, or Long Battery Life for Travel..." rows="1"></textarea>
    </div>

    <div class="battle-grid">
        <!-- Slot 1 -->
        <div class="slot" id="slot1">
            <div class="loading-overlay">
                <div style="letter-spacing: 2px; font-size: 0.8rem;">ACCESSING GLOBAL DATABASE...</div>
                <div class="loader-bar"></div>
            </div>
            <div class="model-input-area">
                <input type="text" id="query1" class="model-input" placeholder="Laptop Model 1">
                <button class="fetch-btn" id="btn1" onclick="runAutomatedFetch(1)">SCAN</button>
            </div>
            <div class="score-display" id="score1">00</div>
            <div class="spec-list">
                <div class="spec-item"><span class="spec-label">CPU</span> <span id="cpu1" class="spec-value">--</span></div>
                <div class="spec-item"><span class="spec-label">GPU</span> <span id="gpu1" class="spec-value">--</span></div>
                <div class="spec-item"><span class="spec-label">RAM</span> <span id="ram1" class="spec-value">--</span></div>
                <div class="spec-item"><span class="spec-label">DISPLAY</span> <span id="screen1" class="spec-value">--</span></div>
                <div class="spec-item"><span class="spec-label">VALUATION</span> <span id="price1" class="spec-value">--</span></div>
            </div>
            <div class="summary-area">
                <ul class="summary-list" id="summary1"></ul>
            </div>
        </div>

        <div class="vs-divider">VS</div>

        <!-- Slot 2 -->
        <div class="slot" id="slot2">
            <div class="loading-overlay">
                <div style="letter-spacing: 2px; font-size: 0.8rem;">ACCESSING GLOBAL DATABASE...</div>
                <div class="loader-bar"></div>
            </div>
            <div class="model-input-area">
                <input type="text" id="query2" class="model-input" placeholder="Laptop Model 2">
                <button class="fetch-btn" id="btn2" onclick="runAutomatedFetch(2)">SCAN</button>
            </div>
            <div class="score-display" id="score2">00</div>
            <div class="spec-list">
                <div class="spec-item"><span class="spec-label">CPU</span> <span id="cpu2" class="spec-value">--</span></div>
                <div class="spec-item"><span class="spec-label">GPU</span> <span id="gpu2" class="spec-value">--</span></div>
                <div class="spec-item"><span class="spec-label">RAM</span> <span id="ram2" class="spec-value">--</span></div>
                <div class="spec-item"><span class="spec-label">DISPLAY</span> <span id="screen2" class="spec-value">--</span></div>
                <div class="spec-item"><span class="spec-label">VALUATION</span> <span id="price2" class="spec-value">--</span></div>
            </div>
            <div class="summary-area">
                <ul class="summary-list" id="summary2"></ul>
            </div>
        </div>
    </div>
</div>

<script>
    const globalScores = { 1: 0, 2: 0 };

    async function runAutomatedFetch(slotId) {
        const key = document.getElementById('apiKey').value;
        const query = document.getElementById(`query${slotId}`).value;
        const useCase = document.getElementById('mainUseCase').value || "General High Performance";
        const currency = document.getElementById('currencySign').value || "$";

        if (!key) return alert("CRITICAL ERROR: No API Key detected.");
        if (!query) return alert("TARGET MISSING: Enter model name.");

        const slotEl = document.getElementById(`slot${slotId}`);
        const btn = document.getElementById(`btn${slotId}`);
        
        slotEl.classList.add('loading');
        slotEl.classList.remove('winner', 'has-data');
        btn.disabled = true;

        const prompt = `Research the laptop "${query}" for the use case: "${useCase}".
        Compare its actual technical specs against current market standards. 
        Return ONLY a JSON object. No conversational text.
        Structure:
        {
          "cpu": "Full model name",
          "gpu": "Full model name + Wattage/TGP",
          "ram": "Size, Speed, and Type",
          "display": "Resolution, Refresh Rate, Panel Type",
          "price": "Current estimated price (numeric only)",
          "score": (Int 1-100 based on use case suitability),
          "points": ["Major pro/con for use case 1", "Point 2", "Point 3"]
        }`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    tools: [{ google_search_retrieval: {} }]
                })
            });

            const result = await response.json();
            const rawText = result.candidates[0].content.parts[0].text;
            
            // Extract clean JSON from AI response
            const cleanJsonText = rawText.replace(/```json|```/g, "").trim();
            const data = JSON.parse(cleanJsonText);

            // Populate UI
            globalScores[slotId] = data.score;
            document.getElementById(`score${slotId}`).innerText = data.score;
            document.getElementById(`cpu${slotId}`).innerText = data.cpu;
            document.getElementById(`gpu${slotId}`).innerText = data.gpu;
            document.getElementById(`ram${slotId}`).innerText = data.ram;
            document.getElementById(`screen${slotId}`).innerText = data.display;
            document.getElementById(`price${slotId}`).innerText = `${currency}${data.price}`;

            const summaryList = document.getElementById(`summary${slotId}`);
            summaryList.innerHTML = data.points.map(p => `<li>${p}</li>`).join('');

            slotEl.classList.add('has-data');
            compareAndHighlight();

        } catch (e) {
            console.error("Critical Error:", e);
            alert("DATA UPLINK FAILED: Ensure API key is active.");
        } finally {
            slotEl.classList.remove('loading');
            btn.disabled = false;
        }
    }

    function compareAndHighlight() {
        const slot1 = document.getElementById('slot1');
        const slot2 = document.getElementById('slot2');
        
        if (globalScores[1] > 0 && globalScores[2] > 0) {
            slot1.classList.remove('winner');
            slot2.classList.remove('winner');

            if (globalScores[1] > globalScores[2]) {
                slot1.classList.add('winner');
            } else if (globalScores[2] > globalScores[1]) {
                slot2.classList.add('winner');
            }
        }
    }
</script>
</body>
</html>        .api-key-area { display: flex; gap: 10px; align-items: center; }
        .api-key-input { background: #111; border: 1px solid var(--neon); color: var(--neon); padding: 10px; border-radius: 6px; width: 320px; }
        
        .use-case-bar { background: var(--card); border: 1px solid #333; border-radius: 12px; padding: 20px; margin-bottom: 40px; display: flex; flex-direction: column; gap: 10px; }
        .use-case-label { font-size: 0.8rem; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }
        .use-case-input { background: #000; border: 1px solid #444; color: #fff; padding: 15px; border-radius: 8px; font-size: 1.1rem; resize: none; transition: 0.3s; }
        .use-case-input:focus { border-color: var(--neon); outline: none; box-shadow: 0 0 10px rgba(57, 255, 20, 0.2); }
        
        .battle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; }
        .slot { background: var(--glass); border: 1px solid #2a2a30; border-radius: 20px; padding: 35px; display: flex; flex-direction: column; position: relative; transition: 0.5s; }
        .slot.winner { border-color: var(--neon); box-shadow: 0 0 40px rgba(57, 255, 20, 0.15); transform: scale(1.02); }
        .slot.winner::after { content: "WINNER"; position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: var(--neon); color: #000; padding: 4px 15px; font-weight: 900; border-radius: 4px; font-size: 0.8rem; }
        
        .model-input-area { display: grid; grid-template-columns: 1fr auto; gap: 10px; margin-bottom: 15px; }
        .model-input { width: 100%; padding: 15px; background: #000; border: 1px solid #444; color: #fff; border-radius: 10px; font-size: 1.2rem; box-sizing: border-box; }
        
        .fetch-btn { background: var(--neon); color: #000; border: none; padding: 15px 25px; font-weight: 800; cursor: pointer; border-radius: 10px; font-size: 1rem; text-transform: uppercase; transition: 0.2s; }
        .fetch-btn:hover { background: #fff; transform: translateY(-2px); }
        .fetch-btn:disabled { background: #333; color: #666; cursor: not-allowed; }
        
        .score-display { font-size: 6rem; font-weight: 950; color: var(--neon); text-align: center; margin: 20px 0; font-family: 'Arial Black', sans-serif; line-height: 1; }
        .loading .score-display { animation: pulse 1.5s infinite; color: #444; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }

        .spec-list { margin-top: 25px; border-top: 1px solid #333; }
        .spec-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #222; font-family: monospace; font-size: 0.95rem; }
        .spec-label { color: #888; text-transform: uppercase; font-size: 0.75rem; }
        
        .summary-area { margin-top: 30px; padding-top: 25px; border-top: 1px solid #444; min-height: 150px; }
        .summary-label { font-weight: bold; color: #fff; margin-bottom: 15px; font-size: 0.8rem; text-transform: uppercase; color: var(--neon); }
        .summary-list { list-style: none; padding: 0; margin: 0; color: #ccc; font-size: 0.9rem; line-height: 1.6; }
        .summary-list li { margin-bottom: 10px; padding-left: 25px; position: relative; }
        .summary-list li::before { content: "»"; color: var(--neon); position: absolute; left: 0; font-weight: bold; }
        
        .status { position: absolute; top: 15px; right: 20px; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: #444; }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <div class="title">OMNI-LAPTOP <span>COMPARATOR</span> v3.5</div>
        <div class="api-key-area">
            <input type="text" id="currencySign" placeholder="€ / £ / $" value="$" style="width: 50px; background: #111; border: 1px solid #333; color: #fff; padding: 10px; border-radius: 6px; text-align: center;">
            <input type="password" id="apiKey" class="api-key-input" placeholder="Paste Gemini API Key Here">
        </div>
    </div>

    <div class="use-case-bar">
        <div class="use-case-label">DEFINE YOUR SPECIFIC USE CASE</div>
        <textarea id="mainUseCase" class="use-case-input" placeholder="e.g. 'I am a 4K Video Editor using Premiere Pro' or 'Hardcore gaming at 1440p'" rows="2"></textarea>
    </div>

    <div class="battle-grid">
        <div class="slot" id="slot1">
            <div class="status" id="status1">IDLE</div>
            <div class="model-input-area">
                <input type="text" id="query1" class="model-input" placeholder="Laptop 1 (Model + Year)">
                <button class="fetch-btn" id="btn1" onclick="runAutomatedFetch(1)">SCAN</button>
            </div>
            <div class="score-display" id="score1">0</div>
            <div class="spec-list">
                <div class="spec-item"><span class="spec-label">CPU</span> <span id="cpu1">--</span></div>
                <div class="spec-item"><span class="spec-label">GPU</span> <span id="gpu1">--</span></div>
                <div class="spec-item"><span class="spec-label">RAM/SPEED</span> <span id="ram1">--</span></div>
                <div class="spec-item"><span class="spec-label">DISPLAY</span> <span id="screen1">--</span></div>
                <div class="spec-item"><span class="spec-label">EST. PRICE</span> <span id="price1">--</span></div>
            </div>
            <div class="summary-area">
                <div class="summary-label">Performance Analysis</div>
                <ul class="summary-list" id="summary1"></ul>
            </div>
        </div>

        <div class="slot" id="slot2">
            <div class="status" id="status2">IDLE</div>
            <div class="model-input-area">
                <input type="text" id="query2" class="model-input" placeholder="Laptop 2 (Model + Year)">
                <button class="fetch-btn" id="btn2" onclick="runAutomatedFetch(2)">SCAN</button>
            </div>
            <div class="score-display" id="score2">0</div>
            <div class="spec-list">
                <div class="spec-item"><span class="spec-label">CPU</span> <span id="cpu2">--</span></div>
                <div class="spec-item"><span class="spec-label">GPU</span> <span id="gpu2">--</span></div>
                <div class="spec-item"><span class="spec-label">RAM/SPEED</span> <span id="ram2">--</span></div>
                <div class="spec-item"><span class="spec-label">DISPLAY</span> <span id="screen2">--</span></div>
                <div class="spec-item"><span class="spec-label">EST. PRICE</span> <span id="price2">--</span></div>
            </div>
            <div class="summary-area">
                <div class="summary-label">Performance Analysis</div>
                <ul class="summary-list" id="summary2"></ul>
            </div>
        </div>
    </div>
</div>

<script>
    const scores = { 1: 0, 2: 0 };

    async function runAutomatedFetch(slotId) {
        const key = document.getElementById('apiKey').value;
        const query = document.getElementById(`query${slotId}`).value;
        const useCase = document.getElementById('mainUseCase').value || "General High-End Use";
        const currency = document.getElementById('currencySign').value || "$";

        if (!key) return alert("API Key Required.");
        if (!query) return alert("Enter a model name.");

        // UI Start Loading
        const slotEl = document.getElementById(`slot${slotId}`);
        const statusEl = document.getElementById(`status${slotId}`);
        const scoreEl = document.getElementById(`score${slotId}`);
        const btn = document.getElementById(`btn${slotId}`);

        slotEl.classList.add('loading');
        slotEl.classList.remove('winner');
        statusEl.innerText = "SCANNING HARDWARE...";
        statusEl.style.color = "var(--neon)";
        btn.disabled = true;

        const prompt = `Search for the detailed, current technical specs of the ${query} laptop. 
        Focus on how these specs match the use case: "${useCase}". 
        
        Return ONLY a raw JSON object: 
        { 
          "cpu": "Model", 
          "gpu": "Model + Wattage", 
          "ram": "Size + Type", 
          "display": "Res, Refresh, Nits", 
          "price": "Numeric Approx", 
          "score": 1-100,
          "points": ["Point 1", "Point 2", "Point 3"]
        }`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    tools: [{ google_search_retrieval: {} }]
                })
            });

            const result = await response.json();
            let text = result.candidates[0].content.parts[0].text;
            
            // Clean JSON in case AI adds markdown blocks
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            const data = JSON.parse(jsonMatch[0]);

            // Update UI
            scores[slotId] = data.score;
            scoreEl.innerText = data.score;
            document.getElementById(`cpu${slotId}`).innerText = data.cpu;
            document.getElementById(`gpu${slotId}`).innerText = data.gpu;
            document.getElementById(`ram${slotId}`).innerText = data.ram;
            document.getElementById(`screen${slotId}`).innerText = data.display;
            document.getElementById(`price${slotId}`).innerText = `${currency}${data.price}`;

            const summaryList = document.getElementById(`summary${slotId}`);
            summaryList.innerHTML = data.points.map(p => `<li>${p}</li>`).join('');

            statusEl.innerText = "LINK ESTABLISHED";
            
            compareAndHighlight();

        } catch (e) {
            statusEl.innerText = "SCAN ERROR";
            statusEl.style.color = "var(--error)";
            scoreEl.innerText = "!!";
            console.error(e);
        } finally {
            slotEl.classList.remove('loading');
            btn.disabled = false;
        }
    }

    function compareAndHighlight() {
        const slot1 = document.getElementById('slot1');
        const slot2 = document.getElementById('slot2');
        
        slot1.classList.remove('winner');
        slot2.classList.remove('winner');

        if (scores[1] > 0 && scores[2] > 0) {
            if (scores[1] > scores[2]) slot1.classList.add('winner');
            else if (scores[2] > scores[1]) slot2.classList.add('winner');
        }
    }
</script>
</body>
</html>        .api-key-input { background: #111; border: 1px solid var(--neon); color: var(--neon); padding: 10px; border-radius: 6px; width: 320px; }
        
        /* Central Use Case */
        .use-case-bar { background: var(--card); border: 1px solid #333; border-radius: 12px; padding: 20px; margin-bottom: 40px; display: flex; flex-direction: column; gap: 10px; }
        .use-case-label { font-size: 0.8rem; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }
        .use-case-input { background: #000; border: 1px solid #444; color: #fff; padding: 15px; border-radius: 8px; font-size: 1.1rem; resize: none; }
        .use-case-input:focus { border-color: var(--neon); outline: none; }
        
        /* Battle Grid */
        .battle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; }
        .slot { background: var(--glass); border: 1px solid #2a2a30; border-radius: 20px; padding: 35px; display: flex; flex-direction: column; position: relative; }
        .slot.winner { border-color: #00ff88; box-shadow: 0 0 30px rgba(0,255,136,0.08); }
        
        .model-input-area { display: grid; grid-template-columns: 1fr auto; gap: 10px; margin-bottom: 15px; }
        .model-input { width: 100%; padding: 15px; background: #000; border: 1px solid #444; color: #fff; border-radius: 10px; font-size: 1.2rem; }
        
        /* Fetch Button (Dynamic per Slot) */
        .fetch-btn { grid-column: 1 / -1; background: var(--neon); color: #000; border: none; padding: 15px; font-weight: 800; cursor: pointer; border-radius: 10px; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; }
        .fetch-btn:hover { background: #fff; }
        
        /* Score & Specs */
        .score-display { font-size: 5rem; font-weight: 950; color: var(--neon); text-align: center; margin: 30px 0; font-family: 'Arial Black', sans-serif; }
        .spec-list { margin-top: 25px; border-top: 1px solid #333; }
        .spec-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #222; font-family: monospace; }
        .spec-label { color: #888; }
        
        /* Device Summary at Bottom */
        .summary-area { margin-top: auto; padding-top: 25px; border-top: 1px solid #444; }
        .summary-label { font-weight: bold; color: #fff; margin-bottom: 10px; }
        .summary-list { list-style: none; padding: 0; margin: 0; color: #aaa; font-size: 0.9rem; line-height: 1.6; }
        .summary-list li::before { content: "✓"; color: var(--neon); margin-right: 10px; }
        
        /* Status Indicator */
        .status { position: absolute; top: 15px; right: 20px; font-size: 0.7rem; text-transform: uppercase; color: #444; }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <div class="title">OMNI-LAPTOP <span style="color:var(--neon)">COMPARATOR</span> v3.5</div>
        <div class="api-key-area">
            <input type="text" id="currencySign" placeholder="€ / £ / $" style="width: 50px; background: #111; border: 1px solid #333; color: #fff; padding: 10px; border-radius: 6px; text-align: center;">
            <input type="password" id="apiKey" class="api-key-input" placeholder="Paste Gemini API Key Here">
        </div>
    </div>

    <div class="use-case-bar">
        <div class="use-case-label">DEFINE YOUR SPECIFIC USE CASE (e.g. "Gaming + Blender" or "Battery Focused")</div>
        <textarea id="mainUseCase" class="use-case-input" placeholder="What are you going to run on this machine? Be specific (AE, ProTools, Cyberpunk Max)..." rows="2"></textarea>
    </div>

    <div class="battle-grid">
        <script>
            for(let i=1; i<=2; i++) {
                document.write(`
                    <div class="slot" id="slot${i}">
                        <div class="status" id="status${i}">IDLE</div>
                        <div class="model-input-area">
                            <input type="text" id="query${i}" class="model-input" placeholder="Enter Laptop ${i} (Model & Year)">
                            <button class="fetch-btn" onclick="runAutomatedFetch(${i})">SCAN HARDWARE</button>
                        </div>
                        
                        <div class="score-display" id="score${i}">0</div>
                        
                        <div class="spec-list" id="specs${i}">
                            <div class="spec-item"><span class="spec-label">CPU:</span> <span id="cpu${i}">--</span></div>
                            <div class="spec-item"><span class="spec-label">GPU:</span> <span id="gpu${i}">--</span></div>
                            <div class="spec-item"><span class="spec-label">RAM:</span> <span id="ram${i}">--</span></div>
                            <div class="spec-item"><span class="spec-label">Display:</span> <span id="screen${i}">--</span></div>
                            <div class="spec-item"><span class="spec-label">Price:</span> <span id="price${i}">--</span></div>
                        </div>

                        <div class="summary-area" id="summaryArea${i}">
                            <div class="summary-label">USE CASE COMPATIBILITY (Best For...)</div>
                            <ul class="summary-list" id="summary${i}">
                                </ul>
                        </div>
                    </div>
                `);
            }
        </script>
    </div>
</div>

<script type="module">
    // Primary Fetch Function with Integrated Gemini Grounding
    window.runAutomatedFetch = async (slotId) => {
    const key = document.getElementById('apiKey').value;
    const query = document.getElementById(`query${slotId}`).value;
    const useCase = document.getElementById('mainUseCase').value || "General productivity";
    const currency = document.getElementById('currencySign').value || "$";

    if (!key) return alert("Enter API Key.");
    
    document.getElementById(`status${slotId}`).innerText = "SCANNING...";

    const prompt = `Search for technical specs for ${query} considering use case: ${useCase}. 
    Return a JSON object: { "cpu": "...", "gpu": "...", "ram": "...", "screen": "...", "price": 0, "score": 0, "summary": ["strengths"] }. 
    NO MARKDOWN. NO PREAMBLE.`;

    try {
        // We use gemini-1.5-flash or gemini-2.0-flash for best grounding stability
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                tools: [{ google_search: {} }] // The correct 2026 tool name
            })
        });

        const result = await response.json();

        if (result.error) {
            throw new Error(`${result.error.status}: ${result.error.message}`);
        }

        const textResponse = result.candidates[0].content.parts[0].text;
        const cleanJson = textResponse.replace(/```json|```/g, "").trim();
        const data = JSON.parse(cleanJson);
        
        // Populate UI
        document.getElementById(`score${slotId}`).innerText = data.score;
        document.getElementById(`cpu${slotId}`).innerText = data.cpu;
        document.getElementById(`gpu${slotId}`).innerText = data.gpu;
        document.getElementById(`ram${slotId}`).innerText = data.ram;
        document.getElementById(`screen${slotId}`).innerText = data.screen;
        document.getElementById(`price${slotId}`).innerText = `${currency} ${data.price}`;
        
        const summaryList = document.getElementById(`summary${slotId}`);
        summaryList.innerHTML = data.summary.map(s => `<li>${s}</li>`).join("");
        
        document.getElementById(`status${slotId}`).innerText = "SUCCESS";
    } catch (e) {
        document.getElementById(`status${slotId}`).innerText = "ERROR";
        console.error("DEBUG LOG:", e.message);
        alert("API Error: " + e.message);
    }
};

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${key}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    tools: [{ google_search_retrieval: {} }] // The Automated Search Grounding
                })
            });

            if (!response.ok) throw new Error('Gemini API connection failed.');

            const result = await response.json();
            const textResponse = result.candidates[0].content.parts[0].text;
            
            // Extract the JSON block from the AI output
            const data = JSON.parse(textResponse.match(/\{.*\}/s)[0]);
            
            // Populate the UI with real specs and the summary
            document.getElementById(`score${slotId}`).innerText = data.weighted_score;
            document.getElementById(`cpu${slotId}`).innerText = data.cpu_model;
            document.getElementById(`gpu${slotId}`).innerText = data.gpu_model_and_tgp;
            document.getElementById(`ram${slotId}`).innerText = data.ram_gb_and_speed;
            document.getElementById(`screen${slotId}`).innerText = data.display_tech;
            
            // Apply the user's custom currency sign
            document.getElementById(`price${slotId}`).innerText = `${currency} ${data.price_converted}`;

            // Populate the Summary Section
            const summaryList = document.getElementById(`summary${slotId}`);
            summaryList.innerHTML = ""; // Clear existing
            data.summary_strengths.forEach(strength => {
                const li = document.createElement("li");
                li.innerText = strength;
                summaryList.appendChild(li);
            });

            document.getElementById(`status${slotId}`).innerText = "SCANNED";
            document.getElementById(`status${slotId}`).style.color = "#00ff00";

        } catch (e) {
            document.getElementById(`status${slotId}`).innerText = "ERROR";
            document.getElementById(`status${slotId}`).style.color = "#ff0000";
            document.getElementById(`score${slotId}`).innerText = "ERR";
            console.error(e);
        }
    };
</script>
</body>
</html>


