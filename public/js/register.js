$(document).ready(function() {
    // Get token CSRF
    var csrfToken = $('meta[name="csrf-token"]').attr('content');

    // DataTable initialization
    $('#userTable').DataTable({
        ajax: {
            url: '/users',
            dataSrc: ''
        },
        columns: [
            { data: 'name' },
            { data: 'email' }
        ]
    });

    // Form submission with AJAX
    $('#registrationForm').submit(function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        
        formData += '&_token=' + csrfToken;

        $.ajax({
            type: 'POST',
            url: '/register',
            data: formData,
            success: function(response) {
                alert('Registro exitoso!');
                $('#userTable').DataTable().ajax.reload(); 
            },
            error: function(xhr, status, error) {
                alert('Error en el registro: ' + xhr.responseText);
            }
        });
    });
});
