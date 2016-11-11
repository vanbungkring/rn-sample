'use strict';
import Global from '../constants/Global';
export default {
  getRecentPosts: Global.baseUrl+'/api/get_recent_posts',
  getCategoryPostsById: Global.baseUrl+'/api/get_category_posts/?id=',
};
