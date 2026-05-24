import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./intro.css"

export function RegisterPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // логика регистрации
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Регистрация</h1>
        <p className="subtitle">Создайте аккаунт чтобы начать</p>
        
        <form onSubmit={handleSubmit}>
          <div className="field">
            <Label htmlFor="username">Имя пользователя</Label>
            <Input id="username" type="text" placeholder="Choose a username" />
          </div>
          
          <div className="field">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          
          <div className="field">
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type="password" placeholder="Create a password" />
          </div>
          
          
          <Button type="submit" className="register-btn">Зарегистрироваться</Button>
        </form>
        
        <p className="login-link">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}