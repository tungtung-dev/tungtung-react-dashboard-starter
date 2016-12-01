import swal from 'sweetalert2';

export function swalConfirmDelete(onDelete, {title = null} = {}) {
    swal({
        title: title ? title : 'Are you sure delete tag?',
        text: 'Your tag delete forever',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then(function () {
        onDelete();
    })
}