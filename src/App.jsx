import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { analyzeSnippetMock } from './services/mockAi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';

const initialMockSnippets = [
  {
    id: 1,
    title: 'Debounce Function',
    desc: 'A utility function to limit the rate at which a function can fire.',
    tags: ['javascript', 'utility', 'performance'],
    code: `function debounce(func, wait) {\n  let timeout;\n  return function executedFunction(...args) {\n    const later = () => {\n      clearTimeout(timeout);\n      func(...args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}`
  }
];

function App() {
  const [snippets, setSnippets] = useLocalStorage('ai-snippets', initialMockSnippets);
  const [activeSnippet, setActiveSnippet] = useState(null);
  
  // UI States
  const [isCreating, setIsCreating] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateNew = () => {
    setActiveSnippet(null);
    setIsCreating(true);
    setNewCode('');
  };

  const handleSaveSnippet = async () => {
    if (!newCode.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      // Simulate sending to AI to get metadata
      const aiResult = await analyzeSnippetMock(newCode);
      
      const newSnippet = {
        id: Date.now(),
        title: aiResult.title,
        desc: aiResult.desc,
        tags: aiResult.tags,
        code: newCode
      };
      
      setSnippets([newSnippet, ...snippets]);
      setIsCreating(false);
      setActiveSnippet(newSnippet);
      setNewCode('');
    } catch (error) {
      console.error("Error analyzing snippet:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredSnippets = snippets.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            Snippet<span>Sync</span>
          </h1>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            All Snippets
          </button>
          <button className="nav-item">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            Favorites
          </button>
          <button className="nav-item">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
            Tags
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="search-bar">
            <svg className="icon search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search snippets by title or tag..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="content-area">
          {/* Snippet Feed */}
          <section className="feed">
            <div className="feed-header">
              <span className="feed-title">Snippets ({filteredSnippets.length})</span>
              <button className="btn-primary" style={{ padding: '0.4rem 0.8rem' }} onClick={handleCreateNew}>
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '1rem', height: '1rem', marginRight: '-0.2rem' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                New
              </button>
            </div>
            <div className="feed-list">
              {filteredSnippets.length === 0 ? (
                <div style={{color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem'}}>No snippets found.</div>
              ) : (
                filteredSnippets.map(snippet => (
                  <div 
                    key={snippet.id} 
                    className={`snippet-card ${(activeSnippet?.id === snippet.id && !isCreating) ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSnippet(snippet);
                      setIsCreating(false);
                    }}
                  >
                    <h3 className="snippet-title">{snippet.title}</h3>
                    <p className="snippet-desc">{snippet.desc}</p>
                    <div className="snippet-tags">
                      {snippet.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Editor Area */}
          <section className="editor-area">
            {isCreating ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>✨ New Snippet</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Paste your code below. Our Mock AI will automatically analyze it to generate a title, description, and tags.
                </p>
                <textarea 
                  style={{ 
                    flex: 1, 
                    background: '#1a1d27', 
                    color: 'var(--text-primary)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '1rem',
                    fontFamily: 'monospace',
                    resize: 'none',
                    marginBottom: '1.5rem',
                    outline: 'none'
                  }}
                  placeholder="// Paste your code here..."
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  disabled={isAnalyzing}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button 
                    style={{ color: 'var(--text-muted)' }} 
                    onClick={() => setIsCreating(false)}
                    disabled={isAnalyzing}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-primary" 
                    onClick={handleSaveSnippet}
                    disabled={isAnalyzing || !newCode.trim()}
                    style={{ opacity: (isAnalyzing || !newCode.trim()) ? 0.6 : 1 }}
                  >
                    {isAnalyzing ? 'Analyzing with AI...' : 'Save & Auto-Tag'}
                  </button>
                </div>
              </div>
            ) : activeSnippet ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{activeSnippet.title}</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>{activeSnippet.desc}</p>
                  </div>
                  <button 
                    className="btn-primary" 
                    style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    onClick={() => {
                      navigator.clipboard.writeText(activeSnippet.code);
                      alert('Code copied to clipboard!');
                    }}
                  >
                    Copy Code
                  </button>
                </div>
                
                <div className="snippet-tags" style={{ marginBottom: '1.5rem' }}>
                  {activeSnippet.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <SyntaxHighlighter 
                  language={activeSnippet.tags.includes('html') ? 'html' : activeSnippet.tags.includes('sql') ? 'sql' : 'javascript'} 
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    background: '#1a1d27', 
                    padding: '1.5rem', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                    fontSize: '0.95rem'
                  }}
                >
                  {activeSnippet.code}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div className="empty-state">
                <svg className="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No Snippet Selected</h2>
                <p style={{ marginBottom: '1.5rem' }}>Select a snippet from the feed to view its details or create a new one.</p>
                <button className="btn-primary" onClick={handleCreateNew}>
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  Create Snippet
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
