import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    
    // Understanding the name of the path that is sending request. 
    const path = request.nextUrl.pathname

    // These are the public pathes of the app
    const isPublicPath = path === "/login" || path === "/signup"
     
    /* Then we assign the value of token to the variable called "token", 
    Note that this value might exist or not exist, and "?" exactly states 
    that this value may not exist (opposite of "!").*/
    const token = request.cookies.get("token")?.value || ""

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/home', request.nextUrl))
    } 
    
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
 
export const config = {
  matcher: [
    // Match all paths EXCEPT:
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}