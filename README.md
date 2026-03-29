<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Omni-Laptop Comparator v3.5 - Mercenary Special</title>
    <style>
        :root { --bg: #070709; --neon: #39ff14; --glass: rgba(255,255,255,0.03); --card: #111115; --error: #ff4444; }
        body { font-family: 'Segoe UI', 'Roboto', sans-serif; background: var(--bg); color: #f1f1f1; padding: 30px; margin: 0; }
        .container { max-width: 1400px; margin: auto; }
        
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 25px; margin-bottom: 30px; }
        .title { font-size: 1.8rem; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 2px; }
        .title span { color: var(--neon); }
        .api-key-area { display: flex; gap: 10px; align-items: center; }
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


