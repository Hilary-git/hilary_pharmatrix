// Additional dashboard functionality can be added here
$(document).ready(function() {
    // Data table functionality
    $('#dataTable').DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/French.json'
        },
        dom: '<"top"f>rt<"bottom"lip><"clear">',
        pageLength: 10,
        lengthMenu: [10, 25, 50, 100]
    });

    // Search functionality
    $('.search-bar form').submit(function(e) {
        e.preventDefault();
        const searchTerm = $(this).find('input').val().toLowerCase();
        
        $('#dataTable tbody tr').each(function() {
            const rowText = $(this).text().toLowerCase();
            if (rowText.indexOf(searchTerm) === -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });

    // Summary cards hover effect
    $('.summary-card').hover(
        function() {
            $(this).css('transform', 'translateY(-5px)');
            $(this).css('box-shadow', '0 0.5rem 1.5rem rgba(0, 0, 0, 0.15)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
            $(this).css('box-shadow', '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)');
        }
    );
});