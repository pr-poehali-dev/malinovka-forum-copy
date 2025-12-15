import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

interface User {
  id: number;
  name: string;
  role: UserRole;
  posts: number;
  reputation: number;
  online: boolean;
}

interface Topic {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastPost: string;
  isPinned?: boolean;
  isLocked?: boolean;
}

interface Category {
  id: number;
  name: string;
  description: string;
  topics: number;
  posts: number;
  icon: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [currentUser] = useState<User>({
    id: 1,
    name: 'Гость',
    role: 'guest',
    posts: 0,
    reputation: 0,
    online: true
  });

  const categories: Category[] = [
    {
      id: 1,
      name: 'Новости и объявления',
      description: 'Официальные новости проекта и важные объявления администрации',
      topics: 45,
      posts: 328,
      icon: 'Megaphone'
    },
    {
      id: 2,
      name: 'Правила сервера',
      description: 'Основные правила игры на сервере Малиновка РП',
      topics: 12,
      posts: 89,
      icon: 'Shield'
    },
    {
      id: 3,
      name: 'Игровые организации',
      description: 'Обсуждение государственных и нелегальных организаций',
      topics: 156,
      posts: 2847,
      icon: 'Users'
    },
    {
      id: 6,
      name: 'ОПГ Гопота',
      description: 'Форум нелегальной организации Гопота - набор, внутренние дела',
      topics: 34,
      posts: 567,
      icon: 'Skull'
    },
    {
      id: 7,
      name: 'ОПГ Скинхеды',
      description: 'Форум нелегальной организации Скинхеды - набор, внутренние дела',
      topics: 28,
      posts: 445,
      icon: 'Flame'
    },
    {
      id: 8,
      name: 'ОПГ Кавказцы',
      description: 'Форум нелегальной организации Кавказцы - набор, внутренние дела',
      topics: 41,
      posts: 678,
      icon: 'Users'
    },
    {
      id: 4,
      name: 'Заявки и жалобы',
      description: 'Подача заявок в администрацию и жалобы на игроков',
      topics: 234,
      posts: 891,
      icon: 'FileText'
    },
    {
      id: 5,
      name: 'Общение',
      description: 'Свободное общение участников сообщества',
      topics: 567,
      posts: 8934,
      icon: 'MessageSquare'
    }
  ];

  const recentTopics: Topic[] = [
    {
      id: 1,
      title: 'Обновление сервера - новые возможности для игроков',
      author: 'Администратор',
      category: 'Новости и объявления',
      replies: 45,
      views: 892,
      lastPost: '2 минуты назад',
      isPinned: true
    },
    {
      id: 2,
      title: 'Набор в ЛСПД - станьте частью правопорядка!',
      author: 'Шериф Джонсон',
      category: 'Игровые организации',
      replies: 23,
      views: 456,
      lastPost: '15 минут назад'
    },
    {
      id: 3,
      title: 'Изменения в правилах РП отыгровки',
      author: 'Модератор Алекс',
      category: 'Правила сервера',
      replies: 67,
      views: 1234,
      lastPost: '1 час назад',
      isPinned: true
    },
    {
      id: 4,
      title: 'Жалоба на игрока ID 4567',
      author: 'Игрок_Василий',
      category: 'Заявки и жалобы',
      replies: 8,
      views: 145,
      lastPost: '3 часа назад',
      isLocked: true
    },
    {
      id: 5,
      title: 'Лучшие моменты из игры - делимся скриншотами',
      author: 'Фотограф_Макс',
      category: 'Общение',
      replies: 134,
      views: 2456,
      lastPost: '10 минут назад'
    }
  ];

  const onlineUsers: User[] = [
    { id: 1, name: 'Администратор', role: 'admin', posts: 1456, reputation: 5000, online: true },
    { id: 2, name: 'Модератор Алекс', role: 'moderator', posts: 892, reputation: 3200, online: true },
    { id: 3, name: 'Шериф Джонсон', role: 'user', posts: 456, reputation: 1800, online: true },
    { id: 4, name: 'Игрок_Василий', role: 'user', posts: 234, reputation: 890, online: true },
    { id: 5, name: 'Фотограф_Макс', role: 'user', posts: 567, reputation: 1456, online: true }
  ];

