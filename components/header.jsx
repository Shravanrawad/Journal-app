import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { FolderOpen, PenBox } from 'lucide-react'
import Usermenu from './usermenu'
import { checkUser } from '@/lib/checkUser'

async function Header() {

  await checkUser();  

  return (
    <header className='shadow-md'>
        <nav className='py-5 px-6 flex justify-between items-center'>

        <Link href="/" className="flex items-center">
         <Image
           className="h-10 w-auto object-contain"
           src="/favicon.ico"
           alt="memly"
           width={200}
           height={60}
         />
         <h2 className="font-bold text-2xl hidden md:flex">emly</h2>
        </Link>

            <div className='flex items-center gap-4'>

              <SignedIn>
              <Link href={'/dashboard#collections'}>
                      <Button variant='outline' className='flex items-center gap-2'>
                      <FolderOpen size={18}/>
                      <span className='hidden md:inline'>Collections</span>
                      </Button>
                </Link>
              </SignedIn>

                <Link href={'/journal/write'}>
                      <Button variant='journal' className='flex items-center gap-2'>
                      <PenBox size={18}/>
                      <span className='hidden md:inline'>Write Now</span>
                      </Button>
                </Link>

                <SignedOut>
                  <SignInButton forceRedirectUrl='/dashboard'>
                  <Button variant='outline'>
                    Login
                  </Button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <Usermenu/>
                </SignedIn>

            </div>
            
        </nav>
    </header>
  )
}

export default Header