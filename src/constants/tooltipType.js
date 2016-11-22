import React from 'react';
import {Position} from '@blueprintjs/core';

export default {
    draft_editor: {
        insert_code_editor: {
            tooltip: 'Embed code edtior',
            position: Position.TOP
        },
        insert_image: {
            tooltip: 'Embed image',
            position: Position.TOP
        },
        insert_katex: {
            tooltip: 'Nhúng mã toán học (latex)',
            id: 'insert_katex'
        },
        preview: {
            tooltip: 'Preview',
            position: Position.TOP
        }
    },
    compare_pdf: {
        tooltip: 'So sánh với file đã tải lên, để dễ dàng chỉnh sửa',
        id: 'compare_pdf',
    },
    upload_pdf: {
        tooltip: 'Chuyển đổi file pdf, docx, txt sang tungtung.vn để chỉnh sửa',
        id: 'upload_pdf',
    },
    editor_preview: {
        tooltip: 'Xem trước tất cả câu hỏi được biên dịch, ví dụ như: latex, code editor',
        id: 'editor_preview'
    },
    view_quizlist_draft: {
        tooltip: <span>Bản nháp cho bạn xem trước đề thi được hiển thị như thế nào.<br/><strong>Note: Cập nhật trước khi xem nháp</strong></span>,
        id: 'view_quizlist_draft'
    },
    view_quizlist_public:{
        tooltip: 'Trang chính đề thi được chia sẻ',
        id: 'view_quizlist_public'
    },
    save_quizlist: {
        tooltip: 'Lưu lại, để hệ thống cập nhật đề thi lên hệ thống',
        id: 'save_quizlist'
    },
    update_quizlist: {
        tooltip: 'Sau khi thực hiện chỉnh sửa, vui lòng cập nhật',
        id: 'update_quizlist'
    }
}