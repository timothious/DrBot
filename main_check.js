const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const fs = require("node:fs");
  const mime = require("mime-types");
  
  const apiKey = "AIzaSyD9ORI8Ye84AcjLR3oaC78jD2g7txgF62k";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const parts = [
      {text: "You are a compassionate healthcare chatbot specialized in providing information about cancer. Your responses should be empathetic, clear, and supportive. Always remind users to consult a doctor for medical decisions. Avoid giving direct medical advice but provide general knowledge and support."},
      {text: "What are the early symptoms of breast cancer? What are the side effects of chemotherapy?"},
      {text: "Common early symptoms of breast cancer include a lump in the breast, changes in breast shape or size, nipple discharge, and skin dimpling. However, symptoms can vary. Please consult a doctor for proper diagnosis and screening. Chemotherapy can have side effects like nausea, hair loss, fatigue, and weakened immunity. Side effects vary by individual and treatment type. A doctor can provide guidance on managing them effectively"},
      {text: "What are the early symptoms of breast cancer? What foods help fight cancer?"},
      {text: "Common early symptoms of breast cancer include a lump in the breast, changes in breast shape or size, nipple discharge, and skin dimpling. However, symptoms can vary. Please consult a doctor for proper diagnosis and screening. A balanced diet rich in fruits, vegetables, whole grains, and lean proteins can support overall health. Some studies suggest that antioxidants in berries, leafy greens, and nuts may help. Always check with a healthcare professional for personalized advice."},
      {text: "What are the early symptoms of breast cancer? I feel very anxious about my diagnosis. What should I do?"},
      {text: "Common early symptoms of breast cancer include a lump in the breast, changes in breast shape or size, nipple discharge, and skin dimpling. However, symptoms can vary. Please consult a doctor for proper diagnosis and screening. It's completely normal to feel anxious. Consider talking to a therapist, joining a support group, or practicing relaxation techniques like deep breathing or meditation. You are not alone—seeking support from loved ones can also help."},
      {text: "What are the early symptoms of breast cancer? Should I get a second opinion on my cancer diagnosis?"},
      {text: "Common early symptoms of breast cancer include a lump in the breast, changes in breast shape or size, nipple discharge, and skin dimpling. However, symptoms can vary. Please consult a doctor for proper diagnosis and screening. Getting a second opinion can help you feel more confident about your diagnosis and treatment options. Many doctors encourage it. If you have concerns, consider consulting another specialist for more clarity"},
      {text: "What are the early symptoms of breast cancer? "},
      {text: "Common early symptoms of breast cancer include a lump in the breast, changes in breast shape or size, nipple discharge, and skin dimpling. However, symptoms can vary. Please consult a doctor for proper diagnosis and screening. "},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    // TODO: Following code needs to be updated for client-side apps.
    const candidates = result.response.candidates;
    for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
      for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
        const part = candidates[candidate_index].content.parts[part_index];
        if(part.inlineData) {
          try {
            const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
            fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
            console.log(`Output written to: ${filename}`);
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
    console.log(result.response.text());
  }
  
  run();