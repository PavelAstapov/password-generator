'use client'

import { ChangeEvent, useEffect, useState } from "react";
import { randomPassword } from "@/helpers/generate-password";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [password, setPassword] = useState<string>();
  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [passwordType, setPasswordType] = useState<'Random' | 'Memorable' | 'Pin'>('Random');
  const [withNumbers, setWithNumbers] = useState<boolean>(true);
  const [withSymbols, setWithSymbols] = useState<boolean>(true);


  useEffect(() => {
    setPassword(randomPassword(passwordLength, withSymbols, withNumbers, passwordType))
  }, [passwordLength, withSymbols, withNumbers, passwordType])

  const regeneratePassword = () => {
    setPassword(randomPassword(passwordLength, withSymbols, withNumbers, passwordType))
  }

  const noSymbols = (e: ChangeEvent<HTMLInputElement>) => {
    setWithSymbols(e.target.checked);
  }

  const noNumbers = (e: ChangeEvent<HTMLInputElement>) => {
    setWithNumbers(e.target.checked);
  }

  const copyText = () => {
    navigator.clipboard.writeText(password!);
    toast.success("Password copied!");
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center sm:p-24 p-0 w-[95%] m-auto max-w-[1000px] gap-8">
      <div className="flex sm:flex-row flex-col sm:items-end items-center gap-5">
        <div>
          {passwordType === "Random" && (
            <div className={`${(passwordLength <= 10 || !withNumbers || !withSymbols) ? "badge-warning": "badge-accent" } badge mb-2 min-w-[132px]`}>{`${(passwordLength <= 10 || !withNumbers || !withSymbols) ? "Week password" : "Strong password"}`}</div>
          )}
          <input onClick={copyText} readOnly type="text" defaultValue={password} className="input input-bordered w-full" />
        </div>
        <button className="btn btn-primary" onClick={copyText}>Copy Password</button>
      </div>
      <div className="w-full bg-gray-300 p-5 rounded-md max-w-[600px]">
        <select onChange={(e) => setPasswordType(e.target.value as "Random" | "Memorable" | "Pin")} className="select select-bordered w-full max-w-xs block mb-4 mx-auto" defaultValue="Random">
          <option value="Random">Random</option>
          <option value="Memorable">Memorable</option>
          <option value="Pin">Pin</option>
        </select>
        {passwordType === "Random" && (
          <div className="flex sm:flex-row flex-col items-center gap-4 justify-center">
            <span className="label-text mr-2">Length:</span>
            <input type="range" min={8} max={20} defaultValue={10} onChange={(e) => setPasswordLength(+e.target.value)} className="range range-accent w-full max-w-52" />
            <label className="label cursor-pointer">
              <input type="checkbox" onChange={(e) => noNumbers(e)} name="numbers" defaultChecked  className="checkbox" />
              <span className="label-text ml-2 inline-block">Numbers</span>
            </label>
            <label className="label cursor-pointer">
              <input type="checkbox" onChange={(e) => noSymbols(e)} name="symbol" defaultChecked className="checkbox" />
              <span className="label-text ml-2 inline-block">Symbols</span>
            </label>
          </div>
        )}
        <button className="btn btn-accent mt-4 mx-auto block" onClick={regeneratePassword}>Regenerate</button>
      </div>
      <ToastContainer />
    </main>
  );
}
