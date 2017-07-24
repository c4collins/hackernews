import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Table, { Sort } from './index';

describe('Sort', () => {

  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Sort 
        onSort={() => null} 
        sortKey='NONE'
      >
        More
      </Sort>, div);
  });

  test('snapshots', () => {
    const component = renderer.create(
      <Sort 
        onSort={() => null} 
        sortKey='NONE'
      >
        More
      </Sort>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});

describe('Table', () => {

  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'x'},
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'y'},
    ],
    onDismiss: () => null,
    sortKey: 'NONE',
    onSort: () => null,
    isSortReverse: false
  }

  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
  });

  it('shows two items in a list', () => {
    const element = shallow(
      <Table {...props} />
    );

    expect(element.find('.table-row').length).toBe(2);
  });

  test('snapshots', () => {
    const component = renderer.create(
      <Table {...props} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});