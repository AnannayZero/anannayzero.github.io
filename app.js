const KEY = "AIzaSyC3Mwun5oDx1l3wi1tU4RT9tkqzZh346NY";
const MODEL = "gemini-3.1-flash-lite-preview"; 

async function runScan(id) {
    const query = document.getElementById(`q${id}`).value;
    const uc = document.getElementById('uCase').value || "Professional Performance";
    const cur = document.getElementById('currencySign')?.value || ""; // From your earlier request
    
    if (!query) return alert("Missing Model Name");

    const el = document.getElementById(`slot${id}`);
    const btn = document.getElementById(`b${id}`);
    
    el.classList.add('loading');
    btn.disabled = true;

    // 2. Refined Prompt for 3.1 Flash-Lite
    const prompt = `Search for: "${query}". 
    Evaluate for use case: "${uc}".
    Output ONLY valid JSON. No markdown. No backticks.
    {
      "cpu": "string",
      "gpu": "string",
      "ram": "string",
      "display": "string",
      "battery": "string",
      "weight": "string",
      "price": number,
      "score": number,
      "points": ["list 3 key strengths"]
    }`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                // Built-in Search Grounding
                tools: [{ google_search: {} }] 
            })
        });

        const data = await response.json();
        
        if (data.error) throw new Error(data.error.message);

        // 3. Robust JSON Extraction
        let rawText = data.candidates[0].content.parts[0].text;
        const cleanJson = rawText.replace(/```json|```/g, "").trim();
        const json = JSON.parse(cleanJson);

        // UI Population
        globalScores[id] = json.score;
        document.getElementById(`score${id}`).innerText = json.score;
        document.getElementById(`cpu${id}`).innerText = json.cpu;
        document.getElementById(`gpu${id}`).innerText = json.gpu;
        document.getElementById(`ram${id}`).innerText = json.ram;
        document.getElementById(`disp${id}`).innerText = json.display;
        document.getElementById(`bat${id}`).innerText = json.battery;
        document.getElementById(`weight${id}`).innerText = json.weight;
        
        // Dynamic Currency Handling
        document.getElementById(`price${id}`).innerText = `${cur}${json.price}`;
        
        document.getElementById(`sum${id}`).innerHTML = json.points.map(p => `<li>${p}</li>`).join('');

        el.classList.add('has-data');
        checkWin();

    } catch (err) {
        console.error("Engine failure:", err);
        alert("ENGINE ERROR: " + err.message);
    } finally {
        el.classList.remove('loading');
        btn.disabled = false;
    }
}
