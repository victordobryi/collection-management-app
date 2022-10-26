import React, { useEffect, useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import Flag from 'react-world-flags';
import { useTranslation } from 'react-i18next';
import './select-lang.scss';

const SelectLang = () => {
  const [countries] = useState([
    { code: 'gb', title: 'United Kingdom' },
    { code: 'pl', title: 'Poland' }
  ]);
  const [selectedCountry, setSelectedCountry] = useState<string>('gb');
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = localStorage.getItem('lang') as 'gb' | 'pl';
    if (currentLang) {
      toggleLanguage(currentLang);
    } else {
      localStorage.setItem('lang', 'gb');
      toggleLanguage('gb');
    }
  }, []);

  const toggleLanguage = (country: string) => {
    i18n.changeLanguage(country);
    setSelectedCountry(country);
    localStorage.setItem('lang', country);
  };

  return (
    <Form>
      <Dropdown
        className="select-lang"
        onSelect={(eventKey) => {
          const country = countries.find(({ code }) => eventKey === code);
          if (country) {
            toggleLanguage(country.code);
          }
        }}
      >
        <Dropdown.Toggle variant="secondary" className="d-flex">
          <Flag code={selectedCountry} width={40} height={30} />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown__menu">
          {countries.map(({ code }) => (
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
