import { Link } from "react-router-dom";

export const Posts = ({ posts,onRead,onDelete,onEdit, my }) => {
    return (
    <div className="row">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="col-md-6 col-lg-12 mb-4">
            <div className="card h-100 post-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title post-title">{post.title}</h5>
                {/* <p className="card-text post-content flex-grow-1"> */}
             <p
  className="card-text post-content flex-grow-1"
  dangerouslySetInnerHTML={{
    __html:
      post.content.length > 200
        ? `${post.content.substring(0, 200)}...`
        : post.content,
  }}
/>
                <div className="post-meta mt-auto">
                  <div className="d-flex justify-content-between align-items-center text-muted small">
                    {my? <></> : (
                      <span>
                        <strong>Автор:</strong> {post.author?.username}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 d-flex gap-2">
                  {onRead &&
                 <Link className="btn btn-primary btn-sm" to={`/post/${post._id}`} state={{my : !!my}}>Читати повністю</Link>}
                                  {onEdit && (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => onEdit(post)}
                    >
                      Редагувати
                    </button>
                  )}

                  {onDelete && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(post._id)}
                    >
                      Видалити
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Поки що немає постів</p>
      )}
         </div>
  );
};
