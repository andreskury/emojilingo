import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material';

const ImageWrapper = styled('img')(() => ({
  width: '48vh',
}));

const PieceWrapper = styled('div')(({ position }) => {
  let left;
  if (position === 'right') {
    left = '2000px';
  } else if (position === 'left') {
    left = '2000px';
  } else {
    left = 0;
  }
  return ({
    position: 'fixed',
    left,
    opacity: position === 'center' ? '1' : 0,
    right: 0,
    margin: 'auto',
    transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
  });
});
/**
 * Wraps each emoji and replaces it with an svg
 * @component
 * @return {React.ElementType} Piece
 */
function Piece({ emoji, index }) {
  const currentQuestion = useSelector((state) => state.game.currentQuestion);
  const hex = emoji && emoji.codePointAt(0).toString(16);
  let position;
  if (currentQuestion > index) {
    position = 'right';
  } else if (currentQuestion < index) {
    position = 'left';
  } else {
    position = 'center';
  }
  return (
    <PieceWrapper position={position}>
      <ImageWrapper src={`https://emojiapi.dev/api/v1/${hex}.svg`} alt={emoji} />
    </PieceWrapper>
  );
}
PieceWrapper.propTypes = {
  position: PropTypes.string.isRequired,
};
Piece.propTypes = {
  /**
   * The actual emoji to be represented
   */
  emoji: PropTypes.string.isRequired,
  /**
   * Needed to calculate position
   */
  index: PropTypes.number.isRequired,
};
export default Piece;
