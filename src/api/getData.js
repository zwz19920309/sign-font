import fetch from '@/config/fetch'

/**
 * 获取签到日期类型列表
 */
export const getDateTypeList = data => fetch('/admin/datetype/getDateTypeList', data, 'POST')

/**
 * 获取签到类型列表
 */
export const getCheckInTypeList = data => fetch('/admin/checkintype/getCheckInTypeList', data, 'POST')

/**
 * 获取签到模板列表
 */
export const getSignonList = data => fetch('/admin/signon/getSignonList', data, 'POST')

/**
 * 新建签到模板
 */
export const addSignon = data => fetch('/admin/signon/addSignon', data, 'POST')

/**
 * 根据id删除签到模板
 */
export const deleteSignon = data => fetch('/admin/signon/deleteSignon', data, 'POST')

/**
 * 批量删除签到活动模板
 */
export const bulkDeleteSignOn = data => fetch('/admin/signon/bulkDeleteSignOn', data, 'POST')

/**
 * 获取场景列表
 */
export const getSceneList = data => fetch('/admin/scene/getSceneList', data, 'POST')

/**
 * 新建签到场景
 */
export const addScene = data => fetch('/admin/scene/addScene', data, 'POST')

/**
 * 新建场景签到活动数据
 */
export const addScenesign = data => fetch('/admin/scenesign/addScenesign', data, 'POST')

/**
 * 批量新建场景签到活动数据
 */
export const bulkAddScenesign = data => fetch('/admin/scenesign/bulkAddScenesign', data, 'POST')
/**
 * 批量删除场景签到活动数据
 */

export const bulkDeleteScenesign = data => fetch('/admin/scenesign/bulkDeleteScenesign', data, 'POST')
/**
 * 获取签到场景列表
 */
export const getScenesignList = data => fetch('/admin/scenesign/getScenesignList', data, 'POST')

/**
 * 根据场景id获取签到活动列表
 */
export const getSignonListBySceneId = data => fetch('/admin/signon/getSignonListBySceneId', data, 'POST')
