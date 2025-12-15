import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

interface NewTopic {
  title: string;
  category: string;
  author: string;
  authorRole: UserRole;
  content: string;
  isPinned: boolean;
  isLocked: boolean;
}

interface NewPost {
  topicId: string;
  author: string;
  authorRole: UserRole;
  content: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const [newTopic, setNewTopic] = useState<NewTopic>({
    title: '',
    category: '',
    author: '',
    authorRole: 'user',
    content: '',
    isPinned: false,
    isLocked: false
  });

  const [newPost, setNewPost] = useState<NewPost>({
    topicId: '',
    author: '',
    authorRole: 'user',
    content: ''
  });

  const categories = [
    'Новости и объявления',
    'Правила сервера',
    'Игровые организации',
    'Игровые организации - ОПГ Гопота',
    'Игровые организации - ОПГ Скинхеды',
    'Игровые организации - ОПГ Кавказцы',
    'Заявки и жалобы',
    'Общение'
  ];

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      toast({
        title: "Вход выполнен",
        description: "Вы вошли как администратор"
      });
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверный пароль",
        variant: "destructive"
      });
    }
  };

  const handleCreateTopic = () => {
    if (!newTopic.title || !newTopic.category || !newTopic.author || !newTopic.content) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    const topics = JSON.parse(localStorage.getItem('forum_topics') || '[]');
    const newTopicData = {
      id: Date.now(),
      ...newTopic,
      replies: 0,
      views: 0,
      lastPost: 'Только что',
      posts: [{
        id: 1,
        author: newTopic.author,
        role: newTopic.authorRole,
        content: newTopic.content,
        timestamp: 'Только что',
        reputation: newTopic.authorRole === 'admin' ? 5000 : newTopic.authorRole === 'moderator' ? 3000 : 1000,
        posts: 100
      }]
    };
    
    topics.push(newTopicData);
    localStorage.setItem('forum_topics', JSON.stringify(topics));

    toast({
      title: "Тема создана",
      description: `Тема "${newTopic.title}" успешно создана`
    });

    setNewTopic({
      title: '',
      category: '',
      author: '',
      authorRole: 'user',
      content: '',
      isPinned: false,
      isLocked: false
    });
  };

  const handleCreatePost = () => {
    if (!newPost.topicId || !newPost.author || !newPost.content) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    const topics = JSON.parse(localStorage.getItem('forum_topics') || '[]');
    const topicIndex = topics.findIndex((t: any) => t.id === Number(newPost.topicId));
    
    if (topicIndex === -1) {
      toast({
        title: "Ошибка",
        description: "Тема не найдена",
        variant: "destructive"
      });
      return;
    }

    const newPostData = {
      id: topics[topicIndex].posts.length + 1,
      author: newPost.author,
      role: newPost.authorRole,
      content: newPost.content,
      timestamp: 'Только что',
      reputation: newPost.authorRole === 'admin' ? 5000 : newPost.authorRole === 'moderator' ? 3000 : 1000,
      posts: 100
    };

    topics[topicIndex].posts.push(newPostData);
    topics[topicIndex].replies = topics[topicIndex].posts.length - 1;
    topics[topicIndex].lastPost = 'Только что';
    
    localStorage.setItem('forum_topics', JSON.stringify(topics));

    toast({
      title: "Сообщение добавлено",
      description: `Сообщение в тему #${newPost.topicId} успешно добавлено`
    });

    setNewPost({
      topicId: '',
      author: '',
      authorRole: 'user',
      content: ''
    });
  };

  const handleDeleteTopic = (topicId: string) => {
    const topics = JSON.parse(localStorage.getItem('forum_topics') || '[]');
    const filtered = topics.filter((t: any) => t.id !== Number(topicId));
    localStorage.setItem('forum_topics', JSON.stringify(filtered));
    
    toast({
      title: "Тема удалена",
      description: `Тема #${topicId} удалена`
    });
  };

  const getRoleBadge = (role: UserRole) => {
    const roleConfig = {
      admin: { label: 'Админ', variant: 'destructive' as const },
      moderator: { label: 'Модератор', variant: 'default' as const },
      user: { label: 'Игрок', variant: 'secondary' as const },
      guest: { label: 'Гость', variant: 'outline' as const }
    };
    return roleConfig[role];
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 bg-card border-border max-w-md w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={28} className="text-destructive" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Админ-панель</h1>
              <p className="text-sm text-muted-foreground">Вход для администраторов</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Пароль администратора</Label>
              <Input
                id="password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Введите пароль"
                className="mt-2"
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
            </div>
            
            <Button 
              onClick={handleAdminLogin}
              className="w-full bg-destructive hover:bg-destructive/90"
            >
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти
            </Button>

            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Вернуться на форум
            </Button>

            <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
              Демо-пароль: <code className="bg-secondary px-2 py-1 rounded">admin123</code>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const allTopics = JSON.parse(localStorage.getItem('forum_topics') || '[]');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Админ-панель</h1>
                <p className="text-sm text-muted-foreground">Полный контроль над форумом</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="destructive" className="text-sm">
                <Icon name="Shield" size={14} className="mr-1" />
                Администратор
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                На форум
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => {
                  setIsAdmin(false);
                  setAdminPassword('');
                  toast({
                    title: "Выход выполнен",
                    description: "Вы вышли из админ-панели"
                  });
                }}
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="create-topic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="create-topic">
              <Icon name="Plus" size={16} className="mr-2" />
              Создать тему
            </TabsTrigger>
            <TabsTrigger value="create-post">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Добавить пост
            </TabsTrigger>
            <TabsTrigger value="manage">
              <Icon name="Settings" size={16} className="mr-2" />
              Управление
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create-topic">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Создание новой темы</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="topic-title">Название темы</Label>
                  <Input
                    id="topic-title"
                    value={newTopic.title}
                    onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                    placeholder="Введите название темы"
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="topic-category">Категория</Label>
                    <Select
                      value={newTopic.category}
                      onValueChange={(value) => setNewTopic({...newTopic, category: value})}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="topic-author">Автор</Label>
                    <Input
                      id="topic-author"
                      value={newTopic.author}
                      onChange={(e) => setNewTopic({...newTopic, author: e.target.value})}
                      placeholder="Имя автора"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="author-role">Роль автора</Label>
                  <Select
                    value={newTopic.authorRole}
                    onValueChange={(value: UserRole) => setNewTopic({...newTopic, authorRole: value})}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Администратор</SelectItem>
                      <SelectItem value="moderator">Модератор</SelectItem>
                      <SelectItem value="user">Игрок</SelectItem>
                      <SelectItem value="guest">Гость</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="topic-content">Содержание первого сообщения</Label>
                  <Textarea
                    id="topic-content"
                    value={newTopic.content}
                    onChange={(e) => setNewTopic({...newTopic, content: e.target.value})}
                    placeholder="Введите текст сообщения"
                    className="mt-2 min-h-[200px]"
                  />
                </div>

                <div className="flex items-center gap-6 p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={newTopic.isPinned}
                      onCheckedChange={(checked) => setNewTopic({...newTopic, isPinned: checked})}
                    />
                    <Label className="cursor-pointer">Закрепить тему</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={newTopic.isLocked}
                      onCheckedChange={(checked) => setNewTopic({...newTopic, isLocked: checked})}
                    />
                    <Label className="cursor-pointer">Закрыть тему</Label>
                  </div>
                </div>

                <Button 
                  onClick={handleCreateTopic}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать тему
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="create-post">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Добавление сообщения в тему</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="post-topic">ID темы</Label>
                  <Input
                    id="post-topic"
                    value={newPost.topicId}
                    onChange={(e) => setNewPost({...newPost, topicId: e.target.value})}
                    placeholder="Введите ID темы"
                    className="mt-2"
                    type="number"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    ID темы можно найти в адресной строке: /topic/[ID]
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="post-author">Автор сообщения</Label>
                    <Input
                      id="post-author"
                      value={newPost.author}
                      onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                      placeholder="Имя автора"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="post-role">Роль автора</Label>
                    <Select
                      value={newPost.authorRole}
                      onValueChange={(value: UserRole) => setNewPost({...newPost, authorRole: value})}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Администратор</SelectItem>
                        <SelectItem value="moderator">Модератор</SelectItem>
                        <SelectItem value="user">Игрок</SelectItem>
                        <SelectItem value="guest">Гость</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="post-content">Текст сообщения</Label>
                  <Textarea
                    id="post-content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    placeholder="Введите текст сообщения"
                    className="mt-2 min-h-[200px]"
                  />
                </div>

                <Button 
                  onClick={handleCreatePost}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  Добавить сообщение
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Управление темами</h2>
              
              {allTopics.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Нет созданных тем</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allTopics.map((topic: any) => (
                    <Card key={topic.id} className="p-4 bg-secondary border-border">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {topic.isPinned && (
                              <Icon name="Pin" size={14} className="text-primary" />
                            )}
                            {topic.isLocked && (
                              <Icon name="Lock" size={14} className="text-muted-foreground" />
                            )}
                            <h3 className="text-lg font-semibold text-foreground">{topic.title}</h3>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>ID: {topic.id}</span>
                            <span>•</span>
                            <span>{topic.category}</span>
                            <span>•</span>
                            <span>Автор: {topic.author}</span>
                            <Badge {...getRoleBadge(topic.authorRole)} className="text-xs">
                              {getRoleBadge(topic.authorRole).label}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/topic/${topic.id}`)}
                          >
                            <Icon name="Eye" size={14} className="mr-1" />
                            Открыть
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteTopic(topic.id)}
                          >
                            <Icon name="Trash2" size={14} className="mr-1" />
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Зона опасности</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Очистка всех данных форума необратима
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm('Вы уверены? Все темы будут удалены!')) {
                          localStorage.removeItem('forum_topics');
                          toast({
                            title: "Данные очищены",
                            description: "Все темы удалены"
                          });
                        }
                      }}
                    >
                      <Icon name="Trash2" size={14} className="mr-2" />
                      Очистить все темы
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
