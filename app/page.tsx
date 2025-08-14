'use client';

import { useState } from "react";
import { socket } from "./sockets/socket";
import { useRouter } from 'next/navigation'
import Logo from "./ui/bigboard/Logo";

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState<string>('');
  
  const mockLogin = () => {
    socket.emit('JoinRoom', "mock league id");
    socket.emit('Hello', name, "mock league id");
    router.push('/bigboard')
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="w-2xs">
          <Logo />
        </div>
        <p>choose league first</p>
        <input
          type='text'
          value={name}
          placeholder='name'
          onChange={(e) => setName(e.target.value)}
          />
        <button type="button" onClick={mockLogin}>mock login</button>
      </main>
    </div>
  );
}
