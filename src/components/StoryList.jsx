import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const StoryListContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px;
  scrollbar-width: thin;

  @media (max-width: 600px) {
    overflow-x: scroll;
    flex-wrap: nowrap;
  }
`;

const StoryThumbnail = styled.div`
  flex: 0 0 auto;
  width: 80px;
  height: 80px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 10px;
  border-radius: 40px;
  cursor: pointer;
  border: 2px solid lightcoral;

  @media (max-width: 600px) {
    &:nth-of-type(n + 5) {
      display: none;
    }
  }
`;

const StoryList = ({ onStorySelect, setStories }) => {
  const [stories, setLocalStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/Stories.json'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLocalStories(data);
        setStories(data); 
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, [setStories]);

  return (
    <StoryListContainer>
      {stories.map((story) => (
        <StoryThumbnail
          key={story.id}
          style={{ backgroundImage: `url(${story.imageUrl})` }}
          onClick={() => onStorySelect(story.id)}
        />
      ))}
    </StoryListContainer>
  );
};

StoryList.propTypes = {
  onStorySelect: PropTypes.func.isRequired,
  setStories: PropTypes.func.isRequired,
};

export default StoryList;
