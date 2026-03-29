<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ibucatto Comparator v3.9</title>
    <style>
        :root { --bg: #050505; --neon: #39ff14; --card: #0d0d11; --border: #1f1f26; --vs: #ff0055; }
        body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: #e0e0e0; margin: 0; padding: 20px; }
        .container { max-width: 1000px; margin: 0 auto; }
        
        /* Header */
        .header { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #222; margin-bottom: 25px; }
        .title { font-size: 1.4rem; font-weight: 900; letter-spacing: 2px; color: #fff; text-transform: uppercase; }
        .title span { color: var(--neon); }

        /* Use Case */
        .use-case-box { background: var(--card); border: 1px solid var(--border); border-left: 4px solid var(--neon); padding: 15px; border-radius: 8px; margin-bottom: 25px; }
        .label { font-size: 0.6rem; text-transform: uppercase; color: #666; letter-spacing: 1.5px; display: block; margin-bottom: 5px; }
        .use-case-input { background: #000; border: 1px solid #222; color: #fff; width: 100%; padding: 10px; border-radius: 5px; box-sizing: border-box; outline: none; }

        /* Battle Arena */
        .arena { display: grid; grid-template-columns: 1fr 40px 1fr; gap: 15px; align-items: start; }
        .slot { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; position: relative; min-height: 480px; }
        .slot.winner { border-color: var(--neon); box-shadow: 0 0 20px rgba(57, 255, 20, 0.1); }
        .slot.winner::after { content: "WINNER"; position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: var(--neon); color: #000; padding: 2px 10px; font-size: 10px; font-weight: 900; border-radius: 4px; }

        .vs { align-self: center; text-align: center; font-weight: 900; color: var(--vs); opacity: 0.4; }

        /* Inputs */
        .input-group { display: flex; gap: 5px; margin-bottom: 15px; }
        .model-input { flex-grow: 1; background: #000; border: 1px solid #333; color: #fff; padding: 10px; border-radius: 5px; outline: none; font-size: 0.9rem; }
        .scan-btn { background: var(--neon); color: #000; border: none; padding: 0 15px; border-radius: 5px; font-weight: 800; cursor: pointer; font-size: 0.7rem; text-transform: uppercase; }
        .scan-btn:disabled { background: #222; color: #444; cursor: not-allowed; }

        /* Score */
        .score-val { font-size: 3.5rem; font-weight: 900; text-align: center; margin: 10px 0; color: #16161a; font-family: monospace; }
        .has-data .score-val { color: var(--neon); }

        /* Specs */
        .spec-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1a1a1f; font-size: 0.8rem; }
        .s-lab { color: #555; text-transform: uppercase; font-size: 0.6rem; letter-spacing: 1px; }
        .s-val { color: #ccc; text-align: right; max-width: 65%; font-family: monospace; }

        /* Analysis */
        .analysis { margin-top: 15px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; font-size: 0.75rem; color: #888; min-height: 60px; }
        .analysis ul { padding-left: 15px; margin: 0; }

        /* Loader */
        .loading-mask { display: none; position: absolute; inset: 0; background: rgba(0,0,0,0.8); z-index: 10; border-radius: 12px; align-items: center; justify-content: center; color: var(--neon); font-size: 0.7rem; letter-spacing: 2px; }
        .loading .loading-mask { display: flex; }

        @media (max-width: 800px) { .arena { grid-template-columns: 1fr; } .vs { padding: 10px; } }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <div class="title">IBUCATTO <span>COMPARATOR</span></div>
        <div style="font-size: 10px; color: #333;">STABLE_BUILD_3.9</div>
    </div>

    <div class="use-case-box">
        <span class="label">Operational Context</span>
        <input type="text" id="uCase" class="use-case-input" placeholder="e.g. 4K Video Editing, Heavy Gaming, Student Work...">
    </div>

    <div class="arena">
        <!-- Slot 1 -->
        <div class="slot" id="slot1">
            <div class="loading-mask">FETCHING DATA...</div>
            <div class="input-group">
                <input type="text" id="q1" class="model-input" placeholder="Laptop Model 1">
                <button class="scan-btn" id="b1" onclick="runScan(1)">Scan</button>
            </div>
            <div class="score-val" id="score1">00</div>
            <div class="spec-rows">
                <div class="spec-row"><span class="s-lab">CPU</span><span class="s-val" id="cpu1">--</span></div>
                <div class="spec-row"><span class="s-lab">GPU</span><span class="s-val" id="gpu1">--</span></div>
                <div class="spec-row"><span class="s-lab">RAM</span><span class="s-val" id="ram1">--</span></div>
                <div class="spec-row"><span class="s-lab">Display</span><span class="s-val" id="disp1">--</span></div>
                <div class="spec-row"><span class="s-lab">Battery</span><span class="s-val" id="bat1">--</span></div>
                <div class="spec-row"><span class="s-lab">Weight</span><span class="s-val" id="weight1">--</span></div>
                <div class="spec-row"><span class="s-lab">Price</span><span class="s-val" id="price1">--</span></div>
            </div>
            <div class="analysis"><ul id="sum1"></ul></div>
        </div>

        <div class="vs">VS</div>

        <!-- Slot 2 -->
        <div class="slot" id="slot2">
            <div class="loading-mask">FETCHING DATA...</div>
            <div class="input-group">
                <input type="text" id="q2" class="model-input" placeholder="Laptop Model 2">
                <button class="scan-btn" id="b2" onclick="runScan(2)">Scan</button>
            </div>
            <div class="score-val" id="score2">00</div>
            <div class="spec-rows">
                <div class="spec-row"><span class="s-lab">CPU</span><span class="s-val" id="cpu2">--</span></div>
                <div class="spec-row"><span class="s-lab">GPU</span><span class="s-val" id="gpu2">--</span></div>
                <div class="spec-row"><span class="s-lab">RAM</span><span class="s-val" id="ram2">--</span></div>
                <div class="spec-row"><span class="s-lab">Display</span><span class="s-val" id="disp2">--</span></div>
                <div class="spec-row"><span class="s-lab">Battery</span><span class="s-val" id="bat2">--</span></div>
                <div class="spec-row"><span class="s-lab">Weight</span><span class="s-val" id="weight2">--</span></div>
                <div class="spec-row"><span class="s-lab">Price</span><span class="s-val" id="price2">--</span></div>
            </div>
            <div class="analysis"><ul id="sum2"></ul></div>
        </div>
    </div>
</div>

<script>
    const KEY = "AIzaSyC3Mwun5oDx1l3wi1tU4RT9tkqzZh346NY";
    const globalScores = { 1: 0, 2: 0 };

    async function runScan(id) {
        const query = document.getElementById(`q${id}`).value;
        const uc = document.getElementById('uCase').value || "General Productivity";
        if (!query) return alert("Enter model name");

        const el = document.getElementById(`slot${id}`);
        const btn = document.getElementById(`b${id}`);
        el.classList.add('loading');
        el.classList.remove('winner', 'has-data');
        btn.disabled = true;

        const prompt = `Provide specs for ${query} for use case: ${uc}. 
        Return ONLY a JSON object:
        {"cpu": "name", "gpu": "name+wattage", "ram": "size+type", "display": "specs", "battery": "Wh+hours", "weight": "kg/lbs", "price": "approx", "score": 1-100, "points": ["p1", "p2"]}`;

        // Attempt different model names if one fails
        const models = ["gemini-1.5-flash", "gemini-pro"];
        let success = false;

        for (let modelName of models) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                });

                const data = await response.json();
                if (data.error) continue; // Try next model

                const text = data.candidates[0].content.parts[0].text;
                const json = JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));

                // Success! Update UI
                globalScores[id] = json.score;
                document.getElementById(`score${id}`).innerText = json.score;
                document.getElementById(`cpu${id}`).innerText = json.cpu;
                document.getElementById(`gpu${id}`).innerText = json.gpu;
                document.getElementById(`ram${id}`).innerText = json.ram;
                document.getElementById(`disp${id}`).innerText = json.display;
                document.getElementById(`bat${id}`).innerText = json.battery;
                document.getElementById(`weight${id}`).innerText = json.weight;
                document.getElementById(`price${id}`).innerText = json.price;
                document.getElementById(`sum${id}`).innerHTML = json.points.map(p => `<li>${p}</li>`).join('');

                el.classList.add('has-data');
                success = true;
                break; 
            } catch (err) {
                console.log(`Failed with ${modelName}, trying next...`);
            }
        }

        if (!success) alert("Critical Error: Could not connect to any AI models. Check your API key permissions.");
        
        el.classList.remove('loading');
        btn.disabled = false;
        checkWin();
    }

    function checkWin() {
        if (globalScores[1] > 0 && globalScores[2] > 0) {
            const s1 = document.getElementById('slot1'), s2 = document.getElementById('slot2');
            s1.classList.remove('winner'); s2.classList.remove('winner');
            if (globalScores[1] > globalScores[2]) s1.classList.add('winner');
            else if (globalScores[2] > globalScores[1]) s2.classList.add('winner');
        }
    }
</script>
</body>
</html>
