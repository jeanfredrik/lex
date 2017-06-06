import React, { Component } from 'react';
import autobind from 'react-autobind';
import {
  set,
} from 'lodash/fp';

import {
  parseDefinitions,
  parsePatterns,
  makeWords,
} from './lib';

class Main extends Component {
  constructor(...args) {
    super(...args);
    autobind(this);
  }
  state = {
    definitions: [
      'C=p,b,t,d,k,g,s,l,m,n,r,y,w',
      'F=s,l,m,n,r,y,w',
      'V=a,e,i,o,u',
    ].join('\n'),
    patterns: [
      'CV',
      'CVF',
      'CVFCV',
    ].join('\n'),
  };
  handleFieldChange(event) {
    const {
      name,
      value,
    } = event.target;
    this.setState(set(name, value));
  }
  render() {
    const {
      definitions,
      patterns,
    } = this.state;
    const words = makeWords(parseDefinitions(definitions), parsePatterns(patterns));
    return (
      <div className="p1 flex flex-wrap flex-grow">
        <textarea
          className="textarea m1 flex-auto"
          style={{ width: '20rem' }}
          rows={8}
          name="definitions"
          value={definitions}
          onChange={this.handleFieldChange}
        />
        <textarea
          className="textarea m1 flex-auto"
          style={{ width: '20rem' }}
          rows={8}
          name="patterns"
          value={patterns}
          onChange={this.handleFieldChange}
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
    );
  }
}

export default Main;
