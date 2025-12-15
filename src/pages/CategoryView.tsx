import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Topic {
  id: number;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastPost: string;
  isPinned?: boolean;
  isLocked?: boolean;
}

const CategoryView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = [
    { id: 1, name: 'Новости и объявления', icon: 'Megaphone' },
    { id: 2, name: 'Правила сервера', icon: 'Shield' },
    { id: 3, name: 'Игровые организации', icon: 'Users' },
    { id: 4, name: 'Заявки и жалобы', icon: 'FileText' },
    { id: 5, name: 'Общение', icon: 'MessageSquare' }
  ];

  const currentCategory = categories.find(c => c.id === Number(id)) || categories[0];

  const topics: Topic[] = [
    {
      id: 1,
      title: 'Обновление сервера - новые возможности для игроков',
      author: 'Администратор',
      replies: 45,
      views: 892,
      lastPost: '2 минуты назад',
      isPinned: true
    },
    {
      id: 2,
      title: 'Важные изменения в системе администрирования',
      author: 'Главный Админ',
      replies: 23,
      views: 567,
      lastPost: '30 минут назад',
      isPinned: true
    },
    {
      id: 3,
      title: 'Конкурс на лучший скриншот месяца',
      author: 'Модератор Алекс',
      replies: 89,
      views: 1234,
      lastPost: '1 час назад'
    },
    {
      id: 4,
      title: 'Обсуждение предстоящих событий на сервере',
      author: 'Организатор_Иван',
      replies: 67,
      views: 890,
      lastPost: '2 часа назад'
    },
    {
      id: 5,
      title: 'Предложения по улучшению игрового процесса',
      author: 'Игрок_Максим',
      replies: 134,
      views: 2456,
      lastPost: '3 часа назад'
    },
    {
      id: 6,
      title: 'История сервера - как все начиналось',
      author: 'Ветеран_Сергей',
      replies: 45,
      views: 678,
      lastPost: '5 часов назад',
      isLocked: true
    },
    {
      id: 7,
      title: 'Технические проблемы и их решения',
      author: 'Техподдержка',
      replies: 98,
      views: 1567,
      lastPost: '6 часов назад'
    },
    {
      id: 8,
      title: 'Вопросы новичков - задавайте здесь',
      author: 'Модератор Олег',
      replies: 234,
      views: 3456,
      lastPost: '10 часов назад'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-primary"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад к форуму
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Home" size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Форум Малиновка РП</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span 
              className="hover:text-primary cursor-pointer transition-colors"
              onClick={() => navigate('/')}
            >
              Главная
            </span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground">{currentCategory.name}</span>
          </div>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                <Icon name={currentCategory.icon as any} size={32} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{currentCategory.name}</h1>
                <p className="text-muted-foreground mt-1">
                  {topics.length} тем в этой категории
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Темы обсуждений</h2>
          <Button className="bg-primary hover:bg-primary/90">
            <Icon name="Plus" size={16} className="mr-2" />
            Создать тему
          </Button>
        </div>

        <div className="space-y-3">
          {topics.map((topic) => (
            <Card 
              key={topic.id}
              className="p-5 bg-card border-border hover:bg-card/80 transition-all cursor-pointer group"
              onClick={() => navigate(`/topic/${topic.id}`)}
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarFallback className="bg-primary/20 text-primary text-lg">
                    {topic.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {topic.isPinned && (
                      <Icon name="Pin" size={16} className="text-primary flex-shrink-0" />
                    )}
                    {topic.isLocked && (
                      <Icon name="Lock" size={16} className="text-muted-foreground flex-shrink-0" />
                    )}
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {topic.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Icon name="User" size={14} />
                      {topic.author}
                    </span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="flex items-center gap-1">
                      <Icon name="MessageSquare" size={14} />
                      {topic.replies} ответов
                    </span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" size={14} />
                      {topic.views} просмотров
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      Последний ответ: {topic.lastPost}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/topic/${topic.id}`);
                      }}
                    >
                      Открыть
                      <Icon name="ChevronRight" size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
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

export default CategoryView;
