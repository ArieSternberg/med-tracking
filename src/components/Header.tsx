'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-[#00856A]">
            Poppai.AI
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-[#00856A]">Features</Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-[#00856A]">How It Works</Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-[#00856A]">Testimonials</Link>
            <Link href="#faq" className="text-gray-700 hover:text-[#00856A]">FAQ</Link>
          </nav>
        </div>
      </div>
    </header>
  )
} 