// app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  recaptchaToken: string;
}

// reCAPTCHA verification function
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number }> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();

    return {
      success: data.success && data.score > 0.5,
      score: data.score,
    };
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return { success: false };
  }
}

// Basic spam detection
function isSpamContent(text: string): boolean {
  const spamKeywords = [
    'viagra', 'casino', 'lottery', 'winner', 'prize',
    'promotion', 'advertisement', 'SEO', 'marketing',
    'free money', 'click here', 'limited time'
  ];

  const lowerText = text.toLowerCase();
  return spamKeywords.some(keyword => lowerText.includes(keyword));
}

import nodemailer from 'nodemailer';

// Gmail SMTP settings
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.EMAIL_PASSWORD, // Gmail App Password
    },
  });
};

// Email sending function
async function sendEmail(data: ContactFormData): Promise<void> {
  console.log('Sending email with data:', {
    name: data.name,
    email: data.email,
    message: data.message.substring(0, 50) + '...'
  });

  const transporter = createTransporter();

  const adminMailOptions = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    replyTo: data.email,
    subject: `New Message from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">
          You have received a new inquiry
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</p>
          <p style="margin: 10px 0;"><strong>Sent At:</strong> ${new Date().toLocaleString('en-US')}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 10px; background-color: #e3f2fd; border-radius: 4px;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            This is an automated email. To respond, please contact ${data.email} directly.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
}

// Simple rate limiting
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 5;

  const clientData = rateLimitMap.get(ip);

  if (!clientData) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
    return true;
  }

  if (now - clientData.lastRequest > windowMs) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
    return true;
  }

  if (clientData.count >= maxRequests) {
    return false;
  }

  clientData.count++;
  clientData.lastRequest = now;
  return true;
}

// CORS support
function setCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

// OPTIONS method (CORS preflight)
export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 200 });
  return setCorsHeaders(response);
}

// POST method
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, recaptchaToken }: ContactFormData = body;

    // Basic validation
    if (!name || !email || !message || !recaptchaToken) {
      const response = NextResponse.json(
        { message: 'Please fill out all required fields.' },
        { status: 400 }
      );
      return setCorsHeaders(response);
    }

    // Length validation
    if (name.length > 100 || email.length > 255 || message.length > 2000) {
      const response = NextResponse.json(
        { message: 'Your input is too long.' },
        { status: 400 }
      );
      return setCorsHeaders(response);
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const response = NextResponse.json(
        { message: 'Please enter a valid email address.' },
        { status: 400 }
      );
      return setCorsHeaders(response);
    }

    // Get client IP
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const clientIpString = clientIp.split(',')[0].trim();

    // Rate limiting check
    if (!checkRateLimit(clientIpString)) {
      const response = NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
      return setCorsHeaders(response);
    }

    // reCAPTCHA verification
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      console.log('reCAPTCHA failed:', { score: recaptchaResult.score, ip: clientIpString });
      const response = NextResponse.json(
        { message: 'Security check failed. Please reload the page and try again.' },
        { status: 400 }
      );
      return setCorsHeaders(response);
    }

    // Spam filtering
    if (isSpamContent(name) || isSpamContent(message)) {
      console.log('Spam detected:', { name, email, ip: clientIpString });
      const response = NextResponse.json(
        { message: 'Your message contains inappropriate content.' },
        { status: 400 }
      );
      return setCorsHeaders(response);
    }

    // Send email
    await sendEmail({ name, email, message, recaptchaToken });

    const response = NextResponse.json({
      message: 'Thank you for your inquiry. Your message has been received.',
      success: true,
    });
    return setCorsHeaders(response);

  } catch (error) {
    console.error('Contact form error:', error);
    const response = NextResponse.json(
      { message: 'A server error occurred. Please try again later.' },
      { status: 500 }
    );
    return setCorsHeaders(response);
  }
}
