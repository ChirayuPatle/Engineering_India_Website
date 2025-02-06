import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';


function CardOragnaizer() {
  return (
    <>
    <Card className='card w-64 h-80'>
    <CardHeader>
    </CardHeader>
    <CardContent >
        <div className='h-52 w-full bg-blue-200 rounded'> </div>
        <div className='leading-[0.8] mt-3'>
        <p className='text-[14px] opacity-80'>Database head</p>
        <h1 className='text-lg'>Aman ghuse</h1>
        </div>
    </CardContent>
  </Card>
    </>
  
  )
}

export default CardOragnaizer