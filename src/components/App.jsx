import React, { useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactFilter from './ContactFilter';
import ContactList from './ContactList';
import { MainTitle } from './App.styled';
import { fetchContacts } from 'redux/operations';
import { useDispatch } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <section>
      <ContactForm />
      <div>
        <MainTitle>Contacts</MainTitle>
        <ContactFilter />
        <ContactList />
      </div>
    </section>
  );
}
export default App;
