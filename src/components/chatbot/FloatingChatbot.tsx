
// src/components/chatbot/FloatingChatbot.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, X, Loader2, Bot } from 'lucide-react';
import { handleChatMessage } from '@/app/actions/chatbot';
import type { ChatMessage } from '@/ai/flows/chatbot-flow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface DisplayMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([
    { 
      id: Date.now().toString(), 
      sender: 'ai', 
      text: "Hello! I'm Knowledge Bot. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if(scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const mapDisplayMessagesToChatMessages = (displayMessages: DisplayMessage[]): ChatMessage[] => {
    return displayMessages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessageText = inputValue.trim();
    const newUserMessage: DisplayMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userMessageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Prepare history - messages variable here refers to state before this update
    const historyForAI = mapDisplayMessagesToChatMessages(messages);

    try {
      const result = await handleChatMessage(userMessageText, historyForAI);
      if (result.aiResponse) {
        setMessages(prev => [...prev, { 
          id: Date.now().toString() + '-ai', 
          sender: 'ai', 
          text: result.aiResponse,
          timestamp: new Date() 
        }]);
      } else if (result.error) {
        console.error("Chatbot error:", result.error);
        setMessages(prev => [...prev, { 
          id: Date.now().toString() + '-error', 
          sender: 'ai', 
          text: `⚠️ Error: ${result.error || 'An unknown error occurred.'}`,
          timestamp: new Date()
        }]);
         toast({
          title: "Chatbot Error",
          description: result.error || 'An unknown error occurred.',
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Failed to send message:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString() + '-fail', 
        sender: 'ai', 
        text: "⚠️ Connection Error: Sorry, I couldn't connect to the chatbot.",
        timestamp: new Date()
      }]);
      toast({
        title: "Connection Error",
        description: "Failed to connect to the chatbot.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
       if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50"
          size="icon"
          aria-label="Open chatbot"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 sm:w-96 h-[calc(100vh-6rem)] max-h-[600px] z-50 flex flex-col shadow-2xl rounded-xl border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg font-semibold text-primary">Knowledge Bot</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
              <X className="h-5 w-5 text-muted-foreground" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow p-0 overflow-hidden">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
                        msg.sender === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-none' 
                        : 'bg-muted text-muted-foreground rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                       <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                     <div className="max-w-[75%] p-3 rounded-lg shadow-sm bg-muted text-muted-foreground rounded-bl-none flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
                disabled={isLoading}
                autoComplete="off"
              />
              <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()} aria-label="Send message">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
