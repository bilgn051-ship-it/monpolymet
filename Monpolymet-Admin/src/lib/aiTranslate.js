/**
 * Corporate AI Translation Engine
 * Tier 1: OpenAI ChatGPT (gpt-4o-mini)
 * Tier 2: Free Google Translate API
 * Tier 3: MyMemory API
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

const GLOSSARY = {
  'Монполимет': 'Monpolymet',
  'Монцемент': 'Moncement',
  'Нар-Урт': 'Nar-Urt',
  'Тосон': 'Toson',
  'Заамар': 'Zaamar',
  'Өргөн': 'Urgun',
  'Дорноговь': 'Dornogovi',
  'Төв аймаг': 'Tuv province'
};

export async function translateMnToEn(text) {
  if (!text || !text.trim()) return '';

  const cleanText = text.trim();

  // Tier 1: OpenAI ChatGPT
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert corporate translator specializing in professional Mongolian-to-English business translation for Monpolymet Group (a leading national corporation in Mongolia operating in gold mining, cement manufacturing - Moncement, environmental rehabilitation, heavy transport & logistics, construction, and corporate HR).

Rules:
1. Translate the given Mongolian text into fluent, executive-level, professional corporate English.
2. Keep corporate company names accurate: 'Монполимет' -> 'Monpolymet', 'Монцемент' -> 'Moncement', 'Нар-Урт' -> 'Nar-Urt', 'Тосон' -> 'Toson', 'Заамар' -> 'Zaamar', 'Өргөн' -> 'Urgun', 'Дорноговь' -> 'Dornogovi'.
3. Maintain clean formal tone, precise industry terminology, and zero grammatical errors.
4. Output ONLY the English translation text. Do NOT add quotes, preambles, explanations, or notes.`
          },
          {
            role: 'user',
            content: cleanText
          }
        ],
        temperature: 0.2
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.choices && data.choices[0] && data.choices[0].message) {
        let result = data.choices[0].message.content.trim();
        result = result.replace(/^["']|["']$/g, '');
        if (result && result.toLowerCase() !== cleanText.toLowerCase()) {
          return result;
        }
      }
    } else {
      const errBody = await response.text();
      console.warn('OpenAI API returned non-OK status:', response.status, errBody);
    }
  } catch (err) {
    console.warn('OpenAI Tier 1 translation failed, switching to Tier 2 Google Translate:', err);
  }

  // Tier 2: Free Google Translate API
  try {
    const encoded = encodeURIComponent(cleanText);
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=mn&tl=en&dt=t&q=${encoded}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data[0] && data[0][0] && data[0][0][0]) {
        let result = data[0].map(item => item[0]).join('').trim();
        
        Object.keys(GLOSSARY).forEach(key => {
          const regex = new RegExp(key, 'gi');
          result = result.replace(regex, GLOSSARY[key]);
        });

        if (result) return result;
      }
    }
  } catch (err) {
    console.warn('Google Tier 2 translation failed, switching to Tier 3 MyMemory:', err);
  }

  // Tier 3: MyMemory API
  try {
    const encoded = encodeURIComponent(cleanText);
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encoded}&langpair=mn|en`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.responseData && data.responseData.translatedText) {
        let result = data.responseData.translatedText.trim();
        Object.keys(GLOSSARY).forEach(key => {
          const regex = new RegExp(key, 'gi');
          result = result.replace(regex, GLOSSARY[key]);
        });
        if (result) return result;
      }
    }
  } catch (err) {
    console.warn('MyMemory Tier 3 translation failed:', err);
  }

  return cleanText;
}
