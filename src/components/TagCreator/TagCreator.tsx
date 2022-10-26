import React, { useState, useEffect, useRef } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';
import * as TypeaheadType from 'react-bootstrap-typeahead/types/core/Typeahead';
import { Tag } from '../../components';
import { TagService } from '../../API';
import { ITagCreator } from '../../models';

const TagCreator = ({ tags, setTags }: ITagCreator) => {
  const [value, setValue] = useState<string | Option>('');
  const [selected, setSelected] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const ref = useRef<TypeaheadType.default | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const tags = (await TagService.getTags()).data.data;
      tags.map(({ name }) => setOptions((option) => [...option, name]));
    };
    fetchData();
  }, []);

  const removeTag = (value: string) => {
    setTags((tags) => tags.filter(({ name }) => name !== value));
  };

  const addTag = () => {
    if (value) {
      setTags(
        Object.values(
          Object.fromEntries([...tags, { name: value }].map((n) => [n.name, n]))
        )
      );
    }
    ref.current?.clear();
  };

  return (
    <>
      <InputGroup className="mb-3">
        <Typeahead
          id="basic-example"
          onChange={(value) => {
            setSelected(value);
            setValue(value[0]);
          }}
          options={options}
          placeholder={t('Enter tag name')}
          selected={selected}
          clearButton={true}
          onInputChange={(value) => setValue(value)}
          ref={ref}
        />
        <Button variant="outline-secondary" onClick={addTag}>
          {t('Add tag')}
        </Button>
      </InputGroup>
      <ul className="mb-3 d-flex flex-wrap align-items-center">
        {t('tags')}:{' '}
        {tags.map(({ name }, index) => (
          <Tag action={() => removeTag(name)} key={index} text={name} />
        ))}
      </ul>
    </>
  );
};

export default TagCreator;
