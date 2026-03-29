<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ibucatto Comparator v3.8</title>
    <style>
        :root { --bg: #050505; --neon: #39ff14; --card: #0d0d11; --border: #1f1f26; --vs: #ff0055; }
        body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--bg); color: #e0e0e0; margin: 0; padding: 20px; }
        .container { max-width: 1100px; margin: 0 auto; }
        
        /* Header */
        .header { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #222; margin-bottom: 25px; }
        .title { font-size: 1.4rem; font-weight: 900; letter-spacing: 2px; color: #fff; text-transform: uppercase; }
        .title span { color: var(--neon); }

        /* Use Case Bar */
        .use-case-box { background: var(--card); border: 1px solid var(--border); border-left: 4px solid var(--neon); padding: 15px; border-radius: 8px; margin-bottom: 25px; }
        .label { font-size: 0.65rem; text-transform: uppercase; color: #666; letter-spacing: 1.5px; display: block; margin-bottom: 8px; }
        .use-case-input { background: #000; border: 1px solid #222; color: #fff; width: 100%; padding: 12px; border-radius: 6px; box-sizing: border-box; font-size: 0.95rem; outline: none; }
        .use-case-input:focus { border-color: var(--neon); }

        /* Battle Arena */
        .arena { display: grid; grid-template-columns: 1fr 50px 1fr; gap: 15px; align-items: start; }
        .slot { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; position: relative; transition: 0.3s; }
        .slot.winner { border-color: var(--neon); box-shadow: 0 0 20px rgba(57, 255, 20, 0.1); }
        .slot.winner::after { content: "ALPHA UNIT"; position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: var(--neon); color: #000; padding: 2px 10px; font-size: 10px; font-weight: 900; border-radius: 4px; }

        .vs-divider { align-self: center; text-align: center; font-weight: 900; color: var(--vs); opacity: 0.3; font-size: 1.2rem; }

        /* Inputs */
        .input-group { display: flex; gap: 8px; margin-bottom: 15px; }
        .model-input { flex-grow: 1; background: #000; border: 1px solid #333; color: #fff; padding: 10px; border-radius: 6px; font-size: 0.9rem; outline: none; }
        .scan-btn { background: var(--neon); color: #000; border: none; padding: 0 15px; border-radius: 6px; font-weight: 800; cursor: pointer; text-transform: uppercase; font-size: 0.75rem; }
        .scan-btn:disabled { background: #222; color: #444; }

        /* Score Display */
        .score-circle { font-size: 3.5rem; font-weight: 900; text-align: center; margin: 10px 0; color: #16161a; font-family: 'Courier New', monospace; transition: 0.5s; }
        .has-data .score-circle { color: var(--neon); text-shadow: 0 0 15px rgba(57, 255, 20, 0.2); }

        /* Spec Table */
        .spec-table { border-top: 1px solid #1a1a1f; margin-top: 10px; }
        .spec-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #1a1a1f; }
        .spec-label { font-size: 0.6rem; color: #555; text-transform: uppercase; letter-spacing: 1px; }
        .spec-value { font-size: 0.85rem; color: #ccc; text-align: right; max-width: 65%; font-family: monospace; }

        /* Summary */
        .summary { margin-top: 15px; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; font-size: 0.8rem; color: #999; min-height: 80px; }
        .summary ul { padding-left: 15px; margin: 0; }
        .summary li { margin-bottom: 5px; }

        /* Loading */
        .overlay { display: none; position: absolute; inset: 0; background: rgba(0,0,0,0.85); z-index: 10; border-radius: 12px; align-items: center; justify-content: center; flex-direction: column; color: var(--neon); font-size: 0.7rem; letter-spacing: 2px; }
        .loading .overlay { display: flex; }

        @media (max-width: 850px) {
            .arena { grid-template-columns: 1fr; }
            .vs-divider { padding: 10px; transform: rotate(90deg); }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <div class="title">IBUCATTO <span>COMPARATOR</span></div>
        <div style="font-size: 10px; color: #444;">LINK: SECURE_V3.8</div>
    </div>

    <div class="use-case-box">
        <span class="label">Deployment Objectives (Use Case)</span>
        <input type="text" id="useCase" class="use-case-input" placeholder="e.g. 4K Video Editing, Programming, Gaming...">
    </div>

    <div class="arena">
        <!-- Laptop 1 -->
        <div class="slot" id="slot1">
            <div class="overlay">UPLINKING...</div>
            <div class="input-group">
                <input type="text" id="query1" class="model-input" placeholder="Target Model 1">
                <button class="scan-btn" id="btn1" onclick="runScan(1)">Scan</button>
            </div>
            <div class="score-circle" id="score1">00</div>
            <div class="spec-table">
                <div class="spec-row"><span class="spec-label">CPU</span><span class="spec-value" id="cpu1">--</span></div>
                <div class="spec-row"><span class="spec-label">GPU</span><span class="spec-value" id="gpu1">--</span></div>
                <div class="spec-row"><span class="spec-label">RAM</span><span class="spec-value" id="ram1">--</span></div>
                <div class="spec-row"><span class="spec-label">Display</span><span class="spec-value" id="display1">--</span></div>
                <div class="spec-row"><span class="spec-label">Battery</span><span class="spec-value" id="bat1">--</span></div>
                <div class="spec-row"><span class="spec-label">Weight</span><span class="spec-value" id="weight1">--</span></div>
                <div class="spec-row"><span class="spec-label">Price</span><span class="spec-value" id="price1">--</span></div>
            </div>
            <div class="summary"><ul id="sum1"></ul></div>
        </div>

        <div class="vs-divider">VS</div>

        <!-- Laptop 2 -->
        <div class="slot" id="slot2">
            <div class="overlay">UPLINKING...</div>
            <div class="input-group">
                <input type="text" id="query2" class="model-input" placeholder="Target Model 2">
                <button class="scan-btn" id="btn2" onclick="runScan(2)">Scan</button>
            </div>
            <div class="score-circle" id="score2">00</div>
            <div class="spec-table">
                <div class="spec-row"><span class="spec-label">CPU</span><span class="spec-value" id="cpu2">--</span></div>
                <div class="spec-row"><span class="spec-label">GPU</span><span class="spec-value" id="gpu2">--</span></div>
                <div class="spec-row"><span class="spec-label">RAM</span><span class="spec-value" id="ram2">--</span></div>
                <div class="spec-row"><span class="spec-label">Display</span><span class="spec-value" id="display2">--</span></div>
                <div class="spec-row"><span class="spec-label">Battery</span><span class="spec-value" id="bat2">--</span></div>
                <div class="spec-row"><span class="spec-label">Weight</span><span class="spec-value" id="weight2">--</span></div>
                <div class="spec-row"><span class="spec-label">Price</span><span class="spec-value" id="price2">--</span></div>
            </div>
            <div class="summary"><ul id="sum2"></ul></div>
        </div>
    </div>
</div>

<script>
    const API_KEY = "AIzaSyC3Mwun5oDx1l3wi1tU4RT9tkqzZh346NY";
    const scores = { 1: 0, 2: 0 };

    async function runScan(id) {
        const query = document.getElementById(`query${id}`).value;
        const uc = document.getElementById('useCase').value || "General High Performance";
        
        if (!query) return alert("Enter model name");

        const el = document.getElementById(`slot${id}`);
        const btn = document.getElementById(`btn${id}`);
        
        el.classList.add('loading');
        el.classList.remove('winner', 'has-data');
        btn.disabled = true;

        const prompt = `Research specs for: "${query}". Use Case: "${uc}".
        Return ONLY a JSON object:
        {
          "cpu": "name",
          "gpu": "name + wattage",
          "ram": "size + speed",
          "display": "res + refresh + nits",
          "battery": "Wh + hours",
          "weight": "kg/lbs",
          "price": "approx price",
          "score": 1-100,
          "points": ["point 1", "point 2"]
        }`;

        try {
            // Using v1beta which is more flexible with models like Flash
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error.message);

            const text = data.candidates[0].content.parts[0].text;
            
            // Extracting JSON
            const start = text.indexOf('{');
            const end = text.lastIndexOf('}') + 1;
            const laptop = JSON.parse(text.substring(start, end));

            // Update UI
            scores[id] = laptop.score;
            document.getElementById(`score${id}`).innerText = laptop.score;
            document.getElementById(`cpu${id}`).innerText = laptop.cpu;
            document.getElementById(`gpu${id}`).innerText = laptop.gpu;
            document.getElementById(`ram${id}`).innerText = laptop.ram;
            document.getElementById(`display${id}`).innerText = laptop.display;
            document.getElementById(`bat${id}`).innerText = laptop.battery;
            document.getElementById(`weight${id}`).innerText = laptop.weight;
            document.getElementById(`price${id}`).innerText = laptop.price;
            
            document.getElementById(`sum${id}`).innerHTML = 
                laptop.points.map(p => `<li>${p}</li>`).join('');

            el.classList.add('has-data');
            findWinner();

        } catch (err) {
            console.error(err);
            alert("SCAN ERROR: " + err.message);
        } finally {
            el.classList.remove('loading');
            btn.disabled = false;
        }
    }

    function findWinner() {
        if (scores[1] > 0 && scores[2] > 0) {
            const s1 = document.getElementById('slot1');
            const s2 = document.getElementById('slot2');
            s1.classList.remove('winner');
            s2.classList.remove('winner');
            
            if (scores[1] > scores[2]) s1.classList.add('winner');
            else if (scores[2] > scores[1]) s2.classList.add('winner');
        }
    }
</script>
</body>
</html>
