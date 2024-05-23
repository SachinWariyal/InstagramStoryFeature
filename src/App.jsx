import { useState } from 'react';
import './App.css';
import StoryList from './components/StoryList';
import StoryViewer from './components/StoryViewer';

function App() {
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [stories, setStories] = useState([]);

  const handleStorySelect = (storyId) => {
    setSelectedStoryId(storyId);
  };

  const handleStoryViewerClose = () => {
    setSelectedStoryId(null);
  };

  return (
    <>
    <div>
      <h1 className='header'>Instagram</h1>
    </div>
    <div>
      <StoryList onStorySelect={handleStorySelect} setStories={setStories} />
      {selectedStoryId && (
        <StoryViewer
          storyId={selectedStoryId}
          stories={stories}
          onClose={handleStoryViewerClose}
        />
      )}
    </div>
    </>
  );
}

export default App;
