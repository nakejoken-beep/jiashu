import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="ambient-glow" />

      {/* Back button */}
      <motion.button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded border border-gold/30 hover:bg-gold/10 text-gold transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-serif">返回首页</span>
      </motion.button>

      <main className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Title */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-xs tracking-[0.4em] text-gold/70 font-serif">
                管理后台
              </span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <h1 className="text-4xl gold-text font-serif mb-2">管理员登录</h1>
            <p className="text-muted-foreground font-serif">请输入您的管理员账号</p>
          </div>

          {/* Login form */}
          <form onSubmit={handleLogin} className="premium-card p-10 relative">
            {/* Corner ornaments */}
            <div className="corner-ornament top-left" />
            <div className="corner-ornament top-right" />
            <div className="corner-ornament bottom-left" />
            <div className="corner-ornament bottom-right" />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-crimson/10 border border-crimson/30 rounded text-crimson text-sm font-serif text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-xs text-gold/60 mb-2 tracking-wider font-serif">
                  邮箱地址
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-muted/30 border border-gold/30 rounded text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_hsl(42_85%_55%_/_0.15)] transition-all font-serif"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gold/60 mb-2 tracking-wider font-serif">
                  密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-muted/30 border border-gold/30 rounded text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold focus:shadow-[0_0_15px_hsl(42_85%_55%_/_0.15)] transition-all font-serif"
                  />
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="elegant-button w-full flex items-center justify-center gap-3 mt-8 text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="font-serif">登录中...</span>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span className="font-serif tracking-widest">登录</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;
