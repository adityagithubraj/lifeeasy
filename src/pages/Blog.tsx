import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import PageWrapper from '@/components/layout/PageWrapper';
import BlogPost from '@/components/BlogPost';
import BlogCard from '@/components/BlogCard';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useBlog } from '@/hooks/useBlog';
import { BlogPost as BlogPostType } from '@/services/blogService';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';

const Blog = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loadingPost, setLoadingPost] = useState(false);
  
  const { posts, loading, error, fetchPosts, fetchPostBySlug } = useBlog();

  // Extract unique categories from posts
  const allCategories = [...new Set(posts.map(post => post.category_name).filter(Boolean))];

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostSelect = async (post: BlogPostType) => {
    console.log('Selected post:', post);
    console.log('Post slug:', post.slug);
    setLoadingPost(true);
    try {
      // Fetch the full blog post content by slug
      console.log('Fetching full post by slug:', post.slug);
      const fullPost = await fetchPostBySlug(post.slug);
      console.log('Full post fetched:', fullPost);
      
      if (fullPost) {
        console.log('Setting full post with content:', fullPost.content ? 'Content available' : 'No content');
        setSelectedPost(fullPost);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.log('Fallback to list post');
        // Fallback to the post from the list if fetch fails
        setSelectedPost(post);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Failed to fetch full post:', err);
      // Fallback to the post from the list if fetch fails
      setSelectedPost(post);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoadingPost(false);
    }
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    setSearchTerm('');
    setSelectedCategory('');
  };

  if (selectedPost) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 py-8">
          <Button
            onClick={handleBackToList}
            variant="outline"
            className="mb-6"
          >
            {t('blog.back.to.list')}
          </Button>
          <BlogPost {...selectedPost} />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            {t('blog.description')}
          </p>
          
          {/* Language Switcher */}
          <div className="flex justify-center mb-4">
            <LanguageSwitcher />
          </div>
          
          <p className="text-sm text-muted-foreground">
            {language === 'en' 
              ? 'Select a language above to see real-time translation of blog content'
              : language === 'ko'
                ? '위의 언어를 선택하여 블로그 콘텐츠의 실시간 번역을 확인하세요'
                : '选择上面的语言以查看博客内容的实时翻译'
            }
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between"
        >
          <div className="flex flex-1 max-w-md items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('blog.search.placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">{t('blog.filter.all.categories')}</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={fetchPosts}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>{t('blog.refresh')}</span>
          </Button>
        </motion.div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">{t('blog.loading')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={fetchPosts} variant="outline">
              {t('blog.retry')}
            </Button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl font-semibold mb-2">{t('blog.no.posts')}</p>
            <p className="text-muted-foreground">{t('blog.no.posts.description')}</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                onClick={handlePostSelect}
              />
            ))}
          </motion.div>
        )}

        {/* Loading indicator for post selection */}
        {loadingPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <p className="text-sm text-muted-foreground">Loading blog post...</p>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Blog;