import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Vymazání httpOnly cookie s Firebase auth tokenem
    const response = NextResponse.json({ success: true })
    
    response.cookies.set('firebase-auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Okamžité vypršení
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Error clearing auth token:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}