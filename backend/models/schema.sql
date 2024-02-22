CREATE TABLE roles (
role_id SERIAL NOT NULL,
role VARCHAR(255),
  PRIMARY KEY (role_id)
);

CREATE TABLE permissions (
  permission_id SERIAL NOT NULL,
  permission VARCHAR(255),
  PRIMARY KEY (permission_id)
);

CREATE TABLE role_permissions (
  role_permissions_id SERIAL NOT NULL,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(permission_id) ON DELETE CASCADE,
  PRIMARY KEY (role_permissions_id)
);

CREATE TABLE field (
   field_id SERIAL NOT NULL,
   field VARCHAR(255),
   PRIMARY KEY (field_id)
);

CREATE TABLE jobs (
   job_id SERIAL NOT NULL,
   institution_user_id INT,
   title VARCHAR(255),
   discription TEXT,
   created_at TIMESTAMP DEFAULT NOW(),
   is_deleted SMALLINT DEFAULT 0,
   FOREIGN KEY (institution_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    
   PRIMARY KEY (job_id)
);
CREATE TABLE job_user (
  job_user_id SERIAL NOT NULL,
  job_id INT,
  user_user_id INT,
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE,
  FOREIGN KEY (user_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  PRIMARY KEY (job_user_id)
);
//
CREATE TABLE users (
  user_id SERIAL NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  profileImage TEXT DEFAULT "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png",
  coverImage TEXT DEFAULT "https://indieground.net/wp-content/uploads/2023/03/Freebie-GradientTextures-Preview-05.jpg",
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  country VARCHAR(255),
  jobName VARCHAR(255),
  about VARCHAR(255),
  skills TEXT,
  education TEXT,
  CV TEXT,
  phoneNumber VARCHAR(255),
  role_id INT,
  field_id INT,
  is_deleted SMALLINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (field_id) REFERENCES field(field_id),
  PRIMARY KEY (user_id)
);
//
CREATE TABLE follows (
  follow_id SERIAL NOT NULL,
  following_user_id INT,
  followed_user_id INT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (following_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (followed_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  PRIMARY KEY (follow_id)
);
//
CREATE TABLE institution_user (
   institution_user_id SERIAL NOT NULL,
   institution_id INT,
   user_id INT,
   workDiscription TEXT,
   InstitutionName TEXT,
   startDate TEXT,
   endDate TEXT,
   is_deleted SMALLINT DEFAULT 0,
   FOREIGN KEY (institution_id) REFERENCES users(user_id) ON DELETE CASCADE,
   FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
   PRIMARY KEY (institution_user_id)
);
//
CREATE TABLE posts (
  post_id SERIAL NOT NULL,
  title VARCHAR(255),
  body TEXT,
  image TEXT,
  field_id INT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (field_id) REFERENCES field(field_id),
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (post_id)
);
//
CREATE TABLE likes (
   like_id SERIAL NOT NULL,
   user_id INT,
   post_id INT,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (like_id)
);
//
CREATE TABLE comments (
   comment_id SERIAL NOT NULL,
   comment VARCHAR(255),
   post_id INT,
   user_id INT,
   FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
   FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
   created_at TIMESTAMP DEFAULT NOW(),
   is_deleted SMALLINT DEFAULT 0,
   PRIMARY KEY (comment_id)
);