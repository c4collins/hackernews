import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Loading from './index';

describe('Loading', () => {

  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Loading />, div);
  });

  test('snapshots', () => {
    const component = renderer.create(
      <Loading />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});