import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

interface Post {
  id: number;
  author: string;
  role: UserRole;
  content: string;
  timestamp: string;
  reputation: number;
  posts: number;
}

const TopicView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [replyText, setReplyText] = useState('');
  const [topic, setTopic] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const allTopics = JSON.parse(localStorage.getItem('forum_topics') || '[]');
    const foundTopic = allTopics.find((t: any) => t.id === Number(id));
    
    if (foundTopic) {
      setTopic(foundTopic);
      setPosts(foundTopic.posts || []);
    } else {
      setTopic({
        id: Number(id) || 1,
        title: 'Обновление сервера - новые возможности для игроков',
        category: 'Новости и объявления',
        author: 'Администратор',
        views: 892,
        replies: 4,
        isPinned: true,
        isLocked: false
      });
      setPosts(defaultPosts);
    }
  }, [id]);

  const defaultPosts: Post[] = [
    {
      id: 1,
      author: 'Администратор',
      role: 'admin',
      content: 'Дорогие друзья! Рады сообщить вам о новом обновлении сервера Малиновка РП.\n\nОсновные изменения:\n• Добавлена новая система бизнеса\n• Улучшена оптимизация сервера\n• Исправлены баги с транспортом\n• Добавлены новые предметы одежды\n\nБлагодарим за поддержку проекта!',
      timestamp: '2 часа назад',
      reputation: 5000,
      posts: 1456
    },
    {
      id: 2,
      author: 'Модератор Алекс',
      role: 'moderator',
      content: 'Отличное обновление! Особенно радует система бизнеса, давно ждали.',
      timestamp: '1 час назад',
      reputation: 3200,
      posts: 892
    },
    {
      id: 3,
      author: 'Игрок_Василий',
      role: 'user',
      content: 'А когда будет фикс бага с домами? Уже неделю не могу войти в свой дом.',
      timestamp: '45 минут назад',
      reputation: 890,
      posts: 234
    },
    {
      id: 4,
      author: 'Шериф Джонсон',
      role: 'user',
      content: 'Спасибо за обновление! Оптимизация реально заметна, фпс вырос на 20-30.',
      timestamp: '30 минут назад',
      reputation: 1800,
      posts: 456
    },
    {
      id: 5,
      author: 'Фотограф_Макс',
      role: 'user',
      content: 'Новая одежда огонь! Можно делать крутые скриншоты теперь 📸',
      timestamp: '15 минут назад',
      reputation: 1456,
      posts: 567
    }
  ];\n\n  if (!topic) {\n    return (\n      <div className=\"min-h-screen bg-background flex items-center justify-center\">\n        <div className=\"text-center\">\n          <Icon name=\"Loader2\" size={48} className=\"text-primary animate-spin mx-auto mb-4\" />\n          <p className=\"text-muted-foreground\">Загрузка...</p>\n        </div>\n      </div>\n    );\n  }

  const getRoleBadge = (role: UserRole) => {
    const roleConfig = {
      admin: { label: 'Админ', variant: 'destructive' as const },
      moderator: { label: 'Модератор', variant: 'default' as const },
      user: { label: 'Игрок', variant: 'secondary' as const },
      guest: { label: 'Гость', variant: 'outline' as const }
    };
    return roleConfig[role];
  };

  const handleReply = () => {
    if (replyText.trim()) {
      alert('Ответ отправлен! (В демо-версии)');
      setReplyText('');
    }
  };

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
            <span className="hover:text-primary cursor-pointer transition-colors">
              {topic.category}
            </span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground">{topic.title}</span>
          </div>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                {topic.isPinned && (
                  <Icon name="Pin" size={18} className="text-primary" />
                )}
                <h1 className="text-2xl font-bold text-foreground">{topic.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="User" size={14} />
                Автор: {topic.author}
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="flex items-center gap-1">
                <Icon name="Eye" size={14} />
                {topic.views} просмотров
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="flex items-center gap-1">
                <Icon name="MessageSquare" size={14} />
                {topic.replies || posts.length - 1} ответов
              </span>
            </div>
          </Card>
        </div>

        <div className="space-y-4 mb-6">
          {posts.map((post, index) => (
            <Card key={post.id} className="bg-card border-border overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
                <div className="bg-secondary p-5 border-b md:border-b-0 md:border-r border-border">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-20 h-20 mb-3">
                      <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                        {post.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-foreground mb-2">{post.author}</h3>
                    <Badge {...getRoleBadge(post.role)} className="mb-3">
                      {getRoleBadge(post.role).label}
                    </Badge>
                    <Separator className="my-3 w-full" />
                    <div className="space-y-2 text-sm w-full">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Сообщений:</span>
                        <span className="font-semibold text-foreground">{post.posts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Репутация:</span>
                        <span className="font-semibold text-foreground">{post.reputation}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      {post.timestamp}
                    </span>
                    <span className="text-xs text-muted-foreground">#{index + 1}</span>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <Icon name="ThumbsUp" size={14} className="mr-1" />
                      Нравится
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <Icon name="Reply" size={14} className="mr-1" />
                      Ответить
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <Icon name="Flag" size={14} className="mr-1" />
                      Пожаловаться
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Ваш ответ</h3>
          <Textarea
            placeholder="Напишите ваш ответ здесь..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="min-h-[150px] mb-4 bg-secondary border-border"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Icon name="Bold" size={16} />
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Italic" size={16} />
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Link" size={16} />
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Image" size={16} />
              </Button>
            </div>
            <Button 
              onClick={handleReply}
              disabled={!replyText.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              <Icon name="Send" size={16} className="mr-2" />
              Отправить ответ
            </Button>
          </div>
        </Card>
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

export default TopicView;