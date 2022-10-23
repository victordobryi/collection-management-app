import React, { useState, useEffect, useRef } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { ITag } from '../../models/ITag';
import Tag from '../Tag/Tag';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';
import TagService from '../../API/TagService';

interface ITagCreator {
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}

const TagCreator = ({ tags, setTags }: ITagCreator) => {
  const [value, setValue] = useState<string | Option>('');
  const [selected, setSelected] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const ref = useRef<Typeahead | null>();

  useEffect(() => {
    const fetchData = async () => {
      const tags = (await TagService.getTags()).data.data;
      console.log(tags);
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
          placeholder="Enter tag name"
          selected={selected}
          clearButton={true}
          onInputChange={(value) => setValue(value)}
          ref={ref}
        />
        <Button variant="outline-secondary" onClick={addTag}>
          Add tag
        </Button>
      </InputGroup>
      <ul className="mb-3 d-flex flex-wrap align-items-center">
        tags:{' '}
        {tags.map(({ name }, index) => (
          <Tag action={() => removeTag(name)} key={index} text={name} />
        ))}
      </ul>
    </>
  );
};

export default TagCreator;
