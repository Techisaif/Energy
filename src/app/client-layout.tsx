'use client'

import { Inter } from "next/font/google";
import dynamic from 'next/dynamic';

const ChatBot = dynamic(() => import('@/components/ChatBot'), { ssr: false })

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} antialiased bg-black text-white min-h-screen`}>
        <main>{children}</main>
        
        <footer className="energy-footer bg-black/80 backdrop-blur-lg border-t border-blue-900/30 pt-16 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="footer-section">
                <h4 className="text-xl font-bold mb-4 text-blue-400">Energy Pathways</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="hover:text-blue-400 transition-colors">Technology Roadmaps</li>
                  <li className="hover:text-blue-400 transition-colors">Research Partnerships</li>
                  <li className="hover:text-blue-400 transition-colors">Policy Frameworks</li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4 className="text-xl font-bold mb-4 text-blue-400">Data Streams</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="hover:text-blue-400 transition-colors">Live API Access</li>
                  <li className="hover:text-blue-400 transition-colors">Forecast Models</li>
                  <li className="hover:text-blue-400 transition-colors">Simulation Tools</li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4 className="text-xl font-bold mb-4 text-blue-400">Contact</h4>
                <p className="text-gray-300 mb-2">saif@energyhub.com</p>
                <p className="text-gray-300 mb-4">+353 123456789</p>
                <div className="social-icons flex space-x-4">
                  <a href="https://github.com/Techisaif/Energy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            
            <div className="copyright text-center border-t border-blue-900/30 pt-8">
              <p className="text-gray-400 mb-2">© 2025 Energy Visualization Platform | Open Source Project</p>
              <p className="text-gray-500 text-sm">Built with Next.js, Three.js, and TensorFlow.js</p>
            </div>
          </div>
        </footer>

        <ChatBot />
    </div>
  );
}
