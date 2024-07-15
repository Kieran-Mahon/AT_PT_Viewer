import React from 'react';
import { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

const filter = React.forwardRef(({ children, style, className }, ref) => {
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
          {React.Children.toArray(children).filter((child) => !value || child.props.children.toUpperCase().startsWith(value.toUpperCase()))}
        </ul>
      </div>
    );
  },
);

export default function RouteDropdown({ dropdownSelectHandle, routes, routeIDs }) {
  //Build dropdown items from route details
  let dropdowns = [];
  for (let i = 0; i < routeIDs.length; i++) {
    dropdowns.push(
      <Dropdown.Item eventKey={routes[routeIDs[i]].route_short_name} key={routeIDs[i]}>
        {routes[routeIDs[i]].route_short_name}
      </Dropdown.Item>
    );
  }

  return (
    <>
      <Dropdown onSelect={dropdownSelectHandle}>
        <Dropdown.Toggle id="route-select-dropdown">Select Route</Dropdown.Toggle>
        <Dropdown.Menu style={{zIndex: 1001}} as={filter}> 
          {dropdowns}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
