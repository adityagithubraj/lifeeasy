import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-neon bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! Page not found
          </p>
          <Button asChild className="btn-hero">
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </a>
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
