import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from './index';

describe('Button', () => {

  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button onClick={() => null}>More</Button>, div);
  });

  test('snapshots', () => {
    const component = renderer.create(
      <Button onClick={() => null}>More</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});