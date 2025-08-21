'use client'

import { useContext } from 'react';
import { useRouter } from 'next/navigation'
import { socket } from "@/app/sockets/socket";

import { UserContext } from '@/app/contexts';
import { MOCK_USER } from '@/app/mock_data';

const MockLoginButton = ({
  text,
}: {
  text: string;
}) => {
  const router = useRouter()
  const { setCurrentUser } = useContext(UserContext);

  const mockLogin = () => {
    setCurrentUser(MOCK_USER);
    socket.emit('JoinRoom', "mock league id");
    socket.emit('Hello', "mock league id");
    router.push('/bigboard')
  }

  return <button type="button" onClick={mockLogin} className="border-amber-300 border-2 p-1">{text}</button>
}

export default MockLoginButton;
