import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {


    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        const currentUrl = request.nextUrl.pathname; 

        return NextResponse.redirect(new URL('/signup', request.url))
    }



}
 
 
export const config = {
  matcher: ['/my-ideas',
    '/add-idea',
    '/my-interactions',
    '/profile','/ideas/:path'],
}