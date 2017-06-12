import React from 'react';

const Main = ({
  id,
  onDefinitionsChange,
  onPatternsChange,
  definitions,
  patterns,
  words,
}) => (
  id
  ? <div className="p1 flex flex-wrap flex-grow">
    <textarea
      className="textarea m1 flex-auto"
      style={{ width: '20rem' }}
      rows={8}
      name="definitions"
      value={definitions}
      onChange={onDefinitionsChange}
    />
    <textarea
      className="textarea m1 flex-auto"
      style={{ width: '20rem' }}
      rows={8}
      name="patterns"
      value={patterns}
      onChange={onPatternsChange}
    />
    <ul
      className="flex-auto m1"
      style={{
        width: '30rem',
        columnWidth: '10em',
      }}
    >
      {words.map(word => (
        <li key={word}>
          {word}
        </li>
      ))}
    </ul>
  </div>
  : null
);

export default Main;
