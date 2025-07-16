import { useState } from 'react'
import { Keyboard } from '../UI/keyboard';
import { Button } from "../UI/Button"

// Componenta principala a calculatorului
const calculator = () => {
  
    const [displayValue, setDisplayValue] = useState('0'); // Starea pentru valoarea afisata pe ecran
    const [operation, setOperation] = useState(''); // Starea pentru operatia curenta (+, -, *, /)
    const [prevValue, setPrevValue] = useState(''); // Valoarea introdusa anterior (folosita la calcul)
    const [overwrite, setOverwrite] = useState(true);     // Starea pentru a determina daca afisarea trebuie suprascrisa sau concatenata cu urmatorul ditigit 
    // Functii pentru operatiile calculatorului
    const calculate = () => {
      if(!operation || !prevValue) return displayValue; // Daca nu exista operatie, returneaza valoarea curenta
      const current = parseFloat(displayValue);       // Converteste valoarea curenta la numar
      const previous = parseFloat(prevValue);   // Converteste valoarea anterioara la numar
      
      let result = 0;
      switch(operation) {
        case '+':
          result = previous + current;
          break;
        case '-':
          result = previous - current;
          break;
        case '*':
          result = previous * current;
          break;
        case '/':
          if(current === 0) {
            alert('Cannot divide by zero'); // Avertizeaza utilizatorul daca se incearca impartirea la zero
            return displayValue;
          }
          result = previous / current;
          break;
      
      } 
      return result.toString();   // Returneaza rezultatul ca string  
    };
    // Functie apelata cand utilizatorul apasa pe "="
    const equals = () => {
      const value = calculate();  // Calculeaza valoarea curenta folosind operatia si valoarea anterioara
      setDisplayValue(value);   // Actualizeaza valoarea afisata
      setPrevValue('');    // Reseteaza valoarea anterioara
      setOperation('');    // Reseteaza operatia curenta
      setOverwrite(true);   // Seteaza overwrite la true pentru a permite introducerea unui nou numar
    };

     // Functie apelata cand utilizatorul selecteaza o operatie (+, -, *, /)
    const selectOperation = (nextOperation: string) => { 
      if (prevValue && operation && !overwrite) {  // Daca exista deja o operatie si o valoare anterioara, calculeaza valoarea curenta
      const value = calculate();        
      setPrevValue(value);    // Actualizeaza valoarea anterioara cu rezultatul calculului
      setDisplayValue(value);  // Actualizeaza valoarea afisata cu rezultatul calculului
      } else {
      setPrevValue(displayValue);  // Daca nu exista o valoare anterioara, seteaza valoarea curenta ca valoare anterioara
      }
      setOperation(nextOperation); // Seteaza operatia curenta cu operatia selectata
      setOverwrite(true);  
    }
     // Functie care reseteaza complet calculatorul
    const clearDisplay = () => {
      setDisplayValue('0');
      setOperation('');
      setPrevValue('');
      setOverwrite(true);
    };
     // Functie care sterge ultima cifra sau reseteaza displayul
    const deleteLast = () => {
    setDisplayValue('0');
    setOverwrite(true);
    };
      const deleteDigit = () => {
     if(parseFloat(displayValue)<10 && parseFloat(displayValue)>-10)
        clearDisplay();
    else
    {
       const newval = displayValue.substring(0,displayValue.length-1);
       const updcurrent = parseFloat(newval); 
       setDisplayValue(updcurrent.toString());
    }
    };
     const FlipFlopSign = () => {
       const updcurrent = parseFloat(displayValue) * (-1); 
      setDisplayValue(updcurrent.toString());
    }
     // Functie care adauga o cifra la afisaj 
    const setDigit = (digit: string) => {
      if(displayValue[0] === '0' && digit === '0') return; //Previne utilizarea 0 daca deja exista un 0
      if(displayValue.includes('.') && digit === '.') return; //previne uatilizarea mai multor puncte
      if(overwrite && digit){
        setDisplayValue(digit); // Daca overwrite este true, inlocuieste valoarea afisata cu cifra curenta
      }else {
        setDisplayValue(`${displayValue}${digit}`); // Adauga cifra la afisaj
      }
       setOverwrite(false); // Cifrele urmatoare nu vor rescrie
    };
   
  
  return (
    <>
    

 <div className="absolute top-4 left-4">
 <Button onClick={() => window.location.href = '/'}>
  <h1 className="text-2xl font-bold mb-4 text-center">Inapoi</h1>
    </Button>
    </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000]">
        <div className='bg-[#400080]  rounded-lg shadow-lg h-[500px] w-[400px] p-6'>
          <div>
            <div className='bg-[#26004d] text-white rounded-lg p-4 mb-4 h-[100px] flex items-center justify-end text-right text-3xl'>
              <input className='allign-right w-full h-full bg-transparent outline-none text-right ' type="text" value={displayValue} readOnly />
            </div>
            <div className='bg-[#26004d] text-white rounded-lg p-4 h-[340px] flex items-center justify-center text-center text-xl'>
              <div className='grid grid-cols-4 gap-2 flex items-center justify-center h-full w-full '>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={FlipFlopSign}>+/-</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={deleteLast}>C</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={clearDisplay} >CE</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={deleteDigit} >←</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => setDigit('7')} >7</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => setDigit('8')} >8</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => setDigit('9')}>9</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => selectOperation('+')}>+</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => setDigit('4')}>4</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => setDigit('5')}>5</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => setDigit('6')}>6</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => selectOperation('-')}>-</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => setDigit('1')}>1</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => setDigit('2')}>2</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => setDigit('3')}>3</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => selectOperation('*')}>*</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => setDigit('.')} >.</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => setDigit('0')}>0</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={equals}>=</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => selectOperation('/')}>/</Keyboard>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default calculator