import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

const ViewerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const StoryImage = styled(motion.img)`
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const NavigationZone = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  ${(props) => (props.left ? 'left: 0;' : 'right: 0;')}
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
`;

const StoryViewer = ({ storyId, stories, onClose }) => {
  const initialStoryIndex = stories.findIndex((story) => story.id.toString() === storyId.toString());
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex !== -1 ? initialStoryIndex : 0);

  const nextStory = useCallback(() => {
    setCurrentStoryIndex((index) => (index + 1) % stories.length);
  }, [stories.length]);

  const prevStory = useCallback(() => {
    setCurrentStoryIndex((index) => (index - 1 + stories.length) % stories.length);
  }, [stories.length]);

  useEffect(() => {
    const timer = setTimeout(nextStory, 5000);
    return () => clearTimeout(timer);
  }, [currentStoryIndex, nextStory]);

  const handleNavigation = (direction) => {
    if (direction === 'next') {
      nextStory();
    } else {
      prevStory();
    }
  };

  const currentStory = stories[currentStoryIndex];

  return (
    <ViewerContainer onClick={onClose}>
      <CloseButton onClick={(e) => { e.stopPropagation(); onClose(); }}>×</CloseButton>
      <NavigationZone left onClick={(e) => { e.stopPropagation(); handleNavigation('prev'); }} />
      <NavigationZone onClick={(e) => { e.stopPropagation(); handleNavigation('next'); }} />
      <AnimatePresence mode="wait">
        {currentStory && (
          <StoryImage
            key={currentStory.id}
            src={currentStory.imageUrl}
            alt={`Story ${currentStory.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onError={(e) => {
              console.error(`Error loading image: ${currentStory.imageUrl}`);
              e.target.src = 'https://via.placeholder.com/300'; // Fallback image
            }}
          />
        )}
      </AnimatePresence>
    </ViewerContainer>
  );
};

StoryViewer.propTypes = {
  storyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  stories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageUrl: PropTypes.string.isRequired,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default StoryViewer;
