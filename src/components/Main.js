import React from 'react';
import PropTypes from 'prop-types';

const Main = ({
  error,
  id,
  input,
  onInputChange,
  words,
}) => (
  id
  ? <div className="p1 flex flex-wrap flex-grow">
    <textarea
      className="textarea m1 flex-auto"
      style={{ width: '20rem' }}
      rows={12}
      name="definitions"
      value={input}
      onChange={onInputChange}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
    {
      error
      ? (
        <div
          className="flex-auto m1"
          style={{
            width: '20rem',
            flexGrow: '3',
          }}
        >
          <pre className="red bg-red-15 p1 rounded m0">
            {error.message}
          </pre>
        </div>
      )
      : (
        <ul
          className="flex-auto m1"
          style={{
            width: '20rem',
            columnWidth: '10em',
          }}
        >
          {
            words.map(word => (
              <li key={word}>
                {word}
              </li>
            ))
          }
        </ul>
      )
    }
  </div>
  : null
);

Main.propTypes = {
  error: PropTypes.shape({
    offset: PropTypes.number,
  }),
  id: PropTypes.string,
  input: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  words: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

Main.defaultProps = {
  error: null,
  id: null,
};

export default Main;
