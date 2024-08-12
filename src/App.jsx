import { Component, useEffect, useRef, useState } from 'react'
import './App.css'
import NoteList from './components/NoteList';
import NoteItem from './components/NoteItem';


function App() {
  // Начальный стейт для нотаток с чтением из localStorage
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Стейт для данных пользователя
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);

  const addNote = () => {
    setNotes([...notes, inputRef.current.value]);
    inputRef.current.value = ''; 
  };
  
  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  // useEffect для синхронизации нотаток с localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // useEffect для загрузки данных пользователя
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Помилка завантаження данних');
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  function getList() {
    if (notes.length === 0) {
      return <div>Нотаток немає</div>;
    }
    return (
      <NoteList>
        {notes.map((note, index) => (
          <NoteItem key={index} note={note} index={index} onDelete={deleteNote} />
        ))}
      </NoteList>
    );
  }

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Поитлка: {error}</div>
      ) : (
        <div>Привіт, {userData.name}!</div>
      )}
      <input 
        type="text" 
        ref={inputRef}
        placeholder="Ваш запис" 
      />
      <button onClick={addNote}>Додати запис</button>
      {getList()}
    </div>
  );
}

export default App;