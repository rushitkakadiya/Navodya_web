
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { auth, signOut } from "@/lib/firebase";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to truncate email for display
  const truncateEmail = (email: string) => {
    if (!email) return '';
    if (email.length <= 15) return email;
    return email.substring(0, 12) + '...';
  };

  return (
    <header className="border-b py-4 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white font-bold">ES</div>
          <span className="text-xl font-bold">EduSpark</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/live-classes" className="text-sm font-medium hover:text-primary transition-colors">Live Classes</Link>
          <Link to="/recorded-lectures" className="text-sm font-medium hover:text-primary transition-colors">Recorded Lectures</Link>
          <Link to="/study-materials" className="text-sm font-medium hover:text-primary transition-colors">Study Materials</Link>
        </nav>
        
        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 max-w-[180px]">
                <span className="text-sm font-medium truncate" title={currentUser.email || ''}>
                  {truncateEmail(currentUser.email || '')}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>Log out</Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-primary hover:bg-primary-700" size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white border-b shadow-lg z-50">
          <div className="container py-4 flex flex-col gap-4">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/live-classes" className="text-sm font-medium hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Live Classes</Link>
            <Link to="/recorded-lectures" className="text-sm font-medium hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Recorded Lectures</Link>
            <Link to="/study-materials" className="text-sm font-medium hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Study Materials</Link>
            
            {currentUser ? (
              <div className="flex flex-col gap-2 border-t pt-4">
                <div className="text-sm font-medium truncate" title={currentUser.email || ''}>{currentUser.email}</div>
                <Button variant="outline" size="sm" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Log out</Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 border-t pt-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Log in</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-primary hover:bg-primary-700 w-full" size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
