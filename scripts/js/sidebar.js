  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');
  const toggleButton = document.getElementById('toggleSidebar');
  const closeButton = document.getElementById('closeSidebar');
  
  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('with-sidebar');
  });

  closeButton.addEventListener('click', () => {
    sidebar.classList.remove('active');
    mainContent.classList.remove('with-sidebar');
  });