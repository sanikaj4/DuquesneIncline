<script>
    document.addEventListener('DOMContentLoaded', function() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                // Prevent the click from propagating to parent elements
                e.stopPropagation();
                
                // Find the parent li element
                const parentLi = this.closest('li');
                
                // Find the dropdown within the parent li
                const dropdown = parentLi.querySelector('.dropdown');
                
                // Toggle the display of the dropdown
                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                } else {
                    dropdown.style.display = 'block';
                }
            });
        });
    });
        
    // Close all dropdowns when clicking outside
    document.addEventListener('click', function() {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    });
</script>