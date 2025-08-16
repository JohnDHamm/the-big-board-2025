'use client'

import { useRouter } from 'next/navigation'
import { socket } from "@/app/sockets/socket";

const MockLoginButton = ({
  text,
}: {
  text: string;
}) => {
  const router = useRouter()

  const mockLogin = () => {
    socket.emit('JoinRoom', "mock league id");
    socket.emit('Hello', "mock league id");
    router.push('/bigboard')
  }

  return <button type="button" onClick={mockLogin} className="border-amber-300 border-2 p-1">{text}</button>
}

export default MockLoginButton;
