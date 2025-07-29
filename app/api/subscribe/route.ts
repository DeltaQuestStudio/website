import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { email, source = "site", tags = [] } = await request.json()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("subscribers")
      .insert([
        {
          email,
          source,
          tags,
          verified: false,
        },
      ])
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        return NextResponse.json({ error: "Email already subscribed" }, { status: 409 })
      }
      throw error
    }

    // Send to MailerLite (optional)
    if (process.env.MAILERLITE_API_KEY) {
      try {
        await fetch("https://api.mailerlite.com/api/v2/subscribers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-MailerLite-ApiKey": process.env.MAILERLITE_API_KEY,
          },
          body: JSON.stringify({
            email,
            fields: {
              source,
              tags: tags.join(","),
            },
          }),
        })
      } catch (mailerLiteError) {
        console.error("MailerLite error:", mailerLiteError)
        // Don't fail the request if MailerLite fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed! Check your email to confirm.",
    })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
