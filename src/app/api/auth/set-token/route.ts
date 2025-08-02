import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()

    if (!idToken || typeof idToken !== 'string') {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 400 }
      )
    }

    // Nastavení httpOnly cookie s Firebase auth tokenem
    const response = NextResponse.json({ success: true })
    
    response.cookies.set('firebase-auth-token', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dní
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Error setting auth token:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}