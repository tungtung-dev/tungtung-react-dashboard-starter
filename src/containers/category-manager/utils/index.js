import swal from 'sweetalert2';

export function restructureCategories(categories = [], parentId = 0, subLineFirst = '', subLineSecond = '|---', first = true) {
    let newCategories = [];
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const isParentCategory = (!category.parentId && !parentId) ? true : (category.parentId === parentId);
        if (isParentCategory) {
            newCategories.push({
                ...category,
                nameWithLine: `${!first ? subLineFirst : ''} ${category.name}`
            });
            newCategories = [
                ...newCategories,
                ...restructureCategories(categories, category.id, subLineFirst + subLineSecond, subLineSecond, false)
            ];
        }
    }
    return newCategories;
}

export function swalConfirmDelete(onDelete, {title = null} = {}) {
    swal({
        title: title ? title : 'Are you sure delete category?',
        text: 'Your category delete forever',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then(function () {
        onDelete();
    })
}