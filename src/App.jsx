import { useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [passwordRequest, setPasswordRequest] = useState({
    length: 12,
    lowercase:true,
    uppercase:true,
    numbers:true,
    specialChars:true
  })

  const generatePassword = async () => {
    try{
      const response = await fetch('http://localhost:8080/api/password/generate', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(passwordRequest),
      });

      if(response.ok){
        const generatePassword = await response.text();
        setPassword(generatePassword);
      }
      else{
        console.error('Failed to generate password');
      }
    }
    catch(error){
      console.error('Error fetching data: ', error);
    }
  }

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <label>Password Length:</label>
        <input
          type="number"
          value={passwordRequest.length}
          onChange={(e) => setPasswordRequest({ ...passwordRequest, length: Math.max(1, parseInt(e.target.value)) })}
        />
      </div>
      <div>
        <label>Include Uppercase:</label>
        <input
          type="checkbox"
          checked={passwordRequest.uppercase}
          onChange={() => setPasswordRequest({ ...passwordRequest, uppercase: !passwordRequest.uppercase })}
        />
      </div>
      <div>
        <label>Include Lowercase:</label>
        <input
          type="checkbox"
          checked={passwordRequest.lowercase}
          onChange={() => setPasswordRequest({ ...passwordRequest, lowercase: !passwordRequest.lowercase })}
        />
      </div>
      <div>
        <label>Include Numbers:</label>
        <input
          type="checkbox"
          checked={passwordRequest.numbers}
          onChange={() => setPasswordRequest({ ...passwordRequest, numbers: !passwordRequest.numbers })}
        />
      </div>
      <div>
        <label>Include Special Characters:</label>
        <input
          type="checkbox"
          checked={passwordRequest.specialChars}
          onChange={() => setPasswordRequest({ ...passwordRequest, specialChars: !passwordRequest.specialChars })}
        />
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      {password && (
        <div>
          <h2>Generated Password:</h2>
          <div>{password}</div>
          <button onClick={() => navigator.clipboard.writeText(password)}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
}

export default App
