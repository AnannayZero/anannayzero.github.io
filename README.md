<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ibucatto-Laptop Comparator v3.5 - Mercenary Special</title>
    <style>
        :root { --bg: #070709; --neon: #39ff14; --glass: rgba(255,255,255,0.03); --card: #111115; }
        body { font-family: 'Segoe UI', 'Roboto', sans-serif; background: var(--bg); color: #f1f1f1; padding: 30px; margin: 0; }
        .container { max-width: 1400px; margin: auto; }
        
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 25px; margin-bottom: 30px; }
        .title { font-size: 1.8rem; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 2px; }
        .title span { color: var(--neon); }
        .api-key-area { display: flex; gap: 10px; align-items: center; }
        .api-key-input { background: #111; border: 1px solid var(--neon); color: var(--neon); padding: 10px; border-radius: 6px; width: 320px; }
        
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
        const useCase = document.getElementById('mainUseCase').value || "General Productivity";
        const currency = document.getElementById('currencySign').value || "$"; // Defaults to $ if blank

        if (!key) return alert("You must enter a Gemini API Key first.");
        if (!query) return alert("Please enter a laptop model name.");

        // UI Updates
        document.getElementById(`status${slotId}`).innerText = "SCANNING...";
        document.getElementById(`status${slotId}`).style.color = "#ff8800";
        document.getElementById(`score${slotId}`).innerText = "---";

        // Structured prompt to Gemini with Search Grounding enabled
        const prompt = `Search for the detailed, current technical specs of the ${query} laptop. 
        Apply specific attention to how well these specs match the primary use case of: "${useCase}". 
        
        Return ONLY a JSON object with this exact structure: 
        { 
          "cpu_model": "Exact Model", 
          "gpu_model_and_tgp": "Exact Model + Max Wattage", 
          "ram_gb_and_speed": "GB + Speed (e.g., LPDDR5X-7500)", 
          "display_tech": "Nits, Resolution, Refresh Rate", 
          "price_converted": "Approximate Price (numeric only)", 
          "weighted_score": "Score (1-100) prioritized for user use case",
          "summary_strengths": ["Bulleted list of 3-4 key strengths tailored for the user's use case"]
        }`;

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


