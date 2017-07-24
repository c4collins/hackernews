// Core Modules
import React, { Component } from 'react';

// Third-Party Modules
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Internal Modules
import Button from '../Button';

// Misc Files
import './index.css';

// Constants
import {
  SORTS,
  FontAwesome,
} from '../../constants';

class Table extends Component { 

    constructor(props){
        super(props);

        this.state = {
            sortKey: 'NONE',
            isSortReverse: false,
        };

        this.onSort = this.onSort.bind(this);
    }

    onSort(sortKey){
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({ sortKey, isSortReverse });
    }

    render() {
        const {
            list, 
            onDismiss,
        } = this.props;
        const {
            sortKey,
            isSortReverse
        } = this.state;

        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse
            ? sortedList.reverse()
            : sortedList;

        return (
            <div className="table">
            <div className="table-header">
                <span style={{ width: '40%' }}>
                <Sort
                    sortKey={'TITLE'}
                    onSort={this.onSort}
                    activeSortKey={sortKey}
                    isSortReverse={isSortReverse}
                > Title
                </Sort>
                </span>
                <span style={{ width: '30%' }}>
                <Sort
                    sortKey={'AUTHOR'}
                    onSort={this.onSort}
                    activeSortKey={sortKey}
                    isSortReverse={isSortReverse}
                > Author
                </Sort>
                </span>
                <span style={{ width: '10%' }}>
                <Sort
                    sortKey={'COMMENTS'}
                    onSort={this.onSort}
                    activeSortKey={sortKey}
                    isSortReverse={isSortReverse}
                > Comments
                </Sort>
                </span>
                <span style={{ width: '10%' }}>
                <Sort
                    sortKey={'POINTS'}
                    onSort={this.onSort}
                    activeSortKey={sortKey}
                    isSortReverse={isSortReverse}
                > Points
                </Sort>
                </span>
                <span style={{ width: '10%' }}></span>
            </div>
            { reverseSortedList.map((item) =>
                <div key={item.objectID} className="table-row">
                <span style={{ width: '40%' }}>
                    <a href={item.url}>{item.title}</a>
                </span>
                <span style={{ width: '30%' }}>{item.author}</span>
                <span style={{ width: '10%' }}>{item.num_comments}</span>
                <span style={{ width: '10%' }}>{item.points}</span>
                <span style={{ width: '10%' }}>
                    <Button 
                    onClick={() => onDismiss(item.objectID)}
                    className="button-inline"
                    >
                    Dismiss
                    </Button>                
                </span>
                </div>
            )}
            </div>
        )
    }
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  onSort: PropTypes.func,
  isSortReverse: PropTypes.bool
};

Table.defaultProps = {
    sortKey: 'NONE'
}


const Sort = ({
  sortKey, 
  activeSortKey, 
  onSort, 
  isSortReverse,
  children 
}) => {
  const isSortActive = sortKey === activeSortKey;
  const sortClass = classNames(
    'button-inline',
    { 'button-active': isSortActive}
  );
  const iconClass = classNames(
    {'arrow-up': isSortReverse && isSortActive},
    {'arrow-down': !isSortReverse && isSortActive}
  )

  return (
    <Button 
      onClick={()=> onSort(sortKey)}
      className={sortClass}
    >
      <FontAwesome
        name={iconClass}
        style={{ 
          textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
          color: 'black',
        }}
      />
      {children}
    </Button>
  );
}

Sort.propTypes = {
  sortKey: PropTypes.string.isRequired,
  activeSortKey: PropTypes.string,
  onSort: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}


export default Table;
export { Sort };