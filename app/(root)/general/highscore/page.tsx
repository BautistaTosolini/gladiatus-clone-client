'use client'

import LoadingPage from "@/components/shared/LoadingPage"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BASE_API_URL } from "@/constants"
import { CharacterInterface } from "@/interfaces/character.interface"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {
  const router = useRouter();
  const [highscore, setHighscore] = useState<CharacterInterface[] | null>(null);

  useEffect(() => {
    const fetchHighscore = async () => {
      await axios.get(`${BASE_API_URL}/api/characters/highscore`, { withCredentials: true })
        .then((response) => {
          const highscore = response.data;

          setHighscore(highscore);
        })
        .catch(() => {
          router.push('/general/overview')
        })
    }

    fetchHighscore();
  }, [router])

  if (!highscore) {
    return <LoadingPage />
  }

  return (
    

    <div className='w-full mt-16 px-8 flex flex-col gap-4'>
      <h1 className='text-xl font-bold border-b-[3px] border-brown2 text-center text-brown2'>
        Player Highscore
      </h1>
      <Table className='info-card'>
        <TableHeader className='border-[2px] border-brown bg-cream2'>
          <TableRow>
            <TableHead className='text-brown2 font-semibold'>Rank</TableHead>
            <TableHead className='text-brown2 font-semibold'>Name</TableHead>
            <TableHead className='text-brown2 font-semibold'>Level</TableHead>
            <TableHead className='text-brown2 font-semibold'>Honour</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {highscore.map((character, index) => (
          <TableRow
            key={character._id}
            className='border-none'
          >
            <TableCell className='py-2 text-brown2 font-medium'>{index + 1}</TableCell>
            <TableCell 
              className='py-2 text-red3 underline font-medium cursor-pointer'
              onClick={() => router.push(`/character/${character._id}`)}
            >
              {character.name}
            </TableCell>
            <TableCell className='py-2 text-brown2 font-medium'>{character.level}</TableCell>
            <TableCell className='py-2 text-brown2 font-medium'>{character.honour}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>
  )
}

export default Page