function ResearchCollaborationForumApp() {
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
      const savedPosts = localStorage.getItem('research_collaboration_posts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
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
      localStorage.setItem('research_collaboration_posts', JSON.stringify(updatedPosts));
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
            <h1 className="text-3xl font-bold mb-4">Academic Dynamics & Research Collaboration Forum / 学界动态及研究合作论坛</h1>
            <p className="text-[var(--text-secondary)] mb-6">
              Find research partners, share opportunities, collaborate on projects, and publish your research and publications.
              寻找研究伙伴，分享机会，合作项目，发布您的研究和出版物。
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
    console.error('ResearchCollaborationForumApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ResearchCollaborationForumApp />);