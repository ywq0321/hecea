function CareerDevelopmentForumApp() {
  try {
    const [user, setUser] = React.useState(null);
    const [posts, setPosts] = React.useState([]);
    const [showNewPost, setShowNewPost] = React.useState(false);

    React.useEffect(() => {
      const savedUser = AuthUtils.getUser();
      if (savedUser) {
        setUser(savedUser);
      }
      loadPosts();
    }, []);

    const loadPosts = () => {
      const savedPosts = localStorage.getItem('career_development_posts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      } else {
        // Initialize with default posts
        const defaultPosts = [
          {
            id: 'default_1',
            title: '英国高校职场系列讲座四：午间对话谢颖教授',
            content: 'Video link: https://www.youtube.com/watch?v=96XEhfZDxb8',
            category: 'Experience / 经验分享',
            author: 'HECEA Admin',
            date: new Date().toLocaleDateString(),
            replies: []
          },
          {
            id: 'default_2',
            title: '讲座：乳腺疾病与日常保健 (全球首创腔镜重建手术）',
            content: 'Video link: https://www.youtube.com/watch?v=L_gKdIYzmL4',
            category: 'Experience / 经验分享',
            author: 'HECEA Admin',
            date: new Date().toLocaleDateString(),
            replies: []
          },
          {
            id: 'default_3',
            title: '讲座：印象派色彩分析与作品欣赏',
            content: 'Video link: https://www.youtube.com/watch?v=gtiwNnJU2oY',
            category: 'Experience / 经验分享',
            author: 'HECEA Admin',
            date: new Date().toLocaleDateString(),
            replies: []
          }
        ];
        setPosts(defaultPosts);
        localStorage.setItem('career_development_posts', JSON.stringify(defaultPosts));
      }
    };

    const handleLogout = () => {
      AuthUtils.removeUser();
      setUser(null);
      window.location.href = 'index.html';
    };

    const handleNewPost = (postData) => {
      const newPost = {
        id: Date.now().toString(),
        ...postData,
        author: user.name,
        date: new Date().toLocaleDateString(),
        replies: []
      };
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('career_development_posts', JSON.stringify(updatedPosts));
      setShowNewPost(false);
    };

    return (
      <div className="min-h-screen bg-[var(--bg-light)]">
        <Header 
          user={user} 
          onLogin={() => {}}
          onLogout={handleLogout}
        />
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Career & Holistic Development Forum / 职业及全人发展论坛</h1>
            <p className="text-[var(--text-secondary)] mb-6">
              Share career goals, seek mentorship, and connect with professionals.
              分享职业目标，寻求指导，与专业人士建立联系。
            </p>
            
            {user ? (
              <button 
                onClick={() => setShowNewPost(true)}
                className="btn-primary"
              >
                New Post / 发新帖
              </button>
            ) : (
              <div className="card text-center">
                <p className="text-[var(--text-secondary)] mb-4">
                  Please login to participate in discussions.
                  请登录以参与讨论。
                </p>
                <a href="index.html" className="btn-primary">
                  Login / 登录
                </a>
              </div>
            )}
          </div>

          {showNewPost && (
            <ForumPost 
              onSubmit={handleNewPost}
              onCancel={() => setShowNewPost(false)}
            />
          )}

          <div className="space-y-6">
            {posts.map(post => (
              <ForumPost 
                key={post.id}
                post={post}
                showForm={false}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('CareerDevelopmentForumApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CareerDevelopmentForumApp />);