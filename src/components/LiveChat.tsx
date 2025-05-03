
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const LiveChat: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isExpanded ? (
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-scale-in">
          <div className="bg-ather-darkGray text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-medium">Chat with Ather Support</h3>
              <p className="text-sm text-gray-300">We typically reply within a minute</p>
            </div>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-gray-300 hover:text-white"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 h-80 overflow-y-auto flex flex-col">
            <div className="bg-gray-100 p-3 rounded-lg self-start max-w-[80%] mb-3">
              <p className="text-sm">Hi there! 👋 How can I help you today?</p>
              <span className="text-xs text-gray-500 mt-1">Ather Support • Just now</span>
            </div>
            
            <div className="mt-auto">
              <div className="border rounded-lg p-3">
                <input 
                  type="text"
                  placeholder="Type your message here..."
                  className="w-full outline-none text-sm"
                />
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                Our support team is available 9 AM - 8 PM
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsExpanded(true)}
          className="bg-ather-green text-white rounded-full p-4 shadow-lg hover:bg-opacity-90 transition-all"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default LiveChat;
