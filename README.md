<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ibucatto Comparator v4.5</title>
    <style>
        :root { --bg: #050505; --neon: #39ff14; --card: #0d0d11; --border: #1f1f26; --vs: #ff0055; }
        body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: #e0e0e0; margin: 0; padding: 20px; }
        .container { max-width: 1000px; margin: 0 auto; }
        
        /* Header */
        .header { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #222; margin-bottom: 25px; }
        .title { font-size: 1.4rem; font-weight: 900; letter-spacing: 2px; color: #fff; text-transform: uppercase; }
        .title span { color: var(--neon); }

        /* Use Case Box */
        .use-case-box { background: var(--card); border: 1px solid var(--border); border-left: 4px solid var(--neon); padding: 15px; border-radius: 8px; margin-bottom: 25px; }
        .label { font-size: 0.6rem; text-transform: uppercase; color: #666; letter-spacing: 1.5px; display: block; margin-bottom: 5px; }
        .use-case-input { background: #000; border: 1px solid #222; color: #fff; width: 100%; padding: 10px; border-radius: 5px; box-sizing: border-box; outline: none; }

        /* Battle Arena - Grid remains static */
        .arena { display: grid; grid-template-columns: 1fr 40px 1fr; gap: 15px; align-items: start; }
        
        .slot { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; position: relative; min-height: 550px; overflow: hidden; }
        .slot.winner { border-color: var(--neon); box-shadow: 0 0 20px rgba(57, 255, 20, 0.1); }
        .slot.winner::after { content: "WINNER"; position: absolute; top: 0; right: 0; background: var(--neon); color: #000; padding: 2px 10px; font-size: 10px; font-weight: 900; border-bottom-left-radius: 8px; }

        .vs { align-self: center; text-align: center; font-weight: 900; color: var(--vs); opacity: 0.4; }

        .input-group { display: flex; gap: 5px; margin-bottom: 15px; }
        .model-input { flex-grow: 1; background: #000; border: 1px solid #333; color: #fff; padding: 10px; border-radius: 5px; outline: none; font-size: 0.9rem; }
        .scan-btn { background: var(--neon); color: #000; border: none; padding: 0 15px; border-radius: 5px; font-weight: 800; cursor: pointer; font-size: 0.7rem; text-transform: uppercase; }
        .scan-btn:disabled { background: #222; color: #444; cursor: not-allowed; }

        /* Score & Specs */
        .score-val { font-size: 3.5rem; font-weight: 900; text-align: center; margin: 10px 0; color: #16161a; font-family: monospace; transition: 0.3s; }
        .has-data .score-val { color: var(--neon); text-shadow: 0 0 15px rgba(57, 255, 20, 0.2); }

        .spec-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1a1a1f; font-size: 0.8rem; }
        .s-lab { color: #555; text-transform: uppercase; font-size: 0.6rem; letter-spacing: 1px; }
        .s-val { color: #ccc; text-align: right; max-width: 65%; font-family: monospace; }

        .analysis { margin-top: 15px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; font-size: 0.75rem; color: #888; min-height: 100px; }
        .analysis ul { padding-left: 15px; margin: 0; }

        /* Loading Screen Fixed */
        .loading-mask { display: none; position: absolute; inset: 0; background: rgba(0,0,0,0.95); z-index: 100; align-items: center; justify-content: center; color: var(--neon); font-size: 0.7rem; letter-spacing: 2px; text-align: center; }
        .loading .loading-mask { display: flex; }

        @media (max-width: 800px) { .arena { grid-template-columns: 1fr; } .vs { padding: 10px; } }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <div class="title">IBUCATTO <span>COMPARATOR v4.5</span></div>
        <div id="engine-status" style="font-size: 10px; color: var(--neon);">ENGINE: 2.0-FLASH-LITE</div>
    </div>

    <div class="use-case-box">
        <span class="label">Contextual Target (Use Case)</span>
        <input type="text" id="uCase" class="use-case-input" placeholder="e.g. 4K Video Editing, Heavy Gaming, Engineering Software...">
    </div>

    <div class="arena">
        <!-- Slot 1 -->
        <div class="slot" id="slot1">
            <div class="loading-mask">INITIALIZING LITE ENGINE...<br>UPLINKING DATA CORE</div>
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
                <div class="spec-row"><span class="s-lab">Est. Price</span><span class="s-val" id="price1">--</span></div>
            </div>
            <div class="analysis"><ul id="sum1"></ul></div>
        </div>

        <div class="vs">VS</div>

        <!-- Slot 2 -->
        <div class="slot" id="slot2">
            <div class="loading-mask">INITIALIZING LITE ENGINE...<br>UPLINKING DATA CORE</div>
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
                <div class="spec-row"><span class="s-lab">Est. Price</span><span class="s-val" id="price2">--</span></div>
            </div>
            <div class="analysis"><ul id="sum2"></ul></div>
        </div>
    </div>
</div>

<script>
    const KEY = "AIzaSyC3Mwun5oDx1l3wi1tU4RT9tkqzZh346NY";
    const MODEL = "models/gemini-2.0-flash-lite-preview-02-05"; 
    const globalScores = { 1: 0, 2: 0 };

    async function runScan(id) {
        const query = document.getElementById(`q${id}`).value;
        const uc = document.getElementById('uCase').value || "General High Performance";
        if (!query) return alert("Missing Model Name");

        const el = document.getElementById(`slot${id}`);
        const btn = document.getElementById(`b${id}`);
        
        // Locked UI State
        el.classList.add('loading');
        el.classList.remove('winner', 'has-data');
        btn.disabled = true;

        const prompt = `Provide specs for laptop: "${query}". Use Case: "${uc}".
        Return ONLY a raw JSON object. Do not explain.
        {
          "cpu": "model name",
          "gpu": "model + TGP wattage",
          "ram": "size + type + speed",
          "display": "resolution + hz + panel + nits",
          "battery": "watt-hours + real-world runtime",
          "weight": "kg/lbs + thickness",
          "price": "approximate market price",
          "score": 1-100,
          "points": ["Pros/cons context 1", "Pros/cons context 2", "Pros/cons context 3"]
        }`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent?key=${KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            const data = await response.json();
            
            if (data.error) {
                throw new Error(`Engine Error: ${data.error.message}`);
            }

            const rawText = data.candidates[0].content.parts[0].text;
            
            // Extract JSON from any text wrap
            const start = rawText.indexOf('{');
            const end = rawText.lastIndexOf('}') + 1;
            const json = JSON.parse(rawText.substring(start, end));

            // Populate UI - Targets specific IDs to prevent duplication
            globalScores[id] = json.score;
            document.getElementById(`score${id}`).innerText = json.score;
            document.getElementById(`cpu${id}`).innerText = json.cpu;
            document.getElementById(`gpu${id}`).innerText = json.gpu;
            document.getElementById(`ram${id}`).innerText = json.ram;
            document.getElementById(`disp${id}`).innerText = json.display;
            document.getElementById(`bat${id}`).innerText = json.battery;
            document.getElementById(`weight${id}`).innerText = json.weight;
            document.getElementById(`price${id}`).innerText = json.price;
            
            // Summary update
            document.getElementById(`sum${id}`).innerHTML = json.points.map(p => `<li>${p}</li>`).join('');

            el.classList.add('has-data');
            checkWin();

        } catch (err) {
            console.error(err);
            alert("SCAN INTERRUPTED: " + err.message);
        } finally {
            el.classList.remove('loading');
            btn.disabled = false;
        }
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
