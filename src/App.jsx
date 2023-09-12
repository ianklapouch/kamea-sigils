import { useState } from 'react';
import Saturn from './components/Saturn';


const letterToNumber = {
  'a': '1',
  'b': '2',
  'c': '3',
  'd': '4',
  'e': '5',
  'f': '6',
  'g': '7',
  'h': '8',
  'i': '9',
  'j': '1',
  'k': '2',
  'l': '3',
  'm': '4',
  'n': '5',
  'o': '6',
  'p': '7',
  'q': '8',
  'r': '9',
  's': '1',
  't': '2',
  'u': '3',
  'v': '4',
  'w': '5',
  'x': '6',
  'y': '7',
  'z': '8',
}

function App() {

  const [numbers, setNumber] = useState('')

  function convertToNumbers(intent) {
    intent = intent.replaceAll(' ', '').toLowerCase()

    let result = ''
    for (let i = 0; i < intent.length; i++) {
      result += letterToNumber[intent[i]]
    }

    return result
  }

  function handleSubmit(event) {
    event.preventDefault()

    const form = new FormData(event.target)
    const intent = form.get('intent')


  }

  function handleKeyDown(event) {
    if (!/^[a-zA-Z\s]+$/.test(event.key)) {
      event.preventDefault()
    }
  }

  function handleChange(event) {
    setNumber(convertToNumbers(event.target.value))
  }

  return (
    <main className="h-screen flex place-content-center items-center flex-col gap-4 bg-gray-600 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        autoComplete="off"
      >
        <input
          type="text"
          name="intent"
          placeholder="Your intent here..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Saturn numbers={numbers} />
        <button type="submit">OK</button>
      </form>
    </main>
  )
}

export default App
