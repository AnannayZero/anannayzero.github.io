<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ibucatto Comparator v3.7</title>
    <style>
        :root { --bg: #050505; --neon: #39ff14; --card: #0d0d11; --border: #1f1f26; --vs: #ff0055; }
        body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: #e0e0e0; margin: 0; padding: 20px; }
        .container { max-width: 1100px; margin: 0 auto; }
        
        /* Header */
        .header { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #222; margin-bottom: 25px; }
        .title { font-size: 1.4rem; font-weight: 900; letter-spacing: 2px; color: #fff; text-transform: uppercase; }
        .title span { color: var(--neon); }
        .status-light { font-size: 10px; color: var(--neon); display: flex; align-items: center; gap: 5px; }
        .status-light::before { content: ""; width: 8px; height: 8px; background: var(--neon); border-radius: 50%; display: inline-block; box-shadow: 0 0 5px var(--neon); }

        /* Use Case */
        .use-case-box { background: var(--card); border: 1px solid var(--border); border-left: 4px solid var(--neon); padding: 15px; border-radius: 8px; margin-bottom: 25px; }
        .label { font-size: 0.7rem; text-transform: uppercase; color: #666; letter-spacing: 1px; display: block; margin-bottom: 5px; }
        .use-case-input { background: #000; border: 1px solid #222; color: #fff; width: 100%; padding: 10px; border-radius: 5px; box-sizing: border-box; }

        /* Battle Arena Layout */
        .battle-arena { display: flex; gap: 20px; align-items: flex-start; }
        .slot { flex: 1; background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; position: relative; min-height: 500px; transition: 0.3s; }
        .slot.winner { border-color: var(--neon); box-shadow: 0 0 20px rgba(57, 255, 20, 0.1); transform: translateY(-5px); }
        .slot.winner::after { content: "WINNER"; position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: var(--neon); color: #000; padding: 2px 10px; font-size: 10px; font-weight: 900; border-radius: 4px; }

        .vs-sign { align-self: center; font-weight: 900; font-size: 1.2rem; color: var(--vs); opacity: 0.4; padding: 0 10px; }

        /* Inputs */
        .input-group { display: flex; gap: 5px; margin-bottom: 15px; }
        .model-input { flex-grow: 1; background: #000; border: 1px solid #333; color: #fff; padding: 10px; border-radius: 5px; font-size: 0.9rem; }
        .scan-btn { background: var(--neon); color: #000; border: none; padding: 0 15px; border-radius: 5px; font-weight: 800; cursor: pointer; text-transform: uppercase; font-size: 0.7rem; }
        .scan-btn:disabled { background: #222; color: #555; }

        .score { font-size: 3.5rem; font-weight: 900; text-align: center; margin: 10px 0; color: #1a1a1f; font-family: monospace; }
        .has-data .score { color: var(--neon); text-shadow: 0 0 10px rgba(57, 255, 20, 0.2); }

        /* Specs Table */
        .spec-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1a1a1f; font-size: 0.8rem; }
        .spec-n { color: #555; text-transform: uppercase; font-size: 0.65rem; }
        .spec-v { color: #ccc; text-align: right; max-width: 65%; font-family: monospace; }

        .analysis { margin-top: 15px; font-size: 0.75rem; color: #888; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 6px; }
        .analysis ul { padding-left: 15px; margin: 0; }

        /* Loading Overlay */
        .loading-mask { display: none; position: absolute; inset: 0; background: rgba(0,0,0,0.8); z-index: 5; border-radius: 12px; align-items: center; justify-content: center; color: var(--neon); font-size: 0.7rem; letter-spacing: 2px; }
        .loading .loading-mask { display: flex; }

        @media (max-width: 800px) {
            .battle-arena { flex-direction: column; }
            .vs-sign { padding: 10px; text-align: center; width: 100%; }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <div class="title">IBUCATTO <span>COMPARATOR</span></div>
        <div class="status-light">STABLE v1 LINK</div>
    </div>

    <div class="use-case-box">
        <span class="label">Operational Context (Use Case)</span>
        <input type="text" id="mainUseCase" class="use-case-input" placeholder="e.g. 4K Video Editing, School Work, High-End Gaming...">
    </div>

    <div class="battle-arena">
        <!-- Slot 1 -->
        <div class="slot" id="slot1">
            <div class="loading-mask">ANALYZING HARDWARE...</div>
            <div class="input-group">
                <input type="text" id="query1" class="model-input" placeholder="Model 1...">
                <button class="scan-btn" id="btn1" onclick="executeScan(1)">Scan</button>
            </div>
            <div class="score" id="score1">00</div>
            <div class="specs">
                <div class="spec-row"><span class="spec-n">CPU</span><span id="cpu1" class="spec-v">--</span></div>
                <div class="spec-row"><span class="spec-n">GPU</span><span id="gpu1" class="spec-v">--</span></div>
                <div class="spec-row"><span class="spec-n">RAM</span><span id="ram1" class="spec-v">--</span></div>
                <div class="spec-row"><span class="spec-n">Display</span><span id="screen1" class="spec-v">--</span></div>
                <div class="spec-row"><span class="spec-n">Battery Life</span><span id="bat1" class="spec-v">--</span></div>
                <div class="spec-row"><span class="spec-n">Weight/Build</span><span id="weight1" class="spec-v">--</span></div>
                <div class="spec-row"><span class="spec-n">Est. Price</span><span id="price1" class="spec-v">--</span></div>
            </div>
            <div class="analysis"><ul id="sum1"></ul></div>
        </div>

        <div class="vs-sign">VS</div>

        <!-- Slot 2 -->
        <div class="slot" id="slot2">
            <div class="loading-mask">ANALYZING HARDWARE...</div>
            <div class="input-group">
                <input type="text" id="query2" class="model-input" placeholder="Model 2...">
                <button class="scan-btn" id="btn2" onclick="executeScan(2)">Scan</button>
            </div>
            <div class="score" id="score2">00</div>
            <div class="specs">
                <div class="spec-row"><span class="spec-n">CPU</span><span id="cpu2" class="spec-v">--</span></div>
                <div class="spec-row"><span class="spec-n">GPU</span><span id="gpu2" class="spec-v">--</span></div>
                <div class="spec-row"><span class="spec-n">RAM</span><span id="ram2" class="spec-v">--</span></div>
                <div class="spec-row"><span class="spec-n">Display</span><span id="screen2" class="spec-v">--</span></div>
                <div class="spec-row"><span class="spec-n">Battery Life</span><span id="bat2" class="spec-v">--</span></div>
                <div class="spec-row"><span class="spec-n">Weight/Build</span><span id="weight2" class="spec-v">--</span></div>
                <div class="spec-row"><span class="spec-n">Est. Price</span><span id="price2" class="spec-v">--</span></div>
            </div>
            <div class="analysis"><ul id="sum2"></ul></div>
        </div>
    </div>
</div>

<script>
    const KEY = "AIzaSyC3Mwun5oDx1l3wi1tU4RT9tkqzZh346NY";
    const slotScores = { 1: 0, 2: 0 };

    async function executeScan(id) {
        const query = document.getElementById(`query${id}`).value;
        const context = document.getElementById('mainUseCase').value || "General High Performance";
        
        if (!query) return alert("Missing Model Name");

        const el = document.getElementById(`slot${id}`);
        const btn = document.getElementById(`btn${id}`);
        
        el.classList.add('loading');
        el.classList.remove('winner', 'has-data');
        btn.disabled = true;

        // Prompting specifically for technical accuracy
        const promptText = `Provide technical specifications for the laptop: "${query}". 
        Context: "${context}".
        You must return ONLY a raw JSON object. No other text.
        Format:
        {
          "cpu": "Full name",
          "gpu": "Model + TGP wattage",
          "ram": "Capacity + Speed",
          "display": "Res + Refresh + Nits",
          "battery": "Wh + Est hours",
          "weight": "kg/lbs + thickness",
          "price": "approx price",
          "score": 1-100,
          "points": ["Pros/Cons 1", "Pros/Cons 2"]
        }`;

        try {
            // Updated to Stable v1 endpoint
            const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promptText }] }]
                })
            });

            const data = await response.json();
            
            if (data.error) throw new Error(data.error.message);

            const responseText = data.candidates[0].content.parts[0].text;
            
            // Clean JSON string
            const jsonString = responseText.substring(responseText.indexOf('{'), responseText.lastIndexOf('}') + 1);
            const laptop = JSON.parse(jsonString);

            // Populate UI
            slotScores[id] = laptop.score;
            document.getElementById(`score${id}`).innerText = laptop.score;
            document.getElementById(`cpu${id}`).innerText = laptop.cpu;
            document.getElementById(`gpu${id}`).innerText = laptop.gpu;
            document.getElementById(`ram${id}`).innerText = laptop.ram;
            document.getElementById(`screen${id}`).innerText = laptop.display;
            document.getElementById(`bat${id}`).innerText = laptop.battery;
            document.getElementById(`weight${id}`).innerText = laptop.weight;
            document.getElementById(`price${id}`).innerText = laptop.price;
            
            document.getElementById(`sum${id}`).innerHTML = 
                laptop.points.map(p => `<li>${p}</li>`).join('');

            el.classList.add('has-data');
            checkWinner();

        } catch (err) {
            console.error(err);
            alert("Error: " + err.message);
        } finally {
            el.classList.remove('loading');
            btn.disabled = false;
        }
    }

    function checkWinner() {
        if (slotScores[1] > 0 && slotScores[2] > 0) {
            const s1 = document.getElementById('slot1');
            const s2 = document.getElementById('slot2');
            s1.classList.remove('winner');
            s2.classList.remove('winner');
            
            if (slotScores[1] > slotScores[2]) s1.classList.add('winner');
            else if (slotScores[2] > slotScores[1]) s2.classList.add('winner');
        }
    }
</script>
</body>
</html>


