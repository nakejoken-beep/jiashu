import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2, RefreshCw, MessageSquare, Calendar, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface Message {
  id: string;
  sender_name: string;
  content: string;
  created_at: string;
}

const Admin = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      setUser(session.user);

      // Check if user is admin
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin');

      if (!roles || roles.length === 0) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      fetchMessages();
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting message:', error);
    } else {
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gold animate-pulse font-serif text-xl">加载中...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="premium-card p-10 text-center max-w-md">
          <h1 className="text-2xl gold-text font-serif mb-4">访问受限</h1>
          <p className="text-muted-foreground mb-6">您没有管理员权限访问此页面</p>
          <button
            onClick={() => navigate('/')}
            className="elegant-button px-6 py-3"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient glow */}
      <div className="ambient-glow" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-xl border-b border-gold/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl gold-text font-serif">留言管理</h1>
            <span className="text-sm text-muted-foreground">
              共 {messages.length} 条留言
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button
              onClick={fetchMessages}
              className="p-2 rounded border border-gold/30 hover:bg-gold/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className="w-5 h-5 text-gold" />
            </motion.button>
            
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded border border-crimson/30 hover:bg-crimson/10 text-crimson transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-4 h-4" />
              <span className="font-serif">退出</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card p-16 text-center"
          >
            <MessageSquare className="w-16 h-16 text-gold/30 mx-auto mb-4" />
            <h2 className="text-xl text-muted-foreground font-serif">暂无留言</h2>
            <p className="text-sm text-muted-foreground/60 mt-2">用户提交的留言将显示在这里</p>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="premium-card p-6 relative group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2 text-gold">
                        <User className="w-4 h-4" />
                        <span className="font-serif font-semibold">{message.sender_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {format(new Date(message.created_at), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
                        </span>
                      </div>
                    </div>
                    <p className="text-foreground/90 font-serif leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                  
                  <motion.button
                    onClick={() => deleteMessage(message.id)}
                    className="p-2 rounded border border-crimson/30 hover:bg-crimson/20 text-crimson opacity-0 group-hover:opacity-100 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
