let categoriesData = [];
let coursesData = [];
let categoryMap = new Map();

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://api.cc.localhost/categories")
    .then((response) => response.json())
    .then((fetchedCategoriesData) => {
      categoriesData = fetchedCategoriesData;

      fetch("http://api.cc.localhost/courses")
        .then((response) => response.json())
        .then((fetchedCoursesData) => {
          coursesData = fetchedCoursesData;
          const categoryList = document.getElementById("category-list");

          // Build category tree and map
          const categoryTree = buildCategoryTree(categoriesData);
          categoryMap = buildCategoryMap(categoryTree);

          // Calculate course counts
          calculateCourseCounts(categoryTree, coursesData);

          // Render categories and courses
          renderCategoryTree(categoryTree, categoryList);
          fetchAllCourses();
        })
        .catch((error) => console.error("Error fetching courses:", error));
    })
    .catch((error) => console.error("Error fetching categories:", error));
});

// Function to build category tree from flat list
function buildCategoryTree(categories) {
  const categoryMap = new Map();
  const tree = [];

  categories.forEach((category) => {
    categoryMap.set(category.id, { ...category, children: [] });
  });

  categories.forEach((category) => {
    if (category.parent_id) {
      if (categoryMap.has(category.parent_id)) {
        categoryMap
          .get(category.parent_id)
          .children.push(categoryMap.get(category.id));
      }
    } else {
      tree.push(categoryMap.get(category.id));
    }
  });

  return tree;
}

// Function to build a map from category IDs to category nodes
function buildCategoryMap(tree) {
  const map = new Map();
  function traverse(node) {
    map.set(node.id, node);
    if (node.children && node.children.length > 0) {
      node.children.forEach(traverse);
    }
  }
  tree.forEach(traverse);
  return map;
}

// Function to calculate direct and total course counts
function calculateCourseCounts(categoryTree, coursesData) {
  const coursesByCategory = new Map();
  coursesData.forEach((course) => {
    const categoryId = course.category_id;
    if (!coursesByCategory.has(categoryId)) {
      coursesByCategory.set(categoryId, []);
    }
    coursesByCategory.get(categoryId).push(course);
  });

  // Recursively calculate counts
  function calculateTotalCourses(categoryNode) {
    const directCourses = coursesByCategory.get(categoryNode.id) || [];
    categoryNode.directCourseCount = directCourses.length;

    let total = categoryNode.directCourseCount;
    if (categoryNode.children && categoryNode.children.length > 0) {
      categoryNode.children.forEach((child) => {
        total += calculateTotalCourses(child);
      });
    }

    categoryNode.totalCourseCount = total;
    return total;
  }

  categoryTree.forEach(calculateTotalCourses);
}

// Function to render the category tree
function renderCategoryTree(tree, container, depth = 0) {
  tree.forEach((category) => {
    category.depth = depth; 

    const listItem = document.createElement("li");
    listItem.dataset.categoryId = category.id;

    const categoryName = document.createElement("span");
    categoryName.textContent = category.name;

    let displayCount = false;

    if (depth === 0 && category.totalCourseCount > 0) {
      displayCount = true;
    } else if (category.directCourseCount > 0) {
      displayCount = true;
    }

    if (displayCount) {
      const countSpan = document.createElement("span");
      countSpan.className = "course-count";
      const count =
        depth === 0 ? category.totalCourseCount : category.directCourseCount;
      countSpan.textContent = ` (${count})`;
      categoryName.appendChild(countSpan);
    }

    listItem.appendChild(categoryName);

    listItem.addEventListener("click", (e) => {
      e.stopPropagation();
      const categoryId = category.id;
      fetchCoursesByCategory(categoryId);
    });

    if (category.children && category.children.length > 0) {
      const subList = document.createElement("ul");
      renderCategoryTree(category.children, subList, depth + 1);
      listItem.appendChild(subList);
    }

    container.appendChild(listItem);
  });
}

// Function to fetch and render all courses
function fetchAllCourses() {
  const courseGrid = document.getElementById("course-grid");
  courseGrid.innerHTML = "";
  renderCourses(coursesData, courseGrid);
}

// Function to fetch and render courses by category ID
function fetchCoursesByCategory(categoryId) {
  const courseGrid = document.getElementById("course-grid");
  courseGrid.innerHTML = "";

  const category = categoryMap.get(categoryId);

  let filteredCourses = [];

  if (category.depth === 0) {
    const categoryIds = getAllDescendantCategoryIds(categoryId);
    filteredCourses = coursesData.filter((course) =>
      categoryIds.includes(course.category_id)
    );
  } else {
    filteredCourses = coursesData.filter(
      (course) => course.category_id === categoryId
    );
  }

  renderCourses(filteredCourses, courseGrid);
}

// Function to get all descendant category IDs
function getAllDescendantCategoryIds(categoryId) {
  const ids = [categoryId];

  function collectChildIds(categoryId) {
    const category = categoryMap.get(categoryId);
    if (category && category.children) {
      category.children.forEach((child) => {
        ids.push(child.id);
        collectChildIds(child.id);
      });
    }
  }

  collectChildIds(categoryId);
  return ids;
}

// Function to get the main parent category of a given category
function getMainParentCategory(categoryId) {
  let currentCategory = categoryMap.get(categoryId);

  while (currentCategory && currentCategory.parent_id) {
    currentCategory = categoryMap.get(currentCategory.parent_id);
  }

  return currentCategory;
}

// Function to render courses as cards
function renderCourses(courses, container) {
  courses.forEach((course) => {
    const card = document.createElement("div");
    card.className = "course-card";

    const image = document.createElement("img");
    image.src = course.image_preview || "https://via.placeholder.com/200x100";
    image.alt = course.title;

    const courseInfo = document.createElement("div");
    courseInfo.className = "course-info";

    const mainParentCategory = getMainParentCategory(course.category_id);

    // Category label (main parent category)
    const categoryLabel = document.createElement("span");
    categoryLabel.className = "category-label";
    categoryLabel.textContent = mainParentCategory
      ? mainParentCategory.name
      : "";

    // Course title
    const title = document.createElement("h3");
    title.className = "course-title";
    title.textContent = course.title;

    // Course description
    const description = document.createElement("p");
    description.className = "course-description";
    description.textContent = course.description;

    courseInfo.appendChild(title);
    courseInfo.appendChild(description);
    card.appendChild(categoryLabel);
    card.appendChild(image);
    card.appendChild(courseInfo);
    container.appendChild(card);
  });
}
