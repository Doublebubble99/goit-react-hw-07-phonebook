import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactItem from 'components/ContactItem';
import { List, Button } from './ContactList.styled';
import { contacts, filters } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
function ContactList() {
  const { items } = useSelector(contacts);
  const filtersState = useSelector(filters);
  const dispatch = useDispatch();
  const filterNormalize = filtersState.toLowerCase();
  const existingName = items.filter(({ name }) => {
    return name.toLowerCase().includes(filterNormalize.trim());
  });
  return (
    <List>
      {existingName.map(({ name, id, number }) => (
        <ContactItem name={name} key={id} number={number} id={id}>
          <Button
            type="button"
            onClick={() => dispatch(deleteContact(id))}
            id={id}
          >
            Delete
          </Button>
        </ContactItem>
      ))}
    </List>
  );
}
export default ContactList;