  const getRoleBadge = (role: UserRole) => {
    const roleConfig = {
      admin: { label: 'Админ', variant: 'destructive' as const },
      moderator: { label: 'Модератор', variant: 'default' as const },
      user: { label: 'Игрок', variant: 'secondary' as const },
      guest: { label: 'Гость', variant: 'outline' as const }
    };
    return roleConfig[role];
  };

  const stats = {
    totalTopics: categories.reduce((acc, cat) => acc + cat.topics, 0),
    totalPosts: categories.reduce((acc, cat) => acc + cat.posts, 0),
    totalUsers: 1247,
    onlineNow: onlineUsers.length
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Home" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Форум Малиновка РП</h1>
                <p className="text-sm text-muted-foreground">Официальное игровое сообщество</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => navigate('/admin')}
              >
                <Icon name="Shield" size={16} className="mr-2" />
                Админ-панель
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Категории форума</h2>
                <Button variant="outline" size="sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Новая тема
                </Button>
              </div>
              
              <div className="space-y-4">
                {categories.map((category) => (
                  <Card 
                    key={category.id} 
                    className="p-5 bg-secondary border-border hover:bg-secondary/80 transition-all cursor-pointer group"
                    onClick={() => navigate(`/category/${category.id}`)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                        <Icon name={category.icon as any} size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Icon name="FileText" size={14} />
                            {category.topics} тем
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Icon name="MessageSquare" size={14} />
                            {category.posts} сообщений
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Последние темы</h2>
              <div className="space-y-3">
                {recentTopics.map((topic) => (
                  <Card 
                    key={topic.id}
                    className="p-4 bg-secondary border-border hover:bg-secondary/80 transition-all cursor-pointer group"
                    onClick={() => navigate(`/topic/${topic.id}`)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {topic.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {topic.isPinned && (
                            <Icon name="Pin" size={14} className="text-primary flex-shrink-0" />
                          )}
                          {topic.isLocked && (
                            <Icon name="Lock" size={14} className="text-muted-foreground flex-shrink-0" />
                          )}
                          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                            {topic.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>Автор: {topic.author}</span>
                          <Separator orientation="vertical" className="h-3" />
                          <span>{topic.category}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Icon name="MessageSquare" size={12} />
                            {topic.replies}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Icon name="Eye" size={12} />
                            {topic.views}
                          </span>
                          <span className="text-xs text-primary ml-auto">{topic.lastPost}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-5 bg-card border-border">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="User" size={18} className="text-primary" />
                <h3 className="text-lg font-bold text-foreground">Мой профиль</h3>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-14 h-14">
                  <AvatarFallback className="bg-primary/20 text-primary text-xl">
                    {currentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{currentUser.name}</p>
                  <Badge {...getRoleBadge(currentUser.role)} className="mt-1">
                    {getRoleBadge(currentUser.role).label}
                  </Badge>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Сообщений:</span>
                  <span className="font-semibold text-foreground">{currentUser.posts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Репутация:</span>
                  <span className="font-semibold text-foreground">{currentUser.reputation}</span>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-card border-border">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="BarChart3" size={18} className="text-primary" />
                <h3 className="text-lg font-bold text-foreground">Статистика</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Всего тем:</span>
                  <span className="font-semibold text-foreground">{stats.totalTopics}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Всего сообщений:</span>
                  <span className="font-semibold text-foreground">{stats.totalPosts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Пользователей:</span>
                  <span className="font-semibold text-foreground">{stats.totalUsers}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Онлайн сейчас:</span>
                  <span className="font-semibold text-primary">{stats.onlineNow}</span>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-card border-border">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Users" size={18} className="text-primary" />
                <h3 className="text-lg font-bold text-foreground">Онлайн</h3>
              </div>
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="bg-primary/20 text-primary text-sm">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                      <Badge {...getRoleBadge(user.role)} className="text-xs mt-0.5">
                        {getRoleBadge(user.role).label}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Форум Малиновка РП. Все права защищены.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                Правила
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                Поддержка
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                Контакты
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;