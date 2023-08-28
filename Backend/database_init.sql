--  creating person table
CREATE TABLE person(
    username varchar(30) PRIMARY KEY,
    first_name varchar(30),
    last_name varchar(30),
    email varchar(30),
    password varchar(72)
);

-- creating blogs table
CREATE TABLE blogs(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    username varchar(30),
    title varchar(100),
    description varchar(500),
    content varchar(10000),
    datetime timestamp DEFAULT current_timestamp,
    FOREIGN KEY(username) 
        REFERENCES person(username)
            ON DELETE CASCADE
);

-- creating tags table
CREATE TABLE tags(
    tag varchar(20) PRIMARY KEY,
    blog_id uuid,
    FOREIGN KEY(blog_id)
        REFERENCES blogs(id)
            ON DELETE CASCADE
);