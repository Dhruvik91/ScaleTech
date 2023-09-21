/* //localStorage.clear();

// Function to create a blog
function createBlog() {
    const title = document.getElementById("Title").value;
    const description = document.getElementById("Description").value;
    const content = document.getElementById("Content").value;

    // Check if local storage is available in the browser
    if (typeof (Storage) !== "undefined") {
        // Get existing blogs from local storage
        const existingBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");

        // Create a new blog object
        const newBlog = {
            title: title,
            description: description,
            content: content,
        };

        // Add the new blog to the existing blogs
        existingBlogs.push(newBlog);

        // Save the updated blogs to local storage
        localStorage.setItem("blogs", JSON.stringify(existingBlogs));

        // Clear the form fields
        document.getElementById("Title").value = "";
        document.getElementById("Description").value = "";
        document.getElementById("Content").value = "";

        // Display the updated blog list
        displayBlogs();
    } else {
        alert("Local storage is not supported in this browser.");
    }
}

// Function to display the blogs
function displayBlogs() {
    const blogList = document.getElementById("blogList");

    // Check if local storage is available in the browser
    if (typeof (Storage) !== "undefined") {
        // Get blogs from local storage
        const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");

        // Clear the blog list
        blogList.innerHTML = "";

        // Loop through each blog and display it
        blogs.forEach(blog => {
            const blogDiv = document.createElement("div");
            blogDiv.innerHTML = `
                <h2>${blog.title}</h2>
                <p>${blog.description}</p>
                <p>${blog.content}</p>
                <hr>
            `;
            blogList.appendChild(blogDiv);
        });
    } else {
        alert("Local storage is not supported in this browser.");
    }
}

// Display existing blogs on page load
window.onload = function () {
    displayBlogs();
  }; */

  //localStorage.clear();

// Function to create a blog
function createBlog() {
    const title = document.getElementById("Title").value;
    const description = document.getElementById("Description").value;
    const content = document.getElementById("Content").value;
    const tags = document.getElementById("Tags").value; // Assuming you have an input field with id "Tags"

    // Check if local storage is available in the browser
    if (typeof (Storage) !== "undefined") {
        // Get existing blogs from local storage
        const existingBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");

        // Create a new blog object
        const newBlog = {
            title: title,
            description: description,
            content: content,
            tags: tags.split(",") // Assuming tags are comma-separated
        };

        // Add the new blog to the existing blogs
        existingBlogs.unshift(newBlog); // Add to the beginning of the array to display newly added blogs on top

        // Save the updated blogs to local storage
        localStorage.setItem("blogs", JSON.stringify(existingBlogs));

        // Clear the form fields
        document.getElementById("Title").value = "";
        document.getElementById("Description").value = "";
        document.getElementById("Content").value = "";
        document.getElementById("Tags").value = "";

        // Display the updated blog list
        displayBlogs();
    } else {
        alert("Local storage is not supported in this browser.");
    }
}

// Function to display the blogs
function displayBlogs() {
    const blogList = document.getElementById("blogList");

    // Check if local storage is available in the browser
    if (typeof (Storage) !== "undefined") {
        // Get blogs from local storage
        const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");

        // Clear the blog list
        blogList.innerHTML = "";

        // Loop through each blog and display it
        blogs.forEach(blog => {
            const blogItem = document.createElement("div");
            blogItem.classList.add("blogItem");
    
            blogItem.innerHTML = `
                <div class="blogInfo">
                    <div class="blogTitle">${blog.title}</div>
                    <div class="blogTags">
                        ${blog.tags}
                    </div>
                    <div class="blogDate">${new Date()}</div>
                </div>
            `;
    
            blogList.appendChild(blogItem);
        });
    } else {
        alert("Local storage is not supported in this browser.");
    }
}


// Display existing blogs on page load
window.onload = function () {
    displayBlogs();
};
