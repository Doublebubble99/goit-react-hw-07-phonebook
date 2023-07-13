import React from 'react';
import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { contacts } from 'redux/selectors';
import { addContact } from 'redux/operations';
import {
  Container,
  Title,
  Form,
  Label,
  Input,
  Button,
  Wrapper,
} from './ContactForm.styled';
function ContactForm() {
  const { items } = useSelector(contacts);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const onInput = evt => {
    const target = evt.target;
    if (target.name === 'name') {
      setName(target.value);
    } else if (target.name === 'number') {
      setNumber(target.value);
    }
  };
  const onSubmit = evt => {
    evt.preventDefault();
    const existingName = items.find(contact => contact.name === name);
    if (existingName) {
      alert(`You already have ${name} in contacts!`);
      return;
    }
    const id = nanoid();
    dispatch(addContact({ number, name, id }));
    setName('');
    setNumber('');
  };
  return (
    <Container>
      <Title>Phonebook</Title>
      <Form autoComplete="off" onSubmit={onSubmit}>
        <Wrapper>
          <Label htmlFor="Name">Name</Label>
          <Input
            value={name}
            id="Name"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onInput}
          />
        </Wrapper>
        <Wrapper>
          <Label htmlFor="Number">Number</Label>
          <Input
            value={number}
            id="Number"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onInput}
          />
        </Wrapper>
        <Button type="submit">Add contact</Button>
      </Form>
    </Container>
  );
}
export default ContactForm;
