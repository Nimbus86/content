// src/promptLibrary.js
const fs = require('fs');
const path = require('path');

let promptLibrary = [];

/**
 * Laad de promptbibliotheek vanuit het JSON-bestand.
 * We halen het bestand op uit de /data map.
 */
function loadPromptLibrary() {
  const filePath = path.join(__dirname, '..', 'data', 'prompts.json');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    promptLibrary = JSON.parse(data);
    console.log(`Promptbibliotheek geladen: ${promptLibrary.length} prompts gevonden.`);
  } catch (error) {
    console.error("Fout bij het laden van de promptbibliotheek:", error);
  }
}

/**
 * Zoek naar een prompt die past bij de ingevoerde keywords.
 * @param {string} userKeywords - De keywords die de gebruiker heeft ingevoerd.
 * @param {string} type - Het type content zoals 'thumbnail', 'avatar' of 'overlay'.
 * @returns {object|null} - Geeft het prompt-object terug als match is gevonden, anders null.
 */
function findPrompt(userKeywords, type) {
  // Maak de keywords lowercase waardoor het zoeken eenvoudiger wordt.
  const query = userKeywords.toLowerCase();
  
  // Zoek door de promptLibrary
  for (let promptObj of promptLibrary) {
    // Als er een type is gespecificeerd, moeten we daar op filteren.
    if (type && promptObj.type !== type) continue;
    
    // Controleer of een van de keywords in de invoer voorkomt.
    for (let keyword of promptObj.keywords) {
      if (query.includes(keyword.toLowerCase())) {
        return promptObj;
      }
    }
  }
  
  return null;
}

module.exports = {
  loadPromptLibrary,
  findPrompt
};
