window.viewCourse = async function(courseId) {
  const res = await api.get(`/lessons/course/${courseId}`);
  const lessons = res.data.data;

  let html = '<h2>📖 Bài học</h2>';

  lessons.forEach(l => {
    html += `
      <div class="lesson">
        <h4>${l.title}</h4>
        <p>${l.content}</p>
        <small>⏱ ${l.length}</small>
      </div>
    `;
  });

  document.getElementById('my-course-list').innerHTML = html;
};
