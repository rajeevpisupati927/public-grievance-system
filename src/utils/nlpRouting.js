const DEPARTMENTS = {
  water: { id: 'water', name: 'Water Works', url: 'https://www.ghmc.gov.in/', color: 'cyan' },
  sanitation: { id: 'sanitation', name: 'Sanitation Dept', url: 'https://www.ghmc.gov.in/', color: 'magenta' },
  roads: { id: 'roads', name: 'Roads & Infrastructure', url: 'https://www.ghmc.gov.in/', color: 'purple' },
  electricity: { id: 'electricity', name: 'Electricity Board', url: 'https://tgsouthernpower.org/', color: 'blue' },
  municipal: { id: 'municipal', name: 'General Municipal', url: 'https://www.ghmc.gov.in/', color: 'cyan' },
};

const KEYWORDS = {
  water: ['water', 'pani', 'paani', 'leak', 'pipeline', 'dry', 'supply', 'nal'],
  sanitation: ['sanitation', 'garbage', 'kachra', 'trash', 'waste', 'smell', 'drain', 'naala', 'sewage', 'saaf'],
  roads: ['road', 'sadak', 'pothole', 'gadda', 'rasta', 'pavement', 'street', 'highway'],
  electricity: ['electricity', 'power', 'light', 'current', 'bijli', 'wire', 'transformer', 'outage', 'blackout', 'shock'],
};

export const routeComplaint = (text) => {
  const lowerText = text.toLowerCase();
  
  let matches = [];
  
  // Calculate basic keyword matches
  for (const [dept, words] of Object.entries(KEYWORDS)) {
    let score = 0;
    for (const word of words) {
      if (lowerText.includes(word)) {
        score += 45; // Base high score for a direct match
      }
    }
    
    // Add some random noise for "AI" realism if matched, otherwise keep it very low
    if (score > 0) {
      score += Math.floor(Math.random() * 15) + 35; // e.g. 45 + 35..50 = 80..95
      if (score > 98) score = 98; // Cap at 98%
    } else {
      score = Math.floor(Math.random() * 12) + 2; // e.g. 2% to 14%
    }
    
    matches.push({
      ...DEPARTMENTS[dept],
      confidence: score
    });
  }

  // Sort by confidence descending
  matches.sort((a, b) => b.confidence - a.confidence);

  // Determine top match, or fallback if confidence is too low
  let topMatch = matches[0];
  let isValid = true;
  
  if (topMatch.confidence < 50) {
    isValid = false;
  }

  return {
    isValid,
    dept: topMatch.id,
    url: topMatch.url,
    topMatch: topMatch,
    allScores: matches.slice(0, 3) // Return top 3 for the UI
  };
};
