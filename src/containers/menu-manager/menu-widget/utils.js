import {WIDGET_CATEGORY, WIDGET_CUSTOM_LINK, WIDGET_POST} from './constants';
import WidgetCategory from './widget-category';
import WidgetPost from './widget-post';
import WidgetCustomLink from './widget-custom-link';

export function getWidgetComponent(type){
    switch (type){
        case WIDGET_CATEGORY:
            return WidgetCategory;
        case WIDGET_POST:
            return WidgetPost;
        case WIDGET_CUSTOM_LINK:
            return WidgetCustomLink;
        default: return null;
    }
}