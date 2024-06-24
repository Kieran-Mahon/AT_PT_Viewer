import React from 'react';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const Filter = React.forwardRef(({ children, style, className }, ref) => {
    const [value, setValue] = useState('');
    return (
      <div ref={ref} style={style} className={className}>
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled" style={{ maxHeight: "200px", overflowY: "auto" }}>
          {React.Children.toArray(children).filter((child) => !value || child.props.children.toLowerCase().startsWith(value))}
        </ul>
      </div>
    );
  },
);

export default function RouteDropdown({ dropdownSelectHandle, routes }) {
  return (
      <Dropdown onSelect={dropdownSelectHandle}>
        <Dropdown.Toggle id="route-select-dropdown">Select Route</Dropdown.Toggle>
        <Dropdown.Menu as={Filter}> 
          {routes.map(route => (
            <Dropdown.Item eventKey={route.id} key={route.id}>
              {route.attributes.route_short_name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
  );
}
