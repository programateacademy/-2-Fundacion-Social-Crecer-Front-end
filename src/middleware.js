import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  /* return NextResponse.redirect(new URL('/about-2', request.url)) */
  const jwt = req.cookies.get("token")?.value
  if (req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/certification")) {
    if(!jwt){
      return NextResponse.redirect(new URL('/', req.nextUrl.origin))
    }
    
    try {
      const verifyTk = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET))
      const reqHeaders = new Headers(req.headers)
      reqHeaders.set("x-data", JSON.stringify(verifyTk.payload))
      return NextResponse.next({
        request: {
          headers: reqHeaders
        }
      })
    } catch (error) {
      console.log(`Error: ${error}`)      
      return NextResponse.redirect(new URL('/', req.nextUrl.origin))
    }
  }
  if (req.nextUrl.pathname.startsWith("/reset")){
    const jwt = req.nextUrl.pathname.split("/").at(-1)
    if(!jwt){
      return NextResponse.redirect(new URL('/', req.nextUrl.origin))
    }

    try {
      const verifyTk = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET))
      return NextResponse.next()
    } catch (error) {
      console.log(`Error: ${error}`)      
      return NextResponse.redirect(new URL('/', req.nextUrl.origin))
    }
  }
  if (req.nextUrl.pathname === "/") {
  
    if(jwt){
      try {
        const verifyTk = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET))
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin))
      } catch (error) {
        return NextResponse.next()
      }      
    }
    return NextResponse.next()
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}