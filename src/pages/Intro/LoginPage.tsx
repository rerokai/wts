import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./intro.css"

export function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // логика входа
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Вход</h1>
        <p className="welcome-text">Добро пожаловать! Войдите в аккаунт</p>
        
        <form onSubmit={handleSubmit}>
          <div className="field">
            <Label htmlFor="username">Логин</Label>
            <Input id="username" type="text" placeholder="Enter your username" />
          </div>
          
          <div className="field">
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
                  
          <Button type="submit" className="login-btn">Войти в аккаунт</Button>
        </form>
        
        <p className="signup-link">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}