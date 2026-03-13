import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const body = await req.json();
        const { name, email, phone, message, source } = body;

        // Check for required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Save lead to Supabase
        const { error: dbError } = await supabase.from('leads').insert({
            name,
            email,
            phone: phone || null,
            message,
            source: source || 'Contact Form',
        });

        if (dbError) {
            console.error('Error saving lead to database:', dbError);
        }

        // Send email notification
        const data = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: ['hola@livv.systems'],
            subject: `New Contact Form Submission from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}

        Message:
        ${message}
      `,
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
