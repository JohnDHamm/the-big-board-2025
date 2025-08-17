'use client'

import { useRouter } from 'next/navigation'
// import { socket } from "@/app/sockets/socket";
import { Test } from '@/app/(models)/Test';

const TestButton = ({
  text,
}: {
  text: string;
}) => {
  const router = useRouter()

  const mockPost = async() => {
    const contentType = "application/json";
    const mockBody = {
      message: "test message 2",
      date: new Date(),
    };

    try {
      const res = await fetch(`/api/Tests`, {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(mockBody),
      })
      if (!res.ok) {
        throw new Error("WRONG! status:" + res.status)
      }
      console.log("test post success");
      // return res.json();
      router.push('/bigboard/selections')
    } catch (error) {
      console.log('Failed to post test message', error);
    }
  }

  return <button type="button" onClick={mockPost} className="border-amber-300 border-2 p-1">{text}</button>
}

export default TestButton;
