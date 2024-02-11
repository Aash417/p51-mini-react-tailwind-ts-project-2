import { useCallback, useEffect, useState, useRef } from 'react';

function App() {
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowec] = useState(false);
	const [charAllowed, setCharAllowec] = useState(false);
	const [password, setPassword] = useState('');

	const passwordRef = useRef(null);

	const passwordGenerator = useCallback(():void => {
		let pass: string = '';
		let str: string =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

		if (numberAllowed) str += '0123456789';
		if (charAllowed) str += '!@#$%^&*()_+<>?|:{},.;[]';

		for (let i = 1; i < length; i++) {
			const char: number = Math.floor(Math.random() * str.length + 1);
			pass += str.charAt(char);
		}
		setPassword(pass);
	}, [length, numberAllowed, charAllowed, setPassword]);

	const copyPasswordToClickBoard = useCallback(
    (): void => {
      // console.log(passwordRef)
      passwordRef.current.select()
      window.navigator.clipboard.writeText(password)
    },
		[password]
  );
  
  useEffect(
		():void => passwordGenerator(),
		[length, numberAllowed, charAllowed, passwordGenerator]
	);

	return (
		<div className='w-full max-w-md mx-auto rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700 shadow-md'>
			<h1 className='text-white text-center my-2'>Password Generator</h1>
			<div className='flex shadow rounded-lg overflow-hidden mb-4'>
				<input
					type='text'
					value={password}
					className='outline-none w-full py-1 px-3'
					placeholder='Password'
					readOnly
					ref={passwordRef}
				/>

				<button
					onClick={copyPasswordToClickBoard}
					className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
				>
					copy
				</button>
			</div>
			<div className='flex text-sm gap-x-3'>
				<div className='flex items-center gap-x-1'>
					<input
						type='range'
						min={8}
						max={16}
						value={length}
						id='lengthInput'
						className='cursor-pointer'
						onChange={(e) => setLength(Number(e.target.value))}
					/>
					<label htmlFor='lenghtInput'>Length: {length}</label>
				</div>
				<div className='flex items-center gap-x-1'>
					<input
						type='checkbox'
						defaultChecked={numberAllowed}
						id='numberInput'
						onChange={() =>
							setNumberAllowec((numberAllowed) => !numberAllowed)
						}
					/>
					<label htmlFor='numberInput'>Use number</label>
				</div>
				<div className='flex items-center gap-x-1'>
					<input
						type='checkbox'
						defaultChecked={charAllowed}
						id='charInput'
						onChange={() =>
							setCharAllowec((charAllowed) => !charAllowed)
						}
					/>
					<label htmlFor='charInput'>Use Symbols</label>
				</div>
			</div>
		</div>
	);
}

export default App;
