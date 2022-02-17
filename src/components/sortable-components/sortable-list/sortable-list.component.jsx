import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from '../sortable-item/sortable-item.component';
import './sortable-list.styles.scss';
import PropTypes from 'prop-types'

const SortableList = SortableContainer(({ items, removeItem }) => {
  return (
    <div className="grid">
      {items.map((value, index) => (
        <SortableItem
          key={`item-${value}`}
          remove={removeItem}
          index={index}
          city={value}
        />
      ))}
    </div>
  );
});

SortableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  removeItem: PropTypes.func
}


export default SortableList;
