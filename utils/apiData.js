const ljRequest = require('./request.js');
const config = require('./config.js');
const app = getApp();
/**
 * 用户注册
 * @param {Object} obj {code} 微信登录接口返回的 code
 * @param {boolean | 1 } errHandle: 值为true弹出提示信息；值为false则抛出异常；值为1弹出提示信息并返回上页;
 */
function register(obj, errHandle) {
  return ljRequest.request('/user/wxapp/register/simple', obj, '', errHandle);
}

/**
 * 登录获取Token
 */
function Login(obj, errHandle) {
  return ljRequest.request('/user/wxapp/login', obj, 'GET', errHandle);
}

/**
 * 检测登录token是否有效
 */
function checkToken(obj) {
  return ljRequest.request('/user/check-token', obj, 'GET', false);
}

/**
 * 获取banner列表
 */
function getBanner() {
  return ljRequest.request('/banner/list', '', 'GET');
}

/**
 * 获取所有商品类别
 */
function categoryAll(token) {
  return ljRequest.request('/shop/goods/category/all', {
    token
  })
}

/**
 * 获取所有商品列表
 *  recommendStatus:'',推荐状态：不传该参数获取所有商品；0为一般商品；1为推荐商品
 */
function goods(obj) {
  return ljRequest.request('/shop/goods/list', obj, '', 1);
}

/**
 * 获取商品详情
 */
function detail(obj) {
  return ljRequest.request('/shop/goods/detail', obj, 'GET', 1);
}

/**
 * 添加商品收藏
 * obj = {goodsId: 商品id, token: 登录接口返回的token}
 */
function collect(obj) {
  return ljRequest.request('/shop/goods/fav/add', obj);
}

/**
 * 检测是否已收藏
 * obj = {goodsId: 商品id, token: 登录接口返回的token}
 */
function collectCheck(obj) {
  return ljRequest.request('/shop/goods/fav/check', obj, 'GET', false);
}

/**
 * 删除商品收藏
 * obj = {goodsId: 商品id, id:收藏记录id ,token: 登录接口返回的token}
 */
function collectDelete(obj) {
  return ljRequest.request('/shop/goods/fav/delete', obj, 'GET');
}

/**
 * 商品收藏列表
 * obj = {
 *    nameLike: 商品标题模糊搜索关键词
 *    page: 获取第几页数据
 *    pageSize: 每页显示多少数据
 *    token: 登录接口返回的token
 * }
 */
function collectList(obj) {
  return ljRequest.request('/shop/goods/fav/list', obj, 'POST', 1);
}

/**
 * 计算两地距离
 * obj = {lat1: 纬度1, lat2: 纬度2, lng1:经度1, lng2:经度2, token: 登录接口返回的token}
 */
function distance(obj) {
  return ljRequest.request('/common/map/distance', obj, 'GET', '', false);
}

/**
 * 批量获取系统参数
 * @param {Array} keys: 参数  { keys:'servicePhoneNumber,aboutUsTitle, aboutUsContent'}
 * @return 
 */
function getValues() {
  const keys = {
    keys: config.dictKeys.join(',')
  }
  return new Promise(resolev => {
    ljRequest.request('/config/values', keys, 'GET').then(res => {
      let list = {}
      for (let item of res) {
        list[item.key] = item.value;
      }
      app.globalData.dictData = list;
      resolev(true)
    })
  })
}

module.exports = {
  register,
  Login,
  checkToken,
  getBanner,
  categoryAll,
  goods,
  detail,
  collect,
  collectCheck,
  collectDelete, 
  collectList,
  distance,
  getValues,
}