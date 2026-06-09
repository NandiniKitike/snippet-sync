/**
 * Simulates calling an AI API to get tags and a description for a code snippet.
 * In a real application, this would call OpenAI, Gemini, or a backend service.
 */
export const analyzeSnippetMock = async (code) => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      let tags = ['code'];
      let desc = 'A useful code snippet.';
      let title = 'Code Snippet';

      const codeLower = code.toLowerCase();

      // Simple heuristic logic to simulate AI understanding
      if (codeLower.includes('function') || codeLower.includes('=>')) {
        tags.push('javascript');
        if (codeLower.includes('react') || codeLower.includes('use')) {
          tags.push('react');
          title = 'React Component/Hook';
          desc = 'A React function or hook snippet for building UIs.';
        } else {
          title = 'Utility Function';
          desc = 'A JavaScript utility function for data manipulation or logic.';
        }
      } else if (codeLower.includes('div') || codeLower.includes('span') || codeLower.includes('<html')) {
        tags.push('html');
        title = 'HTML Template';
        desc = 'Structural markup template for a web page.';
      } else if (codeLower.includes('import') && codeLower.includes('from')) {
        tags.push('module');
      }

      if (codeLower.includes('class') && codeLower.includes('{')) {
        tags.push('oop');
      }
      
      if (codeLower.includes('select') && codeLower.includes('from')) {
          tags.push('sql');
          title = 'SQL Query';
          desc = 'A database query for retrieving or manipulating data.';
      }

      // Deduplicate tags
      tags = [...new Set(tags)];

      resolve({
        title,
        desc,
        tags
      });
    }, 1500); // 1.5 second delay to feel like an API
  });
};
