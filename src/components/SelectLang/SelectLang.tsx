import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import Flag from 'react-world-flags';
import './select-lang.scss';

const SelectLang = () => {
  const [countries] = useState([
    { code: 'gb', title: 'United Kingdom' },
    { code: 'pl', title: 'Poland' }
  ]);

  const [selectedCountry, setSelectedCountry] = useState<string>('gb');

  return (
    <Form>
      <Dropdown
        onSelect={(eventKey) => {
          const country = countries.find(({ code }) => eventKey === code);
          setSelectedCountry(country!.code);
        }}
      >
        <Dropdown.Toggle variant="secondary" className="d-flex">
          <Flag code={selectedCountry} width={40} height={30} />
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ minWidth: '75px' }}>
          {countries.map(({ code, title }) => (
            <Dropdown.Item
              key={code}
              eventKey={code}
              active={code === selectedCountry}
            >
              <Flag code={code} width={40} height={30} />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Form>
  );
};

export default SelectLang;
