import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { getUserProfile } from "../../lib/dataService";
import {
  Mail,
  Lock,
  ArrowRight,
  Leaf,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginView() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleRedirection = async (user) => {
      if (!user) return;
      
      const profile = await getUserProfile(user.id);

      // Brief delay to ensure cookies are persisted by createBrowserClient
      // before the full-page navigation hits the server middleware.
      setTimeout(() => {
        if (profile?.role === "admin") {
          window.location.href = "/admin";
        } else {
          setSuccess(true);
          window.location.href = "/en/";
        }
      }, 150);
    };

    // Check session on mount to handle OAuth redirect completion or pre-existing session
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        handleRedirection(user);
      }
    };
    checkSession();

    // Listen for auth state changes (handles Login, Signup, and OAuth events)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === "SIGNED_IN" || event === "USER_UPDATED") && session) {
        handleRedirection(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/login",
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) {
          throw authError;
        }

        console.log("[Auth] signInWithPassword call complete. Listener will handle redirect.");
      } else {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            redirectTo: window.location.origin + "/login",
          },
        });
        if (authError) {
          throw authError;
        }

        console.log("[Auth] signUp call complete.");

        // Handled by listener if session exists, otherwise show success message
        if (!data.session) {
          setSuccess(true);
          setError("Account created! Please check your email for verification.");
        }
      }
    } catch (err) {
      console.error('Error during authentication:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-teal-500/5 blur-[80px]"></div>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 mb-6 group transition-transform hover:scale-110 duration-500">
            <Leaf className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
          </div>
          <h1 className="text-4xl font-heading font-black tracking-tighter text-slate-900 mb-2">
            Bloom <span className="text-emerald-600">Brief</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Horticulture meets intelligence.
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 relative overflow-hidden">
          {success && !error && (
            <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-slate-500 font-medium">
                Preparing your tailored experience...
              </p>
            </div>
          )}

          <div className="flex bg-slate-100/50 p-1 rounded-xl mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                isLogin
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                !isLogin
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Join Us
            </button>
          </div>

          <div className="space-y-4 mb-8">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3.5 rounded-2xl font-bold text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm active:scale-[0.98] disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/70 px-4 text-slate-400 font-bold tracking-widest backdrop-blur-sm">
                  Or continue with email
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-0 rounded-2xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 font-medium"
                    placeholder="Winston Smith"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Work Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-0 rounded-2xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 font-medium"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 font-sans">
                  Security Code
                </label>
                {isLogin && (
                  <button
                    type="button"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Lost Password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-4 bg-slate-50 border-0 rounded-2xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-slate-500 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                className={
                  "p-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300 " +
                  (success
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-red-50 text-red-700 border border-red-100")
                }
              >
                {success ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <p className="text-sm font-semibold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-emerald-900/10 hover:bg-emerald-600 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
            >
              <div className="absolute inset-0 w-1/4 h-full bg-white/10 transition-transform -translate-x-full group-hover:translate-x-[400%] skew-x-[-20deg] duration-1000"></div>
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Authenticate" : "Create Account"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          <footer className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-xs text-slate-400 font-medium tracking-tight">
              Protected by Supreme-level Encryption & Botanical Privacy.
            </p>
          </footer>
        </div>

        {/* Support Links */}
        <div className="mt-8 flex justify-center gap-6">
          <a
            href="/"
            className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors"
          >
            Support
          </a>
        </div>
      </div>
    </div>
  );
}
